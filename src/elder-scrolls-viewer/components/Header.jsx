import React, { useContext } from 'react';
import Filters from './Filters/Filters';
import { GlobalContext } from '../GlobalContextProvider';
import './Header.scss';

export default function Header() {
  const { _totalCount = 0 } = useContext(GlobalContext).state;
  return (
    <header>
      <div className="background-overlay">
        <h1>Elder Scrolls Cards</h1>
        <section className="filters-and-count">
          <Filters />
          <span className="count">{`Showing ${_totalCount} Result${_totalCount === 1 ? '' : 's'}`}</span>
        </section>
      </div>
    </header>
  );
}
