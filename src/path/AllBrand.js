import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';




const AllBrand=()=>{

    const [isLoading, setIsLoading] = useState(false);
    const [brands, setbrands]=useState([])
    const [page, setPage]=useState({
        currentPage:1,
        pageNum:Number,
        totalPages:0
    })

    useEffect(()=>{
        setIsLoading(true)
        const fetchAllBrands = async()=>{
            try{
                const res = await axios.get("http://206.189.42.203/api/vbrandsbyid/"+page.currentPage)
                setbrands(res.data)
                console.log(res.data)
                setIsLoading(false)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllBrands()
        
    },[page.currentPage])

    useEffect(()=>{
        const fetchCounts = async()=>{
            try{
                const res = await axios.get("http://206.189.42.203/api/vbrandsbyid")
                setPage((prev) => ({...prev, totalPages:res.data}))
                console.log(res.data)
            
            }catch(err){
                console.log(err)
            }
        }
        fetchCounts()
    },[])

    const handleDelete = async (id)=>{
        var r= window.confirm("确认删除该品牌？") 
        if (r===true){
        try {
            await axios.delete("http://206.189.42.203/api/veeseesbrands/"+id)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }}
        else{}
    }

    const handleClick= async e=>{
        try {
            const res = await axios.get("http://206.189.42.203/api/vbrandsbyid/"+page.pageNum)
            setbrands(res.data)
            page.currentPage=page.pageNum
            console.log(res.data)
        
        } catch (error) {
            return(error)
            
        }
    }

    const handleChange=(e)=>{
        setPage((prev) => ({...prev, [e.target.name]:e.target.value}));
        
        console.log(page.pageNum)
    }


return( <div>
    <div>
      
      {/* Render the fetched data here */}
  
     <div><h1>所有品牌</h1></div>
    <div className='brands'>
        <Table size="small" aria-label="a dense table">
        <TableHead>
    <TableRow style={{backgroundColor:"#dbe0e6" }}>
                 <TableCell>品牌id	</TableCell>
                 <TableCell>品牌名称	</TableCell>
                 <TableCell>公司名	</TableCell>
                 <TableCell>投资背景	</TableCell>
                 <TableCell>城市</TableCell>
                 <TableCell>所属分类	</TableCell>
                 <TableCell>删除</TableCell>
                 <TableCell>更新</TableCell>
                 
                </TableRow>
                </TableHead>
                {isLoading ? <h1>Loading...</h1> : null}
        {brands.length > 0 && brands.map(brand=>(
                <TableRow className='brand' key={brand.id}>
                 <TableCell>{brand.id}</TableCell>
                 <TableCell>{brand.brand_name}</TableCell>
                 <TableCell>{brand.company_name}</TableCell>
                 <TableCell>{brand.investor}</TableCell>
                 <TableCell>{brand.city}</TableCell>
                 <TableCell>{brand.brand_cate_id}</TableCell>
                 <TableCell><Button className='delete' onClick={()=>handleDelete(brand.id)} >删除品牌</Button></TableCell>
                 <TableCell><Button className='update'><Link to={`/update/${brand.id}`} state={brand}>更新品牌</Link></Button></TableCell>
                </TableRow>
              
        ))}
          <TableRow> 
            <h3>共{page.totalPages}个品牌，共{Math.ceil(page.totalPages/20)}页，当前第{page.currentPage}页</h3>
            <input placeholder='输入跳转页码' name="pageNum" onChange={handleChange}  value={page.pageNum} ></input>
             <button  className='formButton' onClick={handleClick}>跳转</button></TableRow> 
        </Table>

      

        <Button className='add'><Link to={"/add"}>新增品牌</Link></Button>
    </div>
    </div>
    </div>
)
}

export default AllBrand