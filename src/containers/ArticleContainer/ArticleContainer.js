import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Article } from '../Article/Article';
import Masonry from 'react-masonry-css';

export class ArticleContainer extends Component {

  generateArticleCategory = () => {
    const { match, natGeoArticles, cryptoCoinsArticles, newScientistArticles } = this.props;
    switch (match.path) {
      case '/national-geographic':
      case '/national-geographic/:id':
        return natGeoArticles.map(article => {
          return <Article key={article.id} article={article} match={match} />
        });
      case '/crypto-coins':
      case '/crypto-coins/:id':
        return cryptoCoinsArticles.map(article => {
          return <Article key={article.id} article={article} match={match} />
        });
      case '/new-scientist':
      case '/new-scientist/:id':
        return newScientistArticles.map(article => {
          return <Article key={article.id} article={article} match={match} />
        });
      case '/favorites':
      case '/favorites/:id':
        const allArticles = [...natGeoArticles, ...cryptoCoinsArticles, ...newScientistArticles];
        const favoriteTitles = JSON.parse(localStorage.getItem('favorites')) || [];
        const favoriteArticles = allArticles.reduce((acc, article) => {
          favoriteTitles.forEach(title => {
            if (article.title === title) {
              acc.push(article);
            }
          })
          return acc;
        }, []);
        return favoriteArticles.map(article => {
          return <Article key={article.id} article={article} match={match} />
        });
      default:
        return;
    }
  }

  render() {
    const { isDisabled } = this.props;
    const disabledClass = isDisabled ? '--disabled' : '';

    const breakpoints = {
      default: 3,
      1500: 2,
      850: 1
    };

    return (
      <Masonry
        breakpointCols={breakpoints}
        className={'ArticleContainer' + disabledClass}
        columnClassName='columns'>
        {this.generateArticleCategory()}
      </Masonry>
    )
  }
}

export const mapStateToProps = (state) => ({
  natGeoArticles: state.natGeoArticles,
  newScientistArticles: state.newScientistArticles,
  cryptoCoinsArticles: state.cryptoCoinsArticles
})

export default connect(mapStateToProps)(ArticleContainer);

ArticleContainer.propTypes = {
  match: PropTypes.object,
  natGeoArticles: PropTypes.array,
  newScientistArticles: PropTypes.array,
  cryptoCoinsArticles: PropTypes.array
}