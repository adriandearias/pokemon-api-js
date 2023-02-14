//get 151 Pokemons(first generation)
export async function getPokemons(){
    const arrayPokemons = []
    for (let i = 1; i < 152; i++) {
        const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        const pokemonResultToObject = await result.json()   
        arrayPokemons.push(pokemonResultToObject)  
    }
    return arrayPokemons
}

