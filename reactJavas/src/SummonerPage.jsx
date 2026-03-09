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
    const data = await response.json()
    
    if(!response.ok){
      throw new Error("cant fetch data")
    }
      setSummonerData(data);
    }
    fetchData()
  }, [])


  return(
    <div>{summonerData?.data?.gameName}</div>
  )
    
  
  
}



export default SummonerPage;