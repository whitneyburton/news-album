import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Article extends Component {

  render() {
    const { article } = this.props;
    return (
      <div className='Article'>
        <p>{article.title}</p>
        <p>{article.author}</p>
        <p>{article.description}</p>
      </div>
    )
  }
}

Article.propTypes = {
  article: PropTypes.object
}