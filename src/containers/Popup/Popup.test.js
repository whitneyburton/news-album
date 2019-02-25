import React from 'react';
import { shallow } from 'enzyme';
import { Popup } from './Popup';
import { mockNatGeoArticle } from '../../mockData';

const mockProps = { currentArticle: mockNatGeoArticle };
const mockMatch = { path: 'https://localhost.com/national-geographic/:id' };

describe('Popup', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Popup {...mockProps} match={mockMatch} />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have the appropriate default state', () => {
    expect(wrapper.state('copied')).toEqual(false);
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
});