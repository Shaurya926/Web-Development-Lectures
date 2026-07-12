import React from 'react'
import { useParams } from 'react-router-dom'
import "./index.css"

const UserProfile = () => {
    let list = ["Shaurya", "Home", "Collage", "Hostel"]
    let { id } = useParams()
    let a= list.find((_,index)=>{
        return id==index
     })
  return (
      <div className="bg-green-400 h-screen">
          {a}
    </div>
  )
}

export default UserProfile
