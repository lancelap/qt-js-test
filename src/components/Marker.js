import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Marker extends Component {
  componentDidMount() {
    const {id, addDragEndListener} = this.props;
    addDragEndListener(id);
  }

  componentWillMount() {
    const {id, removeDragEndListener} = this.props;
    removeDragEndListener(id);
  }

  render() {
    const {text, id, deleteMarker} = this.props;

    return (
      <li className='marker'>
        <p className='marker__text'>{text}</p>
        <button className='marker__button' onClick={this.clickHandeler(id, deleteMarker)}>X</button>
      </li>
    );
  }

  clickHandeler = (id, deleteMarker) => (e) => {
    e.preventDefault();
    deleteMarker(id);
  }
}

Marker.propTypes = {
  id: PropTypes.number,
  deleteMarker: PropTypes.func, 
  addDragEndListener: PropTypes.func, 
  removeDragEndListener: PropTypes.func, 
};

export default Marker;