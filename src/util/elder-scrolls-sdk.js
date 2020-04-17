/**
 * A library for interfacing with the api at https://docs.elderscrollslegends.io/. It focuses more on exposing
 * functions and constants that are useful for Highspot's coding challenge rather than trying to be a complete
 * javascript SDK like the ruby and python SDKs listed on elderscrollslegends.io
 */

const API_VERSION = 'v1';

const BASE_URL = `https://api.elderscrollslegends.io/${API_VERSION}`;

/**
 * The url
 * @type {string}
 */
export const CARD_QUERY_URL = `${BASE_URL}/cards`

function addQueryStringToUrl(url, object) {
  return `${url}?${Object.entries(object).map(([key, value]) => `${key}=${value}`).join('&')}`
}

/**
 * Given an api url, get the response and either return an object containing an error, or an object containing
 * the cards that were requested, as well as the pagination URLs sent back by the api.
 * @param url
 * @returns {Promise<{cards: Array, previousUrl: string, nextUrl: string}|{error: string}>}
 */
async function fetchCardsPage(url) {
  try {
    const response = await fetch(url);
    // TODO: Improve handling of different statuses, the API docs provide a nice set of status codes and explanations.
    // For now though, when receiving a non-ok status, just throw an error and lump it in with errors thrown by fetch.
    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const { cards, _links } = await response.json();
    return {
      cards,
      previousUrl: _links?.prev,
      nextUrl: _links?.next,
    }

  } catch (error) {
    return {
      error
    }
  }
}

/**
 * It's good enough to say that an object represents a cards page if it has a cards array
 * @param object
 * @returns {boolean}
 */
export function isCardsPage(object) {
  return !!(object?.cards && Array.isArray(object.cards));
}

/**
 * It's good enough to say that an object represents an error if it has a
 * @param object
 * @returns {boolean}
 */
export function isErrorPage(object) {
  return !!object?.error;
}

/**
 *
 * @param pageSize - The maximum number of cards to return with each call
 * @param parameters - A set of parameters to pass to the api based on https://docs.elderscrollslegends.io/#api_v1cards_list
 * @returns {AsyncGenerator<{cards: Array, previousUrl: string, nextUrl: string}|{error: string}, void, *>}
 */
export async function* getCardsGenerator(pageSize = 20, parameters = {}) {
  let nextUrl = addQueryStringToUrl(CARD_QUERY_URL, { pageSize, ...parameters });

  do {
    const cardsPage = await fetchCardsPage(nextUrl);
    nextUrl = cardsPage?.nextUrl;

    if(!nextUrl) {
      return cardsPage;
    }

    yield cardsPage;
  } while(nextUrl)
}