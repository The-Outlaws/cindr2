import React from 'react';
import { Navbar } from './components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Routes from './routes';

const App = ({ isLoggedIn }) => {
  return (
    <div>
      {isLoggedIn ? <Navbar /> : null}

      <Routes />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  console.log(state.userReducer);
  return {
    isLoggedIn: !!state.user.id
  };
};

export default connect(mapState)(App);

/**
 * PROP TYPES
 */
App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};
