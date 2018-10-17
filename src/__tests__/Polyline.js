import React from 'react';
import {shallow, mount} from 'enzyme';
import Polyline from '../components/Polyline';

function getMapY() {
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
      Polyline: function Polyline(markers) {
        this.polyline = [].concat(markers);
      }
    }
  };
};

it('should render null', () => {
  const container = shallow(<Polyline getMapY={getMapY} />);
  expect(container.equals(null)).toBe(true);
});

it('should create polyline', () => {
  const markers = [[1, 5], [1, 3], [1, 2]];
  const instance = mount(<Polyline getMapY={getMapY} markers={markers} />).instance();
  expect(instance.polyline.polyline).toEqual(markers);
});