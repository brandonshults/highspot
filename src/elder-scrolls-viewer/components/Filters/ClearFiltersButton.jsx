import React, { useContext, useCallback } from 'react';
import { GlobalContext } from '../../GlobalContextProvider';

export default function ClearFiltersButton() {
  const { dispatch, infiniteScrollThunks: { clearFiltersThunk }, state: { filters } } = useContext(GlobalContext);
  const areAlreadyClear = !filters.find((filter) => filter.values.length > 0);
  const handleClick = useCallback(() => {
    dispatch(clearFiltersThunk);
  }, [dispatch, clearFiltersThunk]);

  return <button type="button" onClick={handleClick} disabled={areAlreadyClear}>Clear Filters</button>;
}
