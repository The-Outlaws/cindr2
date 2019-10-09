import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import AvatarForm from './avatarForm'

const CLOUDINARY_UPLOAD_PRESET = 'drxd8wpf'
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/dxllpi9sq/image/upload`

class SignupForm extends React.Component {
  constructor() {
    super()
    this.state = {
      isEdit: false,
      selectAvatar: false,
      uploadedFile: null,
      uploadedFileCloudinaryUrl: '',
      image: null
    }
    this.onImageDrop = this.onImageDrop.bind(this)
    this.chooseAvatar = this.chooseAvatar.bind(this)
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    })
    this.handleImageUpload(files[0])
  }
  handleImageUpload(file) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file)
    upload.end((err, res) => {
      if (err) console.error(err)
      if (res.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: res.body.secure_url
        })
      }
    })
  }
  chooseAvatar() {
    this.setState({
      selectAvatar: !this.state.selectAvatar
    })
  }
  handleAvatar(image) {
    this.setState({
      avatar: image.src
    })
  }
  render() {
    const {name, handleSubmit} = this.props
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
                <input
                  type="text"
                  placeholder="First Name"
                  className="form-control"
                  name="firstName"
                />
              </div>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Email"
                  className="form-control"
                  name="email"
                />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  name="password"
                />
              </div>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Age"
                  className="form-control"
                  name="age"
                />
              </div>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Height"
                  className="form-control"
                  name="height"
                />
              </div>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Orientation"
                  className="form-control"
                  name="orientation"
                />
              </div>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Gender"
                  className="form-control"
                  name="gender"
                />
              </div>
              <div className="button-container">
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
                      <div className="heading" {...getRootProps()}>
                        <input {...getInputProps()} />
                        {!isDragActive && (
                          <h4>
                            Click here or drop a file to upload your photo!
                          </h4>
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
                    )
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
              <div>
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
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapSignup = state => {
  return {name: 'signup', displayName: 'Sign Up', error: state.user.error}
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstName.value
      const age = evt.target.age.value
      const height = evt.target.height.value
      const orientation = evt.target.orientation.value
      const gender = evt.target.gender.value
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
      )
    }
  }
}

export const Signup = connect(mapSignup, mapDispatch)(SignupForm)

//PROP TYPES
SignupForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
