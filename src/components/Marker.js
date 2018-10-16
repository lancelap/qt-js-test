import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Marker extends Component {
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

Marker.propTypes = {
  id: PropTypes.number,
  deleteMarker: PropTypes.func, 
  addDragEndListener: PropTypes.func, 
  getMapY: PropTypes.func
};

export default Marker;