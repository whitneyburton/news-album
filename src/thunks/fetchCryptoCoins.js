import { setCryptoCoins, setError, toggleLoading } from '../actions';
import { fetchData } from '../utils/api';
import { apiKey } from '../utils/api-key';

export const fetchCryptoCoins = () => {
  return async (dispatch) => {
    try {
      dispatch(toggleLoading(true));
      const response = await fetchData(`https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=${apiKey}`);
      const result = await response.json();
      dispatch(setCryptoCoins(result.articles));
      dispatch(toggleLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
}