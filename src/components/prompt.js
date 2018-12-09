import React from 'react';
  
function Prompt (props) {
  return (
    <div className="prompt-block">
      {props.promptText()}
    </div>
  )
}

    
export default Prompt