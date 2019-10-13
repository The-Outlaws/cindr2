import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from './sidebar';
import Chat from './newMessageEntry';
import MessagesList from './messagesList';
import { fetchMessages } from '../store/reducers/messages';

export class Matches extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount () {
  // this.props.loadMessages()
  // }

  render() {
    return (
      <div>
        <Sidebar />
        <main>
          <MessagesList />
          {/* <Switch>
            <Route path="/matches/:userId" component={MessagesList} />
            {/* <Redirect to="/matches/19" /> */}
          {/* </Switch> */}
        </main>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  messages: state.messages
});
// const mapDispatchToProps = dispatch => ({
//   loadMessages: () => dispatch(fetchMessages())
// })

export default connect(mapStateToProps)(Matches);
