import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {DragSource, DropTarget} from 'react-dnd';
import flow from 'lodash/flow';

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

    // Time to actually perform the action
    props.moveMarker(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

class Marker extends Component {
  componentDidMount() {
    const {addDragEndListener, text, id, mapY, ymaps} = this.props;
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
    this.props.mapY.geoObjects.remove(this.placemark);
  }

  render() {
    const {
      text, 
      index, 
      deleteMarker,
      isDragging,
      connectDragSource,
      connectDropTarget 
    } = this.props;

    const opacity = isDragging ? 0 : 1;

    return (
      connectDragSource(
        connectDropTarget(
          <li className='marker' style={{opacity}}>
            <p className='marker__text'>{text}</p>
            <button className='marker__button' onClick={this.clickHandeler(index, deleteMarker)}>X</button>
          </li>
        ),
      )
    );
  }

  clickHandeler = (index, deleteMarker) => (e) => {
    e.preventDefault();
    deleteMarker(index);
  }
}

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
)(Marker);

Marker.propTypes = {
  id: PropTypes.number.isRequired,
  deleteMarker: PropTypes.func.isRequired, 
  addDragEndListener: PropTypes.func.isRequired, 
  text: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
};
