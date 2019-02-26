import React from 'react';
import { shallow } from 'enzyme';
import { ArticleContainer, mapStateToProps } from './ArticleContainer';
import { Article } from '../Article/Article';
import * as data from '../../mockData';

const mockProps = {
  match: { params: { id: 'a' }, path: 'national-geographic/a' },
  natGeoArticles: data.mockNatGeoArticles,
  newScientistArticles: data.mockNewScienceArticles,
  cryptoCoinsArticles: data.mockCryptoCoinsArticles
};

describe('ArticleContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ArticleContainer {...mockProps} />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('generateArticleCategory', () => {
    it.skip('should return an Article component when there is a NAT GEO path', () => {
      const result = wrapper.instance().generateArticleCategory();
      expect(result).toHaveLength(10);
    });
  });

  describe('mapStateToProps', () => {
    it('should return a props object with all 3 types of articles', () => {
      const mockState = {
        natGeoArticles: data.mockNatGeoArticles,
        newScientistArticles: data.mockNewScientistArticle,
        cryptoCoinsArticles: data.mockCryptoCoinsArticles
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(mockState);
    });
  });
});