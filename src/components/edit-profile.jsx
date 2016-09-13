import React, { Component, PropTypes } from 'react';
import getSlug from 'speakingurl';
import Dropzone from 'react-dropzone';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import s3Upload from '../libs/s3-upload';

const MAX_IMG_SIZE = 1000 * 1000; // bytes : 1mb

const styles = {
  button: {
    height: '60px',
    lineHeight: '60px'
  },
  container: {
    margin: '0 auto',
    maxWidth: '600px',
    width: '100%'
  },
  dropzone: {
    border: 'none',
    height: 'auto',
    width: 'auto'
  },
  dropzoneText: {
    fontSize: '12px',
    paddingRight: '2em',
  },
  img: {
    paddingRight: '2em',
    marginTop: '20px',
    width: '100%'
  }
};

class EditProfile extends Component {
  constructor(props) {

    super(props);

    this.timer = undefined;
    this.state = {
      profile: Object.assign({}, props.profile),
      previewImage: null,
      snackBarOpen: false,
      snackBarMessage: ''
    };
  }

  handleChange = (e) => {
    const { profile } = this.state;
    const updatedProfile = Object.assign({}, profile);

    updatedProfile[e.target.id] = e.target.value;

    this.setState({ profile: updatedProfile });
  };

  handleDrop = (files) => {
    const { profile } = this.props;
    const file = files[0];
  
    if (file.size >= MAX_IMG_SIZE) {
      this.handleError('File size is too big, please keep it under 1mb');
      return;
    }

    const fileExtension = file.name.split('.').pop();
    const name = getSlug(profile.email.split('@')[0]);
    const filename = `${name}.${fileExtension}`;
  
    this.setState({ previewImage: file.preview });
  
    return s3Upload(file, filename)
      .then((data) => {
        const picture =  data.url.split('?')[0];
        const updatedProfile = Object.assign({}, this.state.profile);

        profile.picture = picture;

        this.setState({
          profile: updatedProfile,
          previewImage: null
        });
      });
  };

  componentWillUnMount() {
    if (this.timer) clearTimeout(this.timer);
  }

  handleError = (snackBarMessage) => {
    this.setState({ snackBarOpen: true, snackBarMessage });
  };

  handleSnackBarClose = () => {
    this.setState({ snackBarOpen: false });
  };

  save = () => {
    const { save } = this.props;
    const profile = Object.assign({}, this.state);

    delete profile.id;
    delete profile.user;

    save(profile);
  };

  render() {
    const { cancel, profile } = this.props;
    const { snackBarOpen, snackBarMessage } = this.state;
    const { description, email, location, mobile, name, phone, picture, title } = profile;

    return (
      <Paper style={styles.container}>
        <div className="pure-g" style={{ padding: '1em 2em 2em 2em' }}>
          <div className="pure-u-1-1 pure-u-sm-1-3">
            <Dropzone onDrop={this.handleDrop} multiple={false} accept="image/*" style={styles.dropzone}>
              <img src={picture} role="presentation" style={styles.img} />
              <div style={styles.dropzoneText}>Drop a new picture here, or click to select a file to upload.</div>
            </Dropzone>
          </div>
          <div className="pure-u-1-1 pure-u-sm-2-3">
            <TextField
              id="name"
              defaultValue={name}
              floatingLabelText="Name"
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="title"
              defaultValue={title}
              floatingLabelText="Title"
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="email"
              defaultValue={email}
              floatingLabelText="Email"
              onChange={this.handleChange}
              disabled
              fullWidth
            />
            <TextField
              id="phone"
              defaultValue={phone}
              floatingLabelText="Phone"
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="mobile"
              defaultValue={mobile}
              floatingLabelText="Mobile"
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="location"
              defaultValue={location}
              floatingLabelText="Location"
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="description"
              defaultValue={description}
              floatingLabelText="Description"
              rows={2}
              onChange={this.handleChange}
              multiLine
              fullWidth
            />
          </div>
        </div>
        <Divider />
        <div className="text-right">
          <FlatButton label="Cancel" onClick={cancel} labelStyle={styles.button} style={styles.button} />
          <FlatButton label="Save" onClick={this.save} labelStyle={styles.button} style={styles.button} primary />
        </div>
        <Snackbar
          open={snackBarOpen}
          message={snackBarMessage}
          autoHideDuration={3000}
          onRequestClose={this.handleSnackBarClose}
        />
      </Paper>
    );
  }
}

EditProfile.propTypes = {
  cancel: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  save: PropTypes.func.isRequired
};

export default EditProfile;
