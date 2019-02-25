import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import closeicon from '../../images/close.svg';
import staricon from '../../images/favstar.svg';

export class Popup extends Component {

  render() {
    const { currentArticle: article, match } = this.props;
    const previousUrl = match.path.slice(0, -4);
    const publishedDate = new Date(article.publishedAt).toString().slice(0, 15);

    return (
      <div className='Popup'>
        <Link to={previousUrl}>
          <img src={closeicon} className='Popup--close' alt='close icon' />
        </Link>
        <img src={staricon} className='Popup--star' alt='star icon' />
        <div className='Popup--info'>
          <div className='Popup--facts'>
            <h4 className='Popup--title'>{article.title.toUpperCase()}</h4>
            <p className='Popup--author-pub'>{article.author}, {publishedDate}</p>
            <p className='Popup--description'>{article.description}</p>
          </div>
          <div className='Popup--buttons'>
            <a href={article.url} target='_blank' rel='noopener noreferrer'>
              <button>READ</button>
            </a>
            <button>COPY</button>
          </div>
        </div>
        <img className='Popup--image' alt='article' src={article.urlToImage} />
      </div>
    )
  }
}

Popup.propTypes = {
  article: PropTypes.object
}