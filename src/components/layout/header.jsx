import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import { showLock } from '../../libs/auth0.js';

const styles = {
  img: {
    height: '60px'
  }
};

function logout() {
  localStorage.clear();
  location.reload();
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  openPopOver = (e) => {
    e.preventDefault();

    this.setState({
      open: true,
      anchorEl: e.currentTarget
    });
  };

  closePopOver = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { user } = this.props;
    const isLogged = !!user;
    let menu;

    if (isLogged) {
      menu = (
        <div>
          <FlatButton label="Logout" onClick={logout} />
        </div>
      );
    } else {
      menu = (
        <div>
          <FlatButton label="Login" onClick={showLock} />
        </div>
      );
    }

    return (
      <header className="container">
        <div className="pure-g">
          <div className="pure-u-1-2">
            <img src="http://sweetiq.com/wp-content/themes/sweetiq/img/logos/SWIQ_Logo_Open_Grey.png" alt="PeopleIQ" style={styles.img} />
          </div>
          <div className="pure-u-1-2 text-right">
            {menu}
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  profile: PropTypes.object,
  user: PropTypes.object
};

export default Header;
