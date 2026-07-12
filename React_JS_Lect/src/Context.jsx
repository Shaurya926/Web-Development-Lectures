// import { createContext, useReducer } from "react";


// let C = createContext()
// export default C
// let data={
//     apidata: [],
//     cart:[]
// }

// import React from 'react'

// const Context = ({children}) => {
//     function reduser(state, action) {
//         console.log(action, "actionnn");
//         if (action.type == "add_data") {
//             return {
//                 ...state,
//                 apidata: action.payload
//             }
//         }
//     }
//     let [state,dispatch]=useReducer(reduser,data)
//     return (
//         <C.Provider value={{ state, dispatch }}>
//             {children}
            
//       </C.Provider>
//   )
// }

// export {Context}
import React, { createContext, useReducer } from 'react'

const C = createContext()

const initialState = {
  apidata: [],
  cart: []
}

function reducer(state, action) {
  switch (action.type) {
    case 'add_data':
      return { ...state, apidata: action.payload }

    case 'add_to_cart': {
      const exists = state.cart.find(item => item.id === action.payload.id)
      if (exists) return state
      return { ...state, cart: [...state.cart, action.payload] }
    }

    default:
      return state
  }
}

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <C.Provider value={{ state, dispatch }}>
      {children}
    </C.Provider>
  )
}

export default C