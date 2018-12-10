import React, { Component } from 'react';
import Prompt from './prompt';
import Inputs from './inputs';
import axios from 'axios'
import ListTitles from './titlesList'
import skeletonParser from '../utlilities/skeletonParser'
import storyBuilder from '../utlilities/storyBuilder'

class StoryBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prompts: ["I want to tell you a story, but I've forgotten some of the words!", "There was a noun, I remember...", "Oh, yeah, I think you're right! There was a verb too...", "Man, you're good! And an adjective?", "Uh... probably! And the name is on the tip of my tongue...", "That's amazing, that's four for four (most likely). Would you like to hear the story?", "PLACEHOLDER", "That was awesome! Would you like to save your story?" , "That was fun! Would you like me to tell another story?" , "SECRET DELETEY SCREEN", "IF YOU CAN SEE THIS, I DID IT WRONG"],
      promptIndex: 0,
      currentSkeleton: {},
      nameArray: [10,11,12] ,
      nounArray: [20,21] ,
      verbArray: [30,31,32] ,
      adjectiveArray: [40,41] ,
      storyFlesh: '' ,
      titles: [] ,
    }

    this.handlePromptIndex = this.handlePromptIndex.bind(this)
    this.addWords = this.addWords.bind(this)
    this.promptText = this.promptText.bind(this)
    this.viewStory = this.viewStory.bind(this)
    this.pushToArray = this.pushToArray.bind(this)
    this.fetchBones = this.fetchBones.bind(this)
    this.buildStory = this.buildStory.bind(this)
    this.saveStory = this.saveStory.bind(this)
  }

  clearStory(name){
    console.log('clearStory invoked')
    axios.delete(`/api/libs/${name}`)
    .then(res => this.setState({
      titles: res.data
    }))
  }

  saveStory(title){
    axios.post('/api/libs' , {title: title , text: this.state.storyFlesh})
    .then(res => this.setState({ titles: res.data }))
  }

  buildStory(){
    this.setState({
      storyFlesh: storyBuilder(this.state)
    })
  }

  fetchBones(){
    console.log('FB: invoked')
    axios.get('/api/libs')
      .then(res => {this.setState ({
        currentSkeleton: res.data
        })
        let wordArrays = skeletonParser(res.data.storyBones)
        console.log(wordArrays.nameArray)
        return wordArrays
      })
      .then(wordArrays => {
        console.log('FB:' + wordArrays)
        this.setState({
          nameArray: wordArrays.nameArray ,
          nounArray: wordArrays.nounArray ,
          verbArray: wordArrays.verbArray ,
          adjectiveArray: wordArrays.adjectiveArray ,
        })
      })
      .then(() => this.handlePromptIndex())

      
  }

  resetWordArrays(){
    console.log('RWA: resetting arrays')
    this.setState({
      nameArray: ['name' , 'name' , 'name' , 'name'] ,
      nounArray: ['noun'] ,
      verbArray: ['verb' , 'verb'] ,
      adjectiveArray: ['addy' , 'addy' , 'addy' ] ,
    })
  }

  pushToArray(newArray){
    console.log(`PTA: newArray=${newArray}`)
    if(this.state.promptIndex === 4){this.setState({nameArray:newArray})}
    if(this.state.promptIndex === 1){this.setState({nounArray:newArray})}
    if(this.state.promptIndex === 2){this.setState({verbArray:newArray})}
    if(this.state.promptIndex === 3){this.setState({adjectiveArray:newArray})}
    this.handlePromptIndex()
  }

  viewStory(title){
    console.log("viewStory invoked")
    if(!title){console.log(null)}{
      let param = encodeURI(title)
      axios.get(`/api/libs/search/${param}`)
        .then((res) => this.viewStoryCont(res))
    }
  }

  viewStoryCont(res){
    console.log('viewStory Continued')
    let {text} = res.data
    let newPrompts = this.state.prompts.slice(0, this.state.prompts.length - 1)
    this.setState({ prompts: newPrompts})
    newPrompts.push(text)
    this.handlePromptIndex('view')
    }
  

  addWords(wordsArray = ''){
    this.handlePromptIndex()
    !wordsArray ? console.log('No words added') : console.log(wordsArray);
  }

  
  handlePromptIndex(special) {
    console.log('HPI active, special parameter = '+special)
    let { prompts, promptIndex } = this.state
    if (special === 'reset' || promptIndex === prompts.length - 2 ) {
      console.log('Resetting')
      this.resetWordArrays()
      this.setState({
        promptIndex: 0,
      })
    } 
    else if (special === 'view'){
      console.log('Setting to View')
      this.resetWordArrays()
      this.setState({
        promptIndex: prompts.length - 1
      })
      console.log('HPI: PromptIndex should be 10 and is ' + this.state.promptIndex )
    }
    else {
      let increment = promptIndex + 1
      this.setState({
        promptIndex: increment,
        prompts: prompts
      })
      console.log('Iterator is now ' + increment)
    }
  }

  promptText(){
    let {prompts,promptIndex } = this.state
    if(promptIndex === 6){
      return storyBuilder(this.state)
    } else {
      return prompts[this.state.promptIndex]
    }
  }
  
  runTest(){
    console.log("Test successful!")
  }

  componentDidMount(){
    axios.get('/api/libs/titles')
    .then(res => this.setState({ titles: res.data }))
  }

  
  render() {
    return (
      <>
      <div className="sidebar">
          </div>
      <div className="story-block">
        <Prompt
          // promptText={this.state.prompts[this.state.promptIndex]}
          promptText={this.promptText}
          currentStory = {this.props.currentStory}
          />
        <Inputs
          resetWordArrays = {this.resetWordArrays}
          handlePromptIndex={this.handlePromptIndex}
          addWords={this.addWords}
          buildStory={this.buildStory}
          index = {this.state.promptIndex}
          saveStory = {this.saveStory}
          clearStory = {this.clearStory}
          viewStory = {this.viewStory}
          nameArray = {this.state.nameArray}
          nounArray = {this.state.nounArray}
          verbArray = {this.state.verbArray}
          adjectiveArray = {this.state.adjectiveArray}
          pushToArray = {this.pushToArray}
          fetchBones = {this.fetchBones}
          />
      </div>
      <div className="sidebar">
        <ListTitles
          titles={this.state.titles}
          viewStory={this.viewStory}
        />
      </div>
      </>
    )
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