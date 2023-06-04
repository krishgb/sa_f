import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Badge, Button, Divider, Select, Stack, Table, TableCaption, TableContainer, Tag, TagLabel, Tbody, Td, Text, Tfoot, Th, Thead, Tooltip, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Demand() {

    const [table_data, set_table_data] = useState({rows: [], cols: []})
    const [year, set_year] = useState('Loading...')
    const [academic_years, set_academic_years] = useState([])

    const get_academic_years = async() => {
        try{
            const request = await fetch('http://localhost:5000/api/transfer/get_academic_years')
            const response = await request.json()
            
            if(!response.success){
                throw new Error(response.msg)
            }
            
            const {data} = response
            set_academic_years(data)
            set_year(data[0])
        }catch(err){
            console.log(err.message)
        }
    }


    const get_info = async() => {
        try{
            const request = await fetch(`http://localhost:5000/api/transfer/info/${year}`)
            const response = await request.json()
            
            if(!response.success){
                throw new Error(response.msg)
            }
            
            const {data} = response
            const info = data.info
            
           
            const cols = [
                {Header: 'Batch', accessor: 'batch'},
                {Header: 'Students', accessor: 'students'},
            ]
            const rows = info
            console.log(rows)
            set_table_data({rows, cols})
        }catch(err){
            console.log(err.message)
        }
    }

    
    useEffect(() => {
        if(year !== 'Loading...')  get_info()
    }, [year])

    useEffect(() => {
        get_academic_years()
    }, [])

  return (
    <>
        <Select color='white' onChange={(e) => {set_year(e.target.value)}} size='sm' width={'120px'} >
            {
                academic_years.map((year, i) => {
                    return (
                        <option style={{color: 'black'}} key={i} value={year}>{year}</option>
                    )
                })
            }
           
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
                        table_data.rows &&
                        table_data.rows.reverse().map((row, i) => {
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
                                            <Badge cursor={'default'} colorScheme='green'>{row.approved}</Badge>
                                        </Tooltip>
                                        
                                        <Tooltip 
                                            bg={'purple.400'} 
                                            hasArrow 
                                            label='Pending Records' 
                                            aria-label='Pending Records'
                                        >
                                            <Badge cursor={'default'} colorScheme='purple'>{row.pending}</Badge>
                                        </Tooltip>
                                        
                                        <Tooltip 
                                            bg={'red.500'} 
                                            hasArrow 
                                            label='Cancelled Records' 
                                            aria-label='Cancelled Records'
                                        >
                                            <Badge cursor={'default'} colorScheme='red'>{row.cancelled}</Badge>
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
