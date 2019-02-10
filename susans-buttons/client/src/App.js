import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {

  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        <div className='App'>
          <h1>susan's buttons</h1>
        </div>
      </div>
    );
  }
}

export default App;
