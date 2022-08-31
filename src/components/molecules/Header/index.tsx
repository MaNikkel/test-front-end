import { Flex } from '@chakra-ui/react'

import { useRickAndMorty } from "../../../hooks/rick-and-morty.hook"
import { Input } from "../../atoms/Input"

export const Header: React.FC = () => {
  const { setName, name } = useRickAndMorty()

  return (
    <Flex
      h='72'

      bg='blue.100'
      p='12'
      alignItems='center'
    >
      <Input 
        onChange={(e) => setName(e.target.value)}
        value={name}
        bg='white'
        h='24'
        fontSize='3xl'
      />
    </Flex>
  )
}