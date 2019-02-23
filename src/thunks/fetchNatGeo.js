import { setNatGeo, setError, toggleLoading } from '../actions';
import { fetchData } from '../utils/api';
import { apiKey } from '../utils/api-key';

export const fetchNatGeo = () => {
  return async (dispatch) => {
    try {
      dispatch(toggleLoading(true));
      const response = await fetchData(`https://newsapi.org/v2/top-headlines?sources=national-geographic&apiKey=${apiKey}`);
      const result = await response.json();
      dispatch(setNatGeo(result.articles));
      dispatch(toggleLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
}