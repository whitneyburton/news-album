import shortid from 'shortid';

export const newScientistReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_NEW_SCIENTIST':
      action.articles.forEach(article => {
        article.id = shortid.generate();
      });
      return action.articles;
    default:
      return state;
  }
}