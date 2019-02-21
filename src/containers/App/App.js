import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Route, Switch } from 'react-router-dom';
import ArticleContainer from '../ArticleContainer/ArticleContainer';
import Loader from '../../components/Loader/Loader';
import Popup from '../Popup/Popup';
import { Error404 } from '../../components/Error404/Error404';
import { fetchArticles } from '../../thunks/fetchArticles';

export class App extends Component {
  componentDidMount = () => {
    this.props.fetchArticles();
  }

  getArticleRoute = ({ match }) => {
    const { articles } = this.props;
    const { id } = match.params;
    const currentArticle = articles.find(article => article.id === id);
    return currentArticle ? (
      [
        <ArticleContainer />,
        <Popup {...currentArticle} match={match} />
      ]
    ) : <Error404 />;
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div className="App">
        <h1>news<span>album</span></h1>
        <div className='App--quote-and-favorites'>
          <div>
            <h2>LEARN +</h2>
            <h2>GET INSPIRED.</h2>
          </div>
          <h3>my<span>favorites</span></h3>
        </div>
        {isLoading && <Loader />}
        <Switch>
          <Route path='/national-geographic/:id' render={this.getArticleRoute} />
          <Route path='/national-geographic' component={ArticleContainer} />
          <Route path='/' component={ArticleContainer} />
        </Switch>
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