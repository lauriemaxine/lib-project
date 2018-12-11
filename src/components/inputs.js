import React, { Component } from 'react';
import WordField from '../components/WordField'
import nameGenerator from '../utlilities/nameGenerator';
import axios from 'axios'

class Inputs extends Component {
  constructor(props){
    super(props)
    this.state = {
      wordsArray: [],
      inputValue: '',
      testInput: '',
    }

    this.handleSaveStory = this.handleSaveStory.bind(this)
    this.handleRender = this.handleRender.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleRando = this.handleRando.bind(this)
    
  }

  handleRando(rando){
    this.setState({inputValue: rando})
  }

  nameGenerator(cb){
  
    return axios.get("https://acedev-project-name-generator-v1.p.rapidapi.com/without-number" ,
    {headers: {"X-RapidAPI-Key": "7d171a7c5cmsha9e755031a8c254p15cf15jsnffb30839217c"}}).then((res) => cb(res.data.spaced))
  }

  handleTestInput(value,index){
    let {wordsArray} = this.state
    let newWordsArray = this.state.wordsArray.splice(index,1,value)
    this.setState({wordsArray: newWordsArray})
    console.log(wordsArray)
  }

  handleEdit(newTitle){
    this.props.editTitle(newTitle)
    this.setState({ inputValue: ''})
  }

  prePush(){
    console.log(`prePush: invoked`)
    this.props.pushToArray(this.state.wordsArray)
    this.setState({ wordsArray: []})
  }

  handleOnBlur(val,i){
    let newArray = this.state.wordsArray.splice(i,1,val)
    console.log('HOB:' + newArray)
    this.setState({
      wordsArray: this.state.wordsArray
    })
    console.log('HOB:' + this.state.wordsArray)
  }

  // componentDidMount(){
  //   console.log('Debug info')
  //   console.log('Props: ' + this.props)
  //   console.log('Interator Index: ' + this.props.index)
  // }

  handleOnChange(input){
    this.setState({
      inputValue: input 
    })
  }

  handleOnClick(build = false){
    if (build === true){this.props.buildStory()}
    this.props.addWords(this.state.inputValue)
    this.setState({
      inputValue: ''
    })
  }

  handleRender(next, field, reset, build, save, saveField, clear, deleteField, deleteButton,newArrayButton,start,edit,lazy){
    let {index} = this.props
    let target = []
    if(index===4){target = this.props.nameArray.slice()}
    if(index===1){target = this.props.nounArray.slice()}
    if(index===2){target = this.props.verbArray.slice()}
    if(index===3){target = this.props.adjectiveArray.slice()}
    let wordFields = target.map((e, index) => <WordField handleOnBlur={this.handleOnBlur} code={e} key={index} inputIndex={index} valueLocation={this.state.wordsArray[index]} />)
    console.log('handleRender is now on ' + index)
    if (index === 6 || index === 8){
      return <>{next}{reset}</>
    } else if (index === 10){
      return <><div>{field}{edit}</div><div>{deleteButton}</div><div>{reset}</div></>
    } else if (index === 7) {
      return <>{saveField}{lazy}{save}</>
    // } else if (index === 9) {
    //   return <>{deleteButton}{reset}</>
    } else if (index === 0){
      return <>{start}</>
    } else if (index === 5){
      return <>{build}{reset}</>
    } else {
      return  <>{wordFields}{newArrayButton}{reset}</>
    }
  }

  handleSaveStory(title){
    this.setState({
      inputValue: ''
    })
    this.props.saveStory(title)
    this.props.addWords()
  }

  handleClearStory(){
    this.props.clearStory()
    this.props.addWords()
  }

  handleDeleteStory(title){
    this.props.clearStory(title)
  }
  
  
  
  
  // Below is the SEARCH FUNCTIONALITY. It works, but doesn't have a place yet. //
  
  // <input value={this.state.inputValue} 
  //   onChange={e => this.handleOnChange(e.target.value)}
  //   onKeyPress={e => e.charCode === 13 ? this.props.viewStory(this.state.inputValue) : null}  />
  // <button onClick={() => this.props.viewStory(this.state.inputValue)}>Search for Story</button>
  
  
  // <button onClick={() => this.props.buildStory()}>Invoke BuildStory</button>
  
  render(){

    // ***User Inputs*** //
    let randoButton = <button onClick={() => this.nameGenerator(this.handleRando)}>Lazy Generate</button>
    let editTitleButton = <button onClick={() => this.handleEdit(this.state.inputValue)}>Edit Title</button>
    let startButton = <button onClick={() => this.props.fetchBones()}>START!</button>
    let newArrayButton = <button onClick={() => {this.prePush()}}>Submit Words</button>;
    let nextButton = <button onClick={() => {this.handleOnClick()}}>Next</button>;
    let buildButton = <button onClick={() => {this.handleOnClick(true)}}>Build</button>;
    let editField = <input value={this.state.inputValue} 
      onChange={e => this.handleOnChange(e.target.value)}
      onKeyPress={e => e.charCode === 13 ? this.handleEdit(this.state.inputValue) : null}  />
    let saveField = <input value={this.state.inputValue} 
      onChange={e => this.handleOnChange(e.target.value)}
      onKeyPress={e => e.charCode === 13 ? this.handleSaveStory(this.state.inputValue) : null}
      value={this.state.inputValue}  />
    let deleteField = <input value={this.state.inputValue} 
      onChange={e => this.handleOnChange(e.target.value)}
      onKeyPress={e => e.charCode === 13 ? this.handleDeleteStory(this.state.inputValue) : null}  />
    let deleteButton = <button onClick={() => this.handleDeleteStory()}>Delete Story</button>
    let reset = <button onClick={() => this.props.handlePromptIndex('reset')}>Reset</button>
    let save = <button onClick={() => this.handleSaveStory(this.state.inputValue)}>Save</button>
    let clear = <button onClick={() => this.handleClearStory()}>Nah, I'm Good</button>
    // ***End User Inputs*** //


      return(
    <div className="inputs-block">
      {this.handleRender(nextButton, editField, reset, buildButton, save, saveField, clear, deleteField, deleteButton,newArrayButton,startButton,editTitleButton, randoButton)}
    </div>
    )
  }
}


export default Inputs