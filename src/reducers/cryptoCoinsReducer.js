import shortid from 'shortid';

export const cryptoCoinsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CRYPTO_COINS':
      action.articles.forEach(article => {
        article.id = shortid.generate();
      });
      return action.articles;
    default:
      return state;
  }
}