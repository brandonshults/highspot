/**
 * Set up a global context for any child component to use.  This will allow for a redux-like workflow without bringing
 * in a dependency on redux.
 *
 * The context will contain a reference to a global state object, a thunk-enabled reducer, and a collection of thunks
 */
import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import reducer, { initialState } from './reducer';
import useThunkReducer from './use-thunk-reducer';
import makeInfiniteScrollThunks from './make-infinite-scroll-thunks';
import getQueryParamObjectFromFilters from '../util/get-query-param';

/**
 * Create the GlobalContext object.  Its provider can be use to provide the context to nested components.
 * This exported object itself will be used by useContext so those nested components can gain access.
 * @type {React.Context<{asyncEnabledDispatch:function, state:GlobalState}>}
 */
export const GlobalContext = createContext({ asyncEnabledDispatch: () => {}, state: initialState });

/**
 * @component
 * @param {} children
 * @returns {*}
 * @constructor
 */
function GlobalContextProvider({ children }) {
  const [state, dispatch] = useThunkReducer(reducer, initialState);
  const infiniteScrollThunks = useMemo(
    () => makeInfiniteScrollThunks(20, getQueryParamObjectFromFilters(initialState.filters)),
    [],
  );
  const value = useMemo(() => ({ dispatch, state, infiniteScrollThunks }), [dispatch, infiniteScrollThunks, state]);

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}
GlobalContextProvider.defaultProps = {
  children: null,
};

GlobalContextProvider.propTypes = {
  children: PropTypes.node,
};

export default GlobalContextProvider;
