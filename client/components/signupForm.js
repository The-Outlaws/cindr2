import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

class SignupForm extends React.Component {
  constructor() {
    super()
    this.state = {
      isEdit: false
    }
  }

  render() {
    const {name, handleSubmit} = this.props
    return (
      <div className="login-form">
        <form onSubmit={handleSubmit} name={name}>
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
                  placeholder="Gender"
                  className="form-control"
                  name="gender"
                />
              </div>
              <div className="button-container">
                <button type="photo">
                  {this.state.isEdit
                    ? 'Edit Profile Photo'
                    : 'Upload Profile Photo'}
                </button>
              </div>
              <div className="button-container">
                <button type="avatar">
                  {this.state.isEdit
                    ? 'Edit your Avatar'
                    : 'Select your Avatar'}
                </button>
              </div>

              <div className="submitButton-container">
                <button type="submit">Submit</button>
              </div>
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
      const gender = evt.target.gender.value
      dispatch(auth(formName, email, password, firstName, age, height, gender))
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
