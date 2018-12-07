import React, { Component } from 'react';

class Prompt extends Component {
  constructor(props){
    super(props)
  }
  
  
  render () {
    return (
      <div className="prompt-block">
        {this.props.promptText}
        
      </div>
    )
  }
}
    
export default Prompt