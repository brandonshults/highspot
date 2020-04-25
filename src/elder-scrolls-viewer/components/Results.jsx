import React, { Fragment, useContext } from 'react';
import { GlobalContext } from '../GlobalContextProvider';
import CardDisplay from './CardDisplay/CardDisplay';

import './Results.scss';
import NoResults from './NoResults';

export default function Results() {
  const { state } = useContext(GlobalContext);
  const { cardsPages } = state;
  const isError = !!cardsPages?.[0]?.error;
  const showEmptyResults = !isError && cardsPages?.[0]?._totalCount === 0;
  console.log(cardsPages);
  return (
    <main className="Results">
      {showEmptyResults
        ? <NoResults />
        : cardsPages.map((cardsPage) => (
          <Fragment key={cardsPage.id}>
            {cardsPage.cards.map((card, index) => <CardDisplay card={card} key={card?.id || `error-${index}`} />)}
          </Fragment>
        ))}
    </main>
  );
}
