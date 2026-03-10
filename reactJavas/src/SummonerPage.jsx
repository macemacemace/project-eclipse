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


      <div>Champ name:{match.championsArray[0]}</div>
      <div style={{display: 'flex'}}>
        <div>KDA:{match.playerKillsArray[0]}/</div>
        <div>{match.playerDeathsArray[0]}/</div>
        <div>{match.playerAssistsArray[0]}</div>
        
        </div>
      
      <div>DamageDealt:{match.damageDealtArray[0]}</div>
      <div>Key stone:{match.keyStonesArray[0]}</div>
      <div>Primary rune 1:{match.keyRune1Array[0]}</div>
      <div>Primary rune 2:{match.keyRune2Array[0]}</div>
      <div>Primary rune 3:{match.keyRune3Array[0]}</div>
      <div>CS:{match.minionKillsArray[0]}</div>
      

      </div>//end of inside map div
    ))}

   </div> // end of main div
    

  )
    
  
  
}



export default SummonerPage;