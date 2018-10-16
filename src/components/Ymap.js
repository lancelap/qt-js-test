import React, { Component } from 'react';
import loadScriptMap from '../loadScriptMap';
import YandexMap from './YandexMap';
import MarkerList from './MarkerList';
import MarkerForm from './MarkerForm';
import update from 'immutability-helper';


class Ymap extends Component {
  constructor() {
    super();
    this.getMapY = null;

    this.state = {
      loaded: false,
      mapId: 'YMapsID',
      markers: [],
    };
  }

  componentDidMount() {
    loadScriptMap('https://api-maps.yandex.ru/2.1/?lang=ru_RU&onload=initYandexMap')
      .then((ymaps) => {
        this.initMap(ymaps);
      })
      .catch(error => console.error(error));
  }

  initMap(ymaps) {
    const mapY = new ymaps.Map(this.state.mapId, {
      center: [55.87, 37.66],
      zoom: 10
    });

    this.getMapY = function() {
      return {
        ymaps,
        mapY
      };
    };

    this.setState({
      loaded: true
    });
  }

  render() {
    const {mapId, loaded, markers} = this.state;
    return (
      <div className='map'>
        {loaded ? (
          <div>
            <MarkerForm addMarker={this.addMarker} getMapY={this.getMapY} />
            <MarkerList 
              getMapY={this.getMapY} 
              deleteMarker={this.deleteMarker} 
              moveMarker={this.moveMarker}
              addDragEndListener={this.addDragEndListener}
              removeDragEndListener={this.removeDragEndListener}
              markers={markers} />
          </div>
        ) : (
          null
        )}
        
        <YandexMap id={mapId} />
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