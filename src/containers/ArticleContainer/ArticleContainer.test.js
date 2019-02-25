import React from 'react';
import { shallow } from 'enzyme';
import { ArticleContainer, mapStateToProps } from './ArticleContainer';
import { Article } from '../Article/Article';
import * as data from '../../mockData';

const mockProps = {
  natGeoArticles: data.mockNatGeoArticles,
  newScientistArticles: data.mockNewScienceArticles,
  cryptoCoinsArticles: data.mockCryptoCoinsArticles,
};

const mockMatch = { params: { id: 'a' }, path: 'national-geographic/a' };

describe('ArticleContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ArticleContainer {...mockProps} match={mockMatch} />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('generateArticleCategory', () => {

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