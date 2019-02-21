import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Popup extends Component {

  findPopup = () => {
    const { id } = this.props.match.params;
    const { articles } = this.props;
    const popup = articles.find(article => article.id === id);
    return popup;
  }
  
  render() {
    const article = this.findPopup();
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
        <img className='Popup--image' alt='article' src={article.urlToImage}/>
      </div>
    )
  }
}

export const mapStateToProps = (state) => ({
  articles: state.articles
})

export default connect(mapStateToProps)(Popup);

Popup.propTypes = {
  id: PropTypes.string,
  articles: PropTypes.array
}