import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
class Profile extends React.Component {
  // toggleEdit() {
  //   window.location.pathname = '/signup';
  // }

  render() {
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
    } = this.props;

    return (
      <div className="login-form">
        <div className="container">
          <div className="heading">
            <h4>{firstName}'s Profile</h4>
          </div>
          <div className="img">
            <img src={avatar} alt="cute troll" />

            <img src={photo} alt="no photo added" />
          </div>

          <div className="form-fields">
            <div className="input-box">
              <p className="profile-titles">
                Name: <span>{firstName}</span>
              </p>
            </div>
            <div className="input-box">
              <p className="profile-titles">
                Email: <span>{email}</span>
              </p>
            </div>

            <div className="input-box">
              <p className="profile-titles">
                Age: <span>{age}</span>
              </p>
            </div>
            <div className="input-box">
              <p className="profile-titles">
                Height: <span>{height}</span>
              </p>
            </div>
            <div className="input-box">
              <p className="profile-titles">
                Orientation: <span>{orientation}</span>
              </p>
            </div>
            <div className="input-box">
              <p className="profile-titles">
                Gender: <span>{gender}</span>
              </p>
            </div>
          </div>
          <div className="form-fields">
            <div className="submitButton-container">
              {/* <button type="edit">Edit</button> */}
              <Link
                to={{
                  pathname: '/signup',
                  state: {
                    email,
                    password,
                    firstName,
                    age,
                    height,
                    orientation,
                    gender,
                    avatar,
                    photo
                  }
                }}
              >
                <button type="button">Edit</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    firstName: state.user.firstName,
    password: state.user.password,
    age: state.user.age,
    height: state.user.height,
    orientation: state.user.orientation,
    gender: state.user.gender,
    avatar: state.user.avatar,
    photo: state.user.photo
  };
};

export const ProfileInfo = connect(mapState)(Profile);

// export default connect(mapState)(Profile)

/**
 * PROP TYPES
 */
Profile.propTypes = {
  email: PropTypes.string,
  firstName: PropTypes.string,
  password: PropTypes.string,
  age: PropTypes.number,
  height: PropTypes.string,
  orientation: PropTypes.string,
  gender: PropTypes.string
};

//OLD CODE - PLEASE KEEP FOR NOW

// class Profile extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       isEdit: true
//     }
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//     // this.toggleEdit = this.toggleEdit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value
//     })
//   }

//   handleSubmit(event) {
//     event.preventDefault()
//     const profileInfo = {
//       // profileInfo to be passed into a thunk to update the store and database
//       name: this.state.name,
//       photo: this.state.photo,
//       age: this.state.age,
//       height: this.state.height,
//       avatar: this.state.avatar
//     }

//     if (this.state.isEdit === false) {
//       this.setState(prevState => ({
//         isEdit: !prevState.isEdit
//       }))
//     }
//     window.location.pathname = '/game'
//   }

//   // toggleEdit() {
//   //   window.location.pathname = '/game';
//   //   return this.state.isEdit === false
//   //     ? this.setState(prevState => ({
//   //         isEdit: !prevState.isEdit,
//   //       }))
//   //     : '';
//   // }

//   render() {
//     console.log('PROPS ', this.props.state)
//     //if this.state.isEdit is true (the user has signed up/logged in), render state
//     return this.state.isEdit ? (
//       <div className="login-form">
//         <div className="container">
//           <div className="img">
//             {/* <img src={require('../../public/troll128.png') } alt="cute troll 128" /> */}
//           </div>

//           <div className="heading">
//             <h4>Profile</h4>
//           </div>
//           <div className="form-fields">
//             <div>
//               <p className="form-inputs">{this.props.name}</p>
//             </div>
//             <div>
//               <p className="form-inputs">{this.props.age}</p>
//             </div>
//             <div>
//               <p className="form-inputs">{this.props.height}</p>
//             </div>
//             <div>
//               <img src={this.props.photo} />
//             </div>
//             <div>
//               <img src={this.props.avatar} />
//             </div>
//           </div>
//           <div className="form-fields">
//             <div className="submitButton-container">
//               <button type="edit">Edit</button>
//               {/* <button type="edit" onClick={this.toggleEdit}>
//                 Edit
//               </button> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     ) : (
//       ////if this.state.isEdit is false (the user not signed up or clicks on 'Edit button'), render form with state
//       <SignupForm />
//     )
//   }
// }

// const mapStateToProps = state => ({
//   user: {...state.user}
// })

// export const ProfileInfo = connect(mapStateToProps)(Profile)
