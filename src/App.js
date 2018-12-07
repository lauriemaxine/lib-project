import React, { Component } from 'react';
import axios from 'axios';
import './reset.css';
import './App.css';
import './prompt.css';
import StoryBlock from './components/story-block'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentStory: 'Once upon a blah blah blah...' ,
      words: [] ,
    }

    this.getStory = this.getStory.bind(this)
    
  }

  getStory(){
    console.log('Get Story Invoked!')
    axios.get('http://localhost:3001/api/libs')
      .then(res => this.setState({
        currentStory: res.data[1]
      }))
  }
  
  render() {
    return (
      <div className="App">
        <nav></nav>
        <section>
          <div className="sidebar">
            <button onClick={() => console.log(this.state.currentStory)}>Magic Troubleshooting Button!</button>
          </div>
          <div className="story-block">
            <StoryBlock 
              story={this.state.currentStory}
              getStory={this.getStory}
              />
          </div>
          <div className="sidebar"></div>
        </section>
      </div>
    );
  }
}

export default App;

// componentDIdMount(){
//   console.log("Component Mounted")
//   axios.get('http://localhost:3001/api/libs')
//     .then(res => setStoryCallback(res.data))
//     .catch(error => console.log(error))
// }

// getStory(){
//   console.log('Requesting Stories')
//   axios.get('http://localhost:3001/api/libs')
// }