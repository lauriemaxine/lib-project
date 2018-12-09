import React from 'react'

function ListTitles(props){
  let titlesList = props.titles.map((title, i) => <li key={i} onClick={() => props.viewStory(title)} >{title}</li>)

  return (
    <>
    <h5>Saved Stories</h5>
    <ul>
      {titlesList}
    </ul>
    </>
  )
}

export default ListTitles