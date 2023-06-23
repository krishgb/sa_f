import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Badge, Box, Button, Divider, Select, Stack, Table, TableCaption, TableContainer, Tag, TagLabel, Tbody, Td, Text, Tfoot, Th, Thead, Tooltip, Tr } from '@chakra-ui/react'
import React, { lazy, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useGlobalContext } from '@/lib/global_context'

export default function Demand({admission_type}) {

    const [table_data, set_table_data] = useState({ rows: [], cols: [] })
    const [year, set_year] = useState('Loading...')
    const [academic_years, set_academic_years] = useState([])



    const { global_user, global_allowed_routes, global_is_admin } = useGlobalContext()
    const users_actions = {
        'admin': [[0, 1, 2, 3, 4, 5, 6, 7, 8], 0, [9]],
        'Superintendent': [[5], 6, [6, 7, 8, 9]],
        'Deputy Director': [[6], 7, [7, 8, 9]],
        'Director': [[7], 8, [8, 9]],
        'Finance Clerk': [[4], 5, [5, 6, 7, 8, 9]],
        'Staff': [[8], 9, [9]]
    }
    const pending = users_actions[global_user.designation.name][0]
    const status = users_actions[global_user.designation.name][1]
    const approved = users_actions[global_user.designation.name][2]


    const get_academic_years = async () => {
        try {
            const request = await fetch(`/api/rra/${admission_type}/get_academic_years`, { credentials: 'include' })

            if (request.status === 401) {
                navigate('/login', {
                    replace: true
                })
            }

            const response = await request.json()

            if (!response.success) {
                throw new Error(response.msg)
            }

            const { data } = response
            set_academic_years(data)
            set_year(data[0])
        } catch (err) {
            console.log(err.message)
        }
    }
    const get_info = async () => {
        try {
            const request = await fetch(`/api/rra/${admission_type}/info/${year}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ pending: pending, approved: approved }),
                    credentials: 'include'
                })
            const response = await request.json()

            if (!response.success) {
                throw new Error(response.msg)
            }

            const { data } = response
            const info = data.info


            const cols = [
                { Header: 'Batch', accessor: 'batch' },
                { Header: 'Students', accessor: 'students' },
            ]
            const rows = info
            console.log(rows)
            set_table_data({ rows, cols })
        } catch (err) {
            console.log(err.message)
        }
    }

    const approve = async (batch) => {
        try {
            console.log(
                'approve initiated'
            );
            const request = await fetch(`/api/rra/${admission_type}/approve/${year}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: status, batch: batch, pending: pending }),
                    credentials: 'include'
                }
            )
            const response = await request.json()

            if (!response.success) {
                throw new Error(response.msg)
            }

            get_info()

        } catch (e) {
            console.log()
        }
    }

    useEffect(() => {
        console.log(year)
        if (year != 'Loading...' && year != '') {
            get_info()
        }
    }, [year]
    )
    useEffect(() => {
        get_academic_years()
    }, [])

    return (
        <Box color='black'>
            <Text><strong>{admission_type.toUpperCase() }</strong></Text>
            <Select onChange={(e) => { set_year(e.target.value) }} size='sm' width={'120px'}>
                {
                    academic_years.map((year, i) => {
                        return (
                            <option style={{ color: 'black' }} key={i} value={year}>{year}</option>
                        )
                    })
                }
            </Select>

            <TableContainer width={'700px'} mt={3} >
                <Table variant={'simple'} colorScheme='green'>
                    <Thead bgColor={'teal.600'} border={'1px solid teal'}>
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
                            table_data.rows.map((row, i) => {
                                return (
                                    <Tr key={i} border={'1px solid #ccc'}>
                                        <Td textAlign={'center'}>{row.batch}</Td>
                                        <Td textAlign={'center'}>{row.students}</Td>
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
                                        <Td textAlign={'center'}>

                                            <Button onClick={() => { console.log('Button clicked'); approve(row.batch) }} isDisabled={row.pending === 0 | global_user.designation.name === 'Staff'} backgroundColor={'teal.400'} _hover={{ backgroundColor: 'teal.600' }} color='white' size='sm'>
                                                {(global_user.designation.name === 'Staff') ? "Cick view raise Approval" : "Approve for Raising Demand"}
                                            </Button>
                                        </Td>
                                        <Td>
                                            <Button as={Link} to={`/rra?year=${year}&batch=${row.batch}&type=${admission_type}`}>
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
        </Box>
    )
}
