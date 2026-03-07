require('dotenv').config({ path: './.env' })


const express = require(`express`)
const cors = require(`cors`)
const app = express()

app.use(cors({
    origin: ['https://localhost:5500', `http://127.0.0.1:5500`, `http://localhost:5173`]
}))
const apiKey = process.env.RIOT_API_KEY



app.get(`/summoner/:region/:name/:tag`, async (req, res)  =>  {
    try{
        const name = req.params.name;
        const tag = req.params.tag;
        const region = req.params.region;

       

        const regionMap={
            eun1: "europe",
            euw1 : "europe",
            br1:"americas",
            jp1:"asia",
            kr:"asia",
            la1:"americas",
            la2:"americas",
            tr1:"europe",
            ru:"europe",
            na1:"americas",
            me1:"asia",
            oc1:"asia",
            sg2:"asia",
            tw1:"asia",
            vn2:"asia"


        }
    

    console.log(apiKey);
        
    const response = await fetch(`https://${regionMap[region]}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${apiKey}`)
    
    console.log(apiKey)
   
    if(!response.ok){
        const errData = await response.json();
        console.log(errData);
        throw new Error("cant fetch");
    }

    const data = await response.json();

    

    const puuid = data.puuid;
    

    const response2 = await fetch(`https://${region}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}?api_key=${apiKey}`)
    
    if(!response2.ok){
        throw new Error("cant fetch ranked stats");
    }

    const data2 = await response2.json();

    const response3 = await fetch(`https://${regionMap[region]}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?type=ranked&start=0&count=10&api_key=${apiKey}`)
    
    if(!response3.ok){
        throw new Error("cant fetch last 10 matches");
    }
    const data3 = await response3.json()
    
    
     
    const matchesArray=[]         

    for(i = 0;i<data3.length;i++){
    
    const response4 = await fetch(`https://${regionMap[region]}.api.riotgames.com/lol/match/v5/matches/${data3[i]}?api_key=${apiKey}`)
        
        const data4= await response4.json();
        
       
        const gameDuration = data4.info.gameDuration;
        const championsArray = []
         const playerKillsArray = []
         const playerDeathsArray = []
         const playerAssistsArray = []
         const playerTeamArray = [];
         const winningTeam = [];
         
        
        
        for(j=0;j<data4.info.participants.length;j++){
        const championName = data4.info.participants[j].championName;
        championsArray.push(championName);
        const playerKills = data4.info.participants[j].kills;
        playerKillsArray.push(playerKills);
        const playerDeaths = data4.info.participants[j].deaths;
        playerDeathsArray.push(playerDeaths);
        const playerAssists = data4.info.participants[j].assists;
        playerAssistsArray.push(playerAssists);
        const playerTeam = data4.info.participants[j].teamId
        playerTeamArray.push(playerTeam)
        const winner = data4.info.participants[j].win
        winningTeam.push(winner)
        }
        
    const dataMatch = {playerTeamArray,gameDuration,championsArray,playerKillsArray,playerDeathsArray,playerAssistsArray,winningTeam}
    
    matchesArray.push(dataMatch);
    
    }
    
       
   
    
    
    const mergedData = {data,data2,data3, matchesArray}


    res.send(JSON.stringify(mergedData, null,2))
    
    

    }
    catch(error){
        console.error(error);
    }
})




app.listen(3000);