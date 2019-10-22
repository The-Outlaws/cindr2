import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const disconnectedMatchChannel = props => {
  const matchId = props.matchId;

  return (
    <li>
      <NavLink to={`/matches/${matchId}`} activeClassName="active">
        {props.matchUser ? (
          props.matchUser.isLoggedIn ? (
            <span className="badge">
              <img src={props.matchUser.avatar} />
            </span>
          ) : null
        ) : null}

        {props.matchUser ? (
          <span>{props.matchUser.firstName} </span>
        ) : (
          <span>Loading Match</span>
        )}
        <span className="badge">
          {props.newMessages
            ? [...new Set(props.newMessages)].filter(
                message => message.conversationId === props.convoId
              ).length > 0
              ? [...new Set(props.newMessages)].filter(
                  message => message.conversationId === props.convoId
                ).length
              : null
            : null}
        </span>
      </NavLink>
    </li>
  );
};
const mapState = state => ({
  newMessages: state.messages
});

const MatchChannel = withRouter(connect(mapState)(disconnectedMatchChannel));
export default MatchChannel;
