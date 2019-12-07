import { natGeoReducer } from '../natGeoReducer';
import * as data from '../../mockData';
import * as actions from '../../actions';

describe('natGeoReducer', () => {
  it('should return the default state', () => {
    const expected = [];
    const result = natGeoReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('case SET_NATIONAL_GEOGRAPHIC should return an array of National Geographic articles', () => {
    const expected = data.mockNatGeoArticles;
    const result = natGeoReducer(
      undefined,
      actions.setNatGeo(data.mockNatGeoArticles)
    );
    expect(result).toEqual(expected);
  });

  it('case SET_FAVORITES should return an array of articles', () => {
    const initialState = data.mockNatGeoArticles;
    const expected = data.mockNatGeoArticlesWithFav;
    const result = natGeoReducer(
      initialState,
      actions.setFavorites(data.mockNatGeoArticle)
    );
    expect(result).toEqual(expected);
  });
});
