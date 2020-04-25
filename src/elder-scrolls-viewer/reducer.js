import { BEGIN_FETCHING, RECEIVE_NEW_CARDS_PAGE, UPDATE_FILTERS } from './action-types';

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
 * A reducer that will be used to set global state.  This reducer should not handle any action with a type that is
 * prefixed with "ASYNC"
 * @param {GlobalState} state
 * @param {Action} action
 * @returns {GlobalState}
 */
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case BEGIN_FETCHING:
      return {
        ...state,
      };
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
