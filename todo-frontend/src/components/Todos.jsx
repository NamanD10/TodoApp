import { useState } from "react"

export default function Todos() {
    const [todoList , setTodoList]  = useState([])  
    return(
        <div className="todo-list">
            <ol>
                <li>task1</li>
                <li>task2</li>
                <li>task3</li>
                <li>task4</li>
            </ol>
            <button>Add Todo</button>
        </div>
    )
}