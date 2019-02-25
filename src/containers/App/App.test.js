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

const mockProps = {
  natGeoArticles: data.mockNatGeoArticles,
  newScientistArticles: data.mockNewScienceArticles,
  cryptoCoinsArticles: data.mockCryptoCoinsArticles,
  isLoading: false,
  fetchNatGeo: jest.fn(),
  fetchNewScientist: jest.fn(),
  fetchCryptoCoins: jest.fn()
};

const mockMatch = { params: { id: 'a' }, path: 'national-geographic/a' };

jest.mock('../../thunks/fetchCryptoCoins.js');
jest.mock('../../thunks/fetchNatGeo.js');
jest.mock('../../thunks/fetchNewScientist.js');

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = createStore(rootReducer);
    ReactDOM.render(<Provider store={store}><BrowserRouter><App {...mockProps} /></BrowserRouter></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  describe('App component', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<App {...mockProps} />)
    });

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should match the snapshot when isLoading is true', () => {
      wrapper = shallow(<App {...mockProps} isloading={true} />)
      expect(wrapper).toMatchSnapshot();
    });
    
    it('should call fetchNatGeo, fetchCryptoCoins, and fetchNewScientist on componentDidMount', () => {
      wrapper.instance().componentDidMount();
      expect(mockProps.fetchNatGeo).toHaveBeenCalled();
      expect(mockProps.fetchCryptoCoins).toHaveBeenCalled();
      expect(mockProps.fetchNewScientist).toHaveBeenCalled();
    });

    // test getArticlesRoute with 3 conditions
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
  });
});
