import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class Article extends Component {

  render() {
    const { article } = this.props;
    const title = article.title.toUpperCase();
    return (
      <Link className='Article' to={'/national-geographic/' + article.id}>
        <p className='Article--title'>{title}</p>
        <img className='Article--image' alt='article' src={article.urlToImage}/>
      </Link>
    )
  }
}

Article.propTypes = {
  article: PropTypes.object
}