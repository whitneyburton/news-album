import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Route, Switch } from 'react-router-dom';
import ArticleContainer from '../ArticleContainer/ArticleContainer';
import { Loader } from '../../components/Loader/Loader';
import Popup from '../Popup/Popup';
import { Home } from '../../components/Home/Home';
import { Header } from '../../components/Header/Header';
import { Nav } from '../../components/Nav/Nav';
import { Error404 } from '../../components/Error404/Error404';
import { fetchCryptoCoins } from '../../thunks/fetchCryptoCoins';
import { fetchNatGeo } from '../../thunks/fetchNatGeo';
import { fetchNewScientist } from '../../thunks/fetchNewScientist';
import { setNatGeo, setNewScientist, setCryptoCoins } from '../../actions';

export class App extends Component {
  componentDidMount = async () => {
    const { fetchNatGeo, fetchCryptoCoins, fetchNewScientist } = this.props;
    await fetchNatGeo();
    await fetchCryptoCoins();
    await fetchNewScientist();
    this.getFavoritesFromStorage();
  };

  getArticleRoute = ({ match }) => {
    const {
      natGeoArticles,
      cryptoCoinsArticles,
      newScientistArticles
    } = this.props;
    const allArticles = [
      ...natGeoArticles,
      ...cryptoCoinsArticles,
      ...newScientistArticles
    ];
    const { id } = match.params;
    let currentArticle = allArticles.find(article => article.id === id);
    return currentArticle ? (
      [
        <ArticleContainer match={match} isDisabled={true} />,
        <Popup currentArticle={currentArticle} match={match} />
      ]
    ) : (
      <Error404 />
    );
  };

  getFavoritesFromStorage = () => {
    const {
      natGeoArticles,
      newScientistArticles,
      cryptoCoinsArticles,
      setNatGeo,
      setCryptoCoins,
      setNewScientist
    } = this.props;
    const parsedStorage = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedNatGeo = natGeoArticles.map(article => {
      if (parsedStorage.includes(article.title)) article.isFavorite = true;
      return article;
    });
    setNatGeo(updatedNatGeo);
    const updatedNewScientist = newScientistArticles.map(article => {
      if (parsedStorage.includes(article.title)) article.isFavorite = true;
      return article;
    });
    setNewScientist(updatedNewScientist);
    const updatedCryptoCoins = cryptoCoinsArticles.map(article => {
      if (parsedStorage.includes(article.title)) article.isFavorite = true;
      return article;
    });
    setCryptoCoins(updatedCryptoCoins);
  };

  render() {
    const { isLoading, error } = this.props;
    return (
      <div className="App">
        <Header />
        <Nav />
        {error && <Error404 />}
        {!error && isLoading && <Loader />}
        {!isLoading && (
          <Switch>
            <Route path="/crypto-coins/:id" render={this.getArticleRoute} />
            <Route
              path="/national-geographic/:id"
              render={this.getArticleRoute}
            />
            <Route path="/new-scientist/:id" render={this.getArticleRoute} />
            <Route path="/favorites/:id" render={this.getArticleRoute} />
            <Route path="/national-geographic" component={ArticleContainer} />
            <Route path="/new-scientist" component={ArticleContainer} />
            <Route path="/crypto-coins" component={ArticleContainer} />
            <Route path="/favorites" component={ArticleContainer} />
            <Route exact path="/" component={Home} />
            <Route component={Error404} />
          </Switch>
        )}
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  natGeoArticles: state.natGeoArticles,
  newScientistArticles: state.newScientistArticles,
  cryptoCoinsArticles: state.cryptoCoinsArticles,
  isLoading: state.isLoading,
  error: state.error
});

export const mapDispatchToProps = dispatch => ({
  fetchNatGeo: () => dispatch(fetchNatGeo()),
  fetchNewScientist: () => dispatch(fetchNewScientist()),
  fetchCryptoCoins: () => dispatch(fetchCryptoCoins()),
  setNatGeo: articles => dispatch(setNatGeo(articles)),
  setNewScientist: articles => dispatch(setNewScientist(articles)),
  setCryptoCoins: articles => dispatch(setCryptoCoins(articles))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

App.propTypes = {
  fetchNatGeo: PropTypes.func,
  fetchNewScientist: PropTypes.func,
  fetchCryptoCoins: PropTypes.func,
  natGeoArticles: PropTypes.array,
  newScientistArticles: PropTypes.array,
  cryptoCoinsArticles: PropTypes.array,
  isLoading: PropTypes.bool,
  error: PropTypes.string
};
