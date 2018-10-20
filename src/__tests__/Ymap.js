import React from 'react';
import {shallow} from 'enzyme';
import Ymap from '../components/Ymap';
import Loader from '../components/Loader';
import MarkerList from '../components/MarkerList';
import YandexMap from '../components/YandexMap';
jest.mock('.././loadScriptMap');

it('should render Loader, YandexMap', () => {
  const container = shallow(<Ymap />);
  expect(container.contains(<Loader />)).toEqual(true);
  expect(container.contains(<YandexMap id={container.state().mapId} />)).toEqual(true);
  expect(container.find(MarkerList)).toHaveLength(0);
});

it('should render MarkerList, YandexMap', () => {
  const container = shallow(<Ymap />);

  process.nextTick(() => {
    expect(container.contains(<Loader />)).toEqual(false);
    expect(container.find(MarkerList)).toHaveLength(1);
    expect(container.contains(<YandexMap id={container.state().mapId} />)).toEqual(true);
  });
});
