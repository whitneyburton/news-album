import { fetchCryptoCoins } from '../fetchCryptoCoins';
import { setCryptoCoins, setError, toggleLoading } from '../../actions';
import * as api from '../../utils/api';
import * as data from '../../mockData';

describe('fetchCryptoCoins', () => {
  const mockUrl = `https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
  const thunk = fetchCryptoCoins();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    api.fetchData = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(data.mockCryptoCoinsArticlesObj),
        ok: true
      })
    );
  });

  it('should dispatch toggleLoading with true', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(toggleLoading(true));
  });

  it('should call fetchData with the correct params', async () => {
    await thunk(mockDispatch);
    expect(api.fetchData).toHaveBeenCalledWith(mockUrl);
  });

  it('should call setCryptoCoins with the articles', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(
      setCryptoCoins(data.mockCryptoCoinsArticlesObj.articles)
    );
  });

  it('should dispatch toggleLoading with true', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(toggleLoading(false));
  });

  it('should dispatch setError with the message', async () => {
    api.fetchData = jest.fn(() => {
      throw new Error('Articles not found.');
    });
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError('Articles not found.'));
  });
});
