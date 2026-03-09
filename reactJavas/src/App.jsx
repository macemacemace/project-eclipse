import React, { useState } from "react";
import Select from 'react-select';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {SummonerPage} from "./SummonerPage";

const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: "/:region/:name/:tag", element: <SummonerPage />}
])

        




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


function App(){


  

const [summonerName, setSummonerName] = useState("this is a summoner name");
const [summonerTag, setSummonerTag] = useState("this is a summoner tag");
const [summonerRegion, setSummonerRegion] = useState("region");
const [summonerData, setSummonerData] = useState(null);

async function  handleSearch(){
  const response = await fetch(`http://localhost:3000/summoner/${summonerRegion}/${summonerName}/${summonerTag}`)

  const data = await response.json();

  setSummonerData(data);

  console.log(data)

  

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

export default App;

