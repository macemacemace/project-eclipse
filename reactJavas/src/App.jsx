import React, { useState } from "react";
import Select from 'react-select';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import SummonerPage from "./SummonerPage";
import {useNavigate} from 'react-router-dom'
import './HomePage.css'
import logo from './logo.svg'



        




const regions = [
  {value: 'eun1', label: 'EU Nordic & East'},
  {value: 'euw1', label: 'EU West'},
  {value: 'kr', label: 'Korea'},
  {value: 'na1', label: 'North America'},
  {value: 'jp1', label: 'Japan'},
  {value: 'br1', label: 'Brazil'},
  {value: 'la1', label: 'Latin America North'},
  {value: 'la2', label: 'Latin America North'},
  {value: 'oc1', label: 'Oceania'},
  {value: 'tr1', label: 'Turkey'},
  {value: 'ru', label: 'Russia'},
  {value: 'me1', label: 'Middle East'},
  {value: 'sg2', label: 'Southeast Asia'},
  {value: 'tw1', label: 'Taiwan'},
  {value: 'vn2', label: 'Vietnam'}
]


function HomePage(){


  const navigate = useNavigate()
  

const [summonerName, setSummonerName] = useState("");
const [summonerTag, setSummonerTag] = useState("");
const [summonerRegion, setSummonerRegion] = useState("Region");
;

async function  handleSearch(){
  

  navigate(`/${summonerRegion}/${summonerName}/${summonerTag}`)
  

}
return (

  
 
  <div className="home-container">
     <img src={logo} alt="lolo" className="logo" />
  <div className = "search-wrapper">
    <div style={{display: 'flex'}}>
  
  <input className="search-summoner"
  placeholder="Enter name"
type="text"
value = {summonerName}
onChange={(e) => setSummonerName(e.target.value)} />


<input className="search-tag"
type="text"
placeholder="Tag"
value={summonerTag}
onChange={(e) => setSummonerTag(e.target.value)}  />

<Select
placeholder= "Region"
  styles={{
    control:(base) =>({...base, backgroundColor: 'black',color: 'white',height: '60px', border: 'none', boxShadow: 'none', color: 'gray', fontSize: '25px' }),
    singleValue: (base) =>({...base, color: 'white'}),
    menu: (base) =>({...base, backgroundColor: 'black'}),
    option: (base) =>({...base, backgroundColor: 'black' ,color: 'white'})
  }}
        options={regions}
        onChange={(selected) => setSummonerRegion(selected.value)}
      />
  </div> 
  </div>

<button onClick ={handleSearch}>Find Summoner</button>





  </div> //end of main div
 
)

}
const router = createBrowserRouter([
  {path: "/", element: <HomePage />},
  {path: "/:region/:name/:tag", element: <SummonerPage />}
])

function App(){
  return <RouterProvider router={router} />
}

export default App;
export {router}