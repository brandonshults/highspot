import React from 'react';
import PropTypes from 'prop-types';
import './FieldsList.scss';

function FieldsList({ fields }) {
  return (
    <dl className="FieldsList">
      {fields.map(([name, value]) => (
        <div key={`${name}-${value}`} className="description-group">
          <dt className="name">{`${name}: `}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

FieldsList.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired)).isRequired,
};

export default FieldsList;
