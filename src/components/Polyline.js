import { Component } from 'react';

class Polyline extends Component {
  constructor() {
    super();
    this.polyline = null;
    this.index = null;
  }

  componentDidMount() {
    const {map, ymaps, markersCoord} = this.props;
    this.polyline = new ymaps.Polyline(markersCoord);
    map.geoObjects.add(this.polyline);
  }
  
  componentDidUpdate() {
    const {markersCoord} = this.props;
    this.polyline.geometry.setCoordinates(markersCoord);
  }
  
  render() {
    return null;
  }
}

export default Polyline;