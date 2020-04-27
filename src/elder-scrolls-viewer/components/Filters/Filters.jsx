import React, { useCallback, useContext, useState } from 'react';
import { GlobalContext } from '../../GlobalContextProvider';
import Filter from './Filter';
import Modal from './Modal';
import ClearFiltersButton from './ClearFiltersButton';
import './Filters.scss';

export default function Filters() {
  const { filters } = useContext(GlobalContext).state;
  const [isOpen, setIsOpen] = useState(false);
  const closeFilters = useCallback(() => setIsOpen(false), [setIsOpen]);
  const handleOpenClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [setIsOpen, isOpen]);

  return (
    <div className="Filters">
      <div className="main-buttons">
        <button type="button" onClick={handleOpenClick}>Open Filters</button>
        <ClearFiltersButton />
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <section className="filter-modal">
          <h2>Adjust Filters</h2>
          {filters.map(({ displayName, values, apiParameter }) => (
            <Filter
              key={`${apiParameter}-${values.join()}`}
              displayName={displayName}
              values={values}
              apiParameter={apiParameter}
            />
          ))}
          <button type="button" onClick={closeFilters}>View Results</button>
          <ClearFiltersButton />
        </section>
      </Modal>
    </div>

  );
}
