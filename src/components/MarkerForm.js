import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MarkerForm extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  render() {
    return(
      <form className='marker-form' onSubmit={this.onSubmit}>
        <input className='marker-form__input'
          type="text"
          value={this.state.text}
          placeholder="Новая точка маршрута" 
          onChange={this.onChangeMarkerTitle} />
      </form>
    );
  }

  onChangeMarkerTitle = (e) => {
    this.setState({
      text: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const mapY = this.props.getMapY().mapY;
    this.props.addMarker(Date.now(), this.state.text, mapY.getCenter());
    this.setState({text: ''});
  }
}

MarkerForm.propTypes = {
  addMarker: PropTypes.func.isRequired, 
  getMapY: PropTypes.func.isRequired
};

export default MarkerForm;