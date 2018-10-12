import React, { Component } from 'react';
import loadScriptMap from '../loadScriptMap';
import YandexMap from './YandexMap';

class Map extends Component {
  constructor() {
    super();

    this.state = {
      map: null,
      loaded: false,
      mapId: 'YMapsID'
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
      loaded: true
    })
  }

  render() {
    return <YandexMap id={this.state.mapId}/>
  }

}

export default Map;