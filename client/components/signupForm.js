import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import AvatarForm from './avatarForm';

const CLOUDINARY_UPLOAD_PRESET = 'drxd8wpf';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/dxllpi9sq/image/upload`;

class SignupForm extends React.Component {
  constructor() {
    super();
    this.state = {
      isEdit: false,
      selectAvatar: false,
      uploadedFile: null,
      uploadedFileCloudinaryUrl: '',
      image: null
    };
    this.age = Array.from(new Array());
    this.onImageDrop = this.onImageDrop.bind(this);
    this.chooseAvatar = this.chooseAvatar.bind(this);
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  }
  handleImageUpload(file) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);
    upload.end((err, res) => {
      if (err) console.error(err);
      if (res.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: res.body.secure_url
        });
      }
    });
  }
  chooseAvatar() {
    this.setState({
      selectAvatar: !this.state.selectAvatar
    });
  }
  handleAvatar(image) {
    this.setState({
      avatar: image.src
    });
  }

  getAges() {}
  // eslint-disable-next-line complexity
  render() {
    const { name, handleSubmit } = this.props;

    //age dropdown
    const ages = [];
    for (let i = 18; i <= 100; i++) {
      ages.push(i);
    }
    const ageSelection = ages.map(age => {
      return <option key={age}>{age}</option>;
    });

    //feet dropdown
    const feet = [];
    const inches = [];
    for (let i = 3; i <= 9; i++) {
      feet.push(`${i}'`);
    }
    for (let i = 0; i <= 12; i++) {
      inches.push(`${i}"`);
    }

    const heightFeetSelection = feet.map(foot => {
      return <option key={foot}>{foot}</option>;
    });
    const heightInchesSelection = inches.map(inch => {
      return <option key={inch}>{inch}</option>;
    });

    return (
      <div className="login-form">
        <form onSubmit={handleSubmit.bind(this)} name={name}>
          <div className="container">
            <div className="img">
              <img src="/troll256.png" alt="cute troll 128" />
            </div>

            <div className="heading">
              <h4>Profile</h4>
            </div>

            <div className="form-fields">
              <div className="input-box">
                <p className="field-titles">First Name</p>
                <input
                  type="text"
                  // placeholder="Nye"
                  className="form-control"
                  name="firstName"
                />
              </div>
              <div className="input-box">
                <p className="field-titles">Email</p>
                <input
                  type="text"
                  // placeholder="Nye@email.com"
                  className="form-control"
                  name="email"
                />
              </div>
              <div className="input-box">
                <p className="field-titles">Password</p>
                <input
                  type="password"
                  // placeholder="NxeFr2"
                  className="form-control"
                  name="password"
                />
              </div>
              <div className="input-box">
                <p className="field-titles">Select your age</p>
                <select className="select-box-age" name="age">
                  {ageSelection}
                </select>
              </div>
              <div className="input-box">
                <p className="field-titles">
                  Select your height in feet and inches
                </p>
                <select className="select-box" name="feet">
                  {heightFeetSelection}
                </select>
                <select className="select-box" name="inches">
                  {heightInchesSelection}
                </select>
              </div>
              <div className="input-box">
                <p className="field-titles">Orientation **</p>
                <input
                  type="text"
                  // placeholder="Orientation *"
                  className="form-control"
                  name="orientation"
                />
              </div>
              <div className="input-box">
                <p className="field-titles">Gender **</p>
                <input
                  type="text"
                  // placeholder="Gender *"
                  className="form-control"
                  name="gender"
                />
              </div>
              <div className="fileAdd">
                <Dropzone
                  onDrop={this.onImageDrop}
                  accept="image/png, image/jpeg"
                  multiple={false}
                  minSize={0}
                  maxSize={5242880}
                >
                  {({
                    getRootProps,
                    getInputProps,
                    isDragActive,
                    isDragReject,
                    acceptedFiles
                  }) => {
                    return (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {!isDragActive && (
                          <p>Click here or drop a file to upload your photo!</p>
                        )}
                        {isDragActive &&
                          !isDragReject &&
                          "Drop it like it's hot!"}
                        {isDragReject && 'File type not accepted, sorry!'}
                        <ul className="list-group mt-2">
                          {acceptedFiles.length > 0 &&
                            acceptedFiles.map(acceptedFile => (
                              <li className="list-group-item list-group-item-success">
                                {acceptedFile.name}
                              </li>
                            ))}
                        </ul>
                      </div>
                    );
                  }}
                </Dropzone>
              </div>
              <div>
                {this.state.uploadedFileCloudinaryUrl === '' ? null : (
                  <div>
                    <img src={this.state.uploadedFileCloudinaryUrl} />
                  </div>
                )}
              </div>
              <div className="button-container">
                <button type="button" onClick={() => this.chooseAvatar()}>
                  {this.state.isEdit
                    ? 'Edit your Avatar'
                    : 'Select your Avatar'}
                </button>
              </div>
              <div className="imgage_picker">
                {this.state.selectAvatar ? (
                  <AvatarForm handleAvatar={this.handleAvatar.bind(this)} />
                ) : null}
              </div>

              <div className="submitButton-container">
                <button type="submit">Submit</button>
              </div>

              <Link to="/">
                <div className="submitButton-container">
                  <button type="submit">Home</button>
                </div>
              </Link>
              <div className="error">
                {!this.props.error
                  ? null
                  : this.props.error.message ===
                    'Request failed with status code 401'
                    ? 'Hmm - it looks like this user already exists!'
                    : 'Hmm - your profile was not created. Try checking the information you entered to make sure it is correct.'}
              </div>
              <div className="inclusivity-note">
                ** Here at Cinder, inclusivity is important to us. Orientation
                and gender are open fields for you to enter what you feel best
                represents you.
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapSignup = state => {
  return { name: 'signup', displayName: 'Sign Up', error: state.user.error };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      const firstName = evt.target.firstName.value;
      const age = evt.target.age.value;
      const height = `${evt.target.feet.value} ${evt.target.inches.value}`;
      const orientation = evt.target.orientation.value;
      const gender = evt.target.gender.value;
      dispatch(
        auth(
          formName,
          email,
          password,
          firstName,
          age,
          height,
          orientation,
          gender,
          this.state.uploadedFileCloudinaryUrl,
          this.state.avatar
        )
      );
    }
  };
};

export const Signup = connect(mapSignup, mapDispatch)(SignupForm);

//PROP TYPES
SignupForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
