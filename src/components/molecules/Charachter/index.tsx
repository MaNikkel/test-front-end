import { VStack, Flex, Image, Heading } from "@chakra-ui/react"
import React from "react"
import { CharacterResult } from "../../../services/@types/character-response.type"

interface CharacterProps {
  character: CharacterResult
  onClick: () => void
}

export const Character: React.FC<CharacterProps> = ({ character, onClick }) => {
  return (
    <Flex
      borderRadius='md'
      border='1px'
      borderColor='black'
      margin='1'
      overflow='hidden'
      h='36'
      w={'96'}
      onClick={onClick}

      cursor='pointer'

      _hover={{
        backgroundColor: 'gray.200'
      }}
    >
      <Image 
        src={character.image}
        alt={`Image of ${character.name}`}
        overflow='hidden'
      />
      
      <VStack>
        <Heading
          as='h1'
          fontSize='md'
        >
          {character.name}
        </Heading>
      </VStack>

    </Flex>
  )
}