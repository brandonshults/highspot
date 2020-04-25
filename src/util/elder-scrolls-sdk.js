/**
 * A library for interfacing with the api at https://docs.elderscrollslegends.io/. It focuses more on exposing
 * functions and constants that are useful for Highspot's coding challenge rather than trying to be a complete
 * javascript SDK like the ruby and python SDKs listed on elderscrollslegends.io
 */
import uid from 'uid';

const API_VERSION = 'v1';

const BASE_URL = `https://api.elderscrollslegends.io/${API_VERSION}`;

export const CARD_QUERY_URL = `${BASE_URL}/cards`;

/**
 * Condense an object into a querystring and append it to a url.
 * @param url
 * @param {PagingParameters} object
 * @returns {string}
 */
function addQueryStringToUrl(url, object) {
  return `${url}?${Object.entries(object).map(([key, value]) => `${key}=${value}`).join('&')}`;
}

/**
 * Given an api url, get the response and return information about the results.
 * @param url
 * @returns {Promise<PaginationPage>}
 */
async function fetchCardsPage(url) {
  const id = uid();
  let cards;
  let _links;
  let _totalCount;
  let error;

  try {
    const response = await fetch(url);
    // TODO: Improve handling of different statuses, the API docs provide a nice set of status codes and explanations.
    // For now though, when receiving a non-ok status, just throw an error and lump it in with errors thrown by fetch.
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    ({ cards, _links, _totalCount } = await response.json());
  } catch (ex) {
    cards = [];
    _links = {
      previousUrl: undefined,
      nextUrl: undefined,
    };
    _totalCount = 0;
    error = ex;
  }

  return {
    cards,
    url,
    previousUrl: _links?.prev,
    nextUrl: _links?.next,
    shouldIgnore: false,
    _totalCount,
    error,
    id,
  };
}

/**
 * This will produce a generator that generates one page of results each time its "next" method is called.
 * @param {number} pageSize - The maximum number of cards to return with each call
 * @param {PagingParameters} parameters - Parameters to pass to the api based on https://docs.elderscrollslegends.io/#api_v1cards_list
 * @param {function} setIsFetching - For communicating when the request is still pending.
 * @returns {AsyncGenerator<PaginationPage>}
 */
// eslint-disable-next-line consistent-return
async function* makeCardsPageGenerator(pageSize, parameters, setIsFetching) {
  let nextUrl = addQueryStringToUrl(CARD_QUERY_URL, { pageSize, ...parameters });

  do {
    setIsFetching(true);

    const cardsPage = await fetchCardsPage(nextUrl); // eslint-disable-line no-await-in-loop
    setIsFetching(false);
    nextUrl = cardsPage?.nextUrl;

    if (!nextUrl) {
      return cardsPage;
    }

    yield cardsPage;
  } while (nextUrl);
}

/**
 * Make a cards pager that wraps the cards generator and provides information about the pager's lifecycle.
 *
 * When calling code creates a new pager it can first use "cancel" to cancel the old one which will set a flag in
 * the returned page so consuming code can ignore it.  New pagers are created when filters are updated and this
 * can be used to make sure that a request from the old pager doesn't land after the old results have been cleared.
 *
 * getIsFetching lets consuming code know when a request is still pending.
 * getIsDone lets consuming code know that there are no more pages for this query
 * @param {number} pageSize
 * @param {Object.<string, string>} parameters
 * @returns {CardsPager}
 */
export function makeCardsPager(pageSize = 20, parameters = {}) {
  let shouldIgnore = false;
  let isFetching = false;
  let isDone = false;
  const setIsFetching = (updatedIsFetching) => { isFetching = updatedIsFetching; };
  const cardsGenerator = makeCardsPageGenerator(pageSize, parameters, setIsFetching);

  return {
    getIsFetching: () => isFetching,
    getIsDone: () => isDone,
    cancel: () => { shouldIgnore = true; },
    getNextPage: async () => {
      const cardsPage = await cardsGenerator.next();
      if (cardsPage.done) {
        isDone = true;
      }
      return { ...cardsPage, shouldIgnore };
    },
  };
}
