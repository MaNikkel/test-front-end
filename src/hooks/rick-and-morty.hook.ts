/* eslint-disable react-hooks/rules-of-hooks */
import { useInfiniteQuery } from "@tanstack/react-query"
import { useState, createContext, useContext } from "react";
import { fetchAllCharacters } from "../services/rick-and-morty.service"
import { useDebounce } from "./debounce.hook";

interface RickAndMortContextState {
  name: string;
  setName(name: string): void;
}

export const RickAndMortyContext = createContext<RickAndMortContextState>({} as RickAndMortContextState)

export const useRickAndMorty = () => {
  const { name, setName } = useContext(RickAndMortyContext)
  const debouncedName = useDebounce(name)
  
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['characters', debouncedName], 
    ({ pageParam }) => fetchAllCharacters(pageParam, debouncedName),
    {
      getPreviousPageParam: (firstPage) => firstPage?.info?.prev?.split('page=')[1].charAt(0),
      getNextPageParam: (nextPage) => nextPage?.info?.next?.split('page=')[1].charAt(0)
    }  
  )


  return {
    data, fetchNextPage, hasNextPage,
    setName,
    name
  }
}