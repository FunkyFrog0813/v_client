import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useLocation} from 'react-router-dom';

const Update=(props)=>{
    

const location = useLocation()
const state=location.state;
const brandID=location.pathname.split("/")[2]
   
    const [brand,setBrand]=useState({
        brand_id:state.id,
        brand_name:state.brand_name,
        company_name:state.company_name,
        investor:state.investor,
        city:state.city,
        brand_cate_id:state.brand_cate_id,
        keywords:[],
        Newkeywords:"",
        Newkeywords_parentid:null,
        websites:[],
        Newwebsites:"",
    })

    useEffect(()=>{
        const fetchBrandKeywords = async()=>{
            try{
                const res1 = await axios.get("http://localhost:8800/vbrandskeywords/"+brandID)
                setBrand(prevState => {
                    return {...prevState, keywords:res1.data};
                  })
                const res2 = await axios.get("http://localhost:8800/vbrandswebistes/"+brandID)
                setBrand(prevState => {
                    // Object.assign would also work
                    return {...prevState, websites:res2.data};
                  })
             
            }catch(err){
                console.log(err)
            }
        }
        fetchBrandKeywords()
    },[brandID])


console.log("Hi 1",brand)


const handleChange=(e)=>{
    setBrand((prev) => ({...prev, [e.target.name]:e.target.value}));
    
    console.log(brand)
}

const handleClick= async e=>{
    e.preventDefault()
    try {
        await axios.put("http://localhost:8800/veeseesbrands/"+brandID, brand)
        alert("品牌更新成功");
        window.location.reload()
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
        await axios.delete("http://localhost:8800/veeseesbrandskeyword/"+id)
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
        await axios.delete("http://localhost:8800/veeseesbrandswebsite/"+id)
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
        await axios.post("http://localhost:8800/veeseesbrandskeyword/", brand)
        alert("品牌关键词新增成功");
        window.location.reload()
    } catch (error) {
        return(error)
        
    }
}

const handleWebsiteClick= async e=>{
    e.preventDefault()
    try {
        await axios.post("http://localhost:8800/veeseesbrandswebsite/", brand)
        alert("品牌网站新增成功");
        window.location.reload()
    } catch (error) {
        return(error)
        
    }
}





return(
    <div className='form'>

        <h1>Update Brand</h1>
        <table style={{width:"100%"}}>
        <tr ><text>Brand  <input type='text' placeholder='brand_name'onChange={handleChange} name="brand_name" value={brand.brand_name}></input></text>    </tr>
        <tr ><text>Company_name  <input type='text' placeholder='company_name' onChange={handleChange} name="company_name" value={brand.company_name}></input></text> </tr>
        <tr ><text>Investor <input type='text' placeholder='investor' onChange={handleChange} name="investor" value={brand.investor}></input></text> </tr>
        <tr ><text>City  <input type='text' placeholder='city' onChange={handleChange} name="city" value={brand.city}></input></text> </tr>
        <tr > <text>brand_cate_id  <input type='number' placeholder='brand_cate_id' onChange={handleChange} name="brand_cate_id" value={brand.brand_cate_id}></input></text> </tr>
        <button className='formButton' onClick={handleClick}>Update Brand</button>
        </table>

        <table style={{width:"100%"}}>
        <table style={{width:"100%"}}>
        <tr> Current Keywords  </tr>
            <tr >
            <td>brand</td> <td>keyword id</td> <td>keyword</td>
                </tr>
        {brand.keywords.map(keyword=>(
                <tr className='keyworkd' key={keyword.id}>
            <td>{brand.brand_name}</td> <td>{keyword.id}</td> <td>{keyword.keyword}</td>  

            <td><button className='delete' onClick={()=>handleKeywordDelete(keyword.id)} >Delete</button></td>
                </tr>
        ))}
        </table>
        
        <table style={{width:"100%"}}>
        <tr> Add Keywords  </tr>
        <input type='text' placeholder='newkeyword'onChange={handleNewKeywordsChange} name="newkeyword"></input>
        <input type='text' placeholder='parent id'onChange={handleNewKeywordsparentChange} name="parent id"></input>
        <tr> <button onClick={handleKeywordClick}>Add New Keyword</button> </tr>
        </table>
        </table>

         

        <table style={{width:"100%"}}>
        <table style={{width:"100%"}}>
        <tr> Current Websites  </tr>
            <tr >
            <td>brand</td> <td>website id</td> <td>website</td>
                </tr>
        {brand.websites.map(website=>(
                <tr className='keyworkd' key={website.id}>
            <td>{brand.brand_name}</td> <td>{website.id}</td> <td>{website.web_url}</td>  

            <td><button className='delete' onClick={()=>handleWebsiteDelete(website.id)} >Delete</button></td>
                </tr>
        ))}
        </table>

        <table style={{width:"100%"}}>
        <tr> Add Websites  </tr>
        <input type='text' placeholder='newwebsite'onChange={handleNewWebsitesChange} name="newwebsite"></input>
        <tr> <button onClick={handleWebsiteClick}>Add New website</button> </tr>
        </table>
        </table>   


    </div>
)
}

export default Update