import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Route, Switch } from 'react-router-dom';
import ArticleContainer from '../ArticleContainer/ArticleContainer';
import { Loader } from '../../components/Loader/Loader';
import { Popup } from '../Popup/Popup';
import { Home } from '../../components/Home/Home';
import { Nav } from '../../components/Nav/Nav';
import { Error404 } from '../../components/Error404/Error404';
import { fetchCryptoCoins } from '../../thunks/fetchCryptoCoins';
import { fetchNatGeo } from '../../thunks/fetchNatGeo';
import { fetchNewScientist } from '../../thunks/fetchNewScientist';

export class App extends Component {
  componentDidMount = () => {
    this.props.fetchNatGeo();
    this.props.fetchCryptoCoins();
    this.props.fetchNewScientist();
  }

  getArticleRoute = ({ match }) => {
    const { natGeoArticles, cryptoCoinsArticles, newScientistArticles } = this.props;
    const { id } = match.params;
    let currentArticle;
    if (match.path.includes('national')) {
      currentArticle = natGeoArticles.find(article => article.id === id);
    } else if (match.path.includes('crypto')) {
      currentArticle = cryptoCoinsArticles.find(article => article.id === id);
    } else if (match.path.includes('scientist')) {
      currentArticle = newScientistArticles.find(article => article.id === id);
    }
    return currentArticle ? ([
      <ArticleContainer match={match} isDisabled={true} />,
      <Popup currentArticle={currentArticle} match={match} />]) :
      <Error404 />;
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div className="App">
        <h1>news<span>album</span></h1>
        <div className='App--quote-and-favorites'>
          <div>
            <h2 className='App--learn'>LEARN +</h2>
            <h2 className='App--get-inspired'>GET INSPIRED.</h2>
          </div>
          <h3>my<span>favorites</span></h3>
        </div>
        <Nav />
        {isLoading && <Loader />}
        <Switch>
          <Route
            path='/crypto-coins/:id'
            render={this.getArticleRoute} />
          <Route
            path='/national-geographic/:id'
            render={this.getArticleRoute} />
          <Route
            path='/new-scientist/:id'
            render={this.getArticleRoute} />
          <Route
            path='/national-geographic'
            render={({ match }) => <ArticleContainer match={match} />} />
          <Route
            path='/new-scientist'
            render={({ match }) => <ArticleContainer match={match} />} />
          <Route
            path='/crypto-coins'
            render={({ match }) => <ArticleContainer match={match} />} />
          <Route
            exact
            path='/'
            component={Home} />
          <Route component={Error404} />
        </Switch>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  natGeoArticles: state.natGeoArticles,
  newScientistArticles: state.newScientistArticles,
  cryptoCoinsArticles: state.cryptoCoinsArticles,
  isLoading: state.isLoading
})

export const mapDispatchToProps = (dispatch) => ({
  fetchNatGeo: () => dispatch(fetchNatGeo()),
  fetchNewScientist: () => dispatch(fetchNewScientist()),
  fetchCryptoCoins: () => dispatch(fetchCryptoCoins())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

App.propTypes = {
  fetchNatGeo: PropTypes.func,
  fetchNewScientist: PropTypes.func,
  fetchCryptoCoins: PropTypes.func,
  natGeoArticles: PropTypes.array,
  newScientistArticles: PropTypes.array,
  cryptoCoinsArticles: PropTypes.array,
  isLoading: PropTypes.bool
}