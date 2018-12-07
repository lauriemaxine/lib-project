import React, { Component } from 'react';
import axios from 'axios';
import './reset.css';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentStory: 'This is a little test!'
    }
  }


  componentDIdMount(){
    console.log("Component Mounted")
    axios.get('http://localhost:3001/api/libs')
      .then(res => this.setState({
        currentStory: res.data
      }))
      .catch(error => console.log(error))
  }

  handleOnClick(){
    console.log('Requesting Stories')
    axios.get('http://localhost:3001/api/libs')
      .then(res => this.setState({
        currentStory: res.data
      }))
  }
  
  
  render() {
    return (
      <div className="App">
        <nav></nav>
        <section>
          <div className="sidebar"></div>
          <div className="story-block"></div>
          <div className="sidebar"></div>
        </section>
      </div>
    );
  }
}

export default App;
