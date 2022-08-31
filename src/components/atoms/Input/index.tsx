import { Input as ChakraInput, InputProps } from '@chakra-ui/react'

export const Input: React.FC<InputProps> = (props) => {
  return (
    <ChakraInput
      {...props}
    />
  )
}