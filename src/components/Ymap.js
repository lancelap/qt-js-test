import React, { Component } from 'react';
import loadScriptMap from '../loadScriptMap';
import YandexMap from './YandexMap';
import MarkerList from './MarkerList';
import MarkerForm from './MarkerForm';


class Ymap extends Component {
  constructor() {
    super();

    this.state = {
      map: {},
      ymaps: {},
      loaded: false,
      mapId: 'YMapsID',
      markers: {},
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

    this.setState({
      map: mapY,
      ymaps: ymaps,
      loaded: true
    });
  }

  render() {
    const {mapId, map, ymaps, loaded, markers} = this.state;
    return (
      <div className='map'>
        <div>
          <MarkerForm addMarker={this.addMarker} loaded={loaded} />

          {loaded ? (
            <MarkerList 
              map={map} 
              deleteMarker={this.deleteMarker} 
              moveMarker={this.moveMarker}
              addDragEndListener={this.addDragEndListener}
              removeDragEndListener={this.removeDragEndListener}
              ymaps={ymaps} 
              markers={markers} />
          ) : (
            null
          )}
        </div>
        
        <YandexMap id={mapId} />
      </div>
    );
  }

  addMarker = (id, text) => {
    const {map, ymaps} = this.state;
    const coordinates = map.getCenter();
    const placemark = new ymaps.Placemark(coordinates, {balloonContent: text}, { 
      draggable: true 
    });

    map.geoObjects.add(placemark); 
    const marker = {timestamp: id, text, coordinates, placemark};
    this.setState({markers: {...this.state.markers, [id]: marker}});
  }

  deleteMarker = (id) => {
    const newMarkers = {...this.state.markers};
    this.state.map.geoObjects.remove(newMarkers[id].placemark);
    delete newMarkers[id];

    this.setState({markers: {...newMarkers}});
  }

  addDragEndListener = (id) => {
    const markers = this.state.markers;
    const marker = markers[id].placemark;

    marker.events.add('dragend', () => {
      const newMarkers = {...this.state.markers};
      newMarkers[id].coordinates = marker.geometry.getCoordinates();
      this.setState({markers: {...newMarkers}});
    });
  }

  removeDragEndListener = (id) => {
    const markers = this.state.markers;
    const marker = markers[id].placemark;
    
    marker.events.remove('dragend');
  }

  moveMarker = (dragIndex, hoverIndex) => {

    console.log(dragIndex, hoverIndex);
  }

}

export default Ymap;