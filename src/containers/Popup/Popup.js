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
    return (
      <div className='Popup'>
        {article.title}
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