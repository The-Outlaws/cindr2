import React from 'react';
import moment from 'moment';

function Message(props) {
  const message = props.message;
  const author = props.message.user;
  return (
    <li className="media">
      <div className="media-body">
        <a href="#">
          {author ? (
            <img className="media-object" src={author.avatar} alt="image" />
          ) : (
            <img className="media-object" src={props.user.avatar} alt="image" />
          )}
        </a>
        {author ? <h4>{author.firstName}</h4> : <h4>{props.user.firstName}</h4>}
        <span className="content">{message.content}</span>
        <p className="date">{moment(message.createdAt).calendar()}</p>
      </div>
    </li>
  );
}

export default Message;
