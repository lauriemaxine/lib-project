import React, { Component } from 'react'

class WordField extends Component{
  constructor(props){
    super(props)
    this.state = {
      input: '' ,
    }
  }

  render(){
    return(
      <div>
        <input
          onBlur={e => this.props.handleOnBlur(e.target.value, this.props.inputIndex)}
          placeholder={this.props.code}
          onChange={e => this.setState({input: e.target.value})}
          value = {this.state.input}
         />
      </div>
    )
  }

}

export default WordField