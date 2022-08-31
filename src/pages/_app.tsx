import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { RickAndMortyContext } from '../hooks/rick-and-morty.hook'

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()
  const [name, setName] = useState('')

  return (
    <RickAndMortyContext.Provider value={{ name, setName }}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </RickAndMortyContext.Provider>
  )
}

export default MyApp
