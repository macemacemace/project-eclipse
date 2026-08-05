require('dotenv').config({ path: require('path').join(__dirname, '.env') })


const express = require(`express`)
const cors = require(`cors`)
const { execFile } = require('child_process')
const util = require('util')
const execFilePromise = util.promisify(execFile)
const app = express()
const Anthropic = require('@anthropic-ai/sdk');
const anthropic = new Anthropic();



const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
)


async function requireAuth(req,res,next){
    const header = req.headers.authorization

    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({error: 'missing token'})
    }

    const token = header.split(' ')[1]

    const {data, error} = await supabase.auth.getUser(token)

    if(error || !data.user){
        return res.status(401).json({error: 'invalid token'})
    }

    req.user =data.user;
    req.token = token

    next()
}

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || origin.includes('localhost') || origin.includes('vercel.app') || origin.includes('martinjakovoski.dev')) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}))
const apiKey = process.env.RIOT_API_KEY

app.use(express.json())

app.get('/me', requireAuth, (req, res) => {
    res.json({ id: req.user.id, email: req.user.email })
})

/* PARKED - works, but not wired up to the frontend yet.

   middleware attempt but of no use

   
*/

/*app.get('/favourites', requireAuth, async (req, res) => {
    const userClient = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY,
        { global: { headers: { Authorization: `Bearer ${req.token}` } } }
    )

    const { data, error } = await userClient
        .from('favourites')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        return res.status(500).json({ error: error.message })
    }
        

    res.json(data)
})

*/

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

       
    

    
        
    const response = await fetch(`https://${regionMap[region]}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${apiKey}`)
    
  
   
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

        if(!data4.info || !data4.info.participants) continue;

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
        const playerLpArray = [];
         const teamPositionArray = [];
        
            
            



         
        
        
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
        const teamPosition = data4.info.participants[j].teamPosition
        teamPositionArray.push(teamPosition)
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
        playerShard3Array,
        teamPositionArray}
    
    matchesArray.push(dataMatch);
    
    }
    
       
   
    
    
    const mergedData = {data,data2,data3,data5, matchesArray}


    res.send(JSON.stringify(mergedData, null,2))
    
    

    }
    catch(error){
        console.error(error);
    }

    




})

app.get('/champions', async (req,res) => {

        const responsePatch = await fetch(`https://ddragon.leagueoflegends.com/api/versions.json`)

        if(!responsePatch.ok){
        const errData = await responsePatch.json();
        console.log(errData);
        throw new Error("cant fetch latest patch");
    }

        const patchData = await responsePatch.json();
        const latestPatch = patchData[0];
       

        const split = latestPatch.split(".");
        

        split.pop();

        const patchFormated = split.join("_");

        let champData;

        try {
            const { stdout } = await execFilePromise('curl', [
                '-s',
                '-f',
                '-H', 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                `https://stats2.u.gg/lol/1.5/champion_ranking/world/${patchFormated}/ranked_solo_5x5/emerald_plus/1.5.0.json`
            ], { maxBuffer: 10 * 1024 * 1024 });

            champData = JSON.parse(stdout);
        }
        catch (error) {
            console.log("patch " + patchFormated + " not on u.gg yet, fetching previous patch");

            const latestPatchBackup = patchData[1];

            const split1 = latestPatchBackup.split(".");

            split1.pop();

            const patchFormated1 = split1.join("_");

            const { stdout } = await execFilePromise('curl', [
                '-s',
                '-f',
                '-H', 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
                `https://stats2.u.gg/lol/1.5/champion_ranking/world/${patchFormated1}/ranked_solo_5x5/emerald_plus/1.5.0.json`
            ], { maxBuffer: 10 * 1024 * 1024 });

            champData = JSON.parse(stdout);
        }

        res.send(champData);


       
       })

       

       
app.post('/analyze', async(req,res) => {
        const matchInfo = req.body

        console.log("enemyBuilds:", JSON.stringify(matchInfo.enemyBuilds, null, 2));
        console.log("laneOpponent:", JSON.stringify(matchInfo.laneOpponent));

        const versionRes = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
        const versions = await versionRes.json();
        const latestVersion = versions[0];

        
        let buildText = null;

        try {
    const { stdout } = await execFilePromise('curl', [
    '-s',
    '-f',
    '-H', 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    `https://u.gg/lol/champions/${matchInfo.champion.toLowerCase()}/build`
    ], { maxBuffer: 10 * 1024 * 1024 });

    const html = stdout;


    const re = /sprite\/item(\d+)\.webp\);background-repeat:no-repeat;background-position:-(\d+)px -(\d+)px/g;
    const matches = [...html.matchAll(re)];

    const itemRes = await
    fetch(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/item.json`)

    const itemData =await itemRes.json();

    const items = matches.map(m => {
        const sprite = "item" +m[1] +".png";
        const x = Number(m[2]);
        const y = Number(m[3]);

        const found = Object.values(itemData.data).find(it =>
            it.image.sprite === sprite && it.image.x === x && it.image.y === y
        );

        return found ? found : null;


    })

        function formatItem(it) {
    const clean = it.description.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    return `${it.name} (${it.gold.total}g) — ${clean}`;
}

        const starting = items.slice(0, 2).filter(Boolean);
        const core     = items.slice(2, 5).filter(Boolean);

        if (starting.length || core.length) {
        buildText =
    `Starting items (unordered set): ${starting.map(formatItem).join("; ")}\n` +
    `Core items (unordered set, NOT a purchase sequence): ${core.map(formatItem).join("; ")}`;
        }
        }
        catch (error) {
            console.log("could not fetch u.gg build for " + matchInfo.champion + ":", error.message);
        }

        const message = await anthropic.messages.create({
            model: "claude-haiku-4-5",
            max_tokens: 2048,
            messages: [
                {
                    role: "user",
                    content: `You are Nova, a League of Legends coach. The player played ${matchInfo.champion} in the ${matchInfo.role} role — always refer to them as playing ${matchInfo.role}, never a different role.

WHAT THE DATA DOES AND DOES NOT CONTAIN — read this before anything else:
- Every item list is the FINAL inventory at the end of the game. It is an unordered set. You have NO data about purchase order, item timings, or what was built first, second or third. Never describe a build order, never say an item was "rushed", "delayed" or "built before/after" anything, and never comment on the timing of a purchase.
- All numeric stats (KDA, CS, cs/min) are given to you precomputed. Use those exact numbers. Do not calculate your own.
- In the Stat Assessment and Build Assessment sections, only discuss what is present in the data below, and never claim a specific number, winrate, or item stat that is not given to you. Do not invent things that happened in the game - you have no data on vision, roams, wave state, or any in-game event, so never describe what did happen in lane. In the Laning section you may use your general knowledge of champion kits and playstyles to give forward-looking advice, but the same ban on invented numbers, winrates and item stats applies there too.
- Reason about resistances from the actual item stats. Do not assume an item grants a stat it does not list.

${buildText
  ? `CURRENT PATCH ${latestVersion} RECOMMENDED BUILD FOR ${matchInfo.champion} (from live win-rate data):
${buildText}

This is real current-patch data - trust it over your own knowledge and use these exact item names. It is a set of items that perform well, not an order to build them in.`
  : `No current build data was available for this champion, so do not suggest specific items or builds.`}

Match data: ${JSON.stringify(matchInfo)}

Field notes:
- "yourItems" is THE PLAYER'S OWN final inventory. This is the complete and authoritative list of what they built. Read every entry in it before saying anything about their build.
- "kda" and "csPerMin" are already calculated for you. "durationMinutes" is the game length in minutes.
- "laneOpponent" is the enemy in the same role - the matchup the player actually laned against.
- "enemyBuilds" lists every enemy champion with their role, KDA and the items they finished the game with.
- Mythic items do not exist
- Do not mention mythic items or item compoments, its obvious if an item is incomplete the player did not have enough time to complete it.

Before writing your answer, check each recommended item against "yourItems" one by one. Never say the player skipped, missed or failed to build an item that appears in "yourItems".

Write your answer in exactly three sections, using these exact markdown headings and this order. Each section is 2-4 sentences. Do not add an intro, a conclusion, or any other section.

Format your answer as markdown. Put a blank line between every section and after every section heading. Within the text, wrap item names, champion names, and key numbers in ** ** so they stand out - for example **Infinity Edge**, **Ashe**, **7.7 cs/min**. Bold the specific things that matter, not whole sentences.

Begin with a single line: "# Match Analysis: <champion> <role>" using the champion and role given above. Then the three sections.

**Stat Assessment**
Judge the player's raw performance from the numbers. Compare their CS and csPerMin against what is reasonable for their role over durationMinutes, and say what they should be aiming for. Call out deaths explicitly if they are high for the game length. Compare their KDA to their lane opponent's and to the rest of both teams - say plainly whether they were ahead, even, or behind. Use only the numbers given to you.

**Build Assessment**
Compare "yourItems" against the recommended set, item by item. Where they differ, say whether the choice was fine or a mistake and why, reasoning from the item stats you were given. Look at "enemyBuilds": if the enemy team stacked armor, magic resist, or health, name the specific items showing it and recommend the counter-item accordingly. If their build was good, say so instead of inventing a criticism.

**Laning**
Give matchup-specific advice for the player's champion against "laneOpponent". Use your general knowledge of both champions' kits, power spikes, range, and playstyle - for example who wins an extended trade, who wins a short trade, who should look to all-in and when, and how to play around cooldowns and wave state. Be concrete and actionable. If "laneOpponent" is null, give general laning advice for the player's champion and role instead.`
                }
            ]
        })

        res.json({analysis: message.content[0].text})

        
        


       })




app.listen(3000);