import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

export const MatchChannel = props => {
  const matchId = props.matchUser.id;
  const name = props.matchUser.firstName;
  return (
    <li>
      <NavLink to={`/matches/${matchId}`} activeClassName="active">
        <span>{name}</span>
        <span className="badge">
          {props.messages +
            props.newMessages.filter(
              message => message.conversationId === props.convoId
            ).length}
        </span>
      </NavLink>
    </li>
  );
};
const mapState = state => ({
  newMessages: state.messages
});
export default withRouter(connect(mapState)(MatchChannel));
