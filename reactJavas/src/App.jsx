import React, { useState } from "react";
import Select from 'react-select';



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


{summonerData && <div>{summonerData.data.gameName}</div>}
{summonerData && <div>{summonerData.data.tagLine}</div>}
{summonerData && <div>{summonerData.data2[0].tier}</div>}
{summonerData && <div>{summonerData.data2[0].rank}</div>}
{summonerData && <div>LP:{summonerData.data2[0].leaguePoints}</div>}
{summonerData && <div>W:{summonerData.data2[0].wins}</div>}
{summonerData && <div>L:{summonerData.data2[0].losses}</div>}


{summonerData.match.map((match, index) => (
  <div key = {index}>
    {summonerData && <div>Team: {summonerData.match.playerTeamArray[0]}</div>}
{summonerData && <div>Champ name: {summonerData.match.championsArray[0]}</div>}
<div style ={{display: 'flex'}}>
{summonerData && <div>{summonerData.match.playerKillsArray[0]}/</div>}
{summonerData && <div>{summonerData.match.playerDeathsArray[0]}/</div>}
{summonerData && <div>{summonerData.match.playerAssistsArray[0]}</div>}
  </div>
{summonerData.match[0].winningTeam[0] ? "Win" : "Loss"}
  </div>
))}

  </div> //end of main div
)

}

export default App;

