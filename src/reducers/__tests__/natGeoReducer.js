import { natGeoReducer } from '../natGeoReducer';
import * as data from '../../mockData';
import * as actions from '../../actions';

describe('natGeoReducer', () => {
  it('should return the default state', () => {
    const expected = [];
    const result = natGeoReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should return an array of National Geographic articles', () => {
    const expected = data.mockNatGeoArticles;
    const result = natGeoReducer(undefined, actions.setNatGeo(data.mockNatGeoArticles));
    expect(result).toEqual(expected);
  });
});