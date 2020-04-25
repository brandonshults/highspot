import React, { useContext } from 'react';
import Header from './Header';
import { GlobalContext } from '../GlobalContextProvider';
import Results from './Results';
import PagingIndicator from './PagingIndicator';

export default function Page() {
  const { dispatch, infiniteScrollThunks, state: { isDonePaging } } = useContext(GlobalContext);
  const { handleReachedPageEnd } = infiniteScrollThunks;

  return (
    <div className="Page">
      <Header />
      <Results />
      {!isDonePaging && (
        <PagingIndicator
          dispatch={dispatch}
          handleReachedPageEnd={handleReachedPageEnd}
          isDonePaging={isDonePaging}
        />
      )}
    </div>
  );
}
