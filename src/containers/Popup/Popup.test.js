import React from 'react';
import { shallow } from 'enzyme';
import { Popup, mapDispatchToProps } from './Popup';
import { mockNatGeoArticle } from '../../mockData';
import { setFavorites } from '../../actions';

const mockProps = { currentArticle: mockNatGeoArticle };
const mockMatch = { path: 'https://localhost.com/national-geographic/:id' };
const mockSetFavorites = jest.fn();

describe('Popup', () => {
  let wrapper;

  beforeEach(() => {
    localStorage.setItem('favorites', JSON.stringify(['Why insect populations are plummeting']));
    wrapper = shallow(<Popup {...mockProps} match={mockMatch} setFavorites={mockSetFavorites} />);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have the appropriate default state', () => {
    expect(wrapper.state('copied')).toEqual(false);
  });

  describe('handleClick', () => {
    it('should fire the setFavorites action', () => {
      wrapper.find('.Popup--star').simulate('click');
      expect(mockSetFavorites).toBeCalled();
    });

    it('should remove the item from storage if it already exists', () => {
      const expected = [];
      wrapper.find('.Popup--star').simulate('click');
      const result = JSON.parse(localStorage.getItem('favorites'));
      expect(result).toEqual(expected);
    });

    it('should add the item from storage if it does not exist', () => {
      localStorage.clear();
      const expected = ['Why insect populations are plummeting'];
      wrapper.find('.Popup--star').simulate('click');
      const result = JSON.parse(localStorage.getItem('favorites'));
      expect(result).toEqual(expected);
    });
  });

  describe('CopyToClipboard component', () => {
    it('should set the state of copied to true', () => {
      wrapper.find('.CopyToClipboard--button').simulate('copy');
      expect(wrapper.state('copied')).toEqual(true);
    });
  });

  describe('toggleCopied', () => {
    it('should return COPY when the the copied state property is false', () => {
      const expected = 'COPY';
      const result = wrapper.instance().toggleCopied();
      expect(result).toEqual(expected);
    });

    it('should return COPIED! when the copied state property is true', () => {
      wrapper.setState({ copied: true });
      const expected = 'COPIED!';
      const result = wrapper.instance().toggleCopied();
      expect(result).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    it('calls dispatch with a setFavorites action', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = setFavorites(mockNatGeoArticle);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setFavorites(mockNatGeoArticle);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});