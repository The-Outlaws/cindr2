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
        {author ? (
          <h4 className="media-heading">{author.firstName}</h4>
        ) : (
          <h4 className="media-heading">{props.user.firstName}</h4>
        )}
        <span>{message.content}</span>
        <span>{moment(message.createdAt).calendar()}</span>
      </div>
    </li>
  );
}

export default Message;
