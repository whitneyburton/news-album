import * as actions from '../actions';
import * as data from '../mockData';

describe('actions', () => {
  describe('setNatGeo', () => {
    it('should return an object with a SET_NATIONAL_GEOGRAPHIC type and the articles', () => {
      const expected = {
        type: 'SET_NATIONAL_GEOGRAPHIC',
        articles: data.mockNatGeoArticles
      };
      const result = actions.setNatGeo(data.mockNatGeoArticles);
      expect(result).toEqual(expected);
    });
  });

  describe('setCryptoCoins', () => {
    it('should return an object with a SET_CRYPTO_COINS type and articles', () => {
      const expected = {
        type: 'SET_CRYPTO_COINS',
        articles: data.mockCryptoCoinsArticles
      };
      const result = actions.setCryptoCoins(data.mockCryptoCoinsArticles);
      expect(result).toEqual(expected);
    });
  });

  describe('setNewScientist', () => {
    it('should return an object with a SET_NEW_SCIENTIST type and articles', () => {
      const expected = {
        type: 'SET_NEW_SCIENTIST',
        articles: data.mockNewScienceArticles
      };
      const result = actions.setNewScientist(data.mockNewScienceArticles);
      expect(result).toEqual(expected);
    });
  });

  describe('toggleLoading', () => {
    it('should return an object with a TOGGLE_LOADING type and bool', () => {
      const expected = {
        type: 'TOGGLE_LOADING',
        bool: true
      };
      const result = actions.toggleLoading(true);
      expect(result).toEqual(expected);
    });
  });

  describe('setError', () => {
    it('should return an object with a SET_ERROR type and bool', () => {
      const expected = {
        type: 'SET_ERROR',
        message: 'Error fetching data'
      };
      const result = actions.setError('Error fetching data');
      expect(result).toEqual(expected);
    });
  });
});
