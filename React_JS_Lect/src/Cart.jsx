// import React from 'react'
// import './App.css'
// const Cart = ({cart}) => {
//   return (
//     <div>
//           {
//         cart.map((a)=>{
//           return(<div id='main_card'>
//           <img   src={a.thumbnail}/>
//           </div>)
//         })
//       }
//     </div>
//   )
// }
// export default Cart
// lect_12
import React, { useContext } from 'react'
import C from './Context'

const Cart = () => {
  let { state } = useContext(C)

  return (
    <div>
      <h2>Cart ({state.cart.length} items)</h2>
      {state.cart.map((item) => (
        <div key={item.id}>
          <img src={item.thumbnail} width="80" />
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  )
}

export default Cart