import { Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Title({text, title, url, style}) {
  return (
    <div style={{marginBottom: '1rem'}}>
        <Text 
            display={'inline'} 
            mt={1} 
            p={2} 
            borderRadius={'5px'} 
            color='white' 
            backgroundColor={'#ff9900'}
            title={title || text}
            style={style || null}
        >
          {!url ? text :<Link to={url}>{text}</Link>}
        </Text> 
    </div>
  )
}
