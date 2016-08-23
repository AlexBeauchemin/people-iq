import React, { PropTypes } from 'react';
import { map } from 'lodash';

const Featured = ({ properties }) => {
  const elProperties = map(properties, property => {
    return (
      <li key={property.id}>
        {`${property.title} - ${property.region} - ${property.price}$`}
      </li>
    );
  });

  return (
    <div className="container">
      <ul>
        {elProperties}
      </ul>
    </div>
  );
};

Featured.prototype.propTypes = {
  properties: PropTypes.array
};

export default Featured;
