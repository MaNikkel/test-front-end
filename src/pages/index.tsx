import { dehydrate, QueryClient } from '@tanstack/react-query'
import type { GetStaticProps, NextPage } from 'next'
import { useInView } from 'react-intersection-observer'
import React, { useEffect, useRef } from 'react'
import { useRickAndMorty } from '../hooks/rick-and-morty.hook'
import { fetchAllCharacters } from '../services/rick-and-morty.service'
import { Header } from '../components/molecules/Header'
import { Character } from '../components/molecules/Charachter'
import { SimpleGrid } from '@chakra-ui/react'
import CharacterModal, { CharacterModalHandlers } from '../components/molecules/CharacterModal'
import { CharacterResult } from '../services/@types/character-response.type'

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['characters', ''], () => fetchAllCharacters())

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

const Home: NextPage = () => {
  const { data, fetchNextPage, hasNextPage, isFetching } = useRickAndMorty()
  const { ref, inView } = useInView()
  const characterModalRef = useRef<CharacterModalHandlers>() as React.MutableRefObject<CharacterModalHandlers>

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])

  function onOpen(character: CharacterResult) {
    characterModalRef.current.openModalWithCharacter(character)
  }

  return (
    <>
      <Header />
      { data?.pages?.map((page) => (
        <SimpleGrid 
          columns={[null, 1, 2, null, 3, 4]} 
          spacing={0}
          justifyItems='center'
          key={page?.info?.next}
        >
          { page?.results?.map(result => {
            return <Character character={result} key={result.id} onClick={() => onOpen(result)}/>
          }) }
        </SimpleGrid>
      )) }

      <div ref={ref}>
          { isFetching && 'Carregando...' }
      </div>

      <CharacterModal ref={characterModalRef}/>
    </>
  )
}

export default Home
