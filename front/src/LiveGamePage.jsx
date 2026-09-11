import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Navbar from "./Navbar"
import './LiveGamePage.css'

const LiveGamePage = () => {
    const { region, name, tag } = useParams()
    const [game, setGame] = useState(null)
    const [error, setError] = useState(null)
    const [champData, setChampData] = useState(null);
    const [version, setVersion] = useState(null);
    const [ranks, setRanks] = useState(null)
    const [spellData, setSpellData] = useState(null)
    const [runesData, setRunesData] = useState(null)

    useEffect(() => {
        async function fetchLive() {
            setError(null)
            try {
                const versionRes = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
                const versions = await versionRes.json();
                const latestVersion = versions[0];
                setVersion(latestVersion);

                const champRes = await
                    fetch(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`);
                const champJson = await champRes.json();
                setChampData(champJson);

                const spellRes = await fetch(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/summoner.json`)
                const spellJson = await spellRes.json()
                setSpellData(spellJson)

                const runesRes = await fetch(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/runesReforged.json`)
                const runesJson = await runesRes.json()
                setRunesData(runesJson)



                const response = await fetch(`${import.meta.env.VITE_API_URL}/live/${region}/${name}/${tag}`)

                if (!response.ok) {
                    const errData = await response.json()
                    setError(errData.error)
                    return
                }

                const data = await response.json()
                setGame(data)

                const puuids = data.participants.map(p => p.puuid).filter(Boolean);

                const ranksRes = await fetch(`${import.meta.env.VITE_API_URL}/ranks`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ puuid: puuids, region: region })
                })
                const ranksData = await ranksRes.json()
                if (Array.isArray(ranksData)) {
                    setRanks(ranksData)
                }
            }
            catch (err) {
                setError(err.message)
            }
        }
        fetchLive()
    }, [region, name, tag])

    const getChampionById = (id) => {
        if (!champData) {
            return null
        }
        return Object.values(champData.data).find(c => Number(c.key) === id)
    }

    const getSpellById = (id) => {
        if (!spellData) {
            return null
        }
        return Object.values(spellData.data).find(s => Number(s.key) === id)
    }

    const getRuneById = (id) => {
        if (!runesData) {
            return null
        }
        for (const tree of runesData) {
            if (tree.id === id) {
                return tree
            }
            for (const slot of tree.slots) {
                const rune = slot.runes.find(r => r.id === id)
                if (rune) {
                    return rune
                }
            }
        }
        return null
    }

    const banFor = (p) => {
        if (!game) {
            return null
        }
        const index = game.participants.indexOf(p)
        const ban = game.bannedChampions.find(b => b.pickTurn === index + 1)
        if (!ban || ban.championId === -1) {
            return null
        }
        return ban
    }

    const rankFor = (puuid) => {
        if (!puuid) {
            return "Unknown"
        }
        if (!ranks) {
            return ""
        }
        const r = ranks.find(x => x.puuid === puuid)
        if (!r || !r.tier) {
            return "Unranked"
        }
        return `${r.tier} ${r.division} · ${r.lp} LP`
    }

    const queueNames = {
    400: "Normal Draft",
    420: "Ranked Solo/Duo",
    430: "Normal Blind",
    440: "Ranked Flex",
    450: "ARAM",
    490: "Quickplay",
    700: "Clash",
    }

    const tierFor = (puuid) => {
        if (!puuid || !ranks) {
            return ""
        }
        const r = ranks.find(x => x.puuid === puuid)
        if (!r || !r.tier) {
            return ""
        }
        return r.tier
    }

    const isMe = (p) => {
        return (p.riotId || "").toLowerCase() === `${name}#${tag}`.toLowerCase()
    }

    const rowClass = (p) => {
        if (isMe(p)) {
            return "livePlayer me"
        }
        return "livePlayer"
    }

    const riotLine = (p) => {
        if (!(p.riotId || "").includes('#')) {
            return "Streamer mode"
        }
        return p.riotId
    }

    const playerRow = (p) => (
        <div key={p.puuid || p.championId} className={rowClass(p)}>
            <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${getChampionById(p.championId)?.id}.png`} alt="champion" />

            <div className="liveBan">
                {banFor(p) && (
                    <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${getChampionById(banFor(p).championId)?.id}.png`} alt="ban" />
                )}
            </div>

            <div className="liveSpells">
                <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${getSpellById(p.spell1Id)?.id}.png`} alt="spell 1" />
                <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${getSpellById(p.spell2Id)?.id}.png`} alt="spell 2" />
            </div>

            <div className="liveRunes">
                <img src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneById(p.perks.perkIds[0])?.icon}`} alt="keystone" />
                <img src={`https://ddragon.leagueoflegends.com/cdn/img/${getRuneById(p.perks.perkSubStyle)?.icon}`} alt="secondary tree" />
            </div>

            <div className="liveName">
                <span className="liveChamp">{getChampionById(p.championId)?.name}</span>
                <span className="liveRiot">{riotLine(p)}</span>
            </div>
            <div className="liveRank" data-tier={tierFor(p.puuid)}>{rankFor(p.puuid)}</div>
        </div>
    )

    return (
        <div className="liveGamePage">
            <Navbar />
            {error && <p>{error}</p>}

            {game && (
                <div className="liveContent">
                    <div className="liveHeader">
                        <span className="liveDot"></span>
                        <span className="liveTitle">Live Game</span>
                        <span className="liveQueue">{queueNames[game.gameQueueConfigId] || "Special Mode"}</span>
                    </div>

                    <div className="teams">
                        <div className="team blue">
                            <div className="teamHeader">Blue Team</div>
                            {game.participants.filter(p => p.teamId === 100).map(p => playerRow(p))}
                        </div>

                        <div className="team red">
                            <div className="teamHeader">Red Team</div>
                            {game.participants.filter(p => p.teamId === 200).map(p => playerRow(p))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LiveGamePage