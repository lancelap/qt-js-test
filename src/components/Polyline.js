import { Component } from 'react';
import PropTypes from 'prop-types';

class Polyline extends Component {
  constructor() {
    super();
    this.polyline = null;
    this.index = null;
  }

  componentDidMount() {
    const {markers, ymaps, mapY} = this.props;
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
  markers: PropTypes.array.isRequired,
  mapY: PropTypes.object.isRequired,
  ymaps: PropTypes.object.isRequired
};

export default Polyline;
