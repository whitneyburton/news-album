import React, { Component } from 'react';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Route, Switch } from 'react-router-dom';

export class App extends Component {
  componentDidMount = () => {

  }

  render() {
    return (
      <div className="App">
        <h1>HAAAY</h1>
      </div>
    );
  }
}



export default App;
