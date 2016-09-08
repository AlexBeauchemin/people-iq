import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const styles = {
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
    this.state = Object.assign({}, props.profile);
  }

  handleChange = (e) => {
    const prop = {};
    prop[e.target.id] = e.target.value;
    this.setState(prop);
  };

  handleDrop = (files) => {
    console.log('Received files: ', files);
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
    const { description, email, location, mobile, name, phone, picture, title } = profile;

    return (
      <div style={styles.container}>
        <div className="pure-g">
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
        <div className="text-right" style={{ marginTop: '20px' }}>
          <FlatButton label="Cancel" onClick={cancel} />
          <FlatButton label="Save" onClick={this.save} primary />
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  cancel: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  save: PropTypes.func.isRequired
};

export default EditProfile;
