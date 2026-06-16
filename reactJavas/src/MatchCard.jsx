import { useEffect } from "react";
import { useParams} from "react-router-dom"
import {useState} from "react"
import './SummonerPage.css'




const MatchCard = ({ match, playerIndex, spellData, runesData, getSpellName, getRuneName, name, tag, version }) =>{

    const[isOpen, setIsOpen] = useState(false);
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
        


        

  return (
    <div className={match.winningTeam[playerIndex] ? "matchCard win" : "matchCard loss"}>
        <div className={match.winningTeam[playerIndex] ? "WinLoss win" : "WinLoss loss"}>
            {match.winningTeam[playerIndex] ? "WIN" : "LOSS"}
        </div>
        <img className="KeyStone" src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneName(match.keyStonesArray[playerIndex], runesData)?.icon}`} alt="keystone"/>
        <img className="ChampIcon" src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${match.championsArray[playerIndex]}.png`} alt="champ icon" style={{width: '60px', height: '60px'}}/>
        <div className="Summoners">
            <img className="Summoner1" src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spellData && getSpellName(match.summoner1Array[playerIndex], spellData)?.id}.png`} />
            <img className="Summoner2" src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spellData && getSpellName(match.summoner2Array[playerIndex], spellData)?.id}.png`} />
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
                        ? <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item}.png`} alt="item"
                        
        
                        />
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
        <div className={`dropdownBtn ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>▼</div>

            
















            {isOpen && (
                <div className="dropdown">
                    {isOpen && (
    <div className="dropdown">
        <div className="teamLabel blue">Blue Team</div>
        {Array.from({length: 5}).map((_, i) => (
            <div key={i} className={`playerRow ${i === playerIndex ? "me" : ""}`}>
                <img className="miniChamp" src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${match.championsArray[i]}.png`} alt="champ"/>
                <div className="playerName">{match.riotIdGameNamesArray[i]}</div>
                <div className="playerKda">{match.playerKillsArray[i]}/{match.playerDeathsArray[i]}/{match.playerAssistsArray[i]}</div>
                <div className="playerCs">CS {match.minionKillsArray[i]}</div>
                <div className="miniItems">
                    {[match.playerBuildsArray0[i], match.playerBuildsArray1[i], match.playerBuildsArray2[i],
                      match.playerBuildsArray3[i], match.playerBuildsArray4[i], match.playerBuildsArray5[i]
                    ].map((item, j) => (
                        <div key={j} className="miniItemSlot">
                            {item !== 0 && item !== null
                                ? <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item}.png`} alt=""/>
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
        ))}

        <div className="teamLabel red">Red Team</div>
        {Array.from({length: 5}).map((_, i) => {
            const ri = i + 5;
            console.log(getRuneName(match.keyStonesArray[0], runesData)?.icon)
            return (
                <div key={ri} className={`playerRow ${ri === playerIndex ? "me" : ""}`}>
                    <img className="miniChamp" src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${match.championsArray[ri]}.png`} alt="champ"/>
                    <div className="playerName">{match.riotIdGameNamesArray[ri]}</div>
                    <div className="playerKda">{match.playerKillsArray[ri]}/{match.playerDeathsArray[ri]}/{match.playerAssistsArray[ri]}</div>
                    <div className="playerCs">CS {match.minionKillsArray[ri]}</div>
                    <div className="miniItems">
                        {[match.playerBuildsArray0[ri], match.playerBuildsArray1[ri], match.playerBuildsArray2[ri],
                          match.playerBuildsArray3[ri], match.playerBuildsArray4[ri], match.playerBuildsArray5[ri]
                        ].map((item, j) => (
                            <div key={j} className="miniItemSlot">
                                {item !== 0 && item !== null
                                    ? <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item}.png`} alt="item"/>
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
)}


                </div>
            )}


    </div>
)

}

export default MatchCard;
