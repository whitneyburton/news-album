import { setNatGeo, setError, toggleLoading } from '../actions';
import { fetchData } from '../utils/api';
import { apiKey } from '../utils/api-key';
import shortid from 'shortid';

export const fetchNatGeo = () => {
  return async (dispatch) => {
    try {
      dispatch(toggleLoading(true));
      const response = await fetchData(`https://newsapi.org/v2/top-headlines?sources=national-geographic&apiKey=${apiKey}`);
      const result = await response.json();
      const articles = result.articles.map(article => {
        article.id = shortid.generate();
        article.isFavorite = false;
        return article;
      })
      dispatch(setNatGeo(articles));
      dispatch(toggleLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
}