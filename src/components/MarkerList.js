import React, {Component} from 'react';
import MarkerContainer from './MarkerContainer';
import Polyline from './Polyline';
import PropTypes from 'prop-types';

class MarkerList extends Component {
  render() {  
    const {deleteMarker, markers, addDragEndListener, removeDragEndListener, moveMarker, getMapY} = this.props;
    const markersArr = markers.map((marker, index) => {
      return <MarkerContainer
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

      <div>
        <ul className='marker-list'>
          {markersArr}
        </ul>
        <Polyline markers={coords} getMapY={getMapY} />
      </div>
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


  