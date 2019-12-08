import React from 'react';
import { shallow } from 'enzyme';
import { ArticleContainer, mapStateToProps } from './ArticleContainer';
import * as data from '../../mockData';

const mockProps = {
  match: { path: '/national-geographic' },
  natGeoArticles: data.mockNatGeoArticles,
  newScientistArticles: data.mockNewScienceArticles,
  cryptoCoinsArticles: data.mockCryptoCoinsArticles,
  isDisabled: false
};

describe('ArticleContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ArticleContainer {...mockProps} />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  // describe('generateArticleCategory', () => {
  //   it('should return an array of Article components when there is a NAT GEO path', () => {
  //     const result = wrapper.instance().generateArticleCategory();
  //     expect(result).toHaveLength(2);
  //   });

  //   it('should return an array of Article components when there is a CRYPTO COINS path', () => {
  //     const mockMatch = { path: '/national-geographic' };
  //     wrapper = shallow(<ArticleContainer {...mockProps} match={mockMatch} />);
  //     const result = wrapper.instance().generateArticleCategory();
  //     expect(result).toHaveLength(2);
  //   });

  //   it('should return an array of Article components when there is a NEW SCIENTIST path', () => {
  //     const mockMatch = { path: '/new-scientist' };
  //     wrapper = shallow(<ArticleContainer {...mockProps} match={mockMatch} />);
  //     const result = wrapper.instance().generateArticleCategory();
  //     expect(result).toHaveLength(2);
  //   });

  //   it('should return an array of Article components when there is a FAVORITES path', () => {
  //     const mockMatch = { path: '/favorites' };
  //     wrapper = shallow(<ArticleContainer {...mockProps} match={mockMatch} />);
  //     const result = wrapper.instance().generateArticleCategory();
  //     expect(result).toHaveLength(0);
  //   });
  // });

  describe('mapStateToProps', () => {
    it('should return a props object with all 3 types of articles', () => {
      const mockState = {
        natGeoArticles: data.mockNatGeoArticles,
        newScientistArticles: data.mockNewScientistArticle,
        cryptoCoinsArticles: data.mockCryptoCoinsArticles,
        isLoading: false
      };
      const expected = {
        natGeoArticles: data.mockNatGeoArticles,
        newScientistArticles: data.mockNewScientistArticle,
        cryptoCoinsArticles: data.mockCryptoCoinsArticles
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });
});
