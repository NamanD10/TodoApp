import React from 'react'

function Todo({title , description , startDate} ) {
  
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Start date: {startDate.split('T')[0]}</p>
      
    </div>
  )
}

export default Todo