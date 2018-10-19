import React from 'react';
import {shallow} from 'enzyme';
import YandexMap from '../components/YandexMap';

it('should render map', () => {
  const id = 3;
  const container = shallow(<YandexMap id={id}  />);
  expect(container.contains(
    <div 
      id={id} 
      className='yandex-map'
      style={{width: '450px', height: '450px'}}>
    </div>
  )).toEqual(true);
});
