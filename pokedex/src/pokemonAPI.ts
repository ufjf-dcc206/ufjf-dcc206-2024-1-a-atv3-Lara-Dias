const site = "https://pokeapi.co/api/v2/pokemon/"


function getRandomPokemonId() {
  return Math.floor(Math.random() * 1010) + 1;
}

export async function getPokemon(count:number): Promise<{nome:string,tipo:string;imagem:string}[]> {
  const pokemonLista: { nome: string; tipo: string; imagem:string }[] = [];
  
  const fetchPromises = Array.from({length:count},()=> {
    const id = getRandomPokemonId();
    return fetch(site+id).then(response=>response.json())
      .then(data=> {
        const pokemonTypes = data.types.map((typeInfo: any) => typeInfo.type.name).join(', ') || 'Desconhecido';
        
        const pokemonImageUrl = data.sprites?.front_default || 'default_image_url';

        pokemonLista.push({
          nome: data.name,
          tipo: pokemonTypes,
          imagem: pokemonImageUrl, // Adiciona o campo 'imagem'
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

  return pokemonLista;
}
