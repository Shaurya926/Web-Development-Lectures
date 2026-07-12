import React, { useEffect, useState } from 'react'

const Task = () => {
    let [search, SetSearch] = useState("")
    const [products, setProducts] = useState([])
    async function apiCall() {
        let res = await fetch(`https://dummyjson.com/products/search?q=${search}`) 
        let data = await res.json()
        console.log(data)
        setProducts(data.products)
        
    }
useEffect(() => {
    fetch(`https://dummyjson.com/products`).then((res) => {
                return res.json()
            }).then((data) => {
                console.log(data);
                setProducts(data.products)
                
            })
}, [])

    function fun() {
        let sorted = [...products].sort((a, b) => {
            return a.price-b.price
        })
        setProducts(sorted)
    }
    function fun1() {
        let sorted = [...products].sort((a, b) => {
            return b.price-a.price
        })
        setProducts(sorted)
    }
    
   
  return (
      <div>
          <input onChange={(e)=>SetSearch(e.target.value)}></input>
          <button onClick={apiCall}>search</button>
          <button onClick={fun1}>high</button>
          <button onClick={fun}>low</button>
          {
              products.map((a) => {
                  return (
                      <>
                          <h2>Brand:{a.brand}</h2>
                          <h2>Price of product:{a.price}</h2>
                          <h2>Rating:{a.rating}</h2>
                      <img src={a.thumbnail}></img>
                      </>
                  )
              })
              
          }
          <h2>Products Data</h2>
    </div>
  )
}

export default Task