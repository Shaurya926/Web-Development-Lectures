import React from 'react'
import { useNavigate } from 'react-router-dom'

const Userlist = () => {
    let list = ["Shaurya", "Home", "Collage", "Hostel"]
    let Navigate = useNavigate()
    
    function fun(id) {
        // console.log(id);
        Navigate(`/Profile/${id}`)
        
        
    }
  return (
      <div>
          {list.map((a,id) => {
              return (
                  <>
                      <h2>{a}</h2>
                      <button onClick={()=>fun(id)}>show</button>
                  </>
              )
          })}
    </div>
  )
}

export default Userlist