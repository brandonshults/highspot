import React from 'react';
import PropTypes from 'prop-types';
import FieldsList from './FieldsList';

function PrimaryInfo({
  name, text, set, type,
}) {
  return (
    <div className="PrimaryInfo">
      <h2 className="card-name">{name}</h2>
      <FieldsList fields={[['Set', set.name], ['Type', type]]} />
      {text && <p className="text">{text}</p>}
    </div>
  );
}

PrimaryInfo.defaultProps = {
  text: null,
};

PrimaryInfo.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string,
  type: PropTypes.string.isRequired,
  set: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default PrimaryInfo;
