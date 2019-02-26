import { setCryptoCoins, setError, toggleLoading } from '../actions';
import { fetchData } from '../utils/api';
import { apiKey } from '../utils/api-key';
import shortid from 'shortid';

export const fetchCryptoCoins = () => {
  return async (dispatch) => {
    try {
      dispatch(toggleLoading(true));
      const response = await fetchData(`https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=${apiKey}`);
      const result = await response.json();
      const articles = result.articles.map(article => {
        article.id = shortid.generate();
        article.isFavorite = false;
        return article;
      })
      dispatch(setCryptoCoins(articles));
      dispatch(toggleLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
}