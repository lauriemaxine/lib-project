import React, { Component } from 'react';
import axios from 'axios';
import './reset.css';
import './App.css';
import './prompt.css';
import StoryBlock from './components/story-block'
import ListTitles from './components/titlesList';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentStory: `Uhhh.... the, umm... it was uh... er... something about a... somebody?`,
      words: [] ,
      titles: [] ,
    }
    this.addWords = this.addWords.bind(this)
    this.resetWordsArray = this.resetWordsArray.bind(this)
    this.buildStory = this.buildStory.bind(this)
    this.saveStory = this.saveStory.bind(this)
    this.deleteStory = this.deleteStory.bind(this)
  }

  componentDidMount(){
    axios.post(`/api/libs/titles`)
      .then(res => this.setState({titles: res.data }))
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

  saveStory(title){
    let param = encodeURI(title)
    axios.post(`/api/libs/${param}`)
      .then(res => this.setState({
        titles: res.data
      })
      )
  }

  deleteStory(name = null){
    console.log('deleteStory invoked')
    if (name === null){
      axios.delete('/api/libs')
    } else {
      axios.delete(`/api/libs?delTarget=${name}`)
        .then(res => this.setState({
          titles: res.data
        }))
    }
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
            <button onClick={() => this.deleteStory()}>invoke deleteStory</button>
            <button onClick={() => this.saveStory("Crumpets")}>invoke saveStory</button>
          </div>
          <div className="story-block">
            <StoryBlock
              addWords={this.addWords}
              buildStory={this.buildStory}
              resetWordsArray={this.resetWordsArray}
              currentStory={this.state.currentStory}
              saveStory={this.saveStory}
              clearStory={this.deleteStory}
              titles={this.state.titles}
              />
          </div>
          <div className="sidebar">
            <ListTitles
              titles = {this.state.titles}

            />
          </div>
        </section>
      </div>
    );
  }
}

export default App;