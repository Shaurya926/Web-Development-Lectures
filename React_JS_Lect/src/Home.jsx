// import React from 'react'
// import A from './A'
// const Home = ({ a }) => {
//     console.log(a);
    
//   return (
//       <div>
//           <A val={a}/>
//     </div>
//   )
// }

// export default Home
// import React from 'react'

// const Home = () => {
//   return (
//     <div>Khiiiii khiiii</div>
//   )
// }

// export default Home
// lect_10
// import React,{useContext} from 'react'
// import Context from './Context'

// const Home = () => {
//   let data = useContext(Context)
//   return (
//     <div>{data}</div>
//   )
// }

// export default Home

// import React from 'react'
// import React, { useEffect, useState } from 'react'
// import './App.css'
// const Home = ({apiData,SetApiData,cart,SetCart}) => {

//   console.log(cart,"carttttt");
  
     

    
//   useEffect(()=>{
//    async function apiCall(){

//   let res=   await   fetch("https://dummyjson.com/products")
//        let data=       await res.json()
//        console.log(data);
//        SetApiData(data.products)
       

//     }
//     apiCall()

//   },[])

//   return (
//     <div id='card'>
//       {
//         apiData.map((a)=>{
//           return(<div id='main_card'>
//           <img   src={a.thumbnail}/>
//           {/* <h4>{a.title}</h4>
//           <h6>{a.price}</h6> */}
//           <button onClick={()=>SetCart([...cart,a])}>add</button>
//           </div>)
//         })
//       }
//     </div>
//   )
// }

// export default Home

// lect_13

// import React, { useEffect } from 'react'
// import { useContext } from 'react'
// import C from './Context'

// const Home = () => {
//   let {state,dispatch}=  useContext(C)
//   console.log(state,"statetetetetetet");
  

  
//     useEffect(()=>{
//        async  function call(){
//              let res= await fetch("https://dummyjson.com/products")
//               let data= await  res.json()
//               console.log(data,"'he");
//               dispatch({type:"add_data",payload:data.products})

//         }
//         call()


//     },[])
//   return (
//     <div>
//         {
//             state.apidata.map((a)=>{
//                 console.log(a,"aaa");
                
//                 return(<>
//                       <img  src={a.thumbnail}/>
//                 </>)

//             })
//         }
//     </div>
//   )
// }

// export default Home

import React, { useEffect, useContext } from 'react'
import C from './Context'

const Home = () => {
  let { state, dispatch } = useContext(C)

  useEffect(() => {
    async function call() {
      let res = await fetch("https://dummyjson.com/products")
      let data = await res.json()
      dispatch({ type: "add_data", payload: data.products })
    }
    call()
  }, [])

  return (
    <div>
      {state.apidata.map((a) => (
        <div key={a.id}>
          <img src={a.thumbnail} width="80" />
          <p>{a.title}</p>
          <button onClick={() => dispatch({ type: 'add_to_cart', payload: a })}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home