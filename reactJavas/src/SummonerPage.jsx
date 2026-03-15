import { useEffect } from "react";
import { useParams} from "react-router-dom"
import {useState} from "react"

const SummonerPage = () =>{



  const {region, name, tag} = useParams()
  console.log(region, name, tag)


  const [summonerData, setSummonerData] = useState(null);
  const [spellData, setSpellData] =useState(null);
  const [runesData, setRunesData] = useState(null);
   
  useEffect(() => {
    async function fetchData() {
      
    
   const response = await fetch(`http://localhost:3000/summoner/${region}/${name}/${tag}`)
   const spellJson = await fetch("https://ddragon.leagueoflegends.com/cdn/16.5.1/data/en_US/summoner.json");
   const runesJson = await fetch (`https://ddragon.leagueoflegends.com/cdn/16.5.1/data/en_US/runesReforged.json`)
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

  return(
    <div>
    <div>{summonerData?.data?.gameName}</div>
    <div>{summonerData?.data?.tagLine}</div>
    <div>{summonerData?.data2?.[0]?.tier}</div>
    <div>{summonerData?.data2?.[0]?.rank}</div>
    <div>W:{summonerData?.data2?.[0]?.wins}</div>
    <div>L:{summonerData?.data2?.[0]?.losses}</div>

    {summonerData?.matchesArray.map((match,index) => (
      <div>
      <div>Game Duration:{match.gameDuration}</div>

      {Array.from({length: 10}).map((_, playerIndex) => (


        <div key = {playerIndex}>
      <div>---------------Summoner Name:{match.riotIdGameNamesArray[playerIndex]}-----------------------</div>
       <div>tag:{match.riotIdTagLinesArray[playerIndex]}</div>
      <div>Champ name:{match.championsArray[playerIndex]}</div>
      <img src={`https://ddragon.leagueoflegends.com/cdn/16.5.1/img/champion/${match.championsArray[playerIndex]}.png`} alt="champ icon"  style={{width: '50px', height: '50px'}}/>
      
      <div style={{display: 'flex'}}>
        <div>KDA:{match.playerKillsArray[playerIndex]}/</div>
        <div>{match.playerDeathsArray[playerIndex]}/</div>
        <div>{match.playerAssistsArray[playerIndex]}</div>
        
        </div>
      
      <div>DamageDealt:{match.damageDealtArray[playerIndex]}</div>
      <div>Key stone:{match.keyStonesArray[playerIndex]}</div>
      <img src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneName(match.keyStonesArray[playerIndex], runesData)?.icon}`} alt = "keystone"/>
      <div>Primary rune 1:{match.keyRune1Array[playerIndex]}</div>
       <img src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneName(match.keyRune1Array[playerIndex], runesData)?.icon}`} alt = "keystone1"/>
      <div>Primary rune 2:{match.keyRune2Array[playerIndex]}</div>
       <img src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneName(match.keyRune2Array[playerIndex], runesData)?.icon}`} alt = "keystone2"/>
      <div>Primary rune 3:{match.keyRune3Array[playerIndex]}</div>
      <img src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneName(match.keyRune3Array[playerIndex], runesData)?.icon}`} alt = "keystone3"/>
      <div>second rune tree:{match.secondaryRuneName[playerIndex]}</div>
      <img src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneName(match.secondaryRuneName[playerIndex], runesData)?.icon}`} alt = "secondary tree"/>
      <div>first secondary rune:{match.secondaryRune1Array[playerIndex]}</div>
      <img src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneName(match.secondaryRune1Array[playerIndex], runesData)?.icon}`} alt = "keystone2"/>
    <div>second secondary rune:{match.secondaryRune2Array[playerIndex]}</div>
    <img src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneName(match.secondaryRune2Array[playerIndex], runesData)?.icon}`} alt = "keystone2"/>
    <div>first shard:{match.playerShard1Array[playerIndex]}</div>
    <div>second shard:{match.playerShard2Array[playerIndex]}</div>
    <div>third shard:{match.playerShard3Array[playerIndex]}</div>
      <div>CS:{match.minionKillsArray[playerIndex]}</div>
      <div>Level:{match.playerLevelArray[playerIndex]}</div>

      
      <div>first item:{match.playerBuildsArray0[playerIndex]}</div>
      <img src={`https://ddragon.leagueoflegends.com/cdn/16.5.1/img/item/${match.playerBuildsArray0[playerIndex]}.png`} alt="first item" style ={{width: '50px', height: '50px'}}/>
      <div>second item:{match.playerBuildsArray1[playerIndex]}</div>
      <img src={`https://ddragon.leagueoflegends.com/cdn/16.5.1/img/item/${match.playerBuildsArray1[playerIndex]}.png`} alt="second item" style ={{width: '50px', height: '50px'}}/>
      <div>third item:{match.playerBuildsArray2[playerIndex]}</div>
      <img src={`https://ddragon.leagueoflegends.com/cdn/16.5.1/img/item/${match.playerBuildsArray2[playerIndex]}.png`} alt="third item" style ={{width: '50px', height: '50px'}}/>
      <div>forth item:{match.playerBuildsArray3[playerIndex]}</div>
      <img src={`https://ddragon.leagueoflegends.com/cdn/16.5.1/img/item/${match.playerBuildsArray3[playerIndex]}.png`} alt="forth item" style ={{width: '50px', height: '50px'}}/>
      <div>fifth item:{match.playerBuildsArray4[playerIndex]}</div>
      <img src={`https://ddragon.leagueoflegends.com/cdn/16.5.1/img/item/${match.playerBuildsArray4[playerIndex]}.png`} alt="fifth item" style ={{width: '50px', height: '50px'}}/>
      <div>sixt item:{match.playerBuildsArray5[playerIndex]}</div>
      <img src={`https://ddragon.leagueoflegends.com/cdn/16.5.1/img/item/${match.playerBuildsArray5[playerIndex]}.png`} alt="sixth item" style ={{width: '50px', height: '50px'}}/>
      <div>sevent item:{match.playerBuildsArray6[playerIndex]}</div>
        <img src={`https://ddragon.leagueoflegends.com/cdn/16.5.1/img/item/${match.playerBuildsArray6[playerIndex]}.png`} alt="seveth item" style ={{width: '50px', height: '50px'}}/>

        
      <div>first summoner:{match.summoner1Array[playerIndex]}</div>
      <img src={`https://ddragon.leagueoflegends.com/cdn/16.5.1/img/spell/${spellData && getSpellName(match.summoner1Array[playerIndex], spellData)?.id}.png`} />
      <div>second summoner:{match.summoner2Array[playerIndex]}</div>
        <img src={`https://ddragon.leagueoflegends.com/cdn/16.5.1/img/spell/${spellData && getSpellName(match.summoner2Array[playerIndex], spellData)?.id}.png`} />


      <div>did he win?{match.winningTeam[playerIndex] ? "Win" : "Loss"}</div>
        
        </div> // end of nested loop div
       
        ))}
      </div>//end of inside map div
      
    ))}

   </div> // end of main div
    

  )
    
  
  
}



export default SummonerPage;