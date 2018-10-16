import { Component } from 'react';
import PropTypes from 'prop-types';

class Polyline extends Component {
  constructor() {
    super();
    this.polyline = null;
    this.index = null;
  }

  componentDidMount() {
    const {markers, getMapY} = this.props;
    const {ymaps, mapY} = getMapY();
    this.polyline = new ymaps.Polyline(markers);
    mapY.geoObjects.add(this.polyline);
  }
  
  componentDidUpdate() {
    const {markers} = this.props;
    this.polyline.geometry.setCoordinates(markers);
  }
  
  render() {
    return null;
  }
}

Polyline.propTypes = {
  markers: PropTypes.array,
  getMapY: PropTypes.func
};

export default Polyline;