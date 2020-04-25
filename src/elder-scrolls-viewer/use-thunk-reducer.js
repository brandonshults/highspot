import { useReducer } from 'react';

/**
 * Enable dispatch to accept "thunks," similar to https://github.com/reduxjs/redux-thunk
 *
 * After writing my own version I googled it and liked the results I found much better so
 * this code was borrowed directly from https://github.com/streamich/react-use/issues/164
 * @param reducer
 * @param initialState
 * @returns {[GlobalState, function]}
 */
export default function useThunkReducer(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const thunkDispatch = (action) => {
    if (typeof action === 'function') {
      return action(dispatch, state);
    }

    return dispatch(action);
  };

  return [state, thunkDispatch];
}
