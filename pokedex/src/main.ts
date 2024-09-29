import './style.css';
import './pokemonArea.ts';
import './pokemonCard.ts'

async function iniciar() {
  const jogadorAarea=document.createElement('pokemon-area') as any;
  jogadorAarea.setPokemon(5);

  const emptyArea = document.createElement('div');
  emptyArea.classList.add('empty-area');
  emptyArea.innerText = 'Área de jogo vazia';

  const jogadorBarea = document.createElement('pokemon-area') as any;
  jogadorBarea.setPokemon(5);

  const app = document.getElementById('app')!;
  app.innerHTML='';
  app.appendChild(jogadorAarea);
  app.appendChild(emptyArea);
  app.appendChild(jogadorBarea);
}

iniciar();