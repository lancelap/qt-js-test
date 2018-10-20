import React, {Component} from 'react';
import TestBackend from 'react-dnd-test-backend';
import {DragDropContext} from 'react-dnd';
import {mount} from 'enzyme';
import Marker from '../components/Marker';
import MarkerList from '../components/MarkerList';

const BoxContext = wrapInTestContext(MarkerList); 
let container = null;

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

const testIndexes = {
  sourceId: 0,
  targetId: 1
};

beforeAll(() => {
  container = mount(
    <BoxContext mapY={mapY} ymaps={ymaps} />
  );

  container.find('.marker-form__input').simulate('change', {target: {value: 'test1'}});
  container.find('form').simulate('submit');

  container.find('.marker-form__input').simulate('change', {target: {value: 'test2'}});
  container.find('form').simulate('submit');

  container.find('.marker-form__input').simulate('change', {target: {value: 'test3'}});
  container.find('form').simulate('submit');
});

afterAll(() => {
  container.unmount();
});

function wrapInTestContext(DecoratedComponent) {
  return DragDropContext(TestBackend)(
    class TestContextContainer extends Component {
      render() {
        return <DecoratedComponent {...this.props} />;
      }
    }
  );
}

it('should render the markers', () => {
  expect(container.find('.marker').length).toEqual(3);
});

it('should change the marker opacity when dragging', () => {
  const manager = container.instance().getManager();
  const backend = manager.getBackend();

  const source = container.find(Marker).at(testIndexes.sourceId);
  const target = container.find(Marker).at(testIndexes.targetId);

  const sourceId = source.instance().handler.ref.current.getHandlerId();
  const targetId = target.instance().getHandlerId();

  backend.simulateBeginDrag([sourceId]);

  container.update();
  expect(container.find('.marker').at(testIndexes.sourceId).props().style.opacity).toEqual(0);

  backend.simulateHover([targetId]);
  container.update();
  expect(container.find('.marker').at(testIndexes.sourceId).props().style.opacity).toEqual(1);

  backend.simulateDrop();
  backend.simulateEndDrag();
});

it('should delete marker', () => {
  expect(container.find('.marker').length).toEqual(3);
  container.find('.marker__button').at(1).simulate('click');
  expect(container.find('.marker').length).toEqual(2);
});

it('should add marker', () => {
  expect(container.find('.marker').length).toEqual(2);

  const value = '__should add marker__';
  container.find('.marker-form__input').simulate('change', {target: {value}});
  container.find('form').simulate('submit');

  expect(container.find('.marker').length).toEqual(3);
  expect(container.find('.marker__text').last().text()).toEqual(value);
});


it('should swap markers', () => {
  const backend = container.instance().getManager().getBackend();

  const source = container.find(Marker).at(testIndexes.sourceId);
  const target = container.find(Marker).at(testIndexes.targetId);

  const sourceId = source.instance().handler.ref.current.getHandlerId();
  const targetId = target.instance().getHandlerId();

  const sourceText = container.find('.marker__text').at(testIndexes.sourceId).text();
  const targetText = container.find('.marker__text').at(testIndexes.targetId).text();

  backend.simulateBeginDrag([sourceId]);
  backend.simulateHover([targetId]);
  backend.simulateDrop();
  backend.simulateEndDrag();
  container.update();

  expect(container.find('.marker__text').at(testIndexes.sourceId).text()).toEqual(targetText);
  expect(container.find('.marker__text').at(testIndexes.targetId).text()).toEqual(sourceText);
});

it('shouldn`t replace items with themselves', () => {
  const testIndexes = {
    sourceId: 1,
    targetId: 1
  };
  const backend = container.instance().getManager().getBackend();

  const source = container.find(Marker).at(testIndexes.sourceId);
  const target = container.find(Marker).at(testIndexes.targetId);

  const sourceId = source.instance().handler.ref.current.getHandlerId();
  const targetId = target.instance().getHandlerId();

  const sourceText = container.find('.marker__text').at(testIndexes.sourceId).text();
  const targetText = container.find('.marker__text').at(testIndexes.targetId).text();

  backend.simulateBeginDrag([sourceId]);
  backend.simulateHover([targetId]);
  backend.simulateDrop();
  backend.simulateEndDrag();
  container.update();

  expect(container.find('.marker__text').at(testIndexes.sourceId).text()).toEqual(targetText);
  expect(container.find('.marker__text').at(testIndexes.targetId).text()).toEqual(sourceText);
});
