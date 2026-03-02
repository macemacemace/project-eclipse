const express = require(`express`)
const cors = require(`cors`)
const app = express()
app.use(cors({
    origin: ['https://localhost:5500', `http://127.0.0.1:5500`]
}))
const apiKey ="RGAPI-190bdba8-6444-4fff-b421-19a7155c9018"

app.get(`/summoner/:region/:name/:tag`, async (req, res)  =>  {
    try{
        const name = req.params.name;
        const tag = req.params.tag;
        
    const response = await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${apiKey}`)
    
    if(!response.ok){
        throw new Error("cant fetch");
    }

    const data = await response.json();

    

    const puuid = data.puuid;
    

    const response2 = await fetch(`https://eun1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}?api_key=${apiKey}`)

    if(!response2.ok){
        throw new Error("cant fetch ranked stats");
    }

    const data2 = await response2.json();
    

    
    const mergedData = {data,data2}

    res.json(mergedData);
    
    

    }
    catch(error){
        console.error(error);
    }
})




app.listen(3000);