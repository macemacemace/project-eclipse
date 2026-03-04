const express = require(`express`)
const cors = require(`cors`)
const app = express()
app.use(cors({
    origin: ['https://localhost:5500', `http://127.0.0.1:5500`]
}))
const apiKey ="RGAPI-378de0f5-519c-45c5-bf34-59435a719d69"

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
        
    const response = await fetch(`https://${regionMap[region]}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${apiKey}`)
    
   
    if(!response.ok){
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
    
    console.log(data3[0])
    
    const response4 = await fetch(`https://europe.api.riotgames.com/lol/match/v5/matches/EUN1_3917758462?api_key=${apiKey}`)


    
    const mergedData = {data,data2,data3}

    res.json(mergedData);
    
    

    }
    catch(error){
        console.error(error);
    }
})




app.listen(3000);