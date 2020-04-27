import { UPDATE_FILTERS, RECEIVE_NEW_CARDS_PAGE } from './action-types';
import { makeCardsPager } from '../util/elder-scrolls-sdk';
import getQueryParamObjectFromFilters from '../util/get-query-param';

/**
 * A factory for thunks.
 * A thunk is a function that is dispatched when an action is more complex then just receiving and setting state.
 * This is a factory specifically so that the thunks can share a cardsPager.
 * The thunks share the cardsPager in order to compose complex actions such as fetching from a remote api into simple state changes
 * that may be dispatched to the reducer.
 * @param itemsPerPage
 * @param queryParameters
 * @returns {{makeRemoveFilterValueThunk: (function(string, string): void), makeAddFilterValueThunk: (function(string, string): void), reachedPagedEndThunk: (function(): Promise<ElderScrollsAPICardsPage>), clearFiltersThunk: (function(): Promise<ElderScrollsAPICardsPage>)}}
 */
export default function makeInfiniteScrollThunks(itemsPerPage, queryParameters) {
  let cardsPager = makeCardsPager(itemsPerPage, queryParameters);

  /**
   * Get the next page of results, and dispatch the update.  Make sure not to add stale results to the current results.
   * @param dispatch
   * @returns {Promise<{PaginationPage}>}
   */
  const fetchNextPaginationPage = async (dispatch) => {
    let page;
    try {
      page = (await cardsPager.getNextPage()).value;
    } catch (error) {
      page = { error: new Error('There was a problem fetching the results') };
    }
    if (page && !page.shouldIgnore) {
      dispatch({ type: RECEIVE_NEW_CARDS_PAGE, cardsPage: page });
    }
    return page;
  };

  /**
   * Updating the filters involves an entirely new search, which means a new cardsPager.  First, it's necessary
   * to cancel the old one though so that fetching code knows to disregard stale results.
   * @param filters
   * @param dispatch
   * @param state
   * @returns {Promise<{PaginationPage}>}
   */
  const updateFiltersAndFetch = (filters, dispatch, state) => {
    cardsPager.cancel();
    cardsPager = makeCardsPager(20, getQueryParamObjectFromFilters(filters));
    dispatch({ type: UPDATE_FILTERS, filters });
    return fetchNextPaginationPage(dispatch, state);
  };

  /**
   * Add a new filter value.
   * @param {string} apiParameter - The key of the querystring pair as the remote api expects
   * @param {string} value - The value of the querystring pair is the value to filter for
   * @returns {Function.<Promise>}
   */
  const makeAddFilterValueThunk = (apiParameter, value) => {
    const addFilterValueThunk = async (dispatch, state) => {
      const filters = state.filters.map((filter) => {
        if (filter.apiParameter === apiParameter && !filter.values.includes(value)) {
          return {
            ...filter,
            values: filter.values.concat([value]),
          };
        }
        return filter;
      });
      await updateFiltersAndFetch(filters, dispatch, state);
    };

    return addFilterValueThunk;
  };

  /**
   * Remove a filter value.
   * @param {string} apiParameter - The key of the querystring pair as the remote api expects
   * @param {string} value - The value of the querystring pair is the value to filter for
   * @returns {Function.<Promise>}
   */
  const makeRemoveFilterValueThunk = (apiParameter, value) => {
    const removeFilterValueThunk = async (dispatch, state) => {
      const filters = state.filters.map((filter) => {
        if (filter.apiParameter === apiParameter && filter.values.includes(value)) {
          return {
            ...filter,
            values: filter.values.filter((iteratorValue) => iteratorValue !== value),
          };
        }
        return filter;
      });
      await updateFiltersAndFetch(filters, dispatch, state);
    };

    return removeFilterValueThunk;
  };

  /**
   * A thunk to be dispatched when the user scrolls to the end of the page.  If paging isn't done, and if
   * the pager isn't currently fetching results, then fetch the next page of results.
   * @param dispatch
   * @returns {Promise<ElderScrollsAPICardsPage>}
   */
  const reachedPagedEndThunk = async (dispatch) => {
    if (!cardsPager.getIsDone() && !cardsPager.getIsFetching()) {
      await fetchNextPaginationPage(dispatch);
    }
  };

  /**
   * Clear all of the filters by setting their values to an empty array.
   * @param dispatch
   * @param state
   * @returns {Promise<void>}
   */
  const clearFiltersThunk = async (dispatch, state) => {
    const filters = state.filters.map((filter) => ({ ...filter, values: [] }));
    await updateFiltersAndFetch(filters, dispatch, state);
  };

  return {
    makeAddFilterValueThunk,
    reachedPagedEndThunk,
    makeRemoveFilterValueThunk,
    clearFiltersThunk,
  };
}
