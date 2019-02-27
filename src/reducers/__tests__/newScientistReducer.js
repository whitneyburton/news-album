import { newScientistReducer } from '../newScientistReducer';
import * as data from '../../mockData';
import * as actions from '../../actions';

describe('newScientistReducer', () => {
  it('should return the default state', () => {
    const expected = [];
    const result = newScientistReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('case SET_NEW_SCIENTIST should return an array of New Scientist articles', () => {
    const expected = data.mockNewScienceArticles;
    const result = newScientistReducer(undefined, actions.setNewScientist(data.mockNewScienceArticles));
    expect(result).toEqual(expected);
  });

  it('case SET_FAVORITES should return an array of articles', () => {
    const initialState = data.mockNewScienceArticles;
    const expected = data.mockNewScienceArticlesWithFav;
    const result = newScientistReducer(initialState, actions.setFavorites(data.mockNewScientistArticle));
    expect(result).toEqual(expected);
  });
});