import { RECEIVE_NEW_CARDS_PAGE, UPDATE_FILTERS } from './action-types';

/** @type GlobalState */
export const initialState = {
  filters: [{
    displayName: 'Name',
    apiParameter: 'name',
    values: [],
  },
  {
    displayName: 'Type',
    apiParameter: 'type',
    values: [],
  }],
  cardsPages: [],
  isDonePaging: false,
  _totalCount: 0,
};

/**
 * A reducer that will be used to set global state. The goal of this reducer is to take simple actions
 * and set them in the global state.  The state should never be mutated, and the reducer should be pure.
 * @param {GlobalState} state
 * @param {Action} action
 * @returns {GlobalState}
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    /**
     * Receive a new cards page.  This does some logic based on whether the page is a first or last page.
     * Maybe it should be split into three actions so the logic isn't necessary here.
     */
    case RECEIVE_NEW_CARDS_PAGE: {
      const { cardsPage } = action;
      const isFirstPage = !cardsPage.previousUrl;
      const isLastPage = !cardsPage.nextUrl;
      return {
        ...state,
        cardsPages: isFirstPage ? [cardsPage] : [...state.cardsPages, cardsPage],
        isDonePaging: isLastPage,
        _totalCount: cardsPage._totalCount || 0,
      };
    }
    case UPDATE_FILTERS: {
      const { filters } = action;
      return {
        filters: [].concat(filters),
        cardsPages: [],
        isDonePaging: false,
      };
    }
    default:
      throw new Error(`An unknown action (${action.type}) was dispatched`);
  }
}
