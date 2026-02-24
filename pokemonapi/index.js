

fetchData();

async function fetchData(){

        try{

            const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        if(!response.ok){
            throw new Error("couldnt fetch")
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const imageElement =  document.getElementById("pokemonSprite");
        imageElement.src = pokemonSprite;
        imageElement.style.display = "block";
        
    }
    catch(error){
        console.error(error)
    }
    
}
