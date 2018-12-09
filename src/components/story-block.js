import React, { Component } from 'react';
import Prompt from './prompt';
import Inputs from './inputs';
import axios from 'axios'

class StoryBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prompts: ["I want to tell you a story, but I've forgotten some of the words!", "There was a noun, I remember...", "Oh, yeah, I think you're right! There was a verb too...", "Man, you're good! And an adjective?", "Uh... probably! And the name is on the tip of my tongue...", "That's amazing, that's four for four (most likely). Would you like to hear the story?", "PLACEHOLDER", "That was awesome! Would you like to save your story?" , "That was fun! Would you like me to tell another story?" , "SECRET DELETEY SCREEN", "IF YOU CAN SEE THIS, I DID IT WRONG"],
      promptIndex: 0,
    }

    this.handlePromptIndex = this.handlePromptIndex.bind(this)
    this.addWords = this.addWords.bind(this)
    this.promptText = this.promptText.bind(this)
    this.viewStory = this.viewStory.bind(this)
  }

  viewStory(title){
    console.log("viewStory invoked")
    if(!title){console.log(null)}{
      let param = encodeURI(title)
      axios.get(`/api/libs/${param}`)
        .then((res) => this.viewStoryCont(res))
    }
  }

  viewStoryCont(res){
    let {text} = res.data
    let newPrompts = this.state.prompts.slice(0, this.state.prompts.length - 1)
    this.setState({ prompts: newPrompts})
    newPrompts.push(text)
    console.log(text)
    this.handlePromptIndex('view')
    console.log(res) 
    }
  

  addWords(word = ''){
    this.handlePromptIndex()
    !word ? console.log('No word added') : this.props.addWords(word);
  }

  
  handlePromptIndex(special) {
    let { prompts, promptIndex } = this.state
    if (special === 'reset' || promptIndex === prompts.length - 1) {
      console.log('Resetting!')
      this.props.resetWordsArray()
      this.setState({
        promptIndex: 0,
      })
    } 
    else if (special === 'view'){
      console.log('Setting to View')
      this.props.resetWordsArray()
      this.setState({
        promptIndex: prompts.length - 1
      })
    }
    else {
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
          index = {this.state.promptIndex}
          saveStory = {this.props.saveStory}
          clearStory = {this.props.clearStory}
          viewStory = {this.viewStory}
          />
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