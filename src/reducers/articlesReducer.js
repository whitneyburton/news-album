import shortid from 'shortid';

export const articlesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ARTICLES':
      action.articles.forEach(article => {
        article.id = shortid.generate();
      });
      return action.articles;
    default:
      return state;
  }
}