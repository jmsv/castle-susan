import React, { Component } from 'react'
import './App.css'

import {
  Card,
  CardContent,
  Typography,
  Fab,
  AppBar,
  Toolbar,
  Paper,
  IconButton,
  withStyles
} from '@material-ui/core'

import {
  ArrowUpward,
  ArrowDownward,
  Search,
  Menu,
  More
} from '@material-ui/icons'

import axios from 'axios'

class App extends Component {
  state = {
    drawbridge: {
      up: true
    },

    commands: {
      drawbridge: {
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

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  sendCmd = cmd => () => axios.get(`/api/cmd/${cmd}`)

  render() {
    const { commands, drawbridge } = this.state
    const { classes } = this.props

    return (
      <div>
        <div className='App'>
          <Typography variant="h2">susan's buttons</Typography>
          <Typography className={classes.lead}>control castle susan from the comfort of wherever u at</Typography>

          <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <IconButton color="inherit" aria-label="Open drawer">
                <Menu />
              </IconButton>
              <Fab variant="extended" color="secondary" className={classes.fabButton}>
                {drawbridge.up ? <ArrowUpward /> : <ArrowDownward />} Toggle Drawbridge
              </Fab>
              <div>
                <IconButton color="inherit">
                  <Search />
                </IconButton>
                <IconButton color="inherit">
                  <More />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>

          <button onClick={this.sendCmd(commands.drawbridge.up)}>drawbridge up</button>
          <button onClick={this.sendCmd(commands.drawbridge.down)}>drawbridge down</button>
          <button onClick={this.sendCmd(commands.ok)}>ok?</button>

          <hr />
          <button onClick={this.sendCmd(commands.calibrate.up)}>db +</button> /
          <button onClick={this.sendCmd(commands.calibrate.down)}>db -</button>
        </div>
      </div>
    )
  }
}


const styles = theme => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },

  lead: {
    marginBottom: 40
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
})



export default withStyles(styles)(App)
