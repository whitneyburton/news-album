export const cryptoCoinsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CRYPTO_COINS':
      return action.articles;
    case 'SET_FAVORITES':
      return state.map(article => {
        if (article.id === action.article.id) {
          return { ...article, isFavorite: !article.isFavorite };
        }
        return article;
      });
    default:
      return state;
  }
};
