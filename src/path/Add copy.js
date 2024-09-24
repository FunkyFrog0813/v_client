import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Add=()=>{
    const [brand,setBrand]=useState({
        title:"",
        desc:"",
        google:null,
    })

const navigate= useNavigate()
    
const handleChange=(e)=>{
    setBrand((prev) => ({...prev, [e.target.name]:e.target.value}));
    
    console.log(brand)
}

const handleClick= async e=>{
    e.preventDefault()
    try {
        await axios.post("http://localhost:8800/brand", brand)
        alert("品牌创建成功");
        navigate("/")
    } catch (error) {
        return(error)
        
    }
}

return(
    <div className='form'>
        <h1>Add new brand</h1>
        <input type='text' placeholder='title'onChange={handleChange} name="title"></input>
        <input type='text' placeholder='desc' onChange={handleChange} name="desc"></input>
        <input type='number' placeholder='google' onChange={handleChange} name="google"></input>
        <button onClick={handleClick}>Add Brand</button>
    </div>
)
}

export default Add