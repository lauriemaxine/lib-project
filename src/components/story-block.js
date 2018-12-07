import React, { Component } from 'react';
import Prompt from './prompt';
import Inputs from './inputs';

class StoryBlock extends Component{
  constructor(props){
    super(props)
    this.state = {
      prompts: ["I want to tell you a story, but I've forgotten some of the words!" , "There was a noun, I remember..." , "Oh, yeah, I think you're right! There was a verb too..." , "Man, you're good! And an adjective?" , "Uh... probably! And the name is on the tip of my tongue..." , "That's amazing, that's four for four (most likely). Would you like to hear the story?" , this.props.story , "That was awesome! Would you like to go again?"] ,
      promptIndex: 0 ,
      words: [] ,
    }

    this.addWords = this.addWords.bind(this)
    this.handlePromptIndex = this.handlePromptIndex.bind(this)
  }

  handlePromptIndex(reset = false){
    let {prompts, promptIndex} = this.state
    if(reset === true || promptIndex === prompts.length - 1){
      this.setState({
        promptIndex: 0,
        words: [] ,
      })
    } else {
      let increment = promptIndex + 1
      this.setState({
        promptIndex: increment ,
        prompts: prompts
      })
      console.log(increment)
    }
  }

  addWords(word){
    console.log(`addWords Invoked!`)
    let addWord = [...this.state.words]
    addWord.push(word)
    this.setState({
      words: addWord
    })
    this.handlePromptIndex()
    console.log(this.state.words)
  }

  render(){
    return(
    <div className="story-block">
      <Prompt 
        promptText={this.state.prompts[this.state.promptIndex]} 
        />
      <Inputs 
        handlePromptIndex = {this.handlePromptIndex}
        addWords={this.addWords}
        getStory={this.props.getStory}
      />
    </div>)
  }
}

export default StoryBlock;