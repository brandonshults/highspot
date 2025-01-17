import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import XIcon from '../../../icons/XIcon';
import { GlobalContext } from '../../GlobalContextProvider';
import './FilterValue.scss';

function FilterValue({ apiParameter, value }) {
  const { dispatch, infiniteScrollThunks: { makeRemoveFilterValueThunk } } = useContext(GlobalContext);
  const handleRemoveClick = useCallback(() => {
    dispatch(makeRemoveFilterValueThunk(apiParameter, value));
  }, [makeRemoveFilterValueThunk, dispatch, apiParameter, value]);

  return (
    <li className="FilterValue">
      <span className="value">{value}</span>
      <button type="button" className="remove-button" onClick={handleRemoveClick} aria-label="remove filter">
        <XIcon />
      </button>
    </li>
  );
}

FilterValue.propTypes = {
  apiParameter: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default FilterValue;
