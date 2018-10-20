import React from 'react';
import {shallow} from 'enzyme';
import Polyline from '../components/Polyline';

const mapY = {
  getCenter: function() {
    return ([0, 0]);
  },
  geoObjects: {
    add: jest.fn,
    remove: jest.fn
  }
};

const ymaps = {
  Polyline: class {
    constructor(markers) {
      this.geometry = {
        setCoordinates: jest.fn
      };
      this.polyline = [].concat(markers);
    }
  },
  Placemark: class {
    constructor(geometry, properties, options) {
      this.geometry = geometry;
      this.properties = properties;
      this.options = options;
      this.events = {
        add: jest.fn,
        remove: jest.fn
      };
    }
  }
};

const markers = [[1, 5], [1, 3], [1, 2]];

it('should render null', () => {
  const container = shallow(<Polyline markers={markers} ymaps={ymaps} mapY={mapY} />);
  expect(container.equals(null)).toBe(true);
});

it('should create polyline', () => {
  const instance = shallow(<Polyline ymaps={ymaps} mapY={mapY} markers={markers} />).instance();
  expect(instance.polyline.polyline).toEqual(markers);
});
