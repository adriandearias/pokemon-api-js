//@import modules
import { getPokemons } from "./api.js";

//Global variable declaration
let arrayPokemons = [];

//function map
function mapPokemons(arrayPokemons) {
  const mappedPokemons = arrayPokemons.map((pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    type: pokemon.types.map((type) => type.type.name),
    weight: pokemon.weight,
    img: pokemon.sprites.front_shiny,
    abilities: pokemon.abilities[0].ability.name,
  }));
  return mappedPokemons;
}

//insert html to show/draw Pokemons
function drawPokemons(mappedPokemons) {
  const divContent$$ = document.querySelector(".div-content");
  divContent$$.innerHTML = "";
  for (const pokemon of mappedPokemons) {
    const divPokemon$$ = document.createElement("div");
    const img$$ = document.createElement("img");
    const span$$ = document.createElement("span");
    const ulDescription$$ = document.createElement("ul");
    const li$$ = document.createElement("li");
    const li2$$ = document.createElement("li");
    const li3$$ = document.createElement("li");

    divContent$$.appendChild(divPokemon$$);
    divPokemon$$.appendChild(img$$);

    ulDescription$$.setAttribute("class", "ul-description");
    divPokemon$$.setAttribute("class", "div-pokemon");
    Object.assign(divPokemon$$, {
      className: `div-pokemon color-${pokemon.type[0]}`,
    });
    // divPokemon$$.classList.add(`div-pokemon color-${pokemon.type[0]}`)
    //divPokemon$$.classList -> cambiar
    setColor(divPokemon$$, pokemon.type[0]);
    img$$.setAttribute("src", pokemon.img);
    img$$.setAttribute("class", "img-pokemon");

    divPokemon$$.appendChild(span$$);
    const pokemonUppercase = pokemon.name;
    span$$.innerHTML = `${pokemon.id}.${
      pokemonUppercase.charAt(0).toUpperCase() + pokemon.name.slice(1)
    }`;

    divPokemon$$.appendChild(ulDescription$$);
    ulDescription$$.appendChild(li$$);
    ulDescription$$.appendChild(li2$$);
    ulDescription$$.appendChild(li3$$);
    li$$.innerHTML = "Type ⫸ ";
    pokemon.type.map((type) => (li$$.innerHTML += `${type.toUpperCase()} `));
    li2$$.innerHTML = `Weight ⫸ ${pokemon.weight} kg`;
    const abilityUppercase = pokemon.abilities;
    li3$$.innerHTML = `Ability ⫸ ${
      abilityUppercase.charAt(0).toUpperCase() + pokemon.abilities.slice(1)
    }`;
  }
}
//function set color, used to color buttons and div-pokemon
function setColor(element, type) {
  const colors = {
    grass: "#63bb5b",
    poison: "#ab6ac8",
    fire: "#ff9c54",
    flying: "#8fa8dd",
    water: "#4d90d5",
    bug: "#90c12c",
    normal: "#9099a1",
    electric: "#ffa710",
    ground: "#d97746",
    fairy: "#ec8fe6",
    fighting: "#ce4069",
    psychic: "#f97176",
    rock: "#c7b78b",
    steel: "#5a8ea1",
    ice: "#74cec0",
    ghost: "#5269ac",
    dragon: "#0a6dc4",
  };
  Object.assign(element.style, {
    background: colors[type],
  });
}
//input event
const setInput = (pokemons) => {
  const input$$ = document.getElementById("find-input");
  input$$.addEventListener("keyup", () => {
    filterPokemons(pokemons, input$$.value);
  });
};

//filter pokemons by input event value
const filterPokemons = (pokemons, inputValue) => {
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(inputValue.toLowerCase())
  );
  drawPokemons(filteredPokemons);
};

//draw and color buttons function
function drawButtons(pokemons) {
  const types = [];
  const btnAll$$ = document.createElement("button");
  const divBtn$$ = document.querySelector(".div-btn");

  divBtn$$.appendChild(btnAll$$);
  btnAll$$.innerHTML = "Show All";
  Object.assign(btnAll$$, {
    className: `btn-type`,
    id: "btn-all",
  });
  // setListener to btn to show all
  setBtnAll(btnAll$$, pokemons);
  //iterate to get types
  for (const pokemon of pokemons) {
    for (const type of pokemon.type) {
      if (!types.includes(type)) {
        types.push(type);
      }
    }
  }
  for (const type of types) {
    const btn$$ = document.createElement("button");
    divBtn$$.appendChild(btn$$);
    //first letter of type to mayus
    let typeUppercase = type;
    btn$$.innerHTML = typeUppercase.charAt(0).toUpperCase() + type.slice(1);
    Object.assign(btn$$, {
      className: `btn-type btn-${type}`,
    });
    //color button bg
    setColor(btn$$, type);
  }
  setButtons(types, pokemons);
}

const setButtons = (types, pokemons) => {
  for (const type of types) {
    const btn = document.querySelector(`.btn-${type}`);
    btn.addEventListener("click", () => {
      drawPokemons(pokemons.filter((pokemon) => pokemon.type.includes(type)));
    });
  }
};

function setBtnAll(btnAll, pokemons) {
  btnAll.addEventListener("click", () => {
    drawPokemons(pokemons);
  });
}
window.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM fully loaded and parsed");
  arrayPokemons = await getPokemons();

  const mappedPokemons = mapPokemons(arrayPokemons); //pokemons
  setInput(mappedPokemons);
  drawButtons(mappedPokemons);
  drawPokemons(mappedPokemons);
});
