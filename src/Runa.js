import React, { Component } from 'react'
import runaOne from './images/runa-1-cutout.svg'
import runaTwo from './images/runa-2-cutout.svg'
import runaThree from './images/runa-3-cutout.svg'
import runaFour from './images/runa-4-cutout.svg'
import runaFive from './images/runa-5-cutout.svg'
import runaSix from './images/runa-6-cutout.svg'
import runaSeven from './images/runa-7-cutout.svg'
import runaEight from './images/runa-8-cutout.svg'
import runaNine from './images/runa-9-cutout.svg'
import runaTen from './images/runa-10-cutout.svg'
import runaEleven from './images/runa-11-cutout.svg'
import runaTwelve from './images/runa-12-cutout.svg'
import runaThirteen from './images/runa-13-cutout.svg'
import runaFourteen from './images/runa-14-cutout.svg'
import runaFifteen from './images/runa-15-cutout.svg'
import runaSixteen from './images/runa-16-cutout.svg'
import runaSeventeen from './images/runa-17-cutout.svg'
import runaEighteen from './images/runa-18-cutout.svg'
import runaNineteen from './images/runa-19-cutout.svg'

// For the next go round when I add the lime Runa can... just add runaArr as props
// And then when I scroll to a certain spot on the page, I can just swap out the array
// and so forth if the page is to be scrolled back up

class Runa extends Component {
  constructor(props) {
    super(props)

    this.state = {
      prevScrollPosition: 0,
      prevRotateIndex: 0,
      rotateIndex: 0,
      runaArr: [
        runaOne,
        runaTwo,
        runaThree,
        runaFour,
        runaFive,
        runaSix,
        runaSeven,
        runaEight,
        runaNine,
        runaTen,
        runaEleven,
        runaTwelve,
        runaThirteen,
        runaFourteen,
        runaFifteen,
        runaSixteen,
        runaSeventeen,
        runaEighteen,
        runaNineteen
      ]
    }
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.onScroll)
  }

  renderRuna = () => {
    // Arr will be cycled through as component's state (or redux)
    // is incremented 0 through 18 and back to 0 again which will be triggered
    // by scrolling up and down (in which case scrolling up decrements)
    return this.state.runaArr[this.state.rotateIndex]
  }

  onScroll = event => {
    let scrollY = window.scrollY
    if (scrollY === 0) {
      this.setState((prevState, state) => ({
        prevScrollPosition: scrollY,
        prevRotateIndex: prevState.rotateIndex,
        rotateIndex: 0
      }))
    }
    else if(scrollY < 800 && this.state.rotateIndex < this.state.prevRotateIndex) {
      this.setState((prevState, state) => ({
        prevScrollPosition: scrollY,
        prevRotateIndex: prevState.rotateIndex,
        rotateIndex: (prevState.rotateIndex > 0) ? prevState.rotateIndex - 3 : 0
      }))
    }
    else if (scrollY > this.state.prevScrollPosition) {
      this.setState((prevState, state) => ({
        prevScrollPosition: scrollY,
        rotateIndex: (prevState.rotateIndex < 18) ? prevState.rotateIndex + 1 : 0
      }))
    }
    else if(scrollY < this.state.prevScrollPosition) {
      this.setState((prevState, state) => ({
        prevScrollPosition: scrollY,
        rotateIndex: (prevState.rotateIndex > 0) ? prevState.rotateIndex - 1 : 18
      }))
    }
  }

  render() {
    console.log("ROTATE INDEX", this.state.rotateIndex)
    return (
      <div className="runaContainer">
        <img src={ this.renderRuna() } className="image"/>
      </div>
    )
  }
}

export default Runa