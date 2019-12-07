import React from 'react';
import { connect } from 'react-redux';
import { fetchCryptoCoins } from '../../thunks/fetchCryptoCoins';
import { fetchNatGeo } from '../../thunks/fetchNatGeo';
import { fetchNewScientist } from '../../thunks/fetchNewScientist';

export const Nav = ({
  history,
  natGeoArticles,
  cryptoCoinsArticles,
  newScientistArticles,
  fetchNatGeo,
  fetchCryptoCoins,
  fetchNewScientist
}) => {
  const handleClick = async type => {
    if (type === 'home') {
      history.push('/');
    } else if (type === 'nat geo') {
      if (!natGeoArticles.length) await fetchNatGeo();
      history.push('/national-geographic');
    } else if (type === 'new scientist') {
      if (!newScientistArticles.length) await fetchNewScientist();
      history.push('/new-scientist');
    } else {
      if (!cryptoCoinsArticles.length) await fetchCryptoCoins();
      history.push('/crypto-coins');
    }
  };

  return (
    <div className="Nav--NavLink-container">
      <button className="Nav--nav-btn" onClick={() => handleClick('home')}>
        Home
      </button>
      <button className="Nav--nav-btn" onClick={() => handleClick('nat geo')}>
        National Geographic
      </button>
      <button
        onClick={() => handleClick('new scientist')}
        className="Nav--nav-btn"
      >
        The New Scientist
      </button>
      <button
        onClick={e => e.preventDefault()}
        className="Nav--nav-btn disabled"
      >
        Crypto Coins News
      </button>
    </div>
  );
};

export const mapStateToProps = state => ({
  natGeoArticles: state.natGeoArticles,
  newScientistArticles: state.newScientistArticles,
  cryptoCoinsArticles: state.cryptoCoinsArticles
});

export const mapDispatchToProps = dispatch => ({
  fetchNatGeo: () => dispatch(fetchNatGeo()),
  fetchNewScientist: () => dispatch(fetchNewScientist()),
  fetchCryptoCoins: () => dispatch(fetchCryptoCoins())
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
