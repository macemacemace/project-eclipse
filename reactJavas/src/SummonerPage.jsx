import { useEffect } from "react";
import { useParams} from "react-router-dom"
import {useState} from "react"
import './SummonerPage.css'
import MatchCard from './MatchCard'

const SummonerPage = () =>{



  const {region, name, tag} = useParams()
  console.log(region, name, tag)

  

  const [summonerData, setSummonerData] = useState(null);
  const [spellData, setSpellData] =useState(null);
  const [runesData, setRunesData] = useState(null);
  const [version, setVersion] = useState(null);
  useEffect(() => {
    async function fetchData() {

      const versionRes = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
        const versions = await versionRes.json();
        const latestVersion = versions[0];
        setVersion(latestVersion);
      
    
   const response = await fetch(`http://localhost:3000/summoner/${region}/${name}/${tag}`)
   const spellJson = await fetch(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/summoner.json`);
   const runesJson = await fetch (`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/runesReforged.json`)
   if(!response.ok){
      throw new Error("cant fetch data")
    }
   if (!spellJson.ok){
    throw new Error("cant fetch summoner json")
   }
   if(!runesJson.ok){
    throw new Error("cant fetch runes");
   }
   
   const runesDataParsed = await runesJson.json();
   const data = await response.json()
   const spellDataParsed = await spellJson.json();

   
   console.log(spellData)
   console.log(data)
   console.log(runesData)
   


      setSummonerData(data);
      setSpellData(spellDataParsed)
      setRunesData(runesDataParsed)

    }
    fetchData()
  }, [])

  function getSpellName(spellId, spellData){
    return Object.values(spellData.data).find(spell => spell.key == String(spellId))
  }
  function getRuneName(runeId, runesData){
     for (let i = 0; i < runesData.length; i++) {
      const tree = runesData[i];
      if(tree.id == runeId){
        return tree;
      }
      
      for (let j = 0; j < tree.slots.length; j++) {
        const insideTree = tree.slots[j];
        if(insideTree.id == runeId){
        return insideTree;
      }
        for (let k = 0; k < insideTree.runes.length; k++) {
          const rune = insideTree.runes[k];
          if (rune.id == runeId){
            return rune;
          }
        }
        
      }
     }
  }

  
  const roles = ['Top', 'Jungle', 'Mid', 'Bottom', 'Support', 'Top', 'Jungle', 'Mid', 'Bottom', 'Support'];
  
   if (!summonerData || !spellData || !runesData) {
  return <div>Loading...</div>
}
  
console.log(summonerData?.data5)
  return(
    <div className="SummonerPage">
    <div className="profileCard">

    <div className="profileLeft">
    <div className="ProfileIconCard">
      <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${summonerData.data5.profileIconId}.jpg`} alt="icon" style={{width: '75px', height:'75px'}} />
      <div className="SummonerLevel">
        {summonerData?.data5?.summonerLevel}</div>

        </div>
      <div className="SummonerName">
        <div>{summonerData?.data?.gameName}</div>
    <div className="tag">#{summonerData?.data?.tagLine}</div>
     
     </div>

     </div>

     <div className="divider"></div>


    <div className="ProfileMiddle">

  <div className="RankImage">
    <img
      src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${summonerData?.data2?.[0]?.tier?.toLowerCase()}.png`}
      alt="rank emblem"
    />
  </div>

  <div className="RankInfo">
    <div className="RankTier">
      <span>{summonerData?.data2?.[0]?.tier}</span>
      <span className="RankNumeral">{summonerData?.data2?.[0]?.rank}</span>
    </div>
    <div className="RankLp">
      {summonerData?.data2?.[0]?.leaguePoints} LP
    </div>
    <div className="Season">Season 2026</div>
  </div>

</div>

<div className="divider2"></div>

    <div className="ProfileRight">

    
    <div className="Winrate">
      {((summonerData?.data2?.[0]?.wins / (summonerData?.data2?.[0]?.wins + summonerData?.data2?.[0]?.losses)) * 100).toFixed(0)}%
        </div>
        <div className="WinsLosses">
    <div className="Wins">{summonerData?.data2?.[0]?.wins}W</div>
    <div className="Losses">{summonerData?.data2?.[0]?.losses}L</div>
    </div>
        </div>
     
     
      


    </div>  {/*end of profile card*/}

    <div className="Matches">
      <div className="Recent">Recent Matches</div>
     {summonerData?.matchesArray.map((match, index) => {
  const playerIndex = match.riotIdGameNamesArray.findIndex(
    (playerName, i) => playerName.toLowerCase() === name.toLowerCase() && match.riotIdTagLinesArray[i].toLowerCase() === tag.toLowerCase()
  )



  return (
    <MatchCard
            key={index}
            match={match}
            playerIndex={playerIndex}
            spellData={spellData}
            runesData={runesData}
            getSpellName={getSpellName}
            getRuneName={getRuneName}
            version={version}
        />
       
      
      
      )
     })}
    
    
  

    
    

   </div>

  </div>

)
    
}





export default SummonerPage;
 


 

{/* */}