import React, { useState, useCallback } from 'react';
import Flippable from './Flippable';
import CardImage from './CardImage';
import MoreInfo from './MoreInfo';
import './ImageAndMoreInfo.scss';

function ImageAndMoreInfo({ card }) {
  const { imageUrl, name } = card;
  const [isFlipped, setIsFlipped] = useState(false);
  const handleViewMoreClick = useCallback(() => setIsFlipped(!isFlipped), [isFlipped]);

  return (
    <section className="ImageAndMoreInfo">
      <Flippable
        isFlipped={isFlipped}
        frontFace={<CardImage imageUrl={imageUrl} name={name} />}
        backFace={<MoreInfo isShown={isFlipped} card={card} />}
      />
      <button className="view-more" type="button" onClick={handleViewMoreClick}>
        {`View ${isFlipped ? 'Primary Info' : 'More Info'}`}
      </button>
    </section>
  );
}

export default ImageAndMoreInfo;
