import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Article } from '../Article/Article';
import Masonry from 'react-masonry-css';

export class ArticleContainer extends Component {

  render() {
    const { articles } = this.props;
    const articleCards = articles.map(article => <Article article={article} />);
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
        {articleCards}
      </Masonry>
    )
  }
}

export const mapStateToProps = (state) => ({
  articles: state.articles
})

export default connect(mapStateToProps)(ArticleContainer);

ArticleContainer.propTypes = {
  articles: PropTypes.array
}