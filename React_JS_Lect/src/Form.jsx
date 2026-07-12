import React, { useState } from 'react'
import "./App.css"

const Form = () => {
    let [input, SetInput] = useState ({ name: "", email: "", password: "" })
    function fun(e) {
        let { name, value } = e.target
        SetInput({ ...input, [name]: value })
        console.log(input);
        
    }
    
    return (
        <div>
            <form >
            <input type="text" name='name' value={input.name} onChange={fun} placeholder='Enter your name'></input>
            <br />
            <br />
            <input type="email" name='email' value={input.email} onChange={fun} placeholder='Enter your email'></input>
            <br />
            <br />
            <input type="password" name='password' value={input.password} onChange={fun} placeholder='Enter your password'></input>
            <br />
            <br />
            <button >Submit</button>
            <br />
            </form>
        </div>
    )
}

export default Form