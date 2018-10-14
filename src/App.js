import React, { Component } from 'react';
import Ymap from './components/Ymap';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class App extends Component {
  render() {
    return <Ymap />;
  }
}

export default DragDropContext(HTML5Backend)(App);
