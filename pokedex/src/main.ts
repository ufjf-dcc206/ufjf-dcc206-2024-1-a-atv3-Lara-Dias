import './style.css'
//importar imagem import viteLogo from '/vite.svg'
import { setupPokemon } from './pokemoncard.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="card">
      <button id="pokemon" type="button">Descobrir Pokémon</button>
    </div>
    <p class="instrucao">
      Clique no botão e descubra seu pokémon. 
    </p>
  </div>
`

setupPokemon(document.querySelector<HTMLButtonElement>('#pokemon')!)
