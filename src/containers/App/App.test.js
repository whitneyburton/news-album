import React from 'react';
import ReactDOM from 'react-dom';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { rootReducer } from '../../reducers';
import { shallow } from 'enzyme';
import { fetchNatGeo } from '../../thunks/fetchNatGeo';
import { fetchCryptoCoins } from '../../thunks/fetchCryptoCoins';
import { fetchNewScientist } from '../../thunks/fetchNewScientist';
import * as data from '../../mockData';
import * as actions from '../../actions';

const mockProps = {
  natGeoArticles: data.mockNatGeoArticles,
  newScientistArticles: data.mockNewScienceArticles,
  cryptoCoinsArticles: data.mockCryptoCoinsArticles,
  isLoading: false,
  fetchNatGeo: jest.fn(),
  fetchNewScientist: jest.fn(),
  fetchCryptoCoins: jest.fn(),
  setNatGeo: jest.fn(),
  setNewScientist: jest.fn(),
  setCryptoCoins: jest.fn()
};

const mockMatch = { params: { id: 'a' }, path: 'national-geographic/a' };

jest.mock('../../thunks/fetchCryptoCoins.js');
jest.mock('../../thunks/fetchNatGeo.js');
jest.mock('../../thunks/fetchNewScientist.js');

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App {...mockProps} match={mockMatch} />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = createStore(rootReducer);
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App {...mockProps} />
        </BrowserRouter>
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot when isLoading is true', () => {
    wrapper = shallow(<App {...mockProps} isLoading={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call fetchNatGeo, fetchCryptoCoins, and fetchNewScientist on componentDidMount', () => {
    wrapper.instance().componentDidMount();
    expect(mockProps.fetchNatGeo).toHaveBeenCalled();
    expect(mockProps.fetchCryptoCoins).toHaveBeenCalled();
    expect(mockProps.fetchNewScientist).toHaveBeenCalled();
  });

  describe('getArticleRoute', () => {
    it('should return the ArticleContainer and Popup components when there is a NAT GEO currentArticle', () => {
      const result = wrapper.instance().getArticleRoute({ match: mockMatch });
      expect(result).toHaveLength(2);
    });

    it('should return the ArticleContainer and Popup components when there is a NEW SCIENTIST currentArticle', () => {
      const mockMatch = { params: { id: 'c' }, path: 'new-scientist/c' };
      const result = wrapper.instance().getArticleRoute({ match: mockMatch });
      expect(result).toHaveLength(2);
    });

    it('should return the ArticleContainer and Popup components when there is a CRYPTO COINS currentArticle', () => {
      const mockMatch = { params: { id: 'e' }, path: 'crypto-coins/e' };
      const result = wrapper.instance().getArticleRoute({ match: mockMatch });
      expect(result).toHaveLength(2);
    });

    it('should return the Error404 component when there is no currentArticle match', () => {
      const mockMatch = { params: { id: 'z' }, path: 'national-geographic/z' };
      const result = wrapper.instance().getArticleRoute({ match: mockMatch });
      const errorWrapper = shallow(result);
      expect(errorWrapper.find('.Error404')).toHaveLength(1);
    });
  });

  describe('getFavoritesFromStorage', () => {
    it('should call setNatGeo when there is a national geographic article in storage', () => {
      localStorage.setItem(
        'favorites',
        JSON.stringify(['Why insect populations are plummeting'])
      );
      wrapper.instance().getFavoritesFromStorage();
      expect(mockProps.setNatGeo).toHaveBeenCalled();
    });

    it('should call setNewScientist when there is a New Scientist article in storage', () => {
      localStorage.setItem(
        'favorites',
        JSON.stringify(['Four stars full of burnt nuclear ash'])
      );
      wrapper.instance().getFavoritesFromStorage();
      expect(mockProps.setNewScientist).toHaveBeenCalled();
    });

    it('should call setCryptoCoins when there is a National Geographic article in storage', () => {
      localStorage.setItem('favorites', JSON.stringify(['Ethereum Slayers']));
      wrapper.instance().getFavoritesFromStorage();
      expect(mockProps.setCryptoCoins).toHaveBeenCalled();
    });
  });

  describe('mapStateToProps', () => {
    it('should return a props object with the 3 article types and isLoading', () => {
      const mockState = {
        natGeoArticles: data.mockNatGeoArticles,
        newScientistArticles: data.mockNewScienceArticles,
        cryptoCoinsArticles: data.mockCryptoCoinsArticles,
        isLoading: false
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(mockState);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with a fetchNatGeo thunk', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = fetchNatGeo();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.fetchNatGeo();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with a fetchNewScientist thunk', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = fetchNewScientist();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.fetchNewScientist();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with a fetchCryptoCoins thunk', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = fetchCryptoCoins();
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.fetchCryptoCoins();
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with a setNewScientist action', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = actions.setNewScientist(
        data.mockNewScienceArticles
      );
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setNewScientist(data.mockNewScienceArticles);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with a setCryptoCoins action', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = actions.setCryptoCoins(
        data.mockCryptoCoinsArticles
      );
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setCryptoCoins(data.mockCryptoCoinsArticles);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});
