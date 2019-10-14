import React from 'react';
import { connect } from 'react-redux';

export function Message(props) {
  const message = props.message;
  const author = props.message.user;

  return (
    <li className="media">
      <div className="media-left">
        <a href="#">
          <img className="media-object" src={author.avatar} alt="image" />
        </a>
      </div>
      <div className="media-body">
        <h4 className="media-heading">{author.firstName}</h4>
        {message.content}
      </div>
    </li>
  );
}
const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Message);
