import React, {Component} from 'react';
import Marker from './Marker';
import Polyline from './Polyline';
import PropTypes from 'prop-types';

class MarkerList extends Component {
  render() {  
    const {map, ymaps, deleteMarker, markers, addDragEndListener, removeDragEndListener, moveMarker} = this.props;
    let markersCoord = [];
    let markersArr = [];

    let i = 1;
    for (let marker in markers) {
      markersCoord.push(markers[marker].coordinates);
      markersArr.push(
        <Marker
          key={markers[marker].timestamp}
          text={markers[marker].text}
          id={markers[marker].timestamp}
          deleteMarker={deleteMarker}
          index={i}
          moveMarker={moveMarker}
          addDragEndListener={addDragEndListener} 
          removeDragEndListener={removeDragEndListener}/>
      ); 
      i++;
    }

    return (
      <ul className='marker-list'>
        {markersArr}
        <Polyline 
          markers={markers} 
          map={map} 
          ymaps={ymaps} 
          markersCoord={markersCoord} />
      </ul>
    );
  }
}

MarkerList.propTypes = {
  map: PropTypes.object, 
  ymaps: PropTypes.object, 
  deleteMarker: PropTypes.func, 
  markers: PropTypes.object, 
  addDragEndListener: PropTypes.func, 
  removeDragEndListener: PropTypes.func, 
};

export default MarkerList;


  