import React from 'react';
import { connect } from 'react-redux';

export function Message(props) {
  const message = props.message;
  const author = props.message.user;

  return (
    <li className="media">
      <div className="media-body">
        <a href="#">
          <img className="media-object" src={author.avatar} alt="image" />
        </a>
        <h4 className="media-heading">{author.firstName}</h4>
        <span>{message.content}</span>
      </div>
    </li>
  );
}
const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Message);
