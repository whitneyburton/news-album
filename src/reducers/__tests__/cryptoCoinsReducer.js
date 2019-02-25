import { cryptoCoinsReducer } from '../cryptoCoinsReducer';
import * as data from '../../mockData';
import * as actions from '../../actions';

describe('cryptoCoinsReducer', () => {
  it('should return the default state', () => {
    const expected = [];
    const result = cryptoCoinsReducer(undefined, {});
    expect(result).toEqual(expected)
  });
  
  it('should return an array of Crypto Coins News articles', () => {
    const expected = data.mockCryptoCoinsArticles;
    const result = cryptoCoinsReducer(undefined, actions.setCryptoCoins(data.mockCryptoCoinsArticles));
    expect(result).toEqual(expected);
  });
});