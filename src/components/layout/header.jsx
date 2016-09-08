import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import { showLock } from '../../libs/auth0.js';

const styles = {
  img: {
    height: '60px'
  }
};

function logout() {
  localStorage.clear();
  document.location.href = '/';
}

class Header extends Component {
  goToEdit = () => {
    this.props.changeView('edit');
  };

  goToHome = () => {
    this.props.changeView('list');
  };

  render() {
    const { user } = this.props;
    const isLogged = !!user;
    let menu;

    if (isLogged) {
      menu = (
        <div style={{ display: 'inline-block' }}>
          <FlatButton label="Edit Profile" onClick={this.goToEdit} />
          <FlatButton label="Logout" onClick={logout} />
        </div>
      );
    } else {
      menu = (
        <div style={{ display: 'inline-block' }}>
          <FlatButton label="Login" onClick={showLock} />
        </div>
      );
    }

    return (
      <header className="container">
        <div className="pure-g">
          <div className="pure-u-1-2">
            <a href="#" onClick={this.goToHome}>
              <img src="http://sweetiq.com/wp-content/themes/sweetiq/img/logos/SWIQ_Logo_Open_Grey.png" alt="PeopleIQ" style={styles.img} />
            </a>
          </div>
          <div className="pure-u-1-2 text-right">
            <FlatButton icon={<FontIcon className="fa fa-search" />} />
            <TextField hintText="Search" />
            {menu}
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  changeView: PropTypes.func.isRequired,
  profile: PropTypes.object,
  user: PropTypes.object
};

export default Header;
