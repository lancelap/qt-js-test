import React, {Component} from 'react';
import Marker from './Marker';
import Polyline from './Polyline';
import PropTypes from 'prop-types';

class MarkerList extends Component {
  render() {  
    const {deleteMarker, markers, addDragEndListener, removeDragEndListener, moveMarker, getMapY} = this.props;
    const markersArr = markers.map((marker, index) => {
      return <Marker
        key={marker.timestamp}
        text={marker.text}
        id={marker.timestamp}
        deleteMarker={deleteMarker}
        index={index}
        moveMarker={moveMarker}
        addDragEndListener={addDragEndListener} 
        removeDragEndListener={removeDragEndListener}
        getMapY={getMapY} />;
    });
    const coords = markers.map((marker) => {
      return marker.coordinates;
    });

    return (
      <ul className='marker-list'>
        {markersArr}
        <Polyline markers={coords} getMapY={getMapY} />
      </ul>
    );
  }
}

MarkerList.propTypes = {
  getMapY: PropTypes.func, 
  deleteMarker: PropTypes.func, 
  markers: PropTypes.array, 
  addDragEndListener: PropTypes.func, 
  removeDragEndListener: PropTypes.func, 
};

export default MarkerList;


  