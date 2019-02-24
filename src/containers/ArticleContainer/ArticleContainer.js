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
          return <Article key={article.id} article={article} />
        });
      case '/crypto-coins':
      case '/crypto-coins/:id':
        return cryptoCoinsArticles.map(article => {
          return <Article key={article.id} article={article} />
        });
      case '/new-scientist':
      case '/new-scientist/:id':
        return newScientistArticles.map(article => {
          return <Article key={article.id} article={article} />
        });
      default:
        return;
    }
  }

  render() {
    const breakpoints = {
      default: 3,
      1500: 2,
      850: 1
    };

    return (
      <Masonry
        breakpointCols={breakpoints}
        className="ArticleContainer"
        columnClassName="columns">
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