import React from 'react';
import PropTypes from 'prop-types';

import './CardImage.scss';

function CardImage({ imageUrl, name }) {
  return <img alt={name} className="CardImage" src={imageUrl} />;
}

CardImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default CardImage;
