import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Image,
  VStack,
  Flex,
} from '@chakra-ui/react'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { CharacterResult } from '../../../services/@types/character-response.type'

export interface CharacterModalHandlers {
  openModalWithCharacter: (character: CharacterResult) => void
}

const CharacterModal: React.ForwardRefRenderFunction<CharacterModalHandlers> = (props, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [character, setCharacter] = useState<CharacterResult>()

  const openModalWithCharacter = (c: CharacterResult) => {
    setCharacter(c)
    onOpen()
  }

  useImperativeHandle(ref, () => {
    return {
      openModalWithCharacter
    }
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{character?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <Image 
              src={character?.image}
              alt={`Image of ${character?.name}`}
              h='36'
              w='36'
              borderRadius='full'
            />
            <Flex
              flexDirection='column'
            >
              <div>Status: {character?.status}</div>
              <div>Speies: {character?.species}</div>
              {character?.type && <div>Type: {character?.type}</div>}
              <div>Gender: {character?.gender}</div>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
  )
}

export default forwardRef(CharacterModal)