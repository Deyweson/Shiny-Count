interface Api {
  addCounter: (data: {
    id: string
    id_poke: number
    time: number
    attempts: number
    is_complete: boolean
  }) => Promise<{ data: string }>
  getCounters: () => Promise<Counter[]>
}

interface Window {
  api: Api
}
