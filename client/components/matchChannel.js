import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const disconnectedMatchChannel = props => {
  const matchId = props.matchUser.id;
  const name = props.matchUser.firstName;
  return (
    <li>
      <NavLink to={`/matches/${matchId}`} activeClassName="active">
        <span>{name}</span>
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
