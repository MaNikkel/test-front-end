/* eslint-disable react-hooks/rules-of-hooks */
import { useInfiniteQuery } from "@tanstack/react-query"
import { useState } from "react";
import { fetchAllCharacters } from "../services/rick-and-morty.service"
import { useDebounce } from "./debounce.hook";

export const useRichAndMorty = () => {
  const [name, setName] = useState('')
  const debouncedName = useDebounce(name)
  
  const queryResult = useInfiniteQuery(
    ['characters', debouncedName], 
    ({ pageParam }) => fetchAllCharacters(pageParam, debouncedName),
    {
      getPreviousPageParam: (firstPage) => firstPage?.info?.prev?.split('page=')[1],
      getNextPageParam: (nextPage) => nextPage?.info?.next?.split('page=')[1]
    }  
  )


  return {
    ...queryResult,
    setName
  }
}