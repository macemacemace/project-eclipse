
const apiKey = "RGAPI-190bdba8-6444-4fff-b421-19a7155c9018";



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
        <p>Name: ${data.gameName}</p>
         <p>ID: ${id}</p>
          <p>Tag: ${tag}</p>
        </div>
        `
    
    }
    catch (error){
        console.error(error);
    }
    
    
}