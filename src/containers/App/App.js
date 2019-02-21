import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Route, Switch } from 'react-router-dom';
import ArticleContainer from '../ArticleContainer/ArticleContainer';
import { fetchArticles } from '../../thunks/fetchArticles';

export class App extends Component {
  componentDidMount = () => {
    this.props.fetchArticles();
  }

  render() {
    return (
      <div className="App">
        <h1>newsalbum</h1>
        {!this.props.isLoading && <ArticleContainer />}
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  articles: state.articles,
  isLoading: state.isLoading
})

export const mapDispatchToProps = (dispatch) => ({
  fetchArticles: () => dispatch(fetchArticles())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

App.propTypes = {
  fetchArticles: PropTypes.func
}