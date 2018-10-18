import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import loadScriptMap from './loadScriptMap';
import Ymap from './components/Ymap';
import YandexMap from './components/YandexMap';

class App extends Component {
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
    const {mapId, loaded} = this.state;
    return (
      <div className='map'>
        <Ymap getMapY={this.getMapY} mapId={mapId} loaded={loaded} />
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

export default DragDropContext(HTML5Backend)(App);
