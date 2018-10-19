import React, { Component } from 'react';
import loadScriptMap from '.././loadScriptMap';
import MarkerList from './MarkerList';
import Loader from './Loader';
import YandexMap from './YandexMap';

class Ymap extends Component {
  constructor() {
    super();
    this.getMapY = null;
    this.state = {
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

  render() {
    const {loaded, mapId} = this.state;
    return (      
      <div className='map'>
        {loaded ? (
          <MarkerList getMapY={this.getMapY} />
        ) : (
          <Loader />
        )}
        <YandexMap id={mapId} />
      </div>);
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
}

export default Ymap;