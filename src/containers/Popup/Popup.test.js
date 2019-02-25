import React from 'react';
import { shallow } from 'enzyme';
import { Popup } from './Popup';
import { mockNatGeoArticle } from '../../mockData';

const mockProps = { currentArticle: mockNatGeoArticle };

describe('Popup', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Popup {...mockProps} />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});