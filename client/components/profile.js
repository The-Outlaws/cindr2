import React from 'react'

// import pirate from '../../public/pirate.png';

class Profile extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      photo: '',
      age: '',
      height: '',
      avatar: '',
      isEdit: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.toggleEdit = this.toggleEdit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const profileInfo = {
      // profileInfo to be passed into a thunk to update the store and database
      name: this.state.name,
      photo: this.state.photo,
      age: this.state.age,
      height: this.state.height,
      avatar: this.state.avatar
    }

    if (this.state.isEdit === false) {
      this.setState(prevState => ({
        isEdit: !prevState.isEdit
      }))
    }
    window.location.pathname = '/game'
  }

  // toggleEdit() {
  //   window.location.pathname = '/game';
  //   return this.state.isEdit === false
  //     ? this.setState(prevState => ({
  //         isEdit: !prevState.isEdit,
  //       }))
  //     : '';
  // }

  render() {
    //if this.state.isEdit is true (the user has signed up/logged in), render state
    return this.state.isEdit ? (
      <div className="login-form">
        <div className="container">
          <div className="img">
            {/* <img src={require('../../public/troll128.png') } alt="cute troll 128" /> */}
          </div>

          <div className="heading">
            <h4>Profile</h4>
          </div>
          <div className="form-fields">
            <div>
              <p className="form-inputs">{this.state.name}</p>
            </div>
            <div>
              <p className="form-inputs">{this.state.age}</p>
            </div>
            <div>
              <p className="form-inputs">{this.state.height}</p>
            </div>
            <div>
              <img src={this.state.photo} />
            </div>
            <div>
              <img src={this.state.avatar} />
            </div>
          </div>
          <div className="form-fields">
            <div className="submitButton-container">
              <button type="edit">Edit</button>
              {/* <button type="edit" onClick={this.toggleEdit}>
                Edit
              </button> */}
            </div>
          </div>
        </div>
      </div>
    ) : (
      ////if this.state.isEdit is false (the user not signed up or clicks on 'Edit button'), render form with state
      <div className="login-form">
        <form onSubmit={this.handleSubmit}>
          <div className="container">
            <div className="img">
              {/* <img src={troll} alt="cute troll 128" /> */}
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
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Age"
                  className="form-control"
                  name="age"
                  value={this.state.age}
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Height"
                  className="form-control"
                  name="height"
                  value={this.state.height}
                  onChange={this.handleChange}
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
                {/* <button type="edit">Submit</button> */}
                <button type="edit" onClick={this.toggleEdit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Profile
