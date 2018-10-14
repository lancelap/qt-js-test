import React, { Component } from 'react';
import Map from './components/Map';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class App extends Component {
  render() {
    return <Map />;
  }
}

export default DragDropContext(HTML5Backend)(App);
