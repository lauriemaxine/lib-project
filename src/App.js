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
      currentStory: `Uhhh.... the, umm... it was uh... er... something about a... somebody?`,
      words: [] ,
    }
    this.addWords = this.addWords.bind(this)
    this.resetWordsArray = this.resetWordsArray.bind(this)
    this.buildStory = this.buildStory.bind(this)
  }

  buildStory(){
    console.log("Building Story!")
    axios.put('/api/libs' , this.state.words)
      .then(res => {this.setState({
        currentStory: res.data
      })
      console.log(res.data)
    })
  }

  addWords(word) {
    console.log(`addWords Invoked!`)
    let addWord = [...this.state.words]
    addWord.push(word)
    this.setState({
      words: addWord
    })
    console.log(addWord)
  }

  resetWordsArray(){
    this.setState({
      words: []
    })
    console.log("Words cleared.")
  }
  
  render() {
    return (
      <div className="App">
        <nav></nav>
        <section>
          <div className="sidebar">
            <div>
            </div>
          </div>
          <div className="story-block">
            <StoryBlock
              addWords={this.addWords}
              buildStory={this.buildStory}
              resetWordsArray={this.resetWordsArray}
              currentStory={this.state.currentStory}
              />
          </div>
          <div className="sidebar"></div>
        </section>
      </div>
    );
  }
}

export default App;