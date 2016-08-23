import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
import LoginModal from '../modals/login.jsx';
import EditProfileModal from '../modals/edit-profile.jsx';
import NewProviderPromptModal from '../modals/new-provider-prompt.jsx';
import text from '../../i18n/fr.js';

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
    const { login, logout, openProfile, pageName, register, saveProfile, user = {} } = this.props;
    const isLogged = !!user.id;
    const logoSrc = pageName === 'home' ? '/images/maison-abitibi-logo.png' : '/images/maison-abitibi-logo-white.png';
    let menu;

    if (isLogged) {
      menu = (
        <div>
          <Link to="/vendre"><FlatButton label={text.menu.sell} /></Link>
          <span style={{ display: 'inline-block', padding: '0 15px' }}> | </span>
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
              <MenuItem onClick={openProfile} primaryText={text.header.profile} />
              <MenuItem onClick={logout} primaryText={text.header.logout} />
            </Menu>
          </Popover>
          
        </div>
      );
    } else {
      menu = (
        <div>
          <LoginModal
            login={login}
            register={register}
          />
        </div>
      );
    }

    return (
      <header>
        <div className="container">
          <div className="pure-g">
            <div className="pure-u-1-2">
              <Link to="/"><img src={logoSrc} alt="Maison Abitibi" className="logo" /></Link>
            </div>
            <div className="pure-u-1-2 text-right">
              {menu}
            </div>
          </div>
        </div>
        <EditProfileModal save={saveProfile} />
        <NewProviderPromptModal />
      </header>
    );
  }
}

Header.propTypes = {
  login: PropTypes.func,
  logout: PropTypes.func,
  openProfile: PropTypes.func,
  pageName: PropTypes.string,
  register: PropTypes.func,
  saveProfile: PropTypes.func,
  user: PropTypes.object
};

export default Header;
