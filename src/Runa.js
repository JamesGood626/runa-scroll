import React, { Component } from "react";
import { SmoothScroll } from "./util/smoothScroll";
import runaOne from "./images/runa-1-cutout.svg";
import runaTwo from "./images/runa-2-cutout.svg";
import runaThree from "./images/runa-3-cutout.svg";
import runaFour from "./images/runa-4-cutout.svg";
import runaFive from "./images/runa-5-cutout.svg";
import runaSix from "./images/runa-6-cutout.svg";
import runaSeven from "./images/runa-7-cutout.svg";
import runaEight from "./images/runa-8-cutout.svg";
import runaNine from "./images/runa-9-cutout.svg";
import runaTen from "./images/runa-10-cutout.svg";
import runaEleven from "./images/runa-11-cutout.svg";
import runaTwelve from "./images/runa-12-cutout.svg";
import runaThirteen from "./images/runa-13-cutout.svg";
import runaFourteen from "./images/runa-14-cutout.svg";
import runaFifteen from "./images/runa-15-cutout.svg";
import runaSixteen from "./images/runa-16-cutout.svg";
import runaSeventeen from "./images/runa-17-cutout.svg";
import runaEighteen from "./images/runa-18-cutout.svg";
import runaNineteen from "./images/runa-19-cutout.svg";

// For the next go round when I add the lime Runa can... just add runaArr as props
// And then when I scroll to a certain spot on the page, I can just swap out the array
// and so forth if the page is to be scrolled back up

// basically if the scrollIncrement * the total length of runaArr is a full Rotation
// then I want to increment the scrollHeightLap so that it can be multiplied by the full Rotation
// so if the increment for every 31 scollY a svg gets swapped out. then the ranges would be 0 to 31,
// and 31 to 62 etc.. for the first rotation.

// AFTER incrementing scrollHeightLap to one. it should be 633 to 664, and 665 to 696 etc...
// HOWEVER, due to my check being against if scrollY > fullRotation * rotationCount else scrollY < fullRotation * rotationCOunt
// Well.. it puts the scrollHeightLap in a bind, as it'll only decrement the entire way to the first waypoint (602 scrollY for
// fullRotation) What can I do to mitigate that? It seems like scroll magic has some method for tweening between those states.

// That logic went into when the rotateIndex is set to 1 or 19. if set to 1 fullRotation increments, if set to 19 it fullRotation decrements.
class Runa extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollHeightLevel: 0,
      prevRotateIndex: 1,
      rotateIndex: 1,
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
    };
  }

  componentDidMount = () => {
    // oooooo thatttssss nicccceee
    new SmoothScroll(document, 120, 12);
    window.addEventListener("scroll", this.onScroll);
  };

  getScrollIncrement = runaArr => {
    const totalAmountOfPossibleScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    let scrollIncrement =
      totalAmountOfPossibleScroll / runaArr.length / runaArr.length;
    scrollIncrement = scrollIncrement * 6; // adjust the multiplier based on the clientHeight.
    return scrollIncrement;
  };

  getLowEndRange = (
    rotateIndex,
    scrollHeightLevel,
    fullRotation,
    scrollIncrement
  ) => {
    const lowEndRangeCalculation =
      rotateIndex * scrollIncrement - scrollIncrement;
    return scrollHeightLevel === 0
      ? lowEndRangeCalculation
      : lowEndRangeCalculation + scrollHeightLevel * fullRotation;
  };

  getHighEndRange = (
    rotateIndex,
    scrollHeightLevel,
    fullRotation,
    scrollIncrement
  ) => {
    const highEndRangeCalculation = rotateIndex * scrollIncrement;
    return scrollHeightLevel === 0
      ? highEndRangeCalculation
      : highEndRangeCalculation + scrollHeightLevel * fullRotation;
  };

  setDefaultScrollRotationIndex = scrollY => {
    this.setState((prevState, state) => ({
      prevScrollPosition: scrollY,
      prevRotateIndex: prevState.rotateIndex,
      rotateIndex: 1
    }));
  };

  setDecrementRotationCountAndScrollHeightLevel = () => {
    this.setState((prevState, state) => ({
      rotateIndex: 19,
      scrollHeightLevel: prevState.scrollHeightLevel - 1,
      rotationCount: prevState.rotationCount - 1
    }));
  };

  setDecrementRotateIndex = () => {
    this.setState((prevState, state) => ({
      rotateIndex: prevState.rotateIndex - 1
    }));
  };

  setIncrementRotationCountAndScrollHeightLevel = () => {
    this.setState((prevState, state) => ({
      rotateIndex: 1,
      scrollHeightLevel: prevState.scrollHeightLevel + 1,
      rotationCount: prevState.rotationCount + 1
    }));
  };

  setIncrementRotateIndex = () => {
    this.setState((prevState, state) => ({
      rotateIndex: prevState.rotateIndex + 1
    }));
  };

  switchOverIncrementOrDecrementsetStateOptions = (
    scrollY,
    lowEndRange,
    highEndRange,
    rotateIndex
  ) => {
    if (scrollY === 0) {
      this.setDefaultScrollRotationIndex(scrollY);
    }
    if (lowEndRange < scrollY && scrollY < highEndRange) {
      return;
    } else if (lowEndRange > scrollY) {
      if (rotateIndex - 1 === 0) {
        // rotateIndex set to 19
        this.setDecrementRotationCountAndScrollHeightLevel();
      } else {
        this.setDecrementRotateIndex();
      }
    } else if (scrollY > highEndRange) {
      if (rotateIndex + 1 === 20) {
        // rotateIndex set to 1
        this.setIncrementRotationCountAndScrollHeightLevel();
      } else {
        this.setIncrementRotateIndex();
      }
    }
  };

  onScroll = event => {
    const { scrollHeightLevel, rotateIndex, runaArr } = this.state;
    const scrollY = window.scrollY;
    const scrollIncrement = this.getScrollIncrement(runaArr);
    const fullRotation = scrollIncrement * runaArr.length;
    const lowEndRange = this.getLowEndRange(
      rotateIndex,
      scrollHeightLevel,
      fullRotation,
      scrollIncrement
    );
    const highEndRange = this.getHighEndRange(
      rotateIndex,
      scrollHeightLevel,
      fullRotation,
      scrollIncrement
    );
    // console.log("THE LOW END RANGE: ", lowEndRange);
    // console.log("THE SCROLL Y: ", scrollY);
    // console.log("THE HIGH END RANGE: ", highEndRange);
    this.switchOverIncrementOrDecrementsetStateOptions(
      scrollY,
      lowEndRange,
      highEndRange,
      rotateIndex
    );
  };

  renderRuna = () => {
    return this.state.runaArr[this.state.rotateIndex - 1];
  };

  render() {
    return (
      <div className="runaContainer">
        <img src={this.renderRuna()} className="image" />
      </div>
    );
  }
}

export default Runa;

// onScroll = event => {
//   const totalAmountOfPossibleScroll =
//     document.documentElement.scrollHeight - window.innerHeight;
//   const scrollY = window.scrollY;
//   const scrollIncrement =
//     totalAmountOfPossibleScroll /
//     this.state.runaArr.length /
//     this.state.runaArr.length;
//   console.log(totalAmountOfPossibleScroll);
//   console.log("THE SCROLL Y: ", scrollY);
//   console.log("TOTAL RUNA ARR LENGTH: ", this.state.runaArr.length);
//   // console.log(
//   //   "DIVIDED AMOUNT: ",
//   //   totalAmountOfPossibleScroll / this.state.runaArr.length
//   // );
//   console.log(
//     "DIVIDED AMOUNT ONCE MORE TO GET A SMALLER PERCENTAGE: ",
//     scrollIncrement
//   );
//   if (scrollY === 0) {
//     this.setState((prevState, state) => ({
//       prevScrollPosition: scrollY,
//       prevRotateIndex: prevState.rotateIndex,
//       rotateIndex: 0
//     }));
//   } else if (
//     scrollY < 800 &&
//     this.state.rotateIndex < this.state.prevRotateIndex
//   ) {
//     this.setState((prevState, state) => ({
//       prevScrollPosition: scrollY,
//       prevRotateIndex: prevState.rotateIndex,
//       rotateIndex: prevState.rotateIndex > 0 ? prevState.rotateIndex - 3 : 0
//     }));
//   } else if (scrollY > this.state.prevScrollPosition) {
//     this.setState((prevState, state) => ({
//       prevScrollPosition: scrollY,
//       rotateIndex: prevState.rotateIndex < 18 ? prevState.rotateIndex + 1 : 0
//     }));
//   } else if (scrollY < this.state.prevScrollPosition) {
//     this.setState((prevState, state) => ({
//       prevScrollPosition: scrollY,
//       rotateIndex: prevState.rotateIndex > 0 ? prevState.rotateIndex - 1 : 18
//     }));
//   }
// };
