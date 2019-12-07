import React from 'react';
import * as api from '../../utils/api';
import { setNewScientist, setError, toggleLoading } from '../../actions';
import { fetchNewScientist } from '../fetchNewScientist';
import * as data from '../../mockData';

describe('fetchNewScientist', () => {
  const mockUrl = `https://newsapi.org/v2/top-headlines?sources=new-scientist&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
  const thunk = fetchNewScientist();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    api.fetchData = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(data.mockNewScienceArticlesObj),
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

  it('should dispatch setNewScientist with the articles', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(
      setNewScientist(data.mockNewScienceArticlesObj.articles)
    );
  });

  it('should dispatch toggleLoading with false', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(toggleLoading(false));
  });

  it('should call setError with the error message', async () => {
    api.fetchData = jest.fn(() => {
      throw new Error('Articles not found.');
    });
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError('Articles not found.'));
  });
});
