import { useEffect } from "react";
import { useParams} from "react-router-dom"
import {useState} from "react"




const MatchCard = ({ match, playerIndex, spellData, runesData, getSpellName, getRuneName, name, tag }) =>{

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

    const roles = ['Top', 'Jungle', 'Mid', 'ADC', 'Support', 'Top', 'Jungle', 'Mid', 'ADC', 'Support'];
        


        

  return (
    <div className={match.winningTeam[playerIndex] ? "matchCard win" : "matchCard loss"}>
        <div className={match.winningTeam[playerIndex] ? "WinLoss win" : "WinLoss loss"}>
            {match.winningTeam[playerIndex] ? "WIN" : "LOSS"}
        </div>
        <img className="KeyStone" src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneName(match.keyStonesArray[playerIndex], runesData)?.icon}`} alt="keystone"/>
        <img className="ChampIcon" src={`https://ddragon.leagueoflegends.com/cdn/16.5.1/img/champion/${match.championsArray[playerIndex]}.png`} alt="champ icon" style={{width: '60px', height: '60px'}}/>
        <div className="Summoners">
            <img className="Summoner1" src={`https://ddragon.leagueoflegends.com/cdn/16.5.1/img/spell/${spellData && getSpellName(match.summoner1Array[playerIndex], spellData)?.id}.png`} />
            <img className="Summoner2" src={`https://ddragon.leagueoflegends.com/cdn/16.5.1/img/spell/${spellData && getSpellName(match.summoner2Array[playerIndex], spellData)?.id}.png`} />
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
                        ? <img src={`https://ddragon.leagueoflegends.com/cdn/16.5.1/img/item/${item}.png`} alt="item" />
                        : null}
                </div>
            ))}
        </div>
        <div className="itemSlot ward">
            {match.playerBuildsArray6[playerIndex] !== 0
                ? <img src={`https://ddragon.leagueoflegends.com/cdn/16.5.1/img/item/${match.playerBuildsArray6[playerIndex]}.png`} alt="ward" />
                : null}
        </div>
        <div className="GameDuration">{gameDur1}m</div>
        <div className={`dropdownBtn ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>▼</div>
    </div>
)

}

export default MatchCard;
