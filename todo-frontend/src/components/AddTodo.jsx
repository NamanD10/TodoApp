import React , {useState} from 'react'
import axios from 'axios'

const handlePost = async (todo)=> {
  try{
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/todos` , todo);
    if(response){
      alert("Todo Posted");
    }
  } catch(e){
    alert(`Some error occured ${e.message}`);
  }
}

const handleSubmit = (e) =>{
  e.preventDefault();
  console.log(title);
  console.log(description);
  const todoToAdd = {
    title: title.value,
    description: description.value,
  };
  handlePost(todoToAdd);
};

function AddTodo() {
  const [formTitle , setFormTitle] = useState("");
  const [formDescription , setFormDescription] = useState("");
  return (
    <div> 
        <form onSubmit={handleSubmit}>
          <div style={{margin:"10px"}}>
            <label htmlFor='title'>Title: </label>
            <input
              style={{width:"300px"}}
              id="title"
              type='text'
              value={formTitle}
              onChange={(e)=> setFormTitle(e.target.value)}
            /> 
        </div>
        <div style={{margin:"10px"}}>
          <label htmlFor='description'>Description: </label>
          <input
            style={{width:"300px"}}
            id='description'
            type='text'
            value={formDescription}
            onChange={(e)=>{setFormDescription(e.target.value)}}            
          />
        </div>
        <button className='button' type="submit">Post</button>
        </form>
    </div>
  )

}

export default AddTodo