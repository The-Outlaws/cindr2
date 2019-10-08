import React from 'react'

export class HomePage extends React.Component {
  constructor() {
    super()
    this.loginClick = this.loginClick.bind(this)
    this.signupClick = this.signupClick.bind(this)
  }

  loginClick() {
    window.location.pathname = '/login'
  }

  signupClick() {
    window.location.pathname = '/signup'
  }

  render() {
    return (
      <div className="home-container">
        {/* <img src={troll} alt="cute troll" /> */}
        <div className="heading">
          <h4>Cindr</h4>
        </div>

        <div className="button-container">
          <button type="login" onClick={this.loginClick}>
            Login
          </button>
        </div>

        <div className="button-container">
          <button type="signup" onClick={this.signupClick}>
            Sign Up
          </button>
        </div>
      </div>
    )
  }
}
