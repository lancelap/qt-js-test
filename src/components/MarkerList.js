import React, {Component} from 'react';
import update from 'immutability-helper';
import Marker from './Marker';
import Polyline from './Polyline';
import PropTypes from 'prop-types';
import MarkerForm from './MarkerForm';

class MarkerList extends Component {
  constructor() {
    super();

    this.state = {
      markers: [],
    };
  }
  
  render() {  
    const {markers} = this.state;
    const {mapY, ymaps} = this.props;

    const markersArr = markers.map((marker, index) => {
      return <Marker
        key={marker.timestamp}
        text={marker.text}
        id={marker.timestamp}
        deleteMarker={this.deleteMarker}
        index={index}
        moveMarker={this.moveMarker}
        addDragEndListener={this.addDragEndListener} 
        ymaps={ymaps} 
        mapY={mapY} />;
    });
    const coords = markers.map((marker) => {
      return marker.coordinates;
    });

    return (
      <div>
        <MarkerForm 
          addMarker={this.addMarker} 
          mapY={mapY} />

        <ul className='marker-list'>
          {markersArr}
        </ul>

        <Polyline 
          markers={coords} 
          ymaps={ymaps} 
          mapY={mapY} />
      </div>
    );
  }

  addMarker = (id, text, coordinates) => {
    const marker = {timestamp: id, text, coordinates};
    this.setState({
      markers: [...this.state.markers, marker]
    });
  }

  deleteMarker = (index) => {
    this.setState(
      update(this.state, {
        markers: {
          $splice: [[index, 1]]
        }
      })
    );
  }

  addDragEndListener = (index, placemark) => {
    this.setState(
      update(this.state, {
        markers: {
          $splice: [[index, 1, placemark]]
        }
      })
    );
  }

  moveMarker = (dragIndex, hoverIndex) => {
    const {markers} = this.state;
    const dragCard = markers[dragIndex];

    this.setState(
      update(this.state, {
        markers: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        },
      }),
    );
  }
}

MarkerList.propTypes = {
  mapY: PropTypes.object.isRequired,
  ymaps: PropTypes.object.isRequired
};

export default MarkerList;


  