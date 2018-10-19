import React, {Component} from 'react';
import TestBackend from 'react-dnd-test-backend';
import {DragDropContext} from 'react-dnd';
import {mount} from 'enzyme';
import Marker from '../components/Marker';
import MarkerList from '../components/MarkerList';

const BoxContext = wrapInTestContext(MarkerList); 

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
        add: jest.fn,
        remove: jest.fn
      }
    },
    ymaps: {
      Polyline: class {
        constructor() {
          this.geometry = {
            setCoordinates: jest.fn
          };
        }
      },
      Placemark: class {
        constructor() {
          this.events = {
            add: jest.fn,
            remove: jest.fn
          };
        }
      }
    }
  };
};

function wrapInTestContext(DecoratedComponent) {
  return DragDropContext(TestBackend)(
    class TestContextContainer extends Component {
      render() {
        return <DecoratedComponent {...this.props} />;
      }
    }
  );
}


it('should move Marker', () => {
  const ids = {
    sourceId: 2,
    targetId: 0
  };

  let idsFromDnd = {};

  function moveMarker(sourceId, targetId) {
    idsFromDnd = {sourceId, targetId};
  }
  
  const root = mount(
    <BoxContext 
      markers={markers} 
      getMapY={getMapY}
      moveMarker={moveMarker}
      deleteMarker={jest.fn}
      addDragEndListener={jest.fn}
      removeDragEndListener={jest.fn} />
  );

  const manager = root.instance().getManager();
  const backend = manager.getBackend();

  const sourceId = root.find(Marker).at(ids.sourceId).instance().handler.ref.current.getHandlerId();
  const targetId = root.find(Marker).at(ids.targetId).instance().getHandlerId();

  backend.simulateBeginDrag([sourceId]);
  backend.simulateHover([targetId]);
  backend.simulateDrop();
  backend.simulateEndDrag();

  expect(idsFromDnd).toEqual(ids);
  root.unmount();
});

it('should delete marker', () => {
  let deleteIndex = null;
  const index = 2;
  const deleteMarker = i => deleteIndex = i; 

  const container = mount(
    <BoxContext 
      markers={markers} 
      getMapY={getMapY}
      moveMarker={jest.fn}
      deleteMarker={deleteMarker}
      addDragEndListener={jest.fn}
      removeDragEndListener={jest.fn} />
  );

  container.find('.marker__button').at(index).simulate('click');
  expect(deleteIndex).toEqual(index);
  container.unmount();
});