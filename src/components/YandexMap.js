import React, {Component} from 'react';

class YandexMap extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div 
        id={this.props.id} 
        className='yandex-map'
        style={{width: '450px', height: '450px'}}>
      </div>
    );
  }
}

export default YandexMap;
