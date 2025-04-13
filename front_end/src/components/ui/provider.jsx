'use client'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'
import { interSystem } from '@/theme'

export function Provider(props) {
  return (
    <ChakraProvider value={interSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
