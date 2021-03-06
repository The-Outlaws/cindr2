import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from './sidebar';
import MessagesList from './messagesList';
import { getConversations } from '../store';

class disconnectedMatches extends Component {
  componentDidMount() {
    this.props.fetchConvos();
  }
  render() {
    return (
      <div className="chat">
        <Sidebar />

        <Switch>
          <Route path="/matches/:matchId" component={MessagesList} />
          <React.Fragment>
            <h2> Talk to your new friends here!</h2>
            <img id="main" src="/troll512.png" />
          </React.Fragment>
          {/* <Redirect to="/matches/chat" /> */}
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  conversations: state.conversations
});
const mapDispatchToProps = dispatch => ({
  fetchConvos: () => dispatch(getConversations())
});
const Matches = connect(mapStateToProps, mapDispatchToProps)(
  disconnectedMatches
);
export default Matches;
