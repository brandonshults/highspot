import { UPDATE_FILTERS, RECEIVE_NEW_CARDS_PAGE } from './action-types';
import { makeCardsPager } from '../util/elder-scrolls-sdk';
import getQueryParamObjectFromFilters from '../util/get-query-param';

/**
 * A factory for thunks.  It's a factory so they can share some minimal state.
 * @param itemsPerPage
 * @param queryParameters
 * @returns {{makeRemoveFilterValueThunk: (function(*=, *=): removeFilterValueThunk), makeAddFilterValueThunk: (function(*=, *=): addFilterValueThunk), handleReachedPageEnd: handleReachedPageEnd}}
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
   * @param {string} apiParameter - The key of the querystring pair
   * @param {string} value - The value of the querystring pair
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
   *
   * @param dispatch
   * @param state
   * @returns {Promise<ElderScrollsAPICardsPage>}
   */
  const reachedPagedEndThunk = async (dispatch) => {
    if (!cardsPager.getIsDone() && !cardsPager.getIsFetching()) {
      await fetchNextPaginationPage(dispatch);
    }
  };

  const clearFiltersThunk = async (dispatch, state) => {
    const filters = state.filters.map((filter) => ({ ...filter, values: [] }));
    await updateFiltersAndFetch(filters, dispatch, state);
  };

  return {
    makeAddFilterValueThunk,
    handleReachedPageEnd: reachedPagedEndThunk,
    makeRemoveFilterValueThunk,
    clearFiltersThunk,
  };
}
