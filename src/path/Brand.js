import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

const AllBrand=()=>{
    const [brands, setbrands]=useState([])

    useEffect(()=>{
        const fetchAllBrands = async()=>{
            try{
                const res = await axios.get("http://localhost:8800/veeseesbrands")
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
                 <th>brand_name</th>
                 <th>company_name</th>
                 <th>investor</th>
                 <th>city</th>
                 <th>brand_cate_id</th>
                 
                </tr>
        {brands.map(brand=>(
                <tr className='brand' key={brand.id}>
                 <td>{brand.id}</td>
                 <td>{brand.brand_name}</td>
                 <td>{brand.company_name}</td>
                 <td>{brand.investor}</td>
                 <td>{brand.city}</td>
                 <td>{brand.brand_cate_id}</td>
                 <td><button className='delete' onClick={()=>handleDelete(brand.idbrand)} >Delete</button></td>
                 <td><button className='update'><Link to={`/update/${brand.id}`} state={brand}>Update</Link></button></td>
                </tr>
              
        ))}
        </table>
        <button className='add'><Link to={"/add"}>Add</Link></button>
    </div>
    </div>
)
}

export default AllBrand