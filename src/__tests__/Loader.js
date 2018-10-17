import React from 'react';
import {shallow} from 'enzyme';
import Loader from '../components/Loader';

it('renders without crashing', () => {
  const container = shallow(<Loader />);
  expect(container.contains(<p>Loading...</p>)).toEqual(true);
});
