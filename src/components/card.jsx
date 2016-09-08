import React, { PropTypes } from 'react';
import assign from 'lodash/assign';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';

const styles = {
  card: {
    marginBottom: '2em'
  },
  image: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    paddingBottom: '100%',
    width: '100%'
  }
};

const ProfileCard = ({ profile }) => {
  const { description, email, location, mobile, name, phone, picture, title } = profile;
  const styleImg = assign({ backgroundImage: `url(${picture})` }, styles.image);
  let elDescription = null;

  if (description) elDescription = <p>{description}</p>;

  return (
    <div className="pure-u-1-1 pure-u-sm-1-2 pure-u-md-1-3 pure-u-lg-1-4 pure-u-xl-1-5" style={styles.card}>
      <Card>
        <CardMedia>
          <div style={styleImg}></div>
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
    </div>
  );
};

ProfileCard.prototype.propTypes = {
  profiles: PropTypes.array.isRequired
};

export default ProfileCard;
