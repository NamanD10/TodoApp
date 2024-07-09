import { useState , useEffect } from 'react'
import './App.css'
import axios from "axios"
import Todo from "./components/Todo"



function App() {
  const [Todos , setTodos] = useState([]);
  const [isView , setIsView] = useState(false);
  const [toView , setToView] = useState({});
 
  const getTodos = async() => {
    console.log(import.meta.env.VITE_BASE_URL);
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
       setIsView(true);
       setToView(todo.data);
       console.log(todo.data);
       
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

const TodoItems = Todos.map((todo => 
  <li key={todo._id}>
    
    <h3>{todo.title}</h3>
    <p>{todo.description}</p>
    <button onClick={() => onViewClick(todo._id)}>View</button>
    <button onClick={() => onDeleteClick(todo._id)}>DONE</button>
  </li>
))

useEffect(() => {
  getTodos();
}, []);

  return (
    <>  
      {isView ? 
      (<>
        {console.log("here is the todo to view: " + JSON.stringify(toView))}
        <Todo {...toView}></Todo>
      </>)  
    : (<>
      <h1 className='roboto-regular'>These are your todos: </h1>   
      <ul>
        {TodoItems}

      </ul>
    </>)}
    </>
  )

}

export default App
