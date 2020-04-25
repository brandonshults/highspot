import React, {
  useCallback, useContext, useState, createRef,
} from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../../GlobalContextProvider';
import FilterValue from './FilterValue';
import './Filter.scss';


function Filter({ displayName, apiParameter, values }) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = createRef();
  const handleInputChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, [setInputValue]);

  const { dispatch, infiniteScrollThunks } = useContext(GlobalContext);

  const handleAddFilter = useCallback(() => {
    if (inputValue) {
      dispatch(infiniteScrollThunks.makeAddFilterValueThunk(apiParameter, inputValue));
      setInputValue('');
      console.log(inputRef);
      inputRef.current?.focus(); // eslint-disable-line
    }
  }, [apiParameter, dispatch, infiniteScrollThunks, inputValue, inputRef]);

  const handleTextKeyPress = useCallback((event) => {
    switch (event?.key) {
      case 'Enter':
        event.preventDefault();
        handleAddFilter();
        break;
      case 'Escape':
        setInputValue('');
        break;
      default:
        break;
    }
  }, [handleAddFilter, setInputValue]);

  return (
    <section className="Filter">
      <h3 id={`${displayName}-label`}>{`Filter by ${displayName} `}</h3>
      <div className="controls">
        <input
          ref={inputRef}
          type="text"
          className="filter-input"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleTextKeyPress}
          aria-labelledby={`${displayName}-label`}
        />
        <button type="button" onClick={handleAddFilter} className="add-button">{`Add ${displayName} Filter`}</button>
      </div>
      {
        values?.length > 0
          ? (
            <ul className="values-list">
              {values.map((value) => (<FilterValue key={value} apiParameter={apiParameter} value={value} />))}
            </ul>
            )
          : null
      }
    </section>
  );
}

Filter.propTypes = {
  displayName: PropTypes.string.isRequired,
  apiParameter: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Filter;
