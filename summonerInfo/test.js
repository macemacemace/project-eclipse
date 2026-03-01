
const apiKey = "RGAPI-46f7eb41-e355-4fe6-94a1-5c38a0ac8577";



async function fetchSummoner() {
    try{
        const summonerName = document.getElementById("summonerName").value;
        const tagLine = document.getElementById("tagLine").value;
        const response = await fetch(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagLine}?api_key=${apiKey}`)
        
        if(!response.ok){
            throw new Error("cant fetch");
        }
        const data= await response.json();

        console.log(data)

        const name = data.gameName;
        const id = data.puuid;
        const tag= data.tagLine;

        document.getElementById(`result`).innerHTML =`
        <div>
        <p>Name: ${name}</p>
         <p>ID: ${id}</p>
          <p>Tag: ${tag}</p>
        </div>
        `
    
    }
    catch (error){
        console.error(error);
    }
    
    
}