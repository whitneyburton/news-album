import { errorReducer } from '../errorReducer';
import * as actions from '../../actions';

describe('errorReducer', () => {
  it('should return the default state', () => {
    const expected = '';
    const result = errorReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should return an error message', () => {
    const expected = 'Articles not found.';
    const result = errorReducer(undefined, actions.setError('Articles not found.'));
    expect(result).toEqual(expected);
  });
});