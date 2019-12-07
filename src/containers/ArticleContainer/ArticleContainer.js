import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Article } from '../../components/Article/Article';
import Masonry from 'react-masonry-css';

export const ArticleContainer = ({
  match,
  isDisabled,
  natGeoArticles,
  cryptoCoinsArticles,
  newScientistArticles
}) => {
  const generateArticleCategory = () => {
    switch (match.path) {
      case '/national-geographic':
      case '/national-geographic/:id':
        return natGeoArticles.map(article => {
          return <Article key={article.id} article={article} match={match} />;
        });
      case '/crypto-coins':
      case '/crypto-coins/:id':
        return cryptoCoinsArticles.map(article => {
          return <Article key={article.id} article={article} match={match} />;
        });
      case '/new-scientist':
      case '/new-scientist/:id':
        return newScientistArticles.map(article => {
          return <Article key={article.id} article={article} match={match} />;
        });
      case '/favorites':
      case '/favorites/:id':
        const allArticles = [
          ...natGeoArticles,
          ...cryptoCoinsArticles,
          ...newScientistArticles
        ];
        return generateFavoriteArticles(allArticles, match);
      default:
        return;
    }
  };

  const generateFavoriteArticles = (allArticles, match) => {
    const favoriteTitles = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteArticles = allArticles.reduce((acc, article) => {
      favoriteTitles.forEach(title => {
        if (article.title === title) acc.push(article);
      });
      return acc;
    }, []);
    return favoriteArticles.map(article => (
      <Article key={article.id} article={article} match={match} />
    ));
  };

  const articles = generateArticleCategory();
  const disabledClass = isDisabled ? '--disabled' : '';
  const breakpoints = {
    default: 3,
    1500: 2,
    950: 1
  };

  return articles.length ? (
    <Masonry
      breakpointCols={breakpoints}
      className={'ArticleContainer' + disabledClass}
      columnClassName="columns"
    >
      {articles}
    </Masonry>
  ) : (
    <h1 className="ArticleContainer--no-faves">No favorites yet!</h1>
  );
};

export const mapStateToProps = state => ({
  natGeoArticles: state.natGeoArticles,
  newScientistArticles: state.newScientistArticles,
  cryptoCoinsArticles: state.cryptoCoinsArticles
});

export default connect(mapStateToProps)(ArticleContainer);

ArticleContainer.propTypes = {
  match: PropTypes.object,
  natGeoArticles: PropTypes.array,
  newScientistArticles: PropTypes.array,
  cryptoCoinsArticles: PropTypes.array,
  isDisabled: PropTypes.bool
};
