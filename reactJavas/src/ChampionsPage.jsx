import { useEffect } from "react";
import {useState} from "react"
import './SummonerPage.css'
import Navbar from './Navbar'
import './ChampionsPage.css'

const ChampionsPage = () => {

    const [version, setVersion] = useState(null);
  const [championList, setChampionList] =useState(null);
  const [champData, setChampData] = useState(null);
  const [role, setRole] = useState("adc");
  const [rank, setRank] = useState("emerald_plus");
  const [rankOpen, setRankOpen] = useState(false);
  const [region, setRegion] = useState("world");
  const [regionOpen, setRegionOpen] = useState(false);

  const regions = [
    { value: "world", label: "World" },
    { value: "na1",   label: "NA" },
    { value: "euw1",  label: "EUW" },
    { value: "eun1",  label: "EUNE" },
    { value: "kr",    label: "Korea" },
    { value: "br1",   label: "Brazil" },
    { value: "jp1",   label: "Japan" },
    { value: "oce",   label: "OCE" },
  ];

  const ranks = [
    { value: "challenger",   label: "Challenger", emblem: "challenger" },
    { value: "master_plus",  label: "Master+",    emblem: "master" },
    { value: "diamond_plus", label: "Diamond+",   emblem: "diamond" },
    { value: "emerald_plus", label: "Emerald+",   emblem: "emerald" },
    { value: "platinum_plus",label: "Platinum+",  emblem: "platinum" },
    { value: "gold_plus",    label: "Gold+",      emblem: "gold" },
  ];


  useEffect(() => {
    async function fetchData(){

        const versionRes = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
        const versions = await versionRes.json();
        const latestVersion = versions[0];
        setVersion(latestVersion);


        const split = latestVersion.split(".");
        split.pop();
        const patchFormated = split.join("_");

        let responseStats = await fetch(`https://stats2.u.gg/lol/1.5/champion_ranking/${region}/${patchFormated}/ranked_solo_5x5/${rank}/1.5.0.json`)

        if(!responseStats.ok){
            console.log("patch " + patchFormated + " not on u.gg yet, fetching previous patch");

            const split1 = versions[1].split(".");
            split1.pop();
            const patchFormated1 = split1.join("_");

            responseStats = await fetch(`https://stats2.u.gg/lol/1.5/champion_ranking/${region}/${patchFormated1}/ranked_solo_5x5/${rank}/1.5.0.json`)
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
  }, [rank,region])

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
for (let i = 0; i < champData[0][role].length; i++) {
  sum = sum + champData[0][role][i][3];

}

const totalMatches = sum/2;


    return (
       
    <div className="ChampionsPage">
        <Navbar />

        <div className="filters">
        <div className="roleButtons">
        <button className={role === "top" ? "active" : ""} onClick={() => setRole("top")}><img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top.png" alt="top" /></button>
        <button className={role === "jungle" ? "active" : ""} onClick={() => setRole("jungle")}><img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-jungle.png" alt="jungle" /></button>
        <button className={role === "mid" ? "active" : ""} onClick={() => setRole("mid")}><img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle.png" alt="mid" /></button>
        <button className={role === "adc" ? "active" : ""} onClick={() => setRole("adc")}><img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-bottom.png" alt="bot" /></button>
        <button className={role === "supp" ? "active" : ""} onClick={() => setRole("supp")}><img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png" alt="support" /></button>
      </div>

      <div className="dropdowns">
      <div className="rankDropdown">
        <div className="rankSelected" onClick={() => setRankOpen(!rankOpen)}>
          <img src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${ranks.find(r => r.value === rank).emblem}.png`} alt="" />
          <span>{ranks.find(r => r.value === rank).label}</span>
          
        </div>

        {rankOpen && (
          <div className="rankOptions">
            {ranks.map(r => (
              <div
                key={r.value}
                className="rankOption"
                onClick={() => { setRank(r.value); setRankOpen(false); }}
              >
                <img src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${r.emblem}.png`} alt="" />
                <span>{r.label}</span>
              </div>
            ))}
          </div>
          
        )}
       
      </div>
      </div>

        <div className="regionDropdown">
        <div className="regionSelected" onClick={() => setRegionOpen(!regionOpen)}>
        
          <span>{regions.find(r => r.value === region).label}</span>
          
        </div>

        {regionOpen && (
          <div className="regionOptions">
            {regions.map(r => (
              <div
                key={r.value}
                className="regionOption"
                onClick={() => { setRegion(r.value); setRegionOpen(false); }}
              >
                
                <span>{r.label}</span>
              </div>
            ))}
          </div>
        )}

      </div>
      </div>

      <div className="tableWrap">
      <table className="champTable">

        <thead className="headers">
          <tr>
            <th>Rank</th>
            <th>Champion</th>
            <th>Win rate</th>
            <th>Pick rate</th>
            <th>Matches</th>
            <th>Worst vs</th>
            <th>Best vs</th>
          </tr>
        </thead>

        <tbody>
        {champData[0][role].filter(row => row[3] > 1000)
                         .sort((a, b) => (b[2] / b[3]) - (a[2] / a[3]))
                         .map((row, index) =>{
            const champ = getChampName(row[0], championList);
            const matchups = [...row[1]].sort((a,b) => (a[1] / a[2]) - (b[1] / b[2]));
            const best1 = matchups[0][0];
            const bestChamp1 = getChampName(best1, championList);
            const best2 = matchups[1][0];
            const bestChamp2 = getChampName(best2, championList);
            const best3 = matchups[2][0];
            const bestChamp3 = getChampName(best3, championList);
            
            const worst1 = matchups[9][0];
            const worstChamp1 = getChampName(worst1, championList);
            
            const worst2 = matchups[8][0];
             const worstChamp2 = getChampName(worst2, championList);
              const worst3 = matchups[7][0];
              const worstChamp3 = getChampName(worst3, championList);
            
            return (
              <tr key = {index}>
                <td>{index + 1}</td>
                <td>
                {champ && <img src = 
                {`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.id}.png`}
                alt="" />} 
                

                  
                {champ?.name} </td>
                <td>{((row[2] / row[3]) * 100).toFixed(1)}% </td>
                <td>{((row[3] / totalMatches) * 100).toFixed(1)}% </td>
                <td>{row[3].toLocaleString()} </td>

                   
                <td>
                  <div className="counters">
                  <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${worstChamp1.id}.png`} alt="worst1" /> 
                  <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${worstChamp2.id}.png`} alt="worst1" />
                  <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${worstChamp3.id}.png`} alt="worst1" />               
                    </div></td>

                <td><div className="best">
                  <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${bestChamp1.id}.png`} alt="best" />
                  <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${bestChamp2.id}.png`} alt="best" />
                  <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${bestChamp3.id}.png`} alt="best" />
                  </div></td>
                  
              </tr>
              
            )
            
        })}
        </tbody>
    </table>
    </div>
    </div>
    )
}


    


export default ChampionsPage;