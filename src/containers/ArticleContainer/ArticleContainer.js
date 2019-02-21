import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Article } from '../Article/Article';

export class ArticleContainer extends Component {

  render() {
    const { articles } = this.props;
    const articleCards = articles.map(article => {
      return <Article article={article} />
    })

    return (
      <div className='ArticleContainer'>
        {articleCards}
      </div>
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