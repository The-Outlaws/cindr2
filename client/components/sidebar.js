import React, { Component } from 'react';
import MatchesList from './matchesList';

export default class Sidebar extends Component {
  render() {
    return (
      <section className="sidebar">
        <div className="sidebar-header">
          <h3 href="#">
            <div>Talk to trolls here:</div>
            <i alt="Brand" className="glyphicon glyphicon-comment" />
          </h3>
        </div>
        <MatchesList />
      </section>
    );
  }
}
