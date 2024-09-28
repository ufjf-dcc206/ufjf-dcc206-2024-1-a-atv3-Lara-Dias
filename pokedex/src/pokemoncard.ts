const site = "https://pokeapi.co/api/v2/pokemon/"


function getRandomPokemonId() {
  return Math.floor(Math.random() * 1010) + 1;
}

async function getPokemon() {
  const pokemonLista: { nome: any; tipo: any; }[] = [];
  const fetchPromises = Array.from({length:10},()=> {
    const id = getRandomPokemonId();
    return fetch(site+id).then(response=>response.json())
      .then(data=> {
        pokemonLista.push({
        nome:data.name,
        tipo:data.types[0].type.name
      });
    })
    .catch(error => {
      console.error('Erro ao buscar Pokémon',error);
    });
  });
  
  await Promise.all(fetchPromises);
  
  pokemonLista.forEach(pokemon => {
    console.log(`Nome ${pokemon.nome}, Tipo ${pokemon.tipo}`);
  });
}

export function setupPokemon(element: HTMLButtonElement) {
  element.addEventListener('click', () => { getPokemon();
  });
}
