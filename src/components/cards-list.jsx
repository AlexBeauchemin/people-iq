import React, { PropTypes } from 'react';
import map from 'lodash/map';
import Card from './card.jsx';

const CardsList = ({ profiles, search }) => {
  return (
    <div className="pure-g pure-g--gutter">
      {map(profiles, profile => <Card key={profile.id} profile={profile} search={search} />)}
    </div>
  );
};

CardsList.prototype.propTypes = {
  profiles: PropTypes.array.isRequired,
  search: PropTypes.string
};

export default CardsList;
