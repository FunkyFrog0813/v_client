import React, { useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

const Search=()=>{
    const [brand, setbrands]=useState({
        brandId:null,
        brandName:"",
        brands:[]
    })

    const handleIdChange=(e)=>{
        setbrands((prev) => ({...prev, brandId:e.target.value}));
        console.log(brand)
    }

    const handleNameChange=(e)=>{
        setbrands((prev) => ({...prev, brandName:e.target.value}));
        console.log(brand)
    }

 const handleIDSearch = async e=>{
        e.preventDefault()
        try {
            const res= await axios.get("http://localhost:8800/veeseesbrandsid/"+brand.brandId)
            console.log(res.data)
            setbrands(prevState => {
                return {...prevState, brands:res.data};
              })
            
        } catch (err) {
            console.log(err)
        }
    }

    const handleNameSearch = async e=>{
        e.preventDefault()
        try {
            const res= await axios.get("http://localhost:8800/veeseesbrandsname/"+ brand.brandName)
            console.log(res.data)
            setbrands(prevState => {
                return {...prevState, brands:res.data};
              })
            
        } catch (err) {
            console.log(err)
        }
    }



return( <div>
    <div>Search Brands</div>
    <div className='brands'>


    <table style={{width:"100%"}}>
        <tr ><text>Brand  <input type='text' placeholder='brandId'onChange={handleIdChange} name="brandId" value={brand.brandId}></input></text>   
        <button className='formButton' onClick={handleIDSearch}>Search Brand</button> </tr>
        

       
        <tr > <text>Brand  <input type='text' placeholder='brandName'onChange={handleNameChange} name="brandName" value={brand.brandName}></input></text>   
        <button className='formButton' onClick={handleNameSearch}>Search Brand</button></tr>
        </table>

        <table style={{width:"100%"}}>
    <tr>
                 <th>id</th>
                 <th>brand_name</th>
                 <th>company_name</th>
                 <th>investor</th>
                 <th>city</th>
                 <th>brand_cate_id</th>
                 
                </tr>
        {brand.brands.length>0 && brand.brands.map(brand=>(
                <tr className='brand' key={brand.id}>
                 <td>{brand.id}</td>
                 <td>{brand.brand_name}</td>
                 <td>{brand.company_name}</td>
                 <td>{brand.investor}</td>
                 <td>{brand.city}</td>
                 <td>{brand.brand_cate_id}</td>
                 <td><button className='update'><Link to={`/update/${brand.id}`} state={brand}>Update</Link></button></td>
                </tr>
              
        ))}
          <button className='allbrands'><Link to={"/allbrands"}>all brands</Link></button>
        </table>
        <button className='add'><Link to={"/add"}>Add</Link></button>
    </div>
    <pagination title={"yo"} />
    </div>
)
}

export default Search