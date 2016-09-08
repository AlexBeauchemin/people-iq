import React, { PropTypes } from 'react';
import assign from 'lodash/assign';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FontIcon from 'material-ui/FontIcon';

const styles = {
  card: {
    marginBottom: '2em'
  },
  icon: {
    display: 'inline-block',
    fontSize: '14px',
    marginRight: '10px'
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
  let elPhone = null;
  let elMobile = null;

  if (description) elDescription = <p>{description}</p>;
  if (mobile) elMobile = <div><FontIcon style={styles.icon} className="fa fa-mobile" />{mobile}</div>;
  if (phone) elPhone = <div><FontIcon style={styles.icon} className="fa fa-phone" />{phone}</div>;

  return (
    <div className="pure-u-1-1 pure-u-sm-1-2 pure-u-md-1-3 pure-u-lg-1-4 pure-u-xl-1-5" style={styles.card}>
      <Card>
        <CardMedia>
          <div style={styleImg}></div>
        </CardMedia>
        <CardTitle title={name} subtitle={title || 'Title Missing'} />
        <CardText>
          <div><FontIcon style={styles.icon} className="fa fa-envelope-o" /><a href={`mailto:${email}`}>{email}</a></div>
          {elPhone}
          {elMobile}
          <div><FontIcon style={styles.icon} className="fa fa-globe" />{location}</div>
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
