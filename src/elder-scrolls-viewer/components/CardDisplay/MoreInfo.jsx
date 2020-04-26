import React from 'react';
import PropTypes from 'prop-types';
import FieldsList from './FieldsList';
import getMoreInfoFields from '../../../util/get-more-info-fields';
import './MoreInfo.scss';


function MoreInfo({ isShown, card }) {
  return (
    <div className="MoreInfo">
      <video
        className="card-back-video"
        poster={`${process.env.PUBLIC_URL}/card-back.jpg`}
        autoPlay
        muted
        loop
        playsInline="playsinline"
      >
        {isShown ? <source src={`${process.env.PUBLIC_URL}/card-back.mp4`} type="video/mp4" /> : null}
      </video>
      <div className="fields-container">
        <FieldsList fields={getMoreInfoFields(card)} />
      </div>
    </div>
  );
}

MoreInfo.propTypes = {
  card: PropTypes.shape({}).isRequired,
  isShown: PropTypes.bool.isRequired,
};

export default MoreInfo;
