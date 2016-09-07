import React, { PropTypes } from 'react';
import map from 'lodash/map';
import Card from './card.jsx';

const CardsList = ({ profiles }) => {
  return (
    <div className="pure-g">
      {map(profiles, profile => <Card key={profile.id} profile={profile} />)}
    </div>
  );
};

CardsList.prototype.propTypes = {
  profiles: PropTypes.array.isRequired
};

export default CardsList;
