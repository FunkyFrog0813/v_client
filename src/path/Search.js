import React, { useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';


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
            const res= await axios.get("http://206.189.42.203/api/veeseesbrandsid/"+brand.brandId)
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
            const res= await axios.get("http://206.189.42.203/api/veeseesbrandsname/"+ brand.brandName)
            console.log(res.data)
            setbrands(prevState => {
                return {...prevState, brands:res.data};
              })
            
        } catch (err) {
            console.log(err)
        }
    }



return( <div>
    <div><h1>品牌搜索</h1></div>
    <div className='brands'>


    <Grid container spacing={2}> 
    <Grid size={3} >  </Grid > 
    <Grid size={5} > <TextField  fullWidth id="standard-basic" label="输入品牌ID" variant="standard" type='text' onChange={handleIdChange} name="brandId" value={brand.brandId}></TextField> </Grid >
    <Grid size={4} style={{textAlign:"left" }} > <Button  variant="outlined" onClick={handleIDSearch}>搜索品牌</Button >  </Grid >
        
   
    <Grid size={3} >  </Grid > 
    <Grid size={5} >   <TextField type='text' fullWidth  variant="standard"  label="输入品牌名" onChange={handleNameChange} name="brandName" value={brand.brandName}></TextField>  </Grid >
    <Grid size={4} style={{textAlign:"left" }} >  <Button variant="outlined" onClick={handleNameSearch}>搜索品牌</Button></Grid >
        </Grid > 

        <Grid style={{padding:"20px"}}>
        </Grid>

        <TableContainer component={Paper}  >
        <Table  sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        {brand.brands.length>0 && <TableHead>
    <TableRow style={{backgroundColor:"#dbe0e6" }}>
                 <TableCell >品牌id</TableCell >
                 <TableCell >品牌名称</TableCell >
                 <TableCell >公司名</TableCell >
                 <TableCell >投资背景</TableCell >
                 <TableCell >城市</TableCell >
                 <TableCell >所属分类</TableCell >
                 <TableCell >更新</TableCell >
                 
                </TableRow>
                </TableHead>}
                
                <TableBody>
        {brand.brands.length>0 && brand.brands.map(brand=>(
                <TableRow className='brand' key={brand.id}>
                 <TableCell>{brand.id}</TableCell>
                 <TableCell>{brand.brand_name}</TableCell>
                 <TableCell>{brand.company_name}</TableCell>
                 <TableCell>{brand.investor}</TableCell>
                 <TableCell>{brand.city}</TableCell>
                 <TableCell>{brand.brand_cate_id}</TableCell>
                 <TableCell><Button variant="outlined"  className='update'><Link to={`/update/${brand.id}`} state={brand}>更新品牌</Link></Button></TableCell>
                </TableRow>
              
        ))}
        </TableBody>
        
        </Table>
        </TableContainer>
        
        <Grid style={{padding:"20px"}}>
        </Grid>

        <Button className='allbrands'><Link to={"/allbrands"}>所有品牌</Link></Button>
        <Button className='add'><Link to={"/add"}>新增品牌</Link></Button>
    </div>
    <pagination title={"yo"} />
    </div>
)
}

export default Search