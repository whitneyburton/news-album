import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactTooltip from 'react-tooltip';

import { setFavorites } from '../../actions';
import closeicon from '../../images/close.svg';
import staricon from '../../images/star.svg';
import favstaricon from '../../images/favstar.svg';

export class Popup extends Component {
  constructor() {
    super();
    this.state = {
      copied: false
    };
  }

  handleClick = () => {
    this.props.setFavorites(this.props.currentArticle);
    const title = this.props.currentArticle.title;
    const parsedStorage = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!parsedStorage.includes(title)) {
      parsedStorage.push(title);
      localStorage.setItem('favorites', JSON.stringify(parsedStorage));
    } else if (parsedStorage.includes(title)) {
      const removedItemStorage = parsedStorage.filter(item => item !== title);
      localStorage.setItem('favorites', JSON.stringify(removedItemStorage));
    }
  };

  render() {
    const { currentArticle: article, match } = this.props;
    const previousUrl = match.path.slice(0, -4);
    const publishedDate = new Date(article.publishedAt).toString().slice(0, 15);
    const copied = this.state.copied ? 'COPIED!' : 'COPY';
    const icon = article.isFavorite ? favstaricon : staricon;

    return (
      <div className="Popup">
        <div className="Popup--delete-fav">
          <Link to={previousUrl}>
            <img src={closeicon} className="Popup--close" alt="close icon" />
          </Link>
          <img
            src={icon}
            onClick={this.handleClick}
            className="Popup--star"
            alt="star icon"
            id="favorite"
            data-tip
            data-for="favorite-tip"
          />
          <ReactTooltip
            id="favorite-tip"
            type="light"
            effect="solid"
            place="bottom"
          >
            {article.isFavorite ? 'Remove favorite' : 'Save for later'}
          </ReactTooltip>
        </div>
        <div className="Popup--info">
          <div className="Popup--facts">
            <h4 className="Popup--title">{article.title.toUpperCase()}</h4>
            <p className="Popup--author-pub">
              By: {article.author}, {publishedDate}
            </p>
            <p className="Popup--description">Glimpse: {article.description}</p>
          </div>
          <div className="Popup--buttons">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <button
                className="Popup--button"
                id="read"
                data-tip
                data-for="read-tip"
              >
                READ
              </button>
            </a>
            <ReactTooltip
              id="read-tip"
              type="light"
              effect="solid"
              place="bottom"
            >
              {'Read on their website'}
            </ReactTooltip>
            <CopyToClipboard
              className="CopyToClipboard--button"
              text={article.url}
              onCopy={() => this.setState({ copied: true })}
            >
              <button
                className="Popup--button"
                id="copy"
                data-tip
                data-for="copy-tip"
              >
                {copied}
              </button>
            </CopyToClipboard>
            <ReactTooltip
              id="copy-tip"
              type="light"
              effect="solid"
              place="bottom"
            >
              {'Send this article to a friend!'}
            </ReactTooltip>
          </div>
        </div>
        <img className="Popup--image" alt="article" src={article.urlToImage} />
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  setFavorites: article => dispatch(setFavorites(article))
});

export default connect(null, mapDispatchToProps)(Popup);

Popup.propTypes = {
  currentArticle: PropTypes.object,
  match: PropTypes.object,
  setFavorites: PropTypes.func
};
