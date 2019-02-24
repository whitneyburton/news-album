import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Popup extends Component {

  render() {
    const { currentArticle: article } = this.props;
    const publishedDate = new Date(article.publishedAt).toString().slice(0, 15);

    return (
      <div className='Popup'>
        <div className='Popup--info'>
          <h4 className='Popup--title'>{article.title.toLowerCase()}</h4>
          <p className='Popup--author--pub'>{article.author}, {publishedDate}</p>
          <p className='Popup--description'>{article.description}</p>
          <a href={article.url} target='_blank'><button>READ</button></a>
          <button>COPY</button>
        </div>
        <img className='Popup--image' alt='article' src={article.urlToImage} />
      </div>
    )
  }
}

Popup.propTypes = {
  article: PropTypes.object
}