import React, { PropTypes } from 'react';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';

const ProfileCard = ({ profile }) => {
  const { description, email, location, mobile, name, phone, picture, title } = profile;
  let elDescription = null;

  if (description) elDescription = <p>{description}</p>;

  return (
    <Card className="pure-u-1-6">
      <CardMedia>
        <img src={picture} role="presentation" />
      </CardMedia>
      <CardTitle title={name} subtitle={title || 'Title Missing'} />
      <CardText>
        <div>Email: {email}</div>
        <div>Phone: {phone}</div>
        <div>Mobile: {mobile}</div>
        <div>Location: {location}</div>
        {elDescription}
      </CardText>
    </Card>
  );
};

ProfileCard.prototype.propTypes = {
  profiles: PropTypes.array.isRequired
};

export default ProfileCard;
