import { setArticles, setError, toggleLoading } from '../actions';
import { fetchData } from '../utils/api';

export const fetchArticles = () => {
  return async (dispatch) => {
    try {
      dispatch(toggleLoading(true));
      const response = await fetchData('https://newsapi.org/v2/top-headlines?sources=national-geographic&apiKey=db31113f5e8d42dab3b24a559d34e086');
      const result = await response.json();
      dispatch(toggleLoading(false));
      dispatch(setArticles(result.articles));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
}