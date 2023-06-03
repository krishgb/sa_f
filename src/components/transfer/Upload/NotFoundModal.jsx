import { Table, TableContainer, Thead, Tr, Td } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'

export default function NotFoundModal() {
    const location = useLocation()
    
    const [list, set_list] = useState([])

    useEffect(() => {
        const list = localStorage.getItem('not_found_list')
        if(list) set_list(JSON.parse(list))
    }, [])
  
    return (
    <>
        <TableContainer>
            <Table>
                <Thead>
                    <Tr>
                        <Th>S.no</Th>
                        <Th>Dote</Th>
                        <Th>S.no</Th>
                        <Th>S.no</Th>
                        <Th>S.no</Th>
                        <Th>S.no</Th>
                    </Tr>
                </Thead>
            </Table>
        </TableContainer>
    </>
  )
}
