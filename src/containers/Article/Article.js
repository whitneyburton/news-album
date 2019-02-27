import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class Article extends Component {
  getPath = () => {
    const { article, match } = this.props;
    if (match.path.includes('favorites')) {
      return '/favorites/'
    } else if (article.url.includes('nationalgeographic')) {
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
          <div className='Article--title-container'>
            <p className='Article--title'>{title}</p>
          </div>
          <img className='Article--image' alt='article' src={article.urlToImage} />
      </Link>
    )
  }
}

Article.propTypes = {
  article: PropTypes.object
}