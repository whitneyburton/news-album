import React, { useEffect, useState } from 'react';
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
  const [articles, setArticles] = useState([]);

  const generateArticles = () => {
    switch (match.path) {
      case '/national-geographic':
      case '/national-geographic/:id':
        return setArticles(
          natGeoArticles.map(article => {
            return <Article key={article.id} article={article} match={match} />;
          })
        );
      case '/crypto-coins':
      case '/crypto-coins/:id':
        return setArticles(
          cryptoCoinsArticles.map(article => {
            return <Article key={article.id} article={article} match={match} />;
          })
        );
      case '/new-scientist':
      case '/new-scientist/:id':
        return setArticles(
          newScientistArticles.map(article => {
            return <Article key={article.id} article={article} match={match} />;
          })
        );
      case '/favorites':
      case '/favorites/:id':
        return setArticles(
          generateFavoriteArticles([
            ...natGeoArticles,
            ...cryptoCoinsArticles,
            ...newScientistArticles
          ])
        );
      default:
        setArticles([]);
    }
  };

  const generateFavoriteArticles = allArticles => {
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

  const getTitle = () => {
    if (match.path.includes('geographic')) {
      return 'NATIONAL GEOGRAPHIC';
    } else if (match.path.includes('scientist')) {
      return 'THE NEW SCIENTIST';
    } else if (match.path.includes('crypto')) {
      return 'CRYPTO COINS';
    } else {
      return 'YOUR FAVORITES';
    }
  };

  useEffect(() => {
    generateArticles();
  }, [match.path]);

  const disabledClass = isDisabled ? '--disabled' : '';
  const breakpoints = {
    default: 3,
    1500: 2,
    950: 1
  };

  return articles.length ? (
    <>
      <h2 className="ArticleContainer--title">{getTitle()}</h2>
      <Masonry
        breakpointCols={breakpoints}
        className={'ArticleContainer' + disabledClass}
        columnClassName="columns"
      >
        {articles}
      </Masonry>
    </>
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
