import React, { Component } from 'react';
import MarkerList from './MarkerList';
import MarkerForm from './MarkerForm';
import update from 'immutability-helper';
import Loader from './Loader';

class Ymap extends Component {
  constructor() {
    super();

    this.state = {
      markers: [],
    };
  }

  render() {
    const {loaded, getMapY} = this.props;
    const {markers} = this.state;
    return (
      <div>
        {loaded ? (
          <div>
            <MarkerForm addMarker={this.addMarker} getMapY={getMapY} />
            <MarkerList 
              getMapY={getMapY} 
              deleteMarker={this.deleteMarker} 
              moveMarker={this.moveMarker}
              addDragEndListener={this.addDragEndListener}
              removeDragEndListener={this.removeDragEndListener}
              markers={markers} />
          </div>
        ) : (
          <Loader />
        )}
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

export default Ymap;