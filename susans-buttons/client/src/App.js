import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import './App.css'

import theme from './theme'

import {
  Typography,
  Chip,
  Fab,
  AppBar,
  Toolbar,
  IconButton,
  withStyles,
  CssBaseline,
  SvgIcon,
  Link,
  Button
} from '@material-ui/core'

import {
  ArrowUpward,
  ArrowDownward,
  AddCircleOutline,
  RemoveCircleOutline,
  Lock,
  LockOpen
} from '@material-ui/icons'

import axios from 'axios'

class App extends Component {
  state = {
    drawBridge: {
      up: true
    },

    commands: {
      drawBridge: {
        up: 'u',
        down: 'd',
      },
      ok: 'k',
      calibrate: {
        up: '+',
        down: '-'
      }
    }
  }

  componentDidMount() {
    setTimeout(() => {
      var video = document.getElementById('video');

      // Get access to the camera!
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
          //video.src = window.URL.createObjectURL(stream);
          video.srcObject = stream;
          video.play();
        });
      }
  
    }, 3000)
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  ok = () => axios.get('/api/ok')

  sendCmd = cmd => () => axios.get(`/api/cmd/${cmd}`)

  toggleDrawBridgeState = () => this.setState({ drawBridge: { up: !this.state.drawBridge.up } })

  toggleDrawBridge = () => {
    if (this.state.drawBridge.up) {
      this.sendCmd('d')()
    } else {
      this.sendCmd('u')()
    }

    this.toggleDrawBridgeState()
  }

  render() {
    const { commands, drawBridge } = this.state
    const { classes } = this.props

    let drawBridgeClasses = [classes.castleDrawBridge]
    if (drawBridge.up) drawBridgeClasses.push(classes.castleDrawBridgeRotate)

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />

        <video id="video" autoPlay></video>

        <div className='App'>
          <div className={classes.header}>
            <Typography variant='h2' color='primary'>
              castle susan's buttons {' \u2728'}
            </Typography>
            <Typography variant='subtitle1' className={classes.lead}>control castle susan from the comfort of wherever u be at</Typography>
          </div>

          <div className={classes.overview}>
            <div className={classes.statusOverview}>
              <div className={[classes.statusBox, classes.spaceyBottom]}>Drawbridge status: <Chip label={drawBridge.up ? 'Closed' : 'Open'}></Chip></div>
              <div className={classes.spaceyBottom}>
                Calibrate:&nbsp;
                <IconButton onClick={this.sendCmd(commands.calibrate.down)}><RemoveCircleOutline /></IconButton>
                <IconButton onClick={this.sendCmd(commands.calibrate.up)}><AddCircleOutline /></IconButton>
              </div>
              <div className={classes.spaceyBottom}>
                <Button onClick={this.ok} variant="outlined" color="secondary">boop</Button>
              </div>
            </div>

            <div className={classes.castleContainer}>
              <SvgIcon color='nativeColor' viewBox='0 0 256 256' className={classes.castle}>
                <path d='M177.4,84.8c0.3-6.9-1.3-12.5-7.1-16.6c-11-7.7-14.6-18.1-13.1-31.3c1-8.2,0.2-16.5,0.2-25.7c3.6,0,6.7,0,9.8,0 c2.9,0,5.9,0,9.7,0c0,6.6,0,12.6,0,19.1c6.9,0,13,0,19.8,0c0-6,0-12.1,0-18.6c6.8,0,12.8,0,19.6,0c0,6.1,0,12.2,0,18.6 c6.9,0,12.9,0,19.8,0c0-6.1,0-12.2,0-19c7.1,0,13.4,0,19.8,0c0,81.9,0,163.8,0,245.8c-30.8,0-61.7,0-93.4,0 c4.3-10,8.2-19.1,12.1-28.3c0.8-2,1.8-3.9,2.3-6 M176.7,191.3c0-31.9,0-62.6,0-94.2 M226.5,114.1c0-7.1,0.2-13.5-0.1-19.8 c-0.3-5.5-4.3-9.1-9.4-9.3c-5-0.2-9.5,2.9-9.8,8c-0.5,6.9-0.1,13.8-0.1,21.1C213.7,114.1,219.7,114.1,226.5,114.1z'/>
                <path d='M0,213.5c14.4,0,28.9,0,43.8,0c0.1,14.4,8.6,25.9,13.1,38.8c0.5,1.4,0.9,2.7,1.6,4.7c-19.8,0-39.2,0-58.5,0 C0,242.5,0,228,0,213.5z'/>
                <path d='M166.5,224.7c-3,7.1-6,14.1-9.2,21.4c-2-0.8-3.5-1.4-5-2.1c-8.4-3.7-16.6-3.2-24.7,0.9c-12.1,6.2-24,6.6-36-0.2 c-9-5.1-18-3.8-27.7,0.7c-3-7-5.9-13.7-9.1-21c5.8-2.2,11.2-4.7,16.8-6.4c6.6-2,13.1-1.1,19.2,2.1c12,6.2,23.7,6.9,36,0.3 c10.2-5.5,20.8-5.7,31,0.9C160.3,222.8,163.3,223.4,166.5,224.7z'/>
                <path d='M176.7,97.1c0,31.6,0,62.3,0,94.2' />
              </SvgIcon>
              <div className={drawBridgeClasses.join(' ')}></div>
            </div>
          </div>

          <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <IconButton onClick={this.toggleDrawBridgeState} color="inherit">
                {drawBridge.up ? <Lock /> : <LockOpen />}
              </IconButton>
              <Fab onClick={this.toggleDrawBridge} variant="extended" color="secondary" className={classes.fabButton}>
                { drawBridge.up ? <ArrowDownward /> : <ArrowUpward /> }
                { drawBridge.up ? 'Open Drawbridge' : 'Close Drawbridge' }
              </Fab>
              <div>
                <Link href="https://github.com/jmsv/castle-susan">github.com/jmsv/castle-susan</Link>
              </div>
            </Toolbar>
          </AppBar>

          {/* <button onClick={this.sendCmd(commands.drawBridge.up)}>drawbridge up</button>
          <button onClick={this.sendCmd(commands.drawBridge.down)}>drawbridge down</button>
          <button onClick={this.sendCmd(commands.ok)}>ok?</button>

          <hr />
          <button onClick={this.sendCmd(commands.calibrate.up)}>db +</button> /
          <button onClick={this.sendCmd(commands.calibrate.down)}>db -</button> */}
        </div>
      </MuiThemeProvider>
    )
  }
}


const styles = theme => ({
  header: {
    margin: '0 auto',
    textAlign: 'center',
    marginBottom: 20
  },

  overview: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr'
  },

  statusOverview: {
    paddingLeft: 40,
    paddingTop: 40
  },

  spaceyBottom: {
    marginBottom: 10
  },

  appBar: {
    top: 'auto',
    bottom: 0,
  },

  castle: {
    width: 256,
    height: 256,
    position: 'absolute',
    color: '#555',
    float: 'right'
  },

  castleDrawBridge: {
    position: 'absolute',
    width: 150,
    height: 20,
    background: '#555',
    transform: 'translate(50px, 185px)',
    transition: '2.5s ease-in-out',
    float: 'right'
  },

  castleDrawBridgeRotate: {
    transformOrigin: 'top right',
    transform: 'translate(50px, 185px) rotate(70deg)'
  },

  castleContainer: {
    height: 256,
    margin: 28,
  },

  lead: {
    marginBottom: 16
  },

  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    margin: '0 auto',
    left: '50%',
    transform: 'translateX(-50%)'
  },

  noDisplay: {
    display: 'none'
  },
})



export default withStyles(styles)(App)
