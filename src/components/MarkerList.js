import React, {Component} from 'react';
import Marker from './Marker';
import Polyline from './Polyline';
import PropTypes from 'prop-types';

class MarkerList extends Component {
  render() {  
    const {map, ymaps, deleteMarker, markers, addDragEndListener, removeDragEndListener} = this.props;
    let markersCoord = [];
    let markersArr = [];

    for (let marker in markers) {
      markersCoord.push(markers[marker].coordinates);
      markersArr.push(
        <Marker
          key={markers[marker].timestamp}
          text={markers[marker].text}
          id={markers[marker].timestamp}
          deleteMarker={deleteMarker}
          addDragEndListener={addDragEndListener} 
          removeDragEndListener={removeDragEndListener}/>
      ) 
    }

    return (
      <div>
        <ul>
          {markersArr}
        </ul>
        <Polyline 
          markers={markers} 
          map={map} 
          ymaps={ymaps} 
          markersCoord={markersCoord} />
      </div>
    )
  }
}

MarkerList.propTypes = {
  map: PropTypes.object, 
  ymaps: PropTypes.object, 
  deleteMarker: PropTypes.func, 
  markers: PropTypes.object, 
  addDragEndListener: PropTypes.func, 
  removeDragEndListener: PropTypes.func, 
}

export default MarkerList;


  