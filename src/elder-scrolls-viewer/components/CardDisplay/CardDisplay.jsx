import React from 'react';
import PropTypes from 'prop-types';
import ImageAndMoreInfo from './ImageAndMoreInfo';
import PrimaryInfo from './PrimaryInfo';
import './CardDisplay.scss';

function CardDisplay({ card }) {
  return (
    <div className="CardDisplay">
      <PrimaryInfo name={card.name} text={card.text} set={card.set} type={card.type} />
      <ImageAndMoreInfo card={card} />
    </div>
  );
}

CardDisplay.propTypes = {
  card: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string,
    type: PropTypes.string.isRequired,
    set: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CardDisplay;
