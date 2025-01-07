import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useLocation} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';



import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Update=()=>{


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

const location = useLocation()
const state=location.state;
const brandID=location.pathname.split("/")[2]
   
    const [brand,setBrand]=useState({
        brand_id:brandID,
        brand_name:"",
        company_name:"",
        investor:"",
        city:"",
        brand_cate_id:0,

        keywords:[],
        Newkeywords:"",
        Newkeywords_parentid:null,
        websites:[],
        Newwebsites:"",
    })

    useEffect(()=>{

        const getBrand = async()=>{
        if(!state){
            console.log("hi")
            try {
                const res= await axios.get("http://206.189.42.203/api/veeseesbrandsid/"+brandID)
                console.log(res.data)
                setBrand(prevState => {
                    return {...prevState, brand_id:res.data[0].id,
                                brand_name:res.data[0].brand_name,
                                company_name:res.data[0].company_name,
                                investor:res.data[0].investor,
                                city:res.data[0].city,
                                brand_cate_id:res.data[0].brand_cate_id,};
                  })
                
            } catch (err) {
                console.log(err)
            }
        }else{
            setBrand(prevState => {
                return {...prevState, brand_id:state.id,
                            brand_name:state.brand_name,
                            company_name:state.company_name,
                            investor:state.investor,
                            city:state.city,
                            brand_cate_id:state.brand_cate_id,};
              })
        }}
        getBrand()

        const fetchBrandKeywords = async()=>{
            try{
                const res1 = await axios.get("http://206.189.42.203/api/vbrandskeywords/"+brandID)
                setBrand(prevState => {
                    return {...prevState, keywords:res1.data};
                  })
                const res2 = await axios.get("http://206.189.42.203/api/vbrandswebistes/"+brandID)
                setBrand(prevState => {
                    // Object.assign would also work
                    return {...prevState, websites:res2.data};
                  })
             
            }catch(err){
                console.log(err)
            }
        }
        fetchBrandKeywords()
    },[brandID,state])



const handleChange=(e)=>{
    setBrand((prev) => ({...prev, [e.target.name]:e.target.value}));
    
    console.log(brand)
}

const handleClick= async e=>{
    e.preventDefault()
    try {
        await axios.put("http://206.189.42.203/api/veeseesbrands/"+brandID, brand)
        window.open("http://206.189.42.203/")
        alert("品牌更新成功");
    } catch (error) {
        return(error)
        
    }
}


const handleNewKeywordsChange=(e)=>{
    setBrand((prev) => ({...prev,  Newkeywords:e.target.value}));
    
    console.log(brand)
}

const handleNewWebsitesChange=(e)=>{
    setBrand((prev) => ({...prev, Newwebsites:e.target.value}));
    
    console.log(brand)
}

const handleNewKeywordsparentChange=(e)=>{
    setBrand((prev) => ({...prev, Newkeywords_parentid:e.target.value}));
    
    console.log(brand)
}


const handleKeywordDelete = async (id)=>{
    var r= window.confirm("确认删除该关键词？") 
    if (r===true){
    try {
        await axios.delete("http://206.189.42.203/api/veeseesbrandskeyword/"+id)
        alert("品牌关键词删除成功");
        window.location.reload()
    } catch (err) {
        console.log(err)
    }}
    else{}
}


const handleWebsiteDelete = async (id)=>{
    var r= window.confirm("确认删除该网站？") 
    if (r===true){
    try {
        await axios.delete("http://206.189.42.203/api/veeseesbrandswebsite/"+id)
        alert("品牌网站删除成功");
        window.location.reload()
    } catch (err) {
        console.log(err)
    }}
    else{}
}



const handleKeywordClick= async e=>{
    e.preventDefault()
    try {
        await axios.post("http://206.189.42.203/api/veeseesbrandskeyword/", brand)
        alert("品牌关键词新增成功");
    } catch (error) {
        return(error)
        
    }
}

const handleWebsiteClick= async e=>{
    e.preventDefault()
    console.log(brand.Newwebsites.substring(0,3))
     if (brand.Newwebsites.substring(0,4)==="http" || brand.Newwebsites.substring(0,3)==="www"){

        alert("品牌网站格式错误,请不要使用http或www开头的网址\n正确的网址格式：baidu.com\n错误的网址格式：www.baidu.com\n错误的网址格式：https://baidu.com");
     }
     else{
    try {
        await axios.post("http://206.189.42.203/api/veeseesbrandswebsite/", brand)
        alert("品牌网站新增成功");
        window.location.reload()
    } catch (error) {
        return(error)
        
    }
}
}





return(
    <div >

        <h1>更新品牌</h1>
        <Divider  variant="middle" />
        <Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={3}   > <h3 >品牌基础信息</h3>  </Grid>
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


        <Grid size={12}>  <Button  variant="outlined"  className='formButton' onClick={handleClick}>更新品牌基础信息</Button></Grid>
        </Grid>
        <Grid style={{padding:"10px"}}>
        </Grid>
        </Box>
        <Divider  variant="middle" />
       

       
        
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={3}   > <h3 >品牌关键词</h3>  </Grid>

        <Grid   size={7 } offset={3} >
        <Table style={{width:"80%"}} >
            <TableRow style={{backgroundColor:"#dbe0e6" }} >
            <TableCell>品牌名</TableCell> <TableCell>关键词id</TableCell> <TableCell>关键词</TableCell><TableCell>删除</TableCell>
                </TableRow>
        {brand.keywords.map(keyword=>(
                <TableRow className='keyworkd' key={keyword.id}>
            <TableCell>{brand.brand_name}</TableCell> <TableCell>{keyword.id}</TableCell> <TableCell>{keyword.keyword}</TableCell>  

            <TableCell><Button variant="outlined" className='delete' onClick={()=>handleKeywordDelete(keyword.id)} >删除</Button></TableCell>
                </TableRow>
        ))}
        
        </Table>
        </Grid>
    

        <Grid   size={12 }> <TextField placeholder='输入新关键词' label="新关键词" onChange={handleNewKeywordsChange} name="newkeyword"></TextField> </Grid>
        <Grid   size={12 }> <TextField placeholder='输入关联关键词ID（选填）' label="关联关键词ID（选填）" onChange={handleNewKeywordsparentChange} name="parent id"></TextField></Grid>
        <Grid   size={12 }> <Button  variant="outlined" onClick={handleKeywordClick}>增加关键词</Button>  </Grid>
    
        </Grid>
        <Grid style={{padding:"10px"}}>
        </Grid>
    
  
        <Divider  variant="middle" />
       


        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={3}   > <h3 >品牌网站</h3>  </Grid>

        <Grid   size={7 } offset={3} >
        <Table style={{width:"80%"}} >
            <TableRow style={{backgroundColor:"#dbe0e6" }} >
            <TableCell>品牌名</TableCell> <TableCell>关键词id</TableCell> <TableCell>网站</TableCell><TableCell>删除</TableCell>
                </TableRow>
                {brand.websites.map(website=>(
                <TableRow className='keyworkd' key={website.id}>
            <TableCell>{brand.brand_name}</TableCell> <TableCell>{website.id}</TableCell> <TableCell>{website.web_url}</TableCell>  

            <TableCell><Button  variant="outlined" className='delete' onClick={()=>handleWebsiteDelete(website.id)} >删除</Button></TableCell>
                </TableRow>
        ))}
        
        </Table>
        </Grid>
    

        <Grid   size={12 }> <TextField placeholder='输入新网站' label="新网站" onChange={handleNewWebsitesChange} name="newwebsite"></TextField> </Grid>
        <Grid   size={12 }> <Button  variant="outlined" onClick={handleWebsiteClick}>增加网站</Button>  </Grid>
    
        </Grid>
        <Grid style={{padding:"10px"}}>
        </Grid>
    



    </div>
)
}

export default Update