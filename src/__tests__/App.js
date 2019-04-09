import * as React from 'react';
import {shallow} from 'enzyme';
import {App} from '../App';
import Loader from '../components/Loader';
import YandexMap from '../components/YandexMap';
jest.mock('.././loadScriptMap');

it('should render Loader, YandexMap', () => {
  const container = shallow(<App />);
  expect(container.contains(<Loader />)).toEqual(true);
  expect(container.contains(<YandexMap id={container.state().mapId} />)).toEqual(true);
  expect(container.find('MarkerList').length).toBe(0);
});

it('should render MarkerList, YandexMap', () => {
  const container = shallow(<App />);
  process.nextTick(() => {
    expect(container.contains(<Loader />)).toEqual(false);
    expect(container.find('MarkerList').length).toBe(1);
    expect(container.contains(<YandexMap id={container.state().mapId} />)).toEqual(true);
  });
});
