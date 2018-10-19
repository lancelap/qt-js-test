import React from 'react';
import {shallow} from 'enzyme';
import Ymap from '../components/Ymap';
import Loader from '../components/Loader';
import MarkerList from '../components/MarkerList';
import MarkerForm from '../components/MarkerForm';

// it('should render Loader, YandexMap', () => {
//   const container = shallow(<Ymap />);
//   const instance = container.instance();

//   expect(container.contains(<Loader />)).toEqual(true);
  
//   expect(container.contains(<MarkerForm addMarker={instance.addMarker} getMapY={instance.getMapY} />)).toEqual(false);
//   expect(container.contains(<MarkerList />)).toEqual(false);
// });

it('should render MarkerForm, MarkerList, YandexMap', () => {
  const container = shallow(<Ymap loaded={true}/>);
  container.setState({ loaded: true });
  const instance = container.instance();
  
  expect(container.contains(<Loader />)).toEqual(false);

  expect(container.contains(<MarkerForm addMarker={instance.addMarker} getMapY={instance.getMapY} />)).toEqual(true);
  expect(container.contains(<MarkerList 
    getMapY={instance.getMapY} 
    deleteMarker={instance.deleteMarker} 
    moveMarker={instance.moveMarker}
    addDragEndListener={instance.addDragEndListener}
    removeDragEndListener={instance.removeDragEndListener}
    markers={container.state().markers} />)).toEqual(true);
});

it('should add new marker', () => {
  const container = shallow(<Ymap />);
  const instance = container.instance();

  const marker = {coordinates: [1, 2], text: test, timestamp: 1};
  instance.addMarker(marker.timestamp, marker.text, marker.coordinates);

  expect(container.state().markers[0]).toEqual(marker);
  expect(container.state().markers).toHaveLength(1);
});

it('should delete marker', () => {
  const container = shallow(<Ymap />);
  const instance = container.instance();

  const marker = {coordinates: [1, 2], text: 'test', timestamp: 1};
  instance.addMarker(marker.timestamp, marker.text, marker.coordinates);
  instance.addMarker(marker.timestamp, marker.text, marker.coordinates);

  instance.deleteMarker(0);
  expect(container.state().markers).toHaveLength(1);
});

it('should change marker', () => {
  const container = shallow(<Ymap />);
  const instance = container.instance();

  const marker = {coordinates: [1, 2], text: 'test', timestamp: 1};
  const markers = [marker, marker];
  instance.addMarker(marker.timestamp, marker.text, marker.coordinates);
  instance.addMarker(marker.timestamp, marker.text, marker.coordinates);
  expect(container.state().markers).toEqual(markers);

  const newMarker = {coordinates: [1221, 123], text: 'test123', timestamp: 112};
  const newMarkers = [marker, newMarker];
  instance.addDragEndListener(1, newMarker);
  expect(container.state().markers).toEqual(newMarkers);
});

it('should swap markers', () => {
  const container = shallow(<Ymap />);
  const instance = container.instance();

  const marker1 = {coordinates: [1, 2], text: 'test', timestamp: 1};
  const marker2 = {coordinates: [1221, 123], text: 'test123', timestamp: 112};
  const markers = [marker1, marker2];
  instance.addMarker(marker1.timestamp, marker1.text, marker1.coordinates);
  instance.addMarker(marker2.timestamp, marker2.text, marker2.coordinates);
  expect(container.state().markers).toEqual(markers);

  const newMarkers = [marker2, marker1];
  instance.moveMarker(1, 0);
  expect(container.state().markers).toEqual(newMarkers);
});