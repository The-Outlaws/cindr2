import React from 'react';
import { connect } from 'react-redux';

export function Message(props) {
  const message = props.message;

  return (
    <li className="media">
      <div className="media-left">
        <a href="#">
          <img className="media-object" src={props.user.photo} alt="image" />
        </a>
      </div>
      <div className="media-body">
        <h4 className="media-heading">{props.user.firstName}</h4>
        {message.content}
      </div>
    </li>
  );
}
const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Message);
