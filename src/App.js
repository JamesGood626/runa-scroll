import React, { Component } from 'react'

import './App.css'

import Runa from './Runa'
import RunaBackground from './runaBackground'

class App extends Component {
  render() {
    return (
      // Will need to dynamically create these to accomodate for the total length of the page
      // Will more than likely require some kind of strange calculations, as currently I'm using 200vh
      // in the css styling for the background svg to get the desired height.
      <div className="topContainer">
        <RunaBackground/>
        <RunaBackground/>
        <RunaBackground/>
        <RunaBackground/>
        <RunaBackground/>
        <RunaBackground/>
        <Runa/>
      </div>
    )
  }
}

export default App
