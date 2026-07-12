// import React, { useEffect, useState } from 'react'
// import './App.css'

// const Todo = () => {
//   let [input, SetInput] = useState("")
//   let [todos, SetTodos] = useState(() => {
//     let data = localStorage.getItem("key")
//     if (data) {
//       return JSON.parse(data)
//     }
//     return []
//   });

//   useEffect(
//     () => {

//       localStorage.setItem("key", JSON.stringify(todos))
//     }, [todos])

//   function d(id) {
//     let update = todos.filter((a, b) => {
//       return id != b
//     })
//     SetTodos(update)
//   }
//   function edit(id) {
//     let text = window.prompt("Edit text:")
//     const update = [...todos]
//     update[id] = text
//     SetTodos(update)

//   }
//   return (
//     <div class='Main'>
//       <h1>Todo List</h1>
//       <input onChange={(e) => SetInput(e.target.value)} placeholder='Enter a task'></input>
//       <button onClick={() => SetTodos([...todos, input])} >add</button>
//       {
//         todos.map((a, id) => {
//           return (<div class='F'>
//             <h3>{a}</h3>
//             <div class='field'>
//               <button onClick={() => d(id)} id='red' >delete</button>
//               <button onClick={()=>edit(id)} id='red'>edit</button>
//             </div>
//           </div>)
//         })
//       }
//     </div>

//   )
// }

// export default Todo

// lect_8
// import React, { useEffect, useState } from "react";
// import "./App.css";

// const Todo = () => {
//   const [task, setTask] = useState("");
//   let [index,SetIndex]=useState(null)
//   const [todos, setTodos] = useState(()=>{
//     let data=  localStorage.getItem("key")
//     if(data){
//         return JSON.parse(data)
//     }
//     return []
//   });
//   useEffect(()=>{
//     localStorage.setItem("key",JSON.stringify(todos))

//   },[todos])


//   function edit(index){
//     setTask(todos[index])
//     SetIndex(index)

//   }

//   function handleAorUpdate(){
//     if(task.trim()==""){
//         return;
//     }
//     console.log("helloooooo");
    
//     if(index!==null){
//         let updateDATA=[...todos]
//         updateDATA[index]=task
//         setTodos(updateDATA)
//     }else{
//         setTodos([...todos,task])
//         setTask("")
//     }
    

//   }
//   function d(id){
//    let d= todos.filter((a,b)=>{
//         return id!=b

//     })
//     setTodos(d)

//   }

//   return (
//     <div className="container">
//       <h1>Todo List</h1>

//       <div className="input-box">
//         <input
//           type="text"
//           name="task"
//           value={task}
//           placeholder="Enter a task"
//           onChange={(e)=>setTask(e.target.value)}
  
//         />

// <button onClick={handleAorUpdate}>
//     {index!==null?"update":"Add"}
//     </button>
//       </div>
    

//       <div className="todo-list">
//         {todos.map((todo, index) => (
//           <div className="todo-item" key={index}>
//             <span>{todo}</span>

//             <div className="actions">
//               <button onClick={()=>edit(index)}>
//                 Edit
//               </button>

//               <button  onClick={()=>d(index)}>
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Todo;

// usereducer
// import React, { useReducer } from 'react'


// const Todo = () => {
//   let [count, disptach] = useReducer(reducer, 0)
//   function reducer(count,action) {
//     if (action.type == "inc") {
//       return count+1
//     }
//     else if (action.type == "dec") {
//       return count-1
//     }
//     else if (action.type == "reset") {
//       return 0
//     }
//   }
//   return (
//     <div>
//       <h2>{count}</h2>
//       <button onClick={()=>disptach({type:"dec"})}>--</button>
//       <button onClick={()=>disptach({type:"inc"})}>++</button>
//       <button onClick={()=>disptach({type:"reset"})}>reset</button>
//     </div>
//   )
// }

// export default Todo

// TODO with usereducer
// lect_7 to lect_9
import React, { useReducer } from 'react'

const Todo = () => {
    let intialData={
        input:"",
        todos: [],
        index:null
        
    }
    function reducer(state,action){
        if (action.type == "set_input") {
            return {
                ...state, input: action.payload
            }
        } else if (action.type == "add_TODO") {
            return {
                input: "",
                todos: [...state.todos, state.input]
            }
        }
        else if (action.type == "edit_TODO") {
            return {
                ...state,
                input: state.todos[action.payload]
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

    }
    let [state, dispatch] = useReducer(reducer, intialData)

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
      <h2>TODO List</h2>
        <input onChange={(e)=>dispatch({type:"set_input",payload:e.target.value})}/>
        <button onClick={(handlesubmit)}>{state.index!=null?"update":"add"}</button>
        {
            state.todos.map((a,b)=>{
                return(<>
                    <h2>{a}</h2>
                    <button onClick={()=>dispatch({type:"edit_TODO",payload:b})}>edit</button>
                    <button onClick={()=>dispatch({type:"delete_TODO",payload:b})}>delete</button>
                </>)
            })
        }
    </div>
  )
}

export default Todo