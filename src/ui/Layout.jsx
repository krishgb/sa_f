import {Grid, GridItem, useDisclosure} from '@chakra-ui/react'

import Header from '@/ui/Header'

export default function Layout({children}) {


    return (
        <>
            <Header />

            <main style={{padding: '1rem', backgroundColor: '#24272a', minHeight: '90.7vh'}}>
                {children}
            </main>

            {/* <footer>
                SA {new Date().getFullYear()}
            </footer> */}
        </>
    )
}


