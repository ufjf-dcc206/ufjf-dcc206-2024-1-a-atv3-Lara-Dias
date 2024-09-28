const site = "https://pokeapi.co/api/v2/pokemon/"


async function getPokemon() {
  let pokemon;
  await fetch(site+8)
  .then(response=>response.json())
  .then(data=> {
    pokemon=data;
    console.log(pokemon.name);
    console.log(pokemon.types[0].type.name);
  })
}

export function setupPokemon(element: HTMLButtonElement) {
  element.addEventListener('click', () => { getPokemon();
  });
}
