import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { showLock } from '../../libs/auth0.js';

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
    const { user = {} } = this.props;
    const isLogged = !!user.id;
    let menu;
    
    console.log(user,profile);

    if (isLogged) {
      menu = (
        <div>
          <FlatButton label={user.displayName || user.email} onTouchTap={this.openPopOver} />
          <Avatar src={user.photoURL} size={35} style={{ verticalAlign: 'middle' }} hidden={!user.photoURL} />
          <Popover
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            onRequestClose={this.closePopOver}
            open={this.state.open}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <Menu>
              <MenuItem onClick={logout} primaryText="Logout" />
            </Menu>
          </Popover>

        </div>
      );
    } else {
      menu = (
        <div>
          <a href="#" onClick={showLock}>Login with lock</a>
        </div>
      );
    }

    return (
      <header>
        <div className="container">
          <div className="pure-g">
            <div className="pure-u-1-2">
              <img src="http://www.american.edu/uploads/profiles/large/chris_palmer_profile_11.jpg" alt="PeopleIQ" className="logo" />
            </div>
            <div className="pure-u-1-2 text-right">
              {menu}
            </div>
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
