import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from './sidebar';
import Chat from './newMessageEntry';
import MessagesList from './messagesList';

export class Matches extends Component {
  render() {
    // console.log('in Matches', this.props.conversations)
    return (
      <div>
        <Sidebar />
        <main>
          {/* <MessagesList conversations={this.props.conversations}/> */}
          <Switch>
            <Route path="/matches/:matchId" component={MessagesList} />
            <Redirect to="/matches/2" />
          </Switch>
        </main>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  conversations: state.conversations
});

export default connect(mapStateToProps)(Matches);
