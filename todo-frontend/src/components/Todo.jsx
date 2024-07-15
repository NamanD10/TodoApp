import React, { useState } from 'react';

function Todo({ title, description, setFormTitle , setFormDescription , onSave }) {
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedTodo = {
      title: title,
      description: description,
    };
    onSave(updatedTodo);
  };

  return (
    <form style={{width:"400px" , height:"200px" , display:"flex" , flexDirection:"column" , margin:"50px , auto" , justifyContent:"center" , alignItems:"center", gap:"15px"}} onSubmit={handleSubmit}>
      <div >
        <label htmlFor="title">Title:</label>
        <input
          style={{width:"300px"}}
          id="title"
          type="text"
          value={title}
          onChange={(e) => setFormTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          style={{width:"300px"}}
          id="description"
          type="text"
          value={description}
          onChange={(e) => setFormDescription(e.target.value)}
        />
      </div>
      <button className='button' type="submit">Save</button>
    </form>
  );
}

export default Todo;

//TODO: handle POST request