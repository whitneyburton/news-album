export const setNatGeo = articles => ({
  type: 'SET_NATIONAL_GEOGRAPHIC',
  articles
});

export const setCryptoCoins = articles => ({
  type: 'SET_CRYPTO_COINS',
  articles
});

export const setNewScientist = articles => ({
  type: 'SET_NEW_SCIENTIST',
  articles
});

export const toggleLoading = bool => ({
  type: 'TOGGLE_LOADING',
  bool
});

export const setError = message => ({
  type: 'SET_ERROR',
  message
});

export const setFavorites = article => ({
  type: 'SET_FAVORITES',
  article
});
