import React, { useEffect, useState } from 'react'


const pagination=(props)=>{
    const [text,setText]=useState({
        title:"",
    })

    useEffect(()=>{
        setText(props)
    })


    return(

        <>
        <h1>{text}</h1>
        </>
    )
  
}


export default pagination