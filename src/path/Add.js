import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const Add=()=>{


    const cateList= [
        {
            "id": "1",
            "cate_name": "服装/礼品"
        },
        {
            "id": "2",
            "cate_name": "家居与园艺"
        },
        {
            "id": "3",
            "cate_name": "消费电子"
        },
        {
            "id": "4",
            "cate_name": "珠宝饰品"
        },
        {
            "id": "5",
            "cate_name": "运动/户外"
        },
        {
            "id": "6",
            "cate_name": "数码"
        },
        {
            "id": "7",
            "cate_name": "玩具游戏"
        },
        {
            "id": "8",
            "cate_name": "美妆个护"
        },
        {
            "id": "9",
            "cate_name": "健康与居家"
        },
        {
            "id": "10",
            "cate_name": "办公和学校用品"
        },
        {
            "id": "11",
            "cate_name": "艺术、手工艺和缝纫"
        },
        {
            "id": "12",
            "cate_name": "家具家居"
        },
        {
            "id": "13",
            "cate_name": "汽摩配"
        },
        {
            "id": "14",
            "cate_name": "箱包"
        },
        {
            "id": "15",
            "cate_name": "宠物用品"
        },
        {
            "id": "16",
            "cate_name": "3D打印"
        },
        {
            "id": "17",
            "cate_name": "家电"
        },
        {
            "id": "18",
            "cate_name": "食品饮料"
        },
        {
            "id": "19",
            "cate_name": "乐器"
        },
        {
            "id": "20",
            "cate_name": "其它"
        },
        {
            "id": "21",
            "cate_name": "能源/光伏"
        },
        {
            "id": "22",
            "cate_name": "玩具爱好"
        },
        {
            "id": "23",
            "cate_name": "汽车"
        },
        {
            "id": "24",
            "cate_name": "其他"
        },
        {
            "id": "25",
            "cate_name": "母婴用品"
        },
        {
            "id": "26",
            "cate_name": "庭院清洁"
        },
        {
            "id": "27",
            "cate_name": "图书与文学"
        },
        {
            "id": "28",
            "cate_name": "在线商城"
        },
        {
            "id": "29",
            "cate_name": "鞋履"
        },
        {
            "id": "30",
            "cate_name": "母婴"
        },
        {
            "id": "31",
            "cate_name": "装修装饰"
        },
        {
            "id": "32",
            "cate_name": "工具/设备"
        },
        {
            "id": "33",
            "cate_name": "厨具"
        },
        {
            "id": "34",
            "cate_name": "烟草"
        },
        {
            "id": "35",
            "cate_name": "成人用品"
        },
        {
            "id": "36",
            "cate_name": "营养/保健"
        },
        {
            "id": "37",
            "cate_name": "电子烟"
        },
        {
            "id": "38",
            "cate_name": "文具办公"
        },
        {
            "id": "39",
            "cate_name": "音乐"
        },
        {
            "id": "40",
            "cate_name": "服务"
        }
    ]

   

    const [brand,setBrand]=useState({
        brand_name:"",
        company_name:"",
        investor:"",
        city:"",
        brand_cate_id:1,
    })

const navigate= useNavigate()
    
const handleChange=(e)=>{
    console.log(e.target.name,e.target.value)
    setBrand((prev) => ({...prev, [e.target.name]:e.target.value}));
    
    console.log(brand)
}

const handleClick= async e=>{
    e.preventDefault()
    try {
        const res = await axios.post("http://206.189.42.203/api/veeseesbrands", brand)
        const newID = res.data.insertId
        alert("品牌创建成功")
        navigate("/update/"+newID);
    } catch (error) {
        return(error)
        
    }
}

return(
    <div>
        <Divider  variant="middle" />
        <Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={3}   > <h3 >新增品牌</h3>  </Grid>
        <Grid size={12}> <TextField  placeholder='品牌名称' label="品牌名称"   onChange={handleChange} name="brand_name" value={brand.brand_name}></TextField>      </Grid>
        <Grid size={12}> <TextField placeholder='公司名称' label="公司名称" onChange={handleChange} name="company_name" value={brand.company_name}></TextField>  </Grid>
        <Grid size={12}><TextField placeholder='投资背景' label="投资背景" onChange={handleChange} name="investor" value={brand.investor}></TextField>   </Grid>
        <Grid size={12}> <TextField placeholder='城市' label="城市" onChange={handleChange} name="city" value={brand.city}></TextField>   </Grid>
       
        <Grid size={12}>
      <FormControl sx={{ width: '20%' }}>
        <InputLabel id="demo-simple-select-label">所属品类</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={brand.brand_cate_id}
          name="brand_cate_id" 
          label="所属品类"
          onChange={handleChange}
        >
            {cateList.map(cate=>(
                <MenuItem value={cate.id}>{cate.cate_name}</MenuItem>
            
            ))}
        </Select>
      </FormControl>
    </Grid>

    <Grid size={12}>  <Button  variant="outlined"  className='formButton' onClick={handleClick}>新增品牌</Button></Grid>
       
        </Grid>
        <Grid style={{padding:"10px"}}>
        </Grid>
        </Box>
        <Divider  variant="middle" />
    </div>
)
}

export default Add