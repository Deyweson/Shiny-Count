interface Api {
  addCounter: (data: {
    id: string
    id_poke: number
    time: number
    attempts: number
    is_complete: boolean
  }) => Promise<{ data: string }>
  getCounters: () => Promise<Counter[]>
  getPokemonCounter: (id: string) => Promise<pokemonCounter>
  upCounter: (count: number, id: string) => Promise<void>
  deleteCounter: (id: string) => Promise<void>
  downCounter: (count: number, id: string) => Promise<void>
}

interface Window {
  api: Api
}
