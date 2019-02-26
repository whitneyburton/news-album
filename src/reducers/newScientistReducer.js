export const newScientistReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_NEW_SCIENTIST':
      return action.articles;
    case 'SET_FAVORITES':
      return state.map(article => {
        if (article.id === action.article.id) {
          article.isFavorite = !article.isFavorite
        }
        return article;
      });
    default:
      return state;
  }
}