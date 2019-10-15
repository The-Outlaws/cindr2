import React from 'react';
import { Link } from 'react-router-dom';

export class Matches extends React.Component {
  render() {
    return (
      <div>
        This is where your matches live!
        <Link to="/chat">Chat</Link>
      </div>
    );
  }
}
