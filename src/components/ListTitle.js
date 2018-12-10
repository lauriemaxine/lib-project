import React from 'react'

function ListTitle(props){

  return (
    <>
      <li>
        {props.title}<button onClick={() => props.handleOnClick(props.title)} >{props.buttonText}</button>
      </li>
    </>
  )
}

export default ListTitle