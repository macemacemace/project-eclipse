import { useEffect } from "react";
import { useParams, Link} from "react-router-dom"
import {useState} from "react"
import './SummonerPage.css'
import ReactMarkdown from 'react-markdown'




const MatchCard = ({ match, playerIndex, spellData, runesData, getSpellName, getRuneName, name, tag, version, getItemName, itemData, region }) =>{

    const [isOpen, setIsOpen] = useState(false);
    const [overflowVisible, setOverflowVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleToggle = () => {
        if (isOpen) {
            setOverflowVisible(false);
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    };
  const kills = match.playerKillsArray[playerIndex];
        const death = match.playerDeathsArray[playerIndex];
        const assists = match.playerAssistsArray[playerIndex];

        const kda = death === 0
        
        ? "Perfect"

        :((kills + assists) /death).toFixed(1);


      const gameDur = match.gameDuration;

      const gameDur1 = (gameDur / 60).toFixed(0);

      const Cs = match.minionKillsArray[playerIndex];

      const csPerMin = (Cs / gameDur1).toFixed(1);

    const roles = ['Top', 'Jungle', 'Mid', 'Bottom', 'Support', 'Top', 'Jungle', 'Mid', 'Bottom', 'Support'];
        
    const [analysis, setAnalysis] = useState(null);

    const handleAnalyze = async () =>{

        setLoading(true)

        let myTeam, enemyTeam;

                if (playerIndex < 5) {
                myTeam = match.championsArray.slice(0, 5);
                enemyTeam = match.championsArray.slice(5, 10);
                } else {
                myTeam = match.championsArray.slice(5, 10);
                enemyTeam = match.championsArray.slice(0, 5);
                }


            const responseAnalyze = await fetch(`${import.meta.env.VITE_API_URL}/analyze`, {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({champion: match.championsArray[playerIndex],
                kills: match.playerKillsArray[playerIndex],
                deaths: match.playerDeathsArray[playerIndex],
                assists: match.playerAssistsArray[playerIndex],
                CS: match.minionKillsArray[playerIndex],
                duration: match.gameDuration,
                item1: getItemName(match.playerBuildsArray0[playerIndex], itemData).name,
                item2: getItemName(match.playerBuildsArray1[playerIndex], itemData).name,
                item3: getItemName(match.playerBuildsArray2[playerIndex], itemData).name,
                item4: getItemName(match.playerBuildsArray3[playerIndex], itemData).name,
                item5: getItemName(match.playerBuildsArray4[playerIndex], itemData).name,
                item6: getItemName(match.playerBuildsArray5[playerIndex], itemData).name,
                myTeam: myTeam,
                enemyTeam: enemyTeam,
                role: roles[playerIndex]

                
                
            })
            

        });

        const data =  await responseAnalyze.json();
        console.log(data);
        setAnalysis(data.analysis);

        setLoading(false);
    }
        

  return (
    <div className={match.winningTeam[playerIndex] ? "matchCard win" : "matchCard loss"}>
        <div className={match.winningTeam[playerIndex] ? "WinLoss win" : "WinLoss loss"}>
            {match.winningTeam[playerIndex] ? "WIN" : "LOSS"}
        </div>
        <img className="KeyStone" src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneName(match.keyStonesArray[playerIndex], runesData)?.icon}`} alt="keystone"/>
        <img className="ChampIcon" src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${match.championsArray[playerIndex]}.png`} alt="champ icon" style={{width: '60px', height: '60px'}}/>
        
        <div className="Summoners">
            <div className="tooltip-wrapper">
            <img className="Summoner1" src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spellData && getSpellName(match.summoner1Array[playerIndex], spellData)?.id}.png`} />
            <span className="tooltip">
        <div className="tooltip-name">{getSpellName(match.summoner1Array[playerIndex], spellData)?.name}</div>
        <div className="tooltip-desc">{getSpellName(match.summoner1Array[playerIndex], spellData)?.description}</div>
    </span>
    </div>
    <div className="tooltip-wrapper">
            <img className="Summoner2" src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spellData && getSpellName(match.summoner2Array[playerIndex], spellData)?.id}.png`} />
            <span className="tooltip">
        <div className="tooltip-name">{getSpellName(match.summoner2Array[playerIndex], spellData)?.name}</div>
        <div className="tooltip-desc">{getSpellName(match.summoner2Array[playerIndex], spellData)?.description}</div>
    </span>
        </div>
        </div>
        <div className="Role">{roles[playerIndex]}</div>
        <div className="GameStats">
            <div style={{display: 'flex'}}>
                <div>{kills}/</div>
                <div>{death}/</div>
                <div>{assists}</div>
            </div>
            <div className="KDA">{kda} KDA</div>
            <div className="Minions">
                <div>CS {Cs}</div>
                <div className="csPerMin">({csPerMin})</div>
            </div>
        </div>
        <div className="itemSlots">
            {[match.playerBuildsArray0[playerIndex],
              match.playerBuildsArray1[playerIndex],
              match.playerBuildsArray2[playerIndex],
              match.playerBuildsArray3[playerIndex],
              match.playerBuildsArray4[playerIndex],
              match.playerBuildsArray5[playerIndex]
            ].map((item, i) => (
                <div key={i} className="itemSlot">
                    {item !== 0 && item !== null

                    
                        ? <div className = "tooltip-wrapper" > 
                        <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item}.png`} alt="item"/>
                        
                            <span className="tooltip">
                                <div className="tooltip-name">{getItemName(item, itemData).name}</div>
                                <div className="tooltip-desc">{getItemName(item, itemData).description}</div>
                            </span>
                        
                        </div>
                        : null}
                </div>
            ))}
        </div>
        <div className="itemSlot ward">
            {match.playerBuildsArray6[playerIndex] !== 0
                ? <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${match.playerBuildsArray6[playerIndex]}.png`} alt="ward" />
                : null}
        </div>
        <div className="GameDuration">{gameDur1}m</div>
        <div className={`dropdownBtn ${isOpen ? "open" : ""}`} onClick={handleToggle}>▼</div>

            
















            <div
                className={`dropdown ${isOpen ? "open" : ""}`}
                style={{ overflow: overflowVisible ? 'visible' : 'hidden' }}
                onTransitionEnd={() => { if (isOpen) setOverflowVisible(true); }}
            >
            <div className="dropdown-inner">



                
        <div className="teamLabel blue">Blue Team</div>
        {Array.from({length: 5}).map((_, i) => (
            <div key={i} className={`playerRow ${i === playerIndex ? "me" : ""}`}>
                <img className="miniChamp" src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${match.championsArray[i]}.png`} alt="champ"/>
                <div className="miniSummoners">
                    <div className="tooltip-wrapper">
                        <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${getSpellName(match.summoner1Array[i], spellData)?.id}.png`} alt="spell1"/>
                        <span className="tooltip">
                            <div className="tooltip-name">{getSpellName(match.summoner1Array[i], spellData)?.name}</div>
                            <div className="tooltip-desc">{getSpellName(match.summoner1Array[i], spellData)?.description}</div>
                        </span>
                    </div>
                    <div className="tooltip-wrapper">
                        <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${getSpellName(match.summoner2Array[i], spellData)?.id}.png`} alt="spell2"/>
                        <span className="tooltip">
                            <div className="tooltip-name">{getSpellName(match.summoner2Array[i], spellData)?.name}</div>
                            <div className="tooltip-desc">{getSpellName(match.summoner2Array[i], spellData)?.description}</div>
                        </span>
                    </div>
                </div>


                <Link
                 className="playerName"
                 to={`/${region}/${match.riotIdGameNamesArray[i]}/${match.riotIdTagLinesArray[i]}`}
                 
                 >
                    {match.riotIdGameNamesArray[i]}
                 
                 
                 </Link>


                <div className="playerKda">{match.playerKillsArray[i]}/{match.playerDeathsArray[i]}/{match.playerAssistsArray[i]}</div>
                <div className="playerCs">CS {match.minionKillsArray[i]}</div>
                <div className="miniItems">
                    {[match.playerBuildsArray0[i], match.playerBuildsArray1[i], match.playerBuildsArray2[i],
                      match.playerBuildsArray3[i], match.playerBuildsArray4[i], match.playerBuildsArray5[i]
                    ].map((item, j) => (
                        <div key={j} className="miniItemSlot">
                            {item !== 0 && item !== null
                                ? <div className="tooltip-wrapper">
                                <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item}.png`} alt=""/>
                                <span className="tooltip">
                                    <div className="tooltip-name">{getItemName(item, itemData).name}</div>
                                    {getItemName(item, itemData).description &&
                                    <div className="tooltip-desc">{getItemName(item, itemData).description}</div>}
                                </span>
                                </div>
                                : null}
                        </div>
                        
                    ))}
                </div>
                
                <div className="runes">
                    <div className="tooltip-wrapper">
    <div className="runeKeystone">
        <img src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneName(match.keyStonesArray[i], runesData)?.icon}`} alt="keystone"/>
        <span className="tooltip">
                 <div className="tooltip-name">{getRuneName(match.keyStonesArray[playerIndex], runesData)?.name}</div>
        <div className="tooltip-desc">{getRuneName(match.keyStonesArray[playerIndex], runesData)?.shortDesc}</div>   

        </span>
    </div>
    </div>
    <div className="runeSm"><img src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneName(match.keyRune1Array[i], runesData)?.icon}`} alt="rune1"/></div>
    <div className="runeSm"><img src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneName(match.keyRune2Array[i], runesData)?.icon}`} alt="rune2"/></div>
    <div className="runeSm"><img src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneName(match.keyRune3Array[i], runesData)?.icon}`} alt="rune3"/></div>
    <div className="runeSep">|</div>
    <div className="runeSm"><img src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneName(match.secondaryRune1Array[i], runesData)?.icon}`} alt="rune4"/></div>
    <div className="runeSm"><img src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneName(match.secondaryRune2Array[i], runesData)?.icon}`} alt="rune5"/></div>
</div>
            </div>
        ))}

        <div className="teamLabel red">Red Team</div>
        {Array.from({length: 5}).map((_, i) => {
            const ri = i + 5;
            console.log(getRuneName(match.keyStonesArray[0], runesData)?.icon)
            return (
                <div key={ri} className={`playerRow ${ri === playerIndex ? "me" : ""}`}>
                    <img className="miniChamp" src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${match.championsArray[ri]}.png`} alt="champ"/>
                    <div className="miniSummoners">
                        <div className="tooltip-wrapper">
                            <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${getSpellName(match.summoner1Array[ri], spellData)?.id}.png`} alt="spell1"/>
                            <span className="tooltip">
                                <div className="tooltip-name">{getSpellName(match.summoner1Array[ri], spellData)?.name}</div>
                                <div className="tooltip-desc">{getSpellName(match.summoner1Array[ri], spellData)?.description}</div>
                            </span>
                        </div>
                        <div className="tooltip-wrapper">
                            <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${getSpellName(match.summoner2Array[ri], spellData)?.id}.png`} alt="spell2"/>
                            <span className="tooltip">
                                <div className="tooltip-name">{getSpellName(match.summoner2Array[ri], spellData)?.name}</div>
                                <div className="tooltip-desc">{getSpellName(match.summoner2Array[ri], spellData)?.description}</div>
                            </span>
                        </div>
                    </div>
                    <Link
                 className="playerName"
                 to={`/${region}/${match.riotIdGameNamesArray[ri]}/${match.riotIdTagLinesArray[ri]}`}
                 
                 >
                    {match.riotIdGameNamesArray[ri]}
                 
                 
                 </Link>
                    <div className="playerKda">{match.playerKillsArray[ri]}/{match.playerDeathsArray[ri]}/{match.playerAssistsArray[ri]}</div>
                    <div className="playerCs">CS {match.minionKillsArray[ri]}</div>
                    <div className="miniItems">
                        {[match.playerBuildsArray0[ri], match.playerBuildsArray1[ri], match.playerBuildsArray2[ri],
                          match.playerBuildsArray3[ri], match.playerBuildsArray4[ri], match.playerBuildsArray5[ri]
                        ].map((item, j) => (
                            <div key={j} className="miniItemSlot">
                                {item !== 0 && item !== null
                                    ? <div className="tooltip-wrapper">
                                <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item}.png`} alt="item"/>
                                <span className="tooltip">
                                    <div className="tooltip-name">{getItemName(item, itemData).name}</div>
                                    {getItemName(item, itemData).description &&
                                    <div className="tooltip-desc">{getItemName(item, itemData).description}</div>}
                                </span>
                                </div> 
                                    
                                    : null}
                            </div>
                        ))}
                    </div>
                    
                    <div className="runes">
                     <div className="runeKeystone">
                       <img src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneName(match.keyStonesArray[i], runesData)?.icon}`} alt="keystone"/>
                     </div>
    <div className="runeSm"><img src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneName(match.keyRune1Array[i], runesData)?.icon}`} alt="rune1"/></div>
    <div className="runeSm"><img src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneName(match.keyRune2Array[i], runesData)?.icon}`} alt="rune2"/></div>
    <div className="runeSm"><img src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneName(match.keyRune3Array[i], runesData)?.icon}`} alt="rune3"/></div>
    <div className="runeSep">|</div>
    <div className="runeSm"><img src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneName(match.secondaryRune1Array[i], runesData)?.icon}`} alt="rune4"/></div>
    <div className="runeSm"><img src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneName(match.secondaryRune2Array[i], runesData)?.icon}`} alt="rune5"/></div>

    
</div>

                        

                </div>

                
            )
        })}
    </div>

<div className="analyzeRow">
<button className="analyzeBtn" onClick={handleAnalyze}>Analyze with Nova
    
</button>
{loading && (
    <div className="goldDots">
        <span></span>
        <span></span>
        <span></span>
    </div>
)
}
</div>
{analysis && <div className="novaBox"><ReactMarkdown>{analysis}</ReactMarkdown></div>}
                </div>
            

        
    </div>
)

}

export default MatchCard;
