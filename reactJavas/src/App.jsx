import React, { useState } from "react";
import Select from 'react-select';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import SummonerPage from "./SummonerPage";
import {useNavigate} from 'react-router-dom'



        




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
  

const [summonerName, setSummonerName] = useState("this is a summoner name");
const [summonerTag, setSummonerTag] = useState("this is a summoner tag");
const [summonerRegion, setSummonerRegion] = useState("region");
;

async function  handleSearch(){
  

  navigate(`/${summonerRegion}/${summonerName}/${summonerTag}`)
  

}
return (
<div> 
  <input 
type="text"
value = {summonerName}
onChange={(e) => setSummonerName(e.target.value)} />
<input type="text"
value={summonerTag}
onChange={(e) => setSummonerTag(e.target.value)}  />
<Select
        options={regions}
        onChange={(selected) => setSummonerRegion(selected.value)}
      />

<button onClick ={handleSearch}>Search</button>





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