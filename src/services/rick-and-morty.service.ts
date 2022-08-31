import { GetCharactersResponse } from "./@types/character-response.type"

export const fetchAllCharacters = async (pageParam = 1, name = '') => {
  try {
    const data: GetCharactersResponse = await (await fetch(`https://rickandmortyapi.com/api/character/?name=${name}&page=${pageParam}`)).json()
    return data

  } catch (err) {
    console.error(err)
  }
}