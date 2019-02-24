import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class Article extends Component {

  getPath = () => {
    const { article } = this.props;
    if (article.url.includes('nationalgeographic')) {
      return '/national-geographic/'
    } else if (article.url.includes('ccn')) {
      return '/crypto-coins/'
    } else if (article.url.includes('newscientist')) {
      return '/new-scientist/'
    }
  }

  render() {
    const { article } = this.props;
    const title = article.title.toUpperCase();
    return (
      <Link className='Article' to={this.getPath() + article.id}>
        <p className='Article--title'>{title}</p>
        <img className='Article--image' alt='article' src={article.urlToImage}/>
      </Link>
    )
  }
}

Article.propTypes = {
  article: PropTypes.object
}