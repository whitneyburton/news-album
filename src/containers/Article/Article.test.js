import React from 'react';
import { shallow } from 'enzyme';
import { Article } from './Article';
import * as data from '../../mockData';

describe('Article', () => {
  let wrapper;
  let mockMatch;

  it('should match the snapshot', () => {
    mockMatch = { path: '/favorites' }
    wrapper = shallow(<Article article={data.mockNatGeoArticle} match={mockMatch} />)
    expect(wrapper).toMatchSnapshot();
  });
  
  describe('getPath', () => {
    it('should return a favorites path', () => {
      mockMatch = { path: '/favorites' }
      wrapper = shallow(<Article article={data.mockNatGeoArticle} match={mockMatch} />)
      const expected = '/favorites/';
      const result = wrapper.instance().getPath();
      expect(result).toEqual(expected);
    });
    
    it('should return a nat geo path', () => {
      mockMatch = { path: '/natgeo' }
      wrapper = shallow(<Article article={data.mockNatGeoArticle} match={mockMatch} />)
      const expected = '/national-geographic/';
      const result = wrapper.instance().getPath();
      expect(result).toEqual(expected);
    });

    it('should return a crypto coins path', () => {
      mockMatch = { path: '/crypto' }
      wrapper = shallow(<Article article={data.mockCryptoCoinsArticle} match={mockMatch} />);
      const expected = '/crypto-coins/';
      const result = wrapper.instance().getPath();
      expect(result).toEqual(expected);
    });

    it('should return a new scientist path', () => {
      mockMatch = { path: '/newscientist' }
      wrapper = shallow(<Article article={data.mockNewScientistArticle} match={mockMatch} />);
      const expected = '/new-scientist/';
      const result = wrapper.instance().getPath();
      expect(result).toEqual(expected);
    });
  });
});