import { isLoadingReducer } from '../isLoadingReducer';
import * as actions from '../../actions';

describe('isLoadingReducer', () => {
  it('should return the default state', () => {
    const expected = false;
    const result = isLoadingReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should toggle isLoading to true', () => {
    const expected = true;
    const result = isLoadingReducer(undefined, actions.toggleLoading(true));
    expect(result).toEqual(expected);
  });
});