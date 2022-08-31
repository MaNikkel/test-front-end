import { dehydrate, QueryClient } from '@tanstack/react-query'
import type { GetStaticProps, NextPage } from 'next'
import { useInView } from 'react-intersection-observer'
import React, { useEffect } from 'react'
import { useRickAndMorty } from '../hooks/rick-and-morty.hook'
import { fetchAllCharacters } from '../services/rick-and-morty.service'
import { Input } from '../components/atoms/Input'
import { Header } from '../components/molecules/Header'

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
  const { data, fetchNextPage, hasNextPage, name, setName } = useRickAndMorty()
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage])

  return (
    <>
      <Header />
      { data?.pages?.map((page) => (
        <React.Fragment key={page?.info?.next}>
          { page?.results?.map(result => {
            return <div key={result.id}><h1>{result.name}</h1></div>
          }) }
        </React.Fragment>
      )) }

      <button ref={ref}>
          Alo
      </button>
    </>
  )
}

export default Home
