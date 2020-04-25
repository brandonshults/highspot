import React from 'react';
import ClearFiltersButton from './Filters/ClearFiltersButton';

export default function NoResults() {
  return (
    <div className="NoResults" style={{ margin: '0 auto' }}>
      <h3>No Results!</h3>
      <ClearFiltersButton />
    </div>
  );
}
