import shortid from 'shortid';

export const natGeoReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_NATIONAL_GEOGRAPHIC':
      action.articles.forEach(article => {
        article.id = shortid.generate();
      });
      return action.articles;
    default:
      return state;
  }
}