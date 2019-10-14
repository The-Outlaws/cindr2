import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

export const MatchChannel = props => {
  const matchId = props.matchUser.id;
  const name = props.matchUser.firstName;
  return (
    <li>
      <NavLink to={`/matches/${matchId}`} activeClassName="active">
        <span>{name}</span>
        <span className="badge">{props.messages}</span>
      </NavLink>
    </li>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  conversations: state.conversations
});

export default withRouter(connect(mapStateToProps)(MatchChannel));
