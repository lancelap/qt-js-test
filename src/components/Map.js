import React, { Component } from 'react';
import loadScriptMap from '../loadScriptMap';

class Map extends Component {
  constructor() {
    super();

    this.state = {
      map: null,
      loaded: false,
      YMapsID: 'YMapsID'
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log( '___' , this.props, nextProps, '___', this.state, nextState)
  //   return true
  // }

  componentDidMount() {
    loadScriptMap('https://api-maps.yandex.ru/2.1/?lang=ru_RU&onload=initYandexMap')
      .then((ymaps) => {
        const mapY = new ymaps.Map("YMapsID", {
          center: [55.87, 37.66],
          zoom: 10
        });

        this.setState({
          map: mapY,
          loaded: true
        })
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div>
        <h1>Map</h1>
        <div id="YMapsID" style={{backgroundColor: 'red', width: '450px', height: '350px'}}></div>  
      </div>
    )
  }

}

export default Map;