// Lect_1

// import { useState } from "react"
// const App = () => {
//   let [count, SetCount] = useState(0)
//   function fun1() {
//     SetCount(count+1)
//   }
//   function fun2() {
//     SetCount(count-1)
//   }
//   return (
//     <div>
//       <h1>{count}</h1>
//       <button onClick={fun2}>Dec</button>
//       <button onClick={fun1}>click</button>
//       </div>
//   )
// }

// import React, { useState } from 'react'

// const App = () => {
//   let [color, SetColor] = useState("red")
//   function fun1() {
//     SetColor("green")
//   }
//   function fun2() {
//     SetColor("red")
//   }
//   function fun3() {
//     SetColor("pink")
//   }
//   function fun4() {
//     SetColor("black")
//   }
//   return (
//     <div style={{ backgroundColor: color, height: "100vh" }}>
//       <button onClick={fun1}>red</button>
//       <button onClick={fun2}>red</button>
//       <button onClick={fun3}>red</button>
//       <button onClick={fun4}>red</button>
//     </div>
//   )
// }


// export default App

//lect_2

// import React from 'react'
// import About from './About'

// const App = () => {
//   return (
//     <div>
//       <Home />
//       <About/>
//     </div>
//   )
// }
// const Home = () => {
//   return (
//     <div>Hello</div>
//   )

// }
// export default App

// import React from 'react'
// import New from './New'
// import { About } from './New'
// import Home from './Home'

// const App = () => {
//   let data ="hello"
//   return (
//     <div>
//       <New a={data} />
//       <About/>
//       App</div>
//   )
// }

// export default App

// import React from 'react'
// import Home from './Home'
// let data="hello"

// const App = () => {
//   return (
//     <div>
//       <Home a={data} />
//     </div>
//   )
// }

// export default App


//lect_3

// import React, { useState } from 'react'
// import Home from './Home'

// const App = () => {
//   let data="hello"
//   let [count,Setcount]=useState(0)
//   function fun() {
//     Setcount(count+1)
//   }
//   function fun1() {
//     Setcount(count-1)
//   }
//   function fun2() {
//     Setcount(count = 0)
//   }
//   return (
//     <div>
//       <h1>{count}</h1>
//       <Home a={data} />
//       <button onClick={fun}>++</button>
//       <button onClick={fun1}>--</button>
//       <button onClick={fun2}>reset</button>
//     </div>
//   )
// }

// export default App

// import React, { useState } from 'react'

// const App = () => {
//   let [time, Settime] = useState(0)
//   function fun() {
//     Settime({

//     })
//   }
//   return (
//     <div>
//       <h3>{time}</h3>
//       <buttom>click</buttom>
//     </div>
//   )
// }

// export default App

// import React, { useState } from 'react'

// const App = () => {
//   let [input, SetInput] = useState("")
//   let [data, SetData] = useState("")
//   function fun(e) {
//     SetInput(e.target.value)
//     // console.log(e.target.value);

//   }
//   function fun1() {
//     SetData(input)
//     SetInput("")
//   }

//   return (
//     <div>
//       <h2>{data}</h2>
//       <input type="text" value={input} onChange={fun}></input>
//       <button onClick={fun1}>click</button>
//     </div>
//   )
// }

// export default App


// import React from 'react'
// import Form from './Form'

// const App = () => {
//   return (
//     <div>
//       <Form/>
//     </div>
//   )
// }

// export default App


// Lect_4
// import React, { useEffect, useState } from 'react'

// const App = () => {
//   let [count, SetCount] = useState(0)
//   // console.log("hello"); beacuse of the count value incerement so the "hello" print again and again.
//   useEffect(() => {
//     console.log("hello");

//   }, [])
//   // we use empty array to store the particuler output or the function we don't want repeat again and again.

//   return (
//     <div>
//       <h3>{count}</h3>
//       <button onClick={()=>SetCount(count+1)}>click</button>
//     </div>
//   )
// }

// export default App


// import React, { useEffect, useState } from 'react'

// const App = () => {
//   let[ApiData, SetApiData]=useState([])
//   let [city, SetCity] = useState("Jabalpur")
//   useEffect(() => {
//     console.log("hello");
//     async function api() {

//       let res = await fetch('https://jsonplaceholder.typicode.com/users/')
//       let data = await res.json()
//       console.log(data);
//       SetApiData(data)
//       console.log(ApiData[0],"heheh");

//     }
//     api()

//   },[city])

//   return (
//     <div>
//       <h3>{city}</h3>
//       <div class="div">{
//         ApiData.map((a) => {
//           return (<>
//           <div class="card"> 
//             <h2>Name:{a.name}</h2>
//             <h2>UserName:{a.username}</h2>
//             <h2>Email:{a.email}</h2>
//               <br></br>
//               <br></br>
//           </div>
//           </>)
//       })
//       }</div>
//       <button onClick={() => SetCity("delhi")}>change</button>
//     </div>
//   )
// }

// export default App


// lect_5
// import React from 'react'
// import Task1 from './Task1'

// const App = () => {
//   return (
//     <div>
//       <Task1/>

//     </div>
//   )
// }

// export default App


// lect_6
// react roueter dom 

// import React from 'react'
// import NavBar from './NavBar'
// import Home from './Home'
// import About from './About'
// import New from './New'
// import Task from './Task'
// import { Route,Routes } from 'react-router-dom'

// const App = () => {
//   return (
//     <div>
//       <NavBar />
//       <Routes>
//         <Route path="/" element={<Home />}></Route>
//         <Route path="/about" element={<About/>}></Route>
//         <Route path="/new" element={<New />}></Route>
//         <Route path="/task" element={<Task/>}></Route>

//       </Routes>
//     </div>
//   )
// }

// export default App



// lect_7, lect_8, and lect_9
// import React from 'react'
// import Todo2 from './Todo2'

// const App = () => {
//   return (
//     <div>
//       <Todo2/>
//     </div>
//   )
// }

// export default App

// lect_10
// import React from 'react'
// import Home from './Home.jsx'
//  const App = () => {
//   return (
//     <div>
//       <Home/>
//     </div>
//   )
//  }
// export default App

// import React from 'react'

// const App = () => {
//   return (
//     <div>
//       <NavBar/>
//     </div>
//   )
// }

// export default App

// import { useEffect } from "react"
// import { useState } from "react"
// import React from 'react'
// import Home from "./Home"
// import NavBar from "./NavBar"
// import { Route, Routes } from "react-router-dom"
// import Cart from "./Cart"


// const App = () => {
//   let [apiData,SetApiData] =   useState([])
//     let [cart,SetCart]= useState([])
//   return (

//     <div>
//       <NavBar/>
//       <Routes>
//         <Route path="/" element={<Home apiData={apiData}  SetApiData={SetApiData} cart={cart}  SetCart={SetCart}/>}/>
//         <Route path="/cart" element={<Cart cart={cart}/>}/>
//       </Routes>
//     </div>
//   )
// }


// export default App


// lect_11
// import React from 'react'
// import Todo2 from './Todo2'

// const App = () => {
//   return (
//     <div>
//       <Todo2/>
//     </div>
//   )
// }

// export default App



// lect_12
// Custom Hooks

// Custom hooks are incredibly powerful, but the best approach depends entirely on your specific use case, state requirements, and application setup.

// import { useMemo } from 'react'
// import useCounter from './useCounter'

// const App = () => {
//   let { count, inc, dec, reset } = useCounter(0)

// function call() {
//   let res = 0
//   for (let i = 0; i < 1000000; i++){
//     res += i;
//   }
//   return res
// }
// let total = call()

// useMemo

//   let total = useMemo(() => {
//     let res = 0
//     for (let i = 0; i < 100000000; i++){
//       res += i;
//     }
//     return res
//   },[])

//   return (
//     <div>
//       <h2>{count}</h2>
//       <h2>{total}</h2>
//       <button onClick={inc}>++</button>
//       <button onClick={dec}>--</button>
//       <button onClick={reset}>reset</button>
//     </div>
//   )
// }

// export default App

// import React, { memo, useState } from 'react'

// const App = () => {
//   let [count,SetCount]=useState(0)
//   return (
//     <div>
//       <h2>{count}</h2>
//       <button onClick={() => SetCount(count + 1)}>add</button>
//       <Child/>
//     </div>
//   )
// }

// const Child = () => {
//   console.log("hello");

//   return (
//     <div>hello</div>
//   )
// }
//  Child = memo(function () {
//   console.log("hello");
//   return (<>
//   </>)

// })
// export default App


// lect_13

// import React from 'react'
// import Home from "./Home"
// import Cart from './Cart'

// const App = () => {
//   return (
//     <div>
//       <Home/>
//       <Cart/>
//     </div>
//   )
// }

// export default App

// import React from 'react'
// import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
// import Home from './Home'
// import Cart from './Cart'

// const App = () => {
//   return (
//     <BrowserRouter>
//       <nav>
//         <Link to="/">Home</Link> | <Link to="/cart">Cart</Link>
//       </nav>

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/cart" element={<Cart />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App


// lect_14
// dynamic routing

// import React from 'react'
// import Userlist from "./Userlist"
// import { Route, Routes } from "react-router-dom"
// import UserProfile from "./UserProfile"
// import "./App.css"
// const App = () => {
//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<Userlist/>}/>
//         <Route path="/Profile/:id" element={<UserProfile/>}/>
//       </Routes>
//     </div>
//   )
// }

// export default App


// lect_15
// Prototype

// import React from 'react'

// const App = () => {
// Array.prototype.myMap = function (cb) {
//   let res = []
//   for (let i = 0; i < this.length; i++){
//     // res.push(cb(this[i],i,this))
//     if (cb(this[i], i, this)) { // filter function logic
//       res.push(this[i])
//     }
//   }
//   return res
// }
// let arr = [1, 2, 3, 4, 5]
// let val = arr.myMap(function (a, b, c) {
//   return a>2
// })
// console.log(val);
//   Array.prototype.myReduce = function (cb,initialvalue=0) {
//     let sum = initialvalue
//     for (let i = 0; i < this.length; i++){
//       sum=cb(sum,this[i])
//     }
//     return sum
// }
//   let arr = [1, 2, 3, 4, 5]
//   let data = arr.myReduce((a, b) => {
//     return a*b
//   },1)
//   console.log(data);

//   return (
//     <div>
//       <h2>{data}</h2>
//     </div>
//   )
// }

// export default App


// lect_16
// connect chat gpt
// AI integration
// import React, { useState } from 'react'
// import { GoogleGenerativeAI } from '@google/generative-ai'


// const App = () => {
//   let [searchData, SetSearchData] = useState('')
//   let genAI = new GoogleGenerativeAI(process.env.REACT_APP_GCP_API_KEY || "REDACTED")
//   async function search() {
//     try {
//       let model = genAI.getGenerativeModel({
//         model: "gemini-2.5-flash"
//       })
//       let res = await model.generateContent(searchData)
//       console.log(res.response.text());

//     }
//     catch (er) {
//       console.log(er);

//     }
//   }
//   return (
//     <div className='min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4'>

//       <div className="text-center">
//         <h1 className="text-3xl font-bold text-white">AI Search</h1>
//         <p className="text-gray-400 text-sm mt-1">Gemini</p>
//       </div>
//       <div className="flex gap-2">
//         <input className='flex-1 bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors' placeholder='ask me anything ' onChange={(e) => SetSearchData(e.target.value)}></input>
//         <button className='bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-3 ' onClick={search}>search</button>
//       </div>

//     </div>
//   )
// }

// export default App