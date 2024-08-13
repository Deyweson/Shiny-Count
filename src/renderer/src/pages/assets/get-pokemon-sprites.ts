// Importa todas as imagens do diretório './gen1'
const images = import.meta.glob('./pokemon-images/*.{png,jpg,jpeg,svg}', {
  query: '?url', // Atualizado para usar `query` ao invés de `as`
  import: 'default', // Importa o módulo de forma padrão
  eager: true // Importa os módulos de forma imediata
})

// Cria um objeto para armazenar as imagens com base nos nomes dos arquivos
const pokemonSprites: { [key: string]: string } = {}

for (const [path, url] of Object.entries(images)) {
  // Asegura que url é do tipo string
  const fileUrl = url as string

  // Extrai o nome do arquivo do caminho
  const fileName = path.split('/').pop()
  if (fileName) {
    pokemonSprites[fileName] = fileUrl
  }
}

export default pokemonSprites
