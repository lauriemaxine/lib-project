import React, { Component } from 'react';

class Inputs extends Component {
  constructor(props){
    super(props)
    this.state = {
      inputValue: "",
    }
  }

  handleOnChange(input){
    this.setState({
      inputValue: input
    })
  }
  

  render(){
    return(
      <div className="inputs-block">

      <input onChange={e => this.handleOnChange(e.target.value)} />

      <button onClick={() => this.props.addWords(this.state.inputValue)}>Next</button>

      <button onClick={() => this.props.handlePromptIndex(true)}>Reset</button>

      
      <button onClick={() => this.props.buildStory()}>Invoke BuildStory</button>
      
      </div>
    )
  }
}


export default Inputs