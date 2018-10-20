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
      constructor() {
        this.geometry = {
          setCoordinates: jest.fn
        };
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

  const container = shallow(<MarkerList mapY={mapY} ymaps={ymaps} />);
  container.setState({markers});
  expect(container.find('ul').children()).toHaveLength(markers.length);
});
