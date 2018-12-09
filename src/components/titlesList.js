import React from 'react'

function ListTitles(props){
  let titlesList = props.titles.map((title, i) => <p key={i}>{title}</p>)

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