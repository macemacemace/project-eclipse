import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Navbar from "./Navbar"

const LiveGamePage = () => {
    const { region, name, tag } = useParams()
    const [game, setGame] = useState(null)
    const [error, setError] = useState(null)
    const [champData, setChampData] = useState(null);
    const [version, setVersion] = useState(null);

    useEffect(() => {
        async function fetchLive() {
            setError(null)
            try {
                const versionRes= await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
                const versions = await versionRes.json();
                const latestVersion = versions[0];
                setVersion(latestVersion);

                const champRes = await
                fetch(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`);
                const champJson = await champRes.json();
                setChampData(champJson);



                const response = await fetch(`${import.meta.env.VITE_API_URL}/live/${region}/${name}/${tag}`)

                if (!response.ok) {
                    const errData = await response.json()
                    setError(errData.error)
                    return
                }

                const data = await response.json()
                setGame(data)
            }
            catch (err) {
                setError(err.message)
            }
        }
        fetchLive()
    }, [region, name, tag])
    const getChampionById = (id) => {
        if(!champData){
            return null
        }
        return Object.values(champData.data).find(c => Number(c.key) === id)
    }

    const playerRow = (p) => (
        <div key={p.puuid} className="livePlayer">
            <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${getChampionById(p.championId)?.id}.png`} />
            {getChampionById(p.championId)?.name} - {p.riotId}
        </div>
    )

    return (
        <div className="liveGamePage">
            <Navbar />
            {error && <p>{error}</p>}
            
            {game && (
    <div className="teams">

        <div className="team blue">
            {game.participants.filter(p => p.teamId === 100).map(p => (
                <div key={p.puuid}>
                    {getChampionById(p.championId)?.name} - {p.riotId}
                </div>
            ))}
        </div>

        <div className="team red">
            {game.participants.filter(p => p.teamId === 200).map(p => (
                <div key={p.puuid}>
                    {getChampionById(p.championId)?.name} - {p.riotId}
                </div>
            ))}
        </div>
            
    </div>
    
        )}
        </div>
    )
}

export default LiveGamePage