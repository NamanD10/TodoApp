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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setFormTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setFormDescription(e.target.value)}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default Todo;
