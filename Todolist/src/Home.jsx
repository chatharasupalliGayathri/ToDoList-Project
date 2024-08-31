import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'

function Home(){
    const [todos, setTodos] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleEdit = (id,e) => {
        e.preventDefault()

        axios.put('http://localhost:3001/update/'+id)
        .then(result =>  {
            location.reload()
        })
        .catch(err => console.log(err))

    }

    const handleDelete =(id) =>{
        axios.delete('http://localhost:3001/delete/'+id)
        .then(result =>  {
            location.reload()
        })
        .catch(err => console.log(err))
    }

    return(
        <div className='home'> 
            <h1>
                Todo List
            </h1>
            <Create/>
            <br/>
            {
                todos.length === 0 ?
                <div><h2>No Record</h2></div>
                :
                todos.map(todo => (
                    <div className='task'>
                        <div className='checkbox' onClick={(e) => handleEdit(todo._id,e)}>
                            {todo.done ?  "True"
                            : "False"  }

                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>

                       
                       
                        </div>
                        {/* <div>
                            <span>
                                <BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)}/>
                                </span>
                        </div> */}
                    </div>
                ))
            }
        </div>
    )
}
export default Home