import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

const Brand=()=>{
    const [brands, setbrands]=useState([])

    useEffect(()=>{
        const fetchAllBrands = async()=>{
            try{
                const res = await axios.get("http://localhost:8800/brand")
                setbrands(res.data)
                console.log(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllBrands()
    },[])

    const handleDelete = async (id)=>{
        var r= window.confirm("确认删除该品牌？") 
        if (r===true){
        try {
            await axios.delete("http://localhost:8800/brand/"+id)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }}
        else{}
    }


return( <div>
    <div>All Brands</div>
    <div className='brands'>
        <table style={{width:"100%"}}>
    <tr>
                 <th>id</th>
                 <th>title</th>
                 <th>desc</th>
                 <th>google</th>
                </tr>
        {brands.map(brand=>(
           
                <tr className='brand' key={brand.idbrand}>
                 <td>{brand.idbrand}</td>
                 <td>{brand.title}</td>
                 <td>{brand.desc}</td>
                 <td>{brand.google}</td>
                 <td><button className='delete' onClick={()=>handleDelete(brand.idbrand)} >Delete</button></td>
                 <td><button className='update'><Link to={`/update/${brand.idbrand}`} state={brand}>Update</Link></button></td>
                </tr>
              
        ))}
        </table>
        <button className='add'><Link to={"/add"}>Add</Link></button>
    </div>
    </div>
)
}

export default Brand