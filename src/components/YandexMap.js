import React, {Component} from 'react';

class YandexMap extends Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <div 
        id={this.props.id} 
        style={{backgroundColor: 'lightgray', width: '450px', height: '350px'}}>
      </div>
    )
  }
}

export default YandexMap;