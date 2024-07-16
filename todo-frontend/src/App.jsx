import { useState , useEffect } from 'react'
import './App.css'
import axios from "axios"
import Todo from "./components/Todo"
import AddTodo from './components/AddTodo';




function App() {
  const [Todos , setTodos] = useState([]);
  const [isView , setIsView] = useState(false);
  const [toView , setToView] = useState(null);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
 
  const getTodos = async() => {

    try{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/todos`);
      
      if(response){
        setTodos(response.data);
      }
    } catch(e){
      console.log(`Some error occured ${e.message}`);
    }
    
    
  };

  const onViewClick = async(id) => {
    try{
       const todo = await axios.get(`${import.meta.env.VITE_BASE_URL}/todos/${id}`)  ;
      if(todo){
        setToView(todo.data);
        setFormTitle(todo.data.title);
        setFormDescription(todo.data.description);      
        setIsView(true);
      }   
    } catch(e){
      console.log(`Some error occured ${e.message}`);
    }
  }

  const onDeleteClick = async(id) => {
    try{
      const deletedTodo = await axios.delete(`${import.meta.env.VITE_BASE_URL}/todos/${id}`);
      if(deletedTodo){
        console.log("Deleted todo: " , deletedTodo );
        getTodos();
      }      
    } catch(e){
      console.log(`Some error occured ${e.message}`);
    }
  };

  const handleSave = async (updatedTodo) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/todos/${toView._id}`, updatedTodo);
      if (response) {
        setIsView(false);
        setToView(null);
        getTodos();
      }
    } catch (e) {
      console.log(`Some error occurred ${e.message}`);
    }
  };



useEffect(() => {
  getTodos();
}, [Todos , isView , toView]);

  return (
    <>  
      {isView && toView ? 
      (<>
         <Todo 
          title={formTitle}
          description={formDescription}
          setFormTitle={setFormTitle}
          setFormDescription={setFormDescription}
          onSave={handleSave}
          className='todo'
        />
        <button className='button' onClick={()=>setIsView(false)}>Home</button>
      </>)  
    : (<div className='get-todos'>
      <h1>These are your todos: </h1>
      <ul className='todos-list'>
        {Todos.map((todo) => (
                <li className='todo' key={todo._id}>
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                  <div className='button-area'><button className='button' onClick={() => onViewClick(todo._id)}>View</button>
                  <button className='button' onClick={() => onDeleteClick(todo._id)}>DONE</button>
                  </div>
                </li>
              ))}
      </ul>      
    </div>)}
    <div style={{marginTop: "10px"}}>
      <span style={{marginBottom:"10px", fontSize:"20px" }}>Add Todo: </span>
      <AddTodo/>            
    </div>
    </>
  )

}

export default App
