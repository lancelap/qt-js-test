import React from 'react';
import {shallow} from 'enzyme';
import MarkerList from '../components/MarkerList';

it('should render list', () => {
  const markers = [
    {
      coordinates: [55, 37.66],
      text: '1',
      timestamp: 1539774788317
    },
    {
      coordinates: [51, 37.66],
      text: '2',
      timestamp: 1539774788318
    },
    {
      coordinates: [52, 37.66],
      text: '3',
      timestamp: 1539774788319
    }
  ];
  
  function getMapY () {
    return {
      mapY: {
        getCenter: function() {
          return ([0, 0]);
        },
        geoObjects: {
          add: jest.fn()
        }
      },
      ymaps: {
        Polyline: jest.fn()
      }
    };
  };

  const container = shallow(<MarkerList markers={markers} getMapY={getMapY} />);
  expect(container.find('ul').children()).toHaveLength(markers.length);
});