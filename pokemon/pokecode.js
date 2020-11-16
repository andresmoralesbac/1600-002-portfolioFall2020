const pokeGrid = document.querySelector('.pokemonGrid')

async function loadData() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/')
    const data = await response.json()
    populatePokePage(data)
}

function populatePokePage(data) {
    const allPokemon = data.results
    for (const pokemon of allPokemon) {
        let pokeCard = document.createElement('div')
        pokeCard.className = 'pokeCard'
        let pokeName = document.createElement('h3')
        pokeName.textContent = pokemon.name
        
        pokeCard.appendChild(pokeName)
        pokeGrid.appendChild(pokeCard)
    }
}

loadData()