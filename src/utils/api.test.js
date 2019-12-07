import { fetchData } from './api';
import * as data from '../mockData';

describe('api', () => {
  const mockUrl = 'www.fetchdata.com';

  beforeEach(() => {
    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: data.mockNewScienceArticlesObj,
        ok: true
      })
    );
  });

  it('should call fetch with the correct params', async () => {
    await fetchData(mockUrl);
    expect(window.fetch).toHaveBeenCalledWith(mockUrl);
  });

  it('should return the reponse if everything is ok', async () => {
    const expected = data.mockNewSciArticlesStringified;
    const result = await fetchData(mockUrl);
    expect(result).toEqual(expected);
  });

  it('should throw an error if everything is not ok', async () => {
    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: jest.fn(() => Promise.resolve('Error fetching data.')),
        ok: false
      })
    );
    const expected = new Error('Error fetching data.');
    expect(fetchData(mockUrl)).rejects.toEqual(expected);
  });
});
