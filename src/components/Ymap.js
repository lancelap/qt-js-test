import React, { Component } from 'react';
import loadScriptMap from '.././loadScriptMap';
import MarkerList from './MarkerList';
import Loader from './Loader';
import YandexMap from './YandexMap';

class Ymap extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      mapId: 'YMapsID',
      mapY: null,
      ymaps: null
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
    const {loaded, mapId, ymaps, mapY} = this.state;
    return (      
      <div className='map'>
        {loaded ? (
          <MarkerList ymaps={ymaps} mapY={mapY}/>
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

    this.setState({
      loaded: true,
      mapY: mapY,
      ymaps: ymaps
    });
  }
}

export default Ymap;
