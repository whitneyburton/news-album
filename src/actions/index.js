export const setArticles = (articles) => ({
  type: 'SET_ARTICLES',
  articles
});

export const toggleLoading = (bool) => ({
  type: 'TOGGLE_LOADING',
  bool
});

export const setError = (message) => ({
  type: 'SET_ERROR',
  message
});