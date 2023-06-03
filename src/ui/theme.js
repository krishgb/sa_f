import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

// 3. extend the theme
const theme = extendTheme({ 
    config,
    fonts: {
        heading: `'SFBold', sans-serif`,
        body: `'SF', sans-serif`,
      }
 })

export default theme
