import { combineReducers } from 'redux';
import { articlesReducer } from './articlesReducer';
import { errorReducer } from './errorReducer';
import { isLoadingReducer } from './isLoadingReducer';

export const rootReducer = combineReducers({
  articles: articlesReducer,
  error: errorReducer,
  isLoadingReducer: isLoadingReducer
});