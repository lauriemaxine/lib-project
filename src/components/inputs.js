import React, { Component } from 'react';

class Inputs extends Component {
  constructor(props){
    super(props)
    this.state = {
      inputValue: "",
    }
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

  handleRender(next, field, reset, build){
    let {index} = this.props
    console.log(index)
    if (index === 0 || index === 6 || index === 7){
      return <>{next}{reset}</>
    } else if (index === 5) {
      return <>{build}{reset}</>
    } else {
      return  <>{field}{next}{reset}</>
    }
  }

  

  
 
  
  
  
  
  
  // <button onClick={() => this.props.buildStory()}>Invoke BuildStory</button>
  
  render(){

    // ***User Inputs*** //
    let nextButton = <button onClick={() => {this.handleOnClick()}}>Next</button>;
    let buildButton = <button onClick={() => {this.handleOnClick(true)}}>Next</button>;
    let field = <input value={this.state.inputValue} 
    onChange={e => this.handleOnChange(e.target.value)}
    onKeyPress={e => e.charCode === 13 ? this.handleOnClick() : null}  />
    let reset = <button onClick={() => this.props.handlePromptIndex(true)}>Reset</button>
    // ***End User Inputs*** //


      return(
    <div className="inputs-block">
      {this.handleRender(nextButton, field, reset, buildButton)}
    </div>
    )
  }
}


export default Inputs