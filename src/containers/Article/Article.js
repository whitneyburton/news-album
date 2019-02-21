import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Article extends Component {

  render() {
    const { article } = this.props;
    const title = article.title.toUpperCase();
    return (
      <div className='Article'>
        <p className='Article--title'>{title}</p>
        <img className='Article--image' alt='article' src={article.urlToImage}/>
      </div>
    )
  }
}

Article.propTypes = {
  article: PropTypes.object
}