import React from 'react';
import PropTypes from 'prop-types';

import './Flippable.scss';

function Flippable({ frontFace, backFace, isFlipped }) {
  return (
    <div className="Flippable">
      <div className={`flippable-inner${isFlipped ? ' flipped' : ''}`}>
        <div className="front face">
          {frontFace}
        </div>
        <div className="back face">
          {backFace}
        </div>
      </div>
    </div>
  );
}

Flippable.propTypes = {
  frontFace: PropTypes.node.isRequired,
  backFace: PropTypes.node.isRequired,
  isFlipped: PropTypes.bool.isRequired,
};

export default Flippable;
