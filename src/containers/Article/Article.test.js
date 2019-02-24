import React from 'react';
import { shallow } from 'enzyme';
import { Article } from './Article';
import * as data from '../../mockData';

describe('Article', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Article article={data.mockNatGeoArticle}/>)
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('getPath', () => {
    it('should return a nat geo path', () => {
      const expected = '/national-geographic/';
      const result = wrapper.instance().getPath();
      expect(result).toEqual(expected);
    });

    it('should return a crypto coins path', () => {
      wrapper = shallow(<Article article={data.mockCryptoCoinsArticle} />);
      const expected = '/crypto-coins/';
      const result = wrapper.instance().getPath();
      expect(result).toEqual(expected);
    });

    it('should return a new scientist path', () => {
      wrapper = shallow(<Article article={data.mockNewScientistArticle} />);
      const expected = '/new-scientist/';
      const result = wrapper.instance().getPath();
      expect(result).toEqual(expected);
    });
  });
});