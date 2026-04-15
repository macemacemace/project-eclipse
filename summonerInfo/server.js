require('dotenv').config({ path: './.env' })


const express = require(`express`)
const cors = require(`cors`)
const app = express()

app.use(cors({
    origin: ['http://localhost:5500', `http://127.0.0.1:5500`, `http://localhost:5173`]
}))
const apiKey = process.env.RIOT_API_KEY



app.get(`/summoner/:region/:name/:tag`, async (req, res)  =>  {
    try{
        const name = req.params.name;
        const tag = req.params.tag;
        

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

        const region = req.params.region.toLowerCase();

       if(!regionMap[region]){
        return res.status(400).json({
            error: "Invalid region",
             received: region
        })
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

    const response3 = await fetch(`https://${regionMap[region]}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${apiKey}`)
    
    if(!response3.ok){
        throw new Error("cant fetch last 10 matches");
    }
    const data3 = await response3.json()
    
    const response5 = await fetch(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${apiKey}`)
    
     if(!response5.ok) {
        throw new Error("cant fetch summoner icon and lever")
     }

     const data5 = await response5.json()




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
         const minionKillsArray = [];
         const damageDealtArray =[];
         const playerBuildsArray0 = [];
         const playerBuildsArray1 = [];
         const playerBuildsArray2 = [];
         const playerBuildsArray3 = [];
         const playerBuildsArray4 = [];
         const playerBuildsArray5 = [];
         const playerBuildsArray6 = [];
         const summoner1Array = [];
         const summoner2Array = [];
         const playerLevelArray= [];
         const riotIdGameNamesArray = [];
         const riotIdTagLinesArray = [];
         const keyStonesArray = []
         const keyRune1Array = [];
         const keyRune2Array = [];
         const keyRune3Array = [];
         const secondaryRuneName = [];
         const secondaryRune1Array = [];
         const secondaryRune2Array = [];
         const playerShard1Array = [];
          const playerShard2Array = [];
            const playerShard3Array = []; 
            
            



         
        
        
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
        const minions = data4.info.participants[j].totalMinionsKilled + data4.info.participants[j].neutralMinionsKilled
        minionKillsArray.push(minions);
        const damage = data4.info.participants[j].totalDamageDealtToChampions;
        damageDealtArray.push(damage);
        const takenDamage = data4.info.participants[j]
        const item1 = data4.info.participants[j].item0;
        playerBuildsArray0.push(item1);
        const item2 = data4.info.participants[j].item1;
        playerBuildsArray1.push(item2);
        const item3 = data4.info.participants[j].item2;
        playerBuildsArray2.push(item3);
        const item4 = data4.info.participants[j].item3;
        playerBuildsArray3.push(item4);
        const item5 = data4.info.participants[j].item4;
        playerBuildsArray4.push(item5);
        const item6 = data4.info.participants[j].item5;
        playerBuildsArray5.push(item6);
        const item7 = data4.info.participants[j].item6;
        playerBuildsArray6.push(item7);
        const summ1 = data4.info.participants[j].summoner1Id
        summoner1Array.push(summ1)
        const summ2 = data4.info.participants[j].summoner2Id
        summoner2Array.push(summ2)
        const level = data4.info.participants[j].champLevel
        playerLevelArray.push(level);
        const name = data4.info.participants[j].riotIdGameName
        riotIdGameNamesArray.push(name);
        const tag = data4.info.participants[j].riotIdTagline
        riotIdTagLinesArray.push(tag);
        const keyStone = data4.info.participants[j].perks.styles[0].selections[0].perk;
        keyStonesArray.push(keyStone);
        const primary1 = data4.info.participants[j].perks.styles[0].selections[1].perk
        keyRune1Array.push(primary1)
        const primary2 = data4.info.participants[j].perks.styles[0].selections[2].perk
        keyRune2Array.push(primary2)
        const primary3 = data4.info.participants[j].perks.styles[0].selections[3].perk
        keyRune3Array.push(primary3)

        const secondaryTree = data4.info.participants[j].perks.styles[1].style
        secondaryRuneName.push(secondaryTree)

        const secondaryRune1 = data4.info.participants[j].perks.styles[1].selections[0].perk;
        secondaryRune1Array.push(secondaryRune1)

        const secondaryRune2 = data4.info.participants[j].perks.styles[1].selections[1].perk;
        secondaryRune2Array.push(secondaryRune2)

        const playerShard1 = data4.info.participants[j].perks.statPerks.defense;
        playerShard1Array.push(playerShard1)
        const playerShard2 = data4.info.participants[j].perks.statPerks.flex;
        playerShard2Array.push(playerShard2)
        const playerShard3 = data4.info.participants[j].perks.statPerks.offense;
        playerShard3Array.push(playerShard3)
        }

        

    
        
         
        
         
        
    const dataMatch = {playerTeamArray,
        gameDuration,
        championsArray,
        playerKillsArray,
        playerDeathsArray,
        playerAssistsArray,
        winningTeam,
        minionKillsArray,
        damageDealtArray,
        playerBuildsArray0,
        playerBuildsArray1,
        playerBuildsArray2,
        playerBuildsArray3,
        playerBuildsArray4,
        playerBuildsArray5,
        playerBuildsArray6,
        summoner1Array,
        summoner2Array,
        playerLevelArray,
        riotIdGameNamesArray,
        riotIdTagLinesArray,
        keyStonesArray,      
        keyRune1Array,
        keyRune2Array,
        keyRune3Array,
        secondaryRuneName,
        secondaryRune1Array,
        secondaryRune2Array,
        playerShard1Array,
        playerShard2Array,
        playerShard3Array}
    
    matchesArray.push(dataMatch);
    
    }
    
       
   
    
    
    const mergedData = {data,data2,data3,data5, matchesArray}


    res.send(JSON.stringify(mergedData, null,2))
    
    

    }
    catch(error){
        console.error(error);
    }
})




app.listen(3000);