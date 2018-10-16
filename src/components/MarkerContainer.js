import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd';
import flow from 'lodash/flow';
import Marker from './Marker';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
    };
  },
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = (findDOMNode(
      component,
    )).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = (clientOffset).y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveMarker(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

class MarkerContainer extends Component {
  componentDidMount() {
    const {addDragEndListener, text, id, getMapY} = this.props;
    const {ymaps, mapY} = getMapY();
    const coordinates = mapY.getCenter();

    const placemark = new ymaps.Placemark(coordinates, {
      balloonContent: this.props.text
    }, { 
      draggable: true 
    });

    this.placemark = placemark;
    
    mapY.geoObjects.add(placemark); 

    placemark.events.add('dragend', () => {
      const coordinates = placemark.geometry.getCoordinates();
      addDragEndListener(this.props.index, {timestamp: id, text, coordinates});
    });
  }

  componentWillUnmount() {
    this.placemark.events.remove('dragend');
    this.props.getMapY().mapY.geoObjects.remove(this.placemark);
  }

  render() {return <Marker {...this.props} />;}
}

MarkerContainer.propTypes = {
  id: PropTypes.number,
  deleteMarker: PropTypes.func, 
  addDragEndListener: PropTypes.func, 
  getMapY: PropTypes.func
};

export default flow(
  DragSource(
    'marker',
    cardSource,
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  ),
  DropTarget('marker', cardTarget, (connect) => ({
    connectDropTarget: connect.dropTarget(),
  }))
)(MarkerContainer);