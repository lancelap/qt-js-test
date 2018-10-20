import React from 'react';
import {mount} from 'enzyme';
import App from '../App';
import Ymap from '../components/Ymap';

it('should render Ymap', () => {
  const container = mount(<App />);
  expect(container.find(Ymap)).toHaveLength(1);
});
