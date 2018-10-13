import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MarkerForm extends Component {
  constructor() {
    super()
    this.state = {
      text: ''
    }
  }

  render() {
    return(
      <form onSubmit={this.onSubmit}>
        <input style={{width: '196px'}}
          type="text"
          value={this.state.text}
          disabled={!this.props.loaded}
          placeholder="Новая точка маршрута" 
          onChange={this.onChangeMarkerTitle} />
      </form>
    )
  }

  onChangeMarkerTitle = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addMarker(Date.now(), this.state.text);
    this.setState({text: ''})
  }
}

MarkerForm.propTypes = {
  loaded: PropTypes.bool, 
  addMarker: PropTypes.func, 
}

export default MarkerForm;