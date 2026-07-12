import React from 'react'
import { useReducer } from 'react'
const Todo3 = () => {
    let intialData = {
        input: "",
        todos: [],
        index:null
    }
    function
        reduce(state, action) {
        if (action.type == "set_input") {
            return {
                ...state,input:action.playload
            }
        }
        else if (action.type == "add_TODO") {
            return {
                input: "",
                todos: [...state.todos, state.input]
            }
        }
        else if (action.type == "edit_TODO") {
            return {
                ...state,
                input: state.todos[action.payload],
                index:action.payload
            }
        } else if (action.type == "delete_TODO") {
            return {
                ...state,
                todos: state.todos.filter((_, id) => {
                    return id !== action.payload
                })
            }
        }
        else if (action.type == "update_TODO") {
            let updateTodos = [...state.todos]
            updateTodos[state.index] = state.input
            return {
                ...state,
                todos: updateTodos,
                input: "",
                index: null
            }
        }
        return state
    }
    let [state, dispatch] = useReducer(reduce, intialData)

     function handlesubmit() {
        if (state.index !== null) {
            dispatch({type: "update_TODO"})
        }
        else {
            dispatch({type:"add_TODO"})
        }
    }
  return (
      <div>
          <h2>Todo List</h2>
          <input onChange={(e) => dispatch({ type: "set_input", payload:e.target.value })}/>
          <button onClick={(handlesubmit)}>{state.index != null ? "update" : "add"}</button>{
              state.todos.map((a,b) => {
                  return (<>
                      <h2>{a}</h2>
                      <button onClick={()=>dispatch({type:"edit_TODO",payload:b})}>edit</button>
                      <button onClick={()=>dispatch({type:"delete_TODO",payload:b})}>delete</button>
                  </>)
              })
          }
    </div>
  )
}

export default Todo3