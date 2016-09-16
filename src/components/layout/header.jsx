import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import { showLock } from '../../libs/auth0.js';

const styles = {
  img: {
    height: '60px'
  },
  searchInput: {
    paddingRight: '30px'
  },
  searchButton: {
    position: 'absolute',
    right: '-20px',
    top: 0
  }
};

function logout() {
  localStorage.clear();
  document.location.href = '/';
}

class Header extends Component {
  handleSearch = (e) => {
    let val = e.target.value;
    if (val.length <= 2) val = '';
    this.props.search(val);
  }

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
          <div className="pure-u-1-1 pure-u-md-1-4">
            <a href="#" onClick={this.goToHome}>
              <img src="http://sweetiq.com/wp-content/themes/sweetiq/img/logos/SWIQ_Logo_Open_Grey.png" alt="PeopleIQ" style={styles.img} />
            </a>
          </div>
          <div className="pure-u-1-1 pure-u-md-1-2" style={{ marginTop: '10px', position: 'relative' }}>
            <FlatButton icon={<FontIcon className="fa fa-search" />} style={styles.searchButton} />
            <TextField hintText="Search" type="search" style={styles.searchInput} onChange={this.handleSearch} fullWidth />
          </div>
          <div className="pure-u-1-1 pure-u-md-1-4 text-right">
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
  search: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default Header;
