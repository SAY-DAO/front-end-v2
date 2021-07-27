// import React from 'react';
// import Sound from "react-sound";
// import { withStyles, makeStyles } from '@material-ui/core/styles';
// import Slider from '@material-ui/core/Slider';
// import PlayCircleIcon from '@material-ui/icons/PlayCircle';
// import PauseCircleIcon from '@material-ui/icons/PauseCircle';

// // For multi-language
// // import { dirflex, justifyRight } from "./base";

// const PrettoSlider = withStyles({
//   root: {
//     color: '#fff',
//     height: 8,
//   },
//   thumb: {
//     height: 16,
//     width: 16,
//     backgroundColor: '#fff',
//     border: '2px solid currentColor',
//     marginTop: -4,
//     marginLeft: -6,
//     '&:focus,&:hover,&$active': {
//       boxShadow: 'inherit',
//     },
//   },
//   active: {},
//   valueLabel: {
//     // left: "calc(-50% + 4px)"
//     display: 'none',
//   },
//   track: {
//     height: 8,
//     borderRadius: 4,
//   },
//   rail: {
//     height: 8,
//     borderRadius: 4,
//   },
// })(Slider);

// export default class VoiceBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: false,
//       status: 'PAUSED',
//       icon: PlayCircleIcon,
//       from: 0,
//     };

//     this.timeHandler = this.timeHandler.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.voiceChangeStatus = this.voiceChangeStatus.bind(this);
//   }

//   componentDidMount() {
//     this.setState(
//       {
//         loading: true,
//         url: this.props.url,
//         autoLoad: this.props.autoLoad,
//         status: 'STOPPED',
//       },
//       () => this.voiceChangeStatus()
//     );
//   }

//   componentWillUnmount() {
//     this.setState({
//       status: 'STOPPED',
//       icon: PlayCircleIcon,
//       autoLoad: false,
//     });
//   }

//   timeHandler() {
//     const sound = soundManager.getSoundById(soundManager.soundIDs[0]);
//     const w = document.getElementsByClassName('MuiSlider-track')[0].style.width;
//     const newTime = (w.split('%')[0] / 100) * sound.duration;
//     // this.setState({ from: newTime });
//     sound.setPosition(newTime);
//   }

//   handleChange() {
//     const sound = soundManager.getSoundById(soundManager.soundIDs[0]);
//     const p = document.getElementById('demo');
//     // let pb = document.getElementById("pb1");
//     if (sound != null && p != null) {
//       setInterval(() => {
//         let s = Math.floor(sound.position);
//         let d = Math.floor(sound.duration);

//         const percent = (s / d) * 100;
//         // pb.style.width = percent.toString() + "%";

//         try {
//           document.getElementsByClassName(
//             'MuiSlider-track'
//           )[0].style.width = `${percent.toString()}%`;
//           document.getElementsByClassName(
//             'MuiSlider-thumb'
//           )[0].style.left = `${percent.toString()}%`;
//         } catch (error) {}

//         const ms = s % 1000;
//         const msd = d % 1000;
//         s = (s - ms) / 1000;
//         d = (d - msd) / 1000;
//         const secs = s % 60;
//         const secsd = d % 60;
//         s = (s - secs) / 60;
//         d = (d - secsd) / 60;
//         const mins = s % 60;
//         const minsd = d % 60;
//         p.innerHTML = `${mins}:${secs}/${minsd}:${secsd}`;
//       }, 1000);
//     }
//   }

//   voiceChangeStatus = () => {
//     console.warn('hey!');

//     if (this.state.status == 'PAUSED') {
//       this.setState({
//         status: 'PLAYING',
//         icon: PauseCircleIcon,
//         autoLoad: true,
//       });
//     } else {
//       this.setState({
//         status: 'PAUSED',
//         icon: PlayCircleIcon,
//         autoLoad: false,
//         // from: sound.position
//       });
//     }
//   };

//   render() {
//     const { loading, url, status, autoLoad, icon, from } = this.state;
//     if (!loading) return null;
//     return (
//       <div>
//         <Sound
//           url={url}
//           playStatus={status}
//           // playFromPosition={from}
//           autoLoad={autoLoad}
//           onLoad={this.handleChange}
//           onBufferChange={this.handleChange}
//           onFinishedPlaying={() => {
//             this.setState({
//               status: 'PAUSED',
//               icon: PlayCircleIcon,
//               autoLoad: false,
//               from: 0,
//             });
//           }}
//         />

//         <div className="player">
//           <img className="icon" src={icon} onClick={this.voiceChangeStatus} />
//           <div className="progressBarNew">
//             {/* <div className="progressBarNewAll"></div>
//               <div id="pb1" className="progressBarNewDone"></div> */}
//             <PrettoSlider
//               valueLabelDisplay="auto"
//               aria-label="pretto slider"
//               defaultValue={0}
//               onChange={this.timeHandler}
//               onClick={this.timeHandler}
//             />
//           </div>
//           <p id="demo" className="progressBarTime" />
//         </div>
//       </div>
//     );
//   }
// }
