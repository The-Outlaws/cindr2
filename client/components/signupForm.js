import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth, editProfile } from '../store';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import AvatarForm from './avatarForm';

const CLOUDINARY_UPLOAD_PRESET = 'drxd8wpf';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/dxllpi9sq/image/upload`;

class disconnectedSignupForm extends React.Component {
  constructor() {
    super();
    const initialState = {
      isEdit: false,
      selectAvatar: false,
      uploadedFile: null,
      uploadedFileCloudinaryUrl: null,
      image: null,
      firstName: '',
      email: '',
      password: '',
      orientation: '',
      gender: '',
      errors: {
        firstName: 'Required',
        email: 'Required',
        password: 'Passwords must be at least 6 characteres long',
        orientation: '',
        gender: ''
      }
    };
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
    this.chooseAvatar = this.chooseAvatar.bind(this);
  }

  componentDidMount() {
    console.log('componentdidmount', this.props);
    if (this.props.location.state) {
      const {
        email,
        password,
        firstName,
        age,
        height,
        orientation,
        gender,
        avatar,
        photo
      } = this.props.location.state;

      const editState = {
        isEdit: false,
        selectAvatar: false,
        uploadedFile: null,
        uploadedFileCloudinaryUrl: photo,
        image: null,
        firstName: firstName,
        email: email,
        password: password,
        orientation: orientation,
        gender: gender,
        errors: {
          firstName: 'Required',
          email: 'Required',
          password: 'Passwords must be at least 6 characteres long',
          orientation: '',
          gender: ''
        }
      };
      this.setState(editState);
    }
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
  handleChange(event) {
    let errors = this.state.errors;
    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    switch (event.target.name) {
      case 'firstName':
        errors.firstName =
          event.target.value.length < 1 ? 'Your first name is required' : '';
        break;
      case 'email':
        errors.email = validEmailRegex.test(event.target.value)
          ? ''
          : 'Email is not valid';
        break;
      case 'password':
        errors.password =
          event.target.value.length < 6
            ? 'Password must be 6 characters long'
            : '';
        break;
      case 'orientation':
        errors.orientation =
          event.target.value.length < 1
            ? `While not required, it could be helpful for others to know how you identify`
            : '';
        break;
      case 'gender':
        errors.gender =
          event.target.value.length < 1
            ? `How you identify your gender is required`
            : '';
        break;
      default:
        break;
    }
    this.setState({ errors, [event.target.name]: event.target.value });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    if (this.props.location.state) {
      this.props.edit(
        this.state.email,
        this.state.password,
        this.state.firstName,
        evt.target.age.value,
        `${evt.target.feet.value} ${evt.target.inches.value}`,
        this.state.orientation,
        this.state.gender,
        this.state.uploadedFileCloudinaryUrl,
        this.state.avatar
      );
      this.setState(this.initialState);
    } else {
      this.props.authorize(
        this.props.name,
        this.state.email,
        this.state.password,
        this.state.firstName,
        evt.target.age.value,
        `${evt.target.feet.value} ${evt.target.inches.value}`,
        this.state.orientation,
        this.state.gender,
        this.state.uploadedFileCloudinaryUrl,
        this.state.avatar
      );
      this.setState(this.initialState);
    }
  }
  // eslint-disable-next-line complexity
  render() {
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
    const { errors } = this.state;
    return (
      <div className="login-form">
        <form onSubmit={this.handleSubmit}>
          <div className="container">
            <div className="img">
              <img src="/troll256.png" alt="cute troll 128" />
            </div>

            <div className="heading">
              {this.props.location.state ? (
                <h4>Edit Profile</h4>
              ) : (
                <h4>Sign up</h4>
              )}
            </div>

            <div className="form-fields">
              <div className="input-box">
                <p className="field-titles">First Name</p>
                <input
                  type="text"
                  value={this.state.firstName}
                  className="form-control"
                  name="firstName"
                  onChange={this.handleChange}
                />
                {errors.firstName.length > 0 && (
                  <span className="error">{errors.firstName}</span>
                )}
              </div>
              <div className="input-box">
                <p className="field-titles">Email</p>
                <input
                  type="text"
                  value={this.state.email}
                  className="form-control"
                  name="email"
                  onChange={this.handleChange}
                />
                {errors.email.length > 0 && (
                  <span className="error">{errors.email}</span>
                )}
              </div>
              <div className="input-box">
                {this.props.location.state ? (
                  <p className="field-titles">Re-enter your password: </p>
                ) : (
                  <p className="field-titles">Password</p>
                )}
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={this.handleChange}
                />
                {errors.password.length > 0 && (
                  <span className="error">{errors.password}</span>
                )}
              </div>
              <div className="input-box">
                {this.props.location.state ? (
                  <p className="field-titles">
                    Are you younger than {this.props.location.state.age} now?
                  </p>
                ) : (
                  <p className="field-titles">Select your age</p>
                )}
                <select className="select-box-age" name="age">
                  {ageSelection}
                </select>
              </div>
              <div className="input-box">
                {this.props.location.state ? (
                  <p className="field-titles">
                    Are you taller than {this.props.location.state.height} now?
                  </p>
                ) : (
                  <p className="field-titles">
                    Select your height in feet and inches
                  </p>
                )}

                <select className="select-box" name="feet">
                  {heightFeetSelection}
                </select>
                <select className="select-box" name="inches">
                  {heightInchesSelection}
                </select>
              </div>
              <div className="inclusivity-note">
                ** Here at Cinder, inclusivity is important to us.** Orientation
                and gender are open fields for you to enter what you feel best
                represents you.
              </div>
              <div className="input-box">
                <p className="field-titles">Orientation</p>
                <input
                  type="text"
                  value={this.state.orientation}
                  onChange={this.handleChange}
                  className="form-control"
                  name="orientation"
                />
                {errors.orientation.length > 0 && (
                  <span className="error">{errors.orientation}</span>
                )}
              </div>
              <div className="input-box">
                <p className="field-titles">Gender</p>
                <input
                  type="text"
                  value={this.state.gender}
                  onChange={this.handleChange}
                  className="form-control"
                  name="gender"
                />
                {errors.gender.length > 0 && (
                  <span className="error">{errors.gender}</span>
                )}
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
                        <div className="list-group mt-2">
                          {acceptedFiles.length > 0 &&
                            acceptedFiles.map(acceptedFile => (
                              <p className="list-group-item list-group-item-success">
                                {acceptedFile.name}
                              </p>
                            ))}
                        </div>
                      </div>
                    );
                  }}
                </Dropzone>
              </div>
              <div>
                {this.state.uploadedFileCloudinaryUrl === null ? null : (
                  <div className="photo">
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
            </div>
            <div className="image_picker">
              {this.state.selectAvatar ? (
                <AvatarForm handleAvatar={this.handleAvatar.bind(this)} />
              ) : null}
            </div>
            <div className="form-fields">
              <div className="errorLarge">
                {!this.props.error
                  ? null
                  : this.props.error.message ===
                    'Request failed with status code 401'
                    ? 'Hmm - it looks like this user already exists!'
                    : 'Hmm - your profile was not created. Try checking the information you entered to make sure it is correct.'}
              </div>
              <div className="submitButton-container">
                <button type="submit">Submit</button>
              </div>

              <div className="submitButton-container">
                <Link to="/">
                  <button type="submit">Home</button>
                </Link>
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

const mapDispatch = dispatch => ({
  authorize: (...args) => dispatch(auth(...args)),
  edit: (...args) => dispatch(editProfile(...args))
});

const SignupForm = connect(mapSignup, mapDispatch)(disconnectedSignupForm);
export default SignupForm;
//PROP TYPES
SignupForm.propTypes = {
  // name: PropTypes.string.isRequired,
  error: PropTypes.object
};
