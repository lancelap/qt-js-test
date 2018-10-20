import React from 'react';
import {shallow} from 'enzyme';
import YandexMap from '../components/YandexMap';

it('should render map', () => {
  const id = 'YandexMap';
  const container = shallow(<YandexMap id={id}  />);
  expect(container.contains(
    <div 
      id={id} 
      className='yandex-map'
      style={{width: '450px', height: '450px'}}>
    </div>
  )).toEqual(true);
});

it('should Component Update is false', () => {
  const id = 'YandexMap';
  const container = shallow(<YandexMap id={id} />);
  const shouldUpdate = container.instance().shouldComponentUpdate();
  expect(shouldUpdate).toBe(false);
});

