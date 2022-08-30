type Info = {
  next?: string,
  prev?: string,
}

export type CharacterResult = {
  id: number,
  name: string,
  status: string,
  species: string,
  image: string,
  episode: string[],
  url: string
}

export type GetCharactersResponse = {
  info: Info
  results: CharacterResult[]
}