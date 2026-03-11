import { useEffect } from "react";
import { useParams} from "react-router-dom"
import {useState} from "react"

const SummonerPage = () =>{



  const {region, name, tag} = useParams()
  console.log(region, name, tag)


  const [summonerData, setSummonerData] = useState(null);
   
  useEffect(() => {
    async function fetchData() {
      
    
   const response = await fetch(`http://localhost:3000/summoner/${region}/${name}/${tag}`)
   if(!response.ok){
      throw new Error("cant fetch data")
    }
   
   
   const data = await response.json()
    
   console.log(data)
    
      setSummonerData(data);
    }
    fetchData()
  }, [])


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
      
      <div style={{display: 'flex'}}>
        <div>KDA:{match.playerKillsArray[playerIndex]}/</div>
        <div>{match.playerDeathsArray[playerIndex]}/</div>
        <div>{match.playerAssistsArray[playerIndex]}</div>
        
        </div>
      
      <div>DamageDealt:{match.damageDealtArray[playerIndex]}</div>
      <div>Key stone:{match.keyStonesArray[playerIndex]}</div>
      <div>Primary rune 1:{match.keyRune1Array[playerIndex]}</div>
      <div>Primary rune 2:{match.keyRune2Array[playerIndex]}</div>
      <div>Primary rune 3:{match.keyRune3Array[playerIndex]}</div>
      <div>second rune tree:{match.secondaryRuneName[playerIndex]}</div>
      <div>first secondary rune:{match.secondaryRune1Array[playerIndex]}</div>
    <div>second secondary rune:{match.secondaryRune2Array[playerIndex]}</div>
    <div>first shard:{match.playerShard1Array[playerIndex]}</div>
    <div>second shard:{match.playerShard2Array[playerIndex]}</div>
    <div>third shard:{match.playerShard3Array[playerIndex]}</div>
      <div>CS:{match.minionKillsArray[playerIndex]}</div>
      <div>Level:{match.playerLevelArray[playerIndex]}</div>

      
      <div>first item:{match.playerBuildsArray0[playerIndex]}</div>
      <div>second item:{match.playerBuildsArray1[playerIndex]}</div>
      <div>third item:{match.playerBuildsArray2[playerIndex]}</div>
      <div>forth item:{match.playerBuildsArray3[playerIndex]}</div>
      <div>fifth item:{match.playerBuildsArray4[playerIndex]}</div>
      <div>sixt item:{match.playerBuildsArray5[playerIndex]}</div>
      <div>sevent item:{match.playerBuildsArray6[playerIndex]}</div>

      <div>first summoner:{match.summoner1Array[playerIndex]}</div>
      <div>second summoner:{match.summoner2Array[playerIndex]}</div>
      <div>did he win?{match.winningTeam[playerIndex] ? "Win" : "Loss"}</div>
        
        </div> 
       
        ))}
      </div>//end of inside map div
      
    ))}

   </div> // end of main div
    

  )
    
  
  
}



export default SummonerPage;