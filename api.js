//get 151 Pokemons(first generation)
export async function getPokemons(){
    const arrayPokemons = []
    const loadingElement = document.getElementById('loading');
    loadingElement.style.display = 'block';
    for (let i = 1; i <= 151; i++) {
        const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        const pokemonResultToObject = await result.json()   
        arrayPokemons.push(pokemonResultToObject)  
    }
    loadingElement.style.display = 'none'
    return arrayPokemons
}

