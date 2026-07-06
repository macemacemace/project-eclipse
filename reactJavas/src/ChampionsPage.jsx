import { useEffect } from "react";
import {useState} from "react"
import './SummonerPage.css'
import Navbar from './Navbar'

const ChampionsPage = () => {

    const [version, setVersion] = useState(null);
  const [championList, setChampionList] =useState(null);
  const [champData, setChampData] = useState(null);


  useEffect(() => {
    async function fetchData(){

        const versionRes = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
        const versions = await versionRes.json();
        const latestVersion = versions[0];
        setVersion(latestVersion);


        const split = latestVersion.split(".");
        split.pop();
        const patchFormated = split.join("_");

        let responseStats = await fetch(`https://stats2.u.gg/lol/1.5/champion_ranking/world/${patchFormated}/ranked_solo_5x5/emerald_plus/1.5.0.json`)

        if(!responseStats.ok){
            console.log("patch " + patchFormated + " not on u.gg yet, fetching previous patch");

            const split1 = versions[1].split(".");
            split1.pop();
            const patchFormated1 = split1.join("_");

            responseStats = await fetch(`https://stats2.u.gg/lol/1.5/champion_ranking/world/${patchFormated1}/ranked_solo_5x5/emerald_plus/1.5.0.json`)
        }

        const responseChampList = await fetch(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`)

        if(!responseStats.ok){
            throw new Error("cant fetch champ stats");
        }

        if(!responseChampList.ok){
            throw new Error("cant fetch champion list");
        }

        const statsParsed = await responseStats.json();
        const championListParsed = await responseChampList.json();

        console.log("stats from backend:", statsParsed);
        console.log("champion list:", championListParsed);

        setChampData(statsParsed);
        setChampionList(championListParsed);
    }
    fetchData()
  }, [])

  function getChampName(champId, champList){
    return Object.values(champList.data).find(champ => champ.key == String(champId))
  }

  if (!champData || !championList) {
  return (
  <div className="loadingScreen">
    <div className="dots">
      <span></span>
      <span></span>
      <span></span>
    </div>

  </div>
  )
}

let sum = 0
for (let i = 0; i < champData[0].adc.length; i++) {
  sum = sum + champData[0].adc[i][3];

}

const totalMatches = sum/2;
    return (
       
    <div style={{backgroundColor: 'black', minHeight: '100vh', color: 'white'}}>
        <Navbar />
        {champData[0].adc.filter(row => row[3] > 1500)
                         .sort((a, b) => (b[2] / b[3]) - (a[2] / a[3]))
                         .map((row, index) =>{
            const champ = getChampName(row[0], championList);
            return (
              <div key = {index}>
                {champ && <img src = 
                {`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.id}.png`}
                alt="" />}
                {champ?.name} - {((row[2] / row[3]) * 100).toFixed(1)}% - {((row[3] / totalMatches) * 100).toFixed(1)}% - {row[3].toLocaleString()}
              </div>
              
            )

        })}
    </div>
)




    
}

export default ChampionsPage