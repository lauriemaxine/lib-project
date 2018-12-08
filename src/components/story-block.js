import React, { Component } from 'react';
import Prompt from './prompt';
import Inputs from './inputs';
import axios from 'axios';

class StoryBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      words: ["ball" , "dog" , "JemmyDean" , "cowlicker"],
      prompts: ["I want to tell you a story, but I've forgotten some of the words!", "There was a noun, I remember...", "Oh, yeah, I think you're right! There was a verb too...", "Man, you're good! And an adjective?", "Uh... probably! And the name is on the tip of my tongue...", "That's amazing, that's four for four (most likely). Would you like to hear the story?", "PLACEHOLDER", "That was awesome! Would you like to go again?"],
      promptIndex: 0,
    }

    this.handlePromptIndex = this.handlePromptIndex.bind(this)
    this.addWords = this.addWords.bind(this)
    this.promptText = this.promptText.bind(this)
  }

  addWords(word){
    this.handlePromptIndex()
    this.props.addWords(word)
  }

  
  handlePromptIndex(reset = false) {
    let { prompts, promptIndex } = this.state
    if (reset === true || promptIndex === prompts.length - 1) {
      console.log('Resetting!')
      this.props.resetWordsArray()
      this.setState({
        promptIndex: 0,
      })
    } else {
      let increment = promptIndex + 1
      this.setState({
        promptIndex: increment,
        prompts: prompts
      })
      console.log(increment)
    }
  }

  promptText(){
    let {prompts,promptIndex} = this.state
    if(promptIndex === 6){
      return this.props.currentStory
    } else {
      return prompts[this.state.promptIndex]
    }
  }
  
  runTest(){
    console.log("Test successful!")
  }

  
  render() {
    return (
      <div className="story-block">
        <Prompt
          // promptText={this.state.prompts[this.state.promptIndex]}
          promptText={this.promptText}
          currentStory = {this.props.currentStory}
        />
        <Inputs
          handlePromptIndex={this.handlePromptIndex}
          addWords={this.addWords}
          buildStory={this.props.buildStory}
          />
        <div>
          <button onClick={() => this.props.buildStory()}>Invoke Buildstory</button>
        </div>
      </div>)
  }
}

export default StoryBlock;

  // getStory(){
  //   console.log('Get Story Invoked!')
  //   axios.get('http://localhost:3001/api/libs' , {words: ["rock" , "stomp" , "tired" , "JemBob"]})
  //     .then(res => this.setState({
  //       currentStory: res.data[1]
  //     }))
  // }