import { Component } from 'react';
import PropTypes from 'prop-types';

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

Polyline.propTypes = {
  map: PropTypes.object, 
  ymaps: PropTypes.object, 
  markersCoord: PropTypes.array
};

export default Polyline;