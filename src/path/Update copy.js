import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Update=(props)=>{
    
const navigate= useNavigate()
const location = useLocation()
const state=location.state;
   
    const [brand,setBrand]=useState({
        title:state.title,
        desc:"",
        google:null,
    })


console.log("Hi 1",state)



const brandID=location.pathname.split("/")[2]

const handleChange=(e)=>{
    setBrand((prev) => ({...prev, [e.target.name]:e.target.value}));
    
    console.log(brand)
}

const handleClick= async e=>{
    e.preventDefault()
    try {
        await axios.put("http://localhost:8800/brand/"+brandID, brand)
        alert("品牌创建成功");
        navigate("/")
    } catch (error) {
        return(error)
        
    }
}

return(
    <div className='form'>
        <h1>Update Brand</h1>
        <input type='text' placeholder='title'onChange={handleChange} name="title" value={state.title}></input>
        <input type='text' placeholder='desc' onChange={handleChange} name="desc" value={state.desc}></input>
        <input type='number' placeholder='google' onChange={handleChange} name="google" value={state.google}></input>
        <button onClick={handleClick}>Update Brand</button>
    </div>
)
}

export default Update