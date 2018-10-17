import React from 'react';
import {shallow, mount} from 'enzyme';
import Marker from '../components/Marker';

it('should delete marker', () => {
  let deleteIndex = null;
  const index = Math.random();
  const identity = el => el;
  const deleteMarker = index => deleteIndex = index; 

  const container = mount(<Marker 
    id={Math.random()}
    index={index}
    deleteMarker={deleteMarker}
    addDragEndListener={jest.fn()}
    getMapY={jest.fn()}
    connectDragSource={identity}
    connectDropTarget={identity}
  />); 

  container.find('.marker__button').simulate('click');
  expect(deleteIndex).toEqual(index);
});

it('should set opacity when is dragging', () => {
  const index = Math.random();
  const identity = el => el;

  const container = shallow(<Marker 
    id={Math.random()}
    index={index}
    isDragging
    deleteMarker={jest.fn()}
    addDragEndListener={jest.fn()}
    getMapY={jest.fn()}
    connectDragSource={identity}
    connectDropTarget={identity}
  />); 

  expect(container.prop('style').opacity).toEqual(0);
});
