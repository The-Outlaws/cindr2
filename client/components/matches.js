import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from './sidebar';
import MessagesList from './messagesList';

export class Matches extends Component {
  render() {
    return (
      <div className="chat">
        <Sidebar />

        <Switch>
          <Route path="/matches/:matchId" component={MessagesList} />
          {/* <Redirect to="/matches/2" /> */}
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  conversations: state.conversations
});

export default connect(mapStateToProps)(Matches);
