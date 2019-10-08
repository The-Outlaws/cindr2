import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

const LoginForm = props => {
  const {name, handleSubmit} = props

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit} name={name}>
        <div className="container">
          <div className="img">
            <img src="/troll256.png" alt="cute troll 128" />
          </div>

          <div className="heading">
            <h4>Login</h4>
          </div>

          <div className="form-fields">
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

            <div className="button-container">
              <button type="login">Login</button>
            </div>
            <div className="button-container">
              <button type="google">Login with Google</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

const mapLogin = state => {
  return {name: 'login', displayName: 'Login', error: state.user.error}
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(formName, email, password))
    }
  }
}

export const LoginTest = connect(mapLogin, mapDispatch)(LoginForm)

//PROP TYPES
LoginForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
