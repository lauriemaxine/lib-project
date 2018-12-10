import React, { Component } from 'react';
// import axios from 'axios';
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
      // titles: [] ,
    }
    this.addWords = this.addWords.bind(this)
    // this.buildStory = this.buildStory.bind(this)
    // this.saveStory = this.saveStory.bind(this)
    // this.deleteStory = this.deleteStory.bind(this)
  }

  // componentDidMount(){
  //   axios.post(`/api/libs/titles`)
  //     .then(res => this.setState({titles: res.data }))
  // }

  
  // saveStory(title){
  //   let param = encodeURI(title)
  //   axios.post(`/api/libs/${param}`)
  //   .then(res => this.setState({
  //     titles: res.data
  //   })
  //     )
  //   }
    
    // deleteStory(name){
    //   console.log('deleteStory invoked')
    //   axios.delete(`/api/libs/${name}`)
    //   .then(res => this.setState({
    //       titles: res.data
    //     }))
    //   }
    
    
    addWords(word) {
    console.log(`addWords Invoked!`)
    let addWord = [...this.state.words]
    addWord.push(word)
    this.setState({
      words: addWord
    })
    console.log(addWord)
  }
  
  render() {
    
    return (
      <div className="App">
        <nav>
          <h1>The Forgetful Storyteller</h1>
        </nav>
        <section>
          
            <StoryBlock
              addWords={this.addWords}
              resetWordsArray={this.resetWordsArray}
              currentStory={this.state.currentStory}
              // saveStory={this.saveStory}
              // clearStory={this.deleteStory}
              // appTitles={this.state.titles}
              />

        </section>
      </div>
    );
  }
}

export default App;


  // buildStory(){
  //   console.log("Building Story!")
  //   axios.put('/api/libs' , this.state.words)
  //     .then(res => {this.setState({
  //       currentStory: res.data
  //     })
  //     console.log(res.data)
  //   })
  // }