import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Badge, Button, Divider, Select, Stack, Table, TableCaption, TableContainer, Tag, TagLabel, Tbody, Td, Text, Tfoot, Th, Thead, Tooltip, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Demand() {

    const [table_data, set_table_data] = useState({rows: [], cols: []})
    const [year, set_year] = useState('2022-2023')


    useEffect(() => {
        const cols = [
            {Header: 'Batch', accessor: 'batch'},
            {Header: 'Students', accessor: 'students'},
        ]
    
        const rows = {
            '2022-2023': [
                {batch: 1, students: 520},
                {batch: 2, students: 458},
                {batch: 3, students: 469},
            ],
            '2021-2022': [
                {batch: 1, students: 458},
                {batch: 2, students: 520},
                {batch: 3, students: 469},
            ],
            '2020-2021': [
                {batch: 1, students: 469},
                {batch: 2, students: 458},
                {batch: 3, students: 520},
            ]
        }

        set_table_data({rows, cols})
    }, [])

  return (
    <>
        <Select color='white' onChange={(e) => {set_year(e.target.value)}} size='sm' width={'120px'} >
            <option style={{color: 'black'}} value='2022-2023'>2022-2023</option>
            <option style={{color: 'black'}} value='2021-2022'>2021-2022</option>
            <option style={{color: 'black'}} value='2020-2021'>2020-2021</option>
        </Select>

        <TableContainer width={'700px'} mt={3} borderRadius={'5px'} border={'1px solid black'} >
            <Table variant={'simple'} border={'1px solid #cccccc50'}>
                <Thead bgColor={'teal.600'} border={'1px solid #cccccc50'}>
                <Tr>
                    <Th textAlign={'center'} color='white'>Batch</Th>
                    <Th textAlign={'center'} color='white'>Students</Th>
                    <Th textAlign={'center'} color='white'></Th>
                    <Th textAlign={'center'} color='white'>Action</Th>
                    <Th textAlign={'center'} color='white'>View</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {
                        table_data.rows[year] &&
                        table_data.rows[year].reverse().map((row, i) => {
                            return (
                                <Tr key={i}>
                                    <Td textAlign={'center'} color='white'>{row.batch}</Td>
                                    <Td textAlign={'center'} color='white'>{row.students}</Td>
                                    <Td>
                                        <Tooltip 
                                            bg={'green.400'} 
                                            hasArrow 
                                            label='Approved Records' 
                                            aria-label='Approved Records'
                                        >
                                            <Badge cursor={'default'} colorScheme='green'>400</Badge>
                                        </Tooltip>
                                        
                                        <Tooltip 
                                            bg={'purple.400'} 
                                            hasArrow 
                                            label='Pending Records' 
                                            aria-label='Pending Records'
                                        >
                                            <Badge cursor={'default'} colorScheme='purple'>100</Badge>
                                        </Tooltip>
                                        
                                        <Tooltip 
                                            bg={'red.500'} 
                                            hasArrow 
                                            label='Cancelled Records' 
                                            aria-label='Cancelled Records'
                                        >
                                            <Badge cursor={'default'} colorScheme='red'>20</Badge>
                                        </Tooltip>
                                    </Td>
                                    <Td textAlign={'center'} >
                                        <Button backgroundColor={'teal.400'} _hover={{backgroundColor: 'teal.600'}} color='white' size='sm'>
                                            Approve for Raising Demand
                                        </Button>
                                    </Td>
                                    <Td>
                                        <Button as={Link} to={`/transfer?year=${year}&batch=${row.batch}`}>
                                            <ExternalLinkIcon color={'black'} />
                                        </Button>
                                    </Td>
                                </Tr>
                            )
                        })
                    }
                </Tbody>
            </Table>
        </TableContainer>
    </>
  )
}
