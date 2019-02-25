import { fetchNatGeo } from '../fetchNatGeo';
import { setNatGeo, setError, toggleLoading } from '../../actions';
import * as data from '../../mockData';
import * as api from '../../utils/api';
import { apiKey } from '../../utils/api-key';

describe('fetchNatGeo', () => {
  const mockUrl = `https://newsapi.org/v2/top-headlines?sources=national-geographic&apiKey=${apiKey}`;
  const thunk = fetchNatGeo();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    api.fetchData = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(data.mockNatGeoArticlesObj),
      ok: true
    }));
  });

  it('should dispatch toggleLoading with true', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(toggleLoading(true));
  });

  it('should call fetchData with the correct params', async () => {
    await thunk(mockDispatch);
    expect(api.fetchData).toHaveBeenCalledWith(mockUrl);
  });

  it('should dispatch setNatGeo with the articles', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setNatGeo(data.mockNatGeoArticlesObj.articles))
  });

  it('should dispatch toggleLoading with false', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(toggleLoading(false));
  });

  it('should dispatch setError with the error message', async () => {
    api.fetchData = jest.fn(() => { throw new Error('Articles not found.') });
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError('Articles not found.'));
  });
});