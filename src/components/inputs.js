import React, { Component } from 'react';

class Inputs extends Component {
  constructor(props){
    super(props)
    this.state = {
      inputValue: "",
    }

    this.handleSaveStory = this.handleSaveStory.bind(this)
    
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

  handleRender(next, field, reset, build, save, saveField, clear, deleteField, deleteButton){
    let {index} = this.props
    console.log(index)
    if (index === 0 || index === 6 || index === 8){
      return <>{next}{reset}</>
    } else if (index === 5) {
      return <>{build}{reset}</>
    } else if (index === 7) {
      return <>{saveField}{save}{clear}</>
    } else if (index === 9) {
      return <>{deleteField}{deleteButton}{reset}</>
    } else {
      return  <>{field}{next}{reset}</>
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

  
 
  
  
  
  
  
  // <button onClick={() => this.props.buildStory()}>Invoke BuildStory</button>
  
  render(){

    // ***User Inputs*** //
    let nextButton = <button onClick={() => {this.handleOnClick()}}>Next</button>;
    let buildButton = <button onClick={() => {this.handleOnClick(true)}}>Next</button>;
    let field = <input value={this.state.inputValue} 
      onChange={e => this.handleOnChange(e.target.value)}
      onKeyPress={e => e.charCode === 13 ? this.handleOnClick() : null}  />
    let saveField = <input value={this.state.inputValue} 
      onChange={e => this.handleOnChange(e.target.value)}
      onKeyPress={e => e.charCode === 13 ? this.handleSaveStory(this.state.inputValue) : null}  />
    let deleteField = <input value={this.state.inputValue} 
      onChange={e => this.handleOnChange(e.target.value)}
      onKeyPress={e => e.charCode === 13 ? this.handleDeleteStory(this.state.inputValue) : null}  />
    let deleteButton = <button onClick={() => this.handleDeleteStory(this.state.inputValue)}>Delete</button>
    let reset = <button onClick={() => this.props.handlePromptIndex('reset')}>Reset</button>
    let save = <button onClick={() => this.handleSaveStory(this.state.inputValue)}>Save</button>
    let clear = <button onClick={() => this.handleClearStory()}>Nah, I'm Good</button>
    // ***End User Inputs*** //


      return(
    <div className="inputs-block">
      <input value={this.state.inputValue} 
        onChange={e => this.handleOnChange(e.target.value)}
        onKeyPress={e => e.charCode === 13 ? this.props.viewStory(this.state.inputValue) : null}  />
      <button onClick={() => this.props.viewStory(this.state.inputValue)}>Search for Story</button>
      {this.handleRender(nextButton, field, reset, buildButton, save, saveField, clear, deleteField, deleteButton)}
    </div>
    )
  }
}


export default Inputs