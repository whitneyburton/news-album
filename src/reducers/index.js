import { combineReducers } from 'redux';
import { natGeoReducer } from './natGeoReducer';
import { newScientistReducer } from './newScientistReducer';
import { cryptoCoinsReducer } from './cryptoCoinsReducer';
import { errorReducer } from './errorReducer';
import { isLoadingReducer } from './isLoadingReducer';

export const rootReducer = combineReducers({
  natGeoArticles: natGeoReducer,
  newScientistArticles: newScientistReducer,
  cryptoCoinsArticles: cryptoCoinsReducer,
  error: errorReducer,
  isLoading: isLoadingReducer
});
