import './style.css';
import './pokemonArea.ts';
import './pokemonCard.ts'

async function iniciar() {
  const jogadorAarea=document.createElement('pokemon-area') as any;
  jogadorAarea.setPokemon(5);
  console.log("Área A criada:", jogadorAarea);

  const areaVazia = document.createElement('div');
  areaVazia.classList.add('area-vazia');
  areaVazia.innerText = 'Área de jogo vazia';

  const jogadorBarea = document.createElement('pokemon-area') as any;
  jogadorBarea.setPokemon(5);
  console.log("Área B criada:", jogadorBarea);

  const app = document.getElementById('app')!;
  app.innerHTML='';
  app.appendChild(jogadorAarea);
  app.appendChild(areaVazia);
  app.appendChild(jogadorBarea);
  console.log("App atualizado:", app.innerHTML);

  let jogadorAtual = 'A';

   const atualizarArea = (pokemon:{nome:string;imagem:string;tipos:string}) =>{
    areaVazia.innerHTML=`
    <img src="${pokemon.imagem}" alt="${pokemon.nome}">
    <div>Nome: ${pokemon.nome}</div>
    <div>Tipo: ${pokemon.tipos}</div>
    `;
  };

  jogadorAarea.addEventListener('pokemonSelecionado', (event: CustomEvent) => {
    console.log("Pokémon selecionado na área A:", event.detail);
    const pokemon = event.detail;
    if (jogadorAtual === 'A') {
      atualizarArea(pokemon);
      jogadorAtual = 'B';
    }
  });

  jogadorBarea.addEventListener('pokemonSelecionado', (event: CustomEvent) => {
    console.log("Pokémon selecionado na área B:", event.detail);  
    const pokemon = event.detail;
      if (jogadorAtual === 'B') {
        atualizarArea(pokemon);
        jogadorAtual = 'A';
      }
  });
}

iniciar();