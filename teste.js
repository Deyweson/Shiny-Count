import fetch from 'node-fetch'
import fs from 'fs'

// URL base da PokéAPI
const baseURL = 'https://pokeapi.co/api/v2/pokemon/'

// Função para buscar dados dos Pokémon
async function fetchPokemonData(startId, endId) {
  const pokemonData = []

  for (let id = startId; id <= endId; id++) {
    const response = await fetch(`${baseURL}${id}`)
    if (response.ok) {
      const data = await response.json()
      pokemonData.push({ id: data.id.toString(), name: data.name })
    } else {
      console.error(`Erro ao buscar o Pokémon com ID ${id}`)
    }
  }

  return pokemonData
}

// IDs dos Pokémon para buscar
const startId = 1
const endId = 10277

// Gera os dados e escreve em um arquivo JSON
fetchPokemonData(startId, endId)
  .then((data) => {
    fs.writeFileSync('pokemonData.json', JSON.stringify(data, null, 2))
    console.log('Arquivo pokemonData.json gerado com sucesso!')
  })
  .catch((error) => {
    console.error('Erro ao gerar o arquivo:', error)
  })
