import { ArrowUpIcon, SmallAddIcon, UpDownIcon } from '@chakra-ui/icons'
import { Button, Flex, Input, Grid, TableContainer, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'

export default function Csv() {
    const input_ref = useRef(null)
    const [data, set_data] = useState([])
    const [file_name, set_file_name] = useState('')
    const [loading, set_loading] = useState(false)

    const get_data = async () => {
        set_loading(true)
        const file = input_ref.current.files[0]
        const data = new FormData()
        data.append('file', file)
        const response = await fetch('http://127.0.0.1:5000/table_extract', {
            method: 'POST',
            body: data
        })
        const json = await response.json()
        set_data(json.result)
        set_loading(false)
    }

    const change = (e) => {
        set_file_name(e.target.files[0].name)
    }

    const download = () => {
        let csvContent = "data:text/csv;charset=utf-8," 
        + data.map(e => e.join(",")).join("\n");

        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_data.csv");
        document.body.appendChild(link); // Required for FF
        link.style.display = 'none';
        link.click();
    }



    return (
        <>
            <Text ml={16} color='white'>Upload PDF</Text>
            <Flex justifyContent={'center'} alignItems={'center'}>
                <Button
                    onClick={() => { input_ref.current.click() }}
                    variant='outline'
                    color='white'
                    w={'300px'}
                    _hover={{ color: 'black', backgroundColor: 'white' }}
                >
                    <SmallAddIcon />
                    Upload
                </Button>
                <Input type="file" display={'none'} ref={input_ref} onChange={change} />

                <Button
                    ml={6}
                    colorScheme='green'
                    onClick={get_data}
                >
                    Get Data
                </Button>
                {
                    data.length === 0 ? null :

                        <Button ml={9} colorScheme='facebook' onClick={download} >
                            Download
                        </Button>
                }
            </Flex>
            <Text my={7} color='white' textAlign={'center'}>File: {file_name}</Text>
            <Grid>
                {
                    data.length === 0 ?
                        <div style={{ color: 'white', display: loading ? 'block' : 'none' }} >Loading...</div>
                        :
                        <TableContainer>
                            <Table color={'white'}>
                                <Thead>
                                    {
                                        data[0].map((i, idx) => {
                                            return (
                                                <Th color='white' key={idx}>
                                                    {i}
                                                </Th>
                                            )
                                        })
                                    }
                                </Thead>

                                <Tbody>
                                    {data.slice(1).map((row, index) => {

                                        return (
                                            <Tr key={index}>
                                                {row.map((cell, index) => {
                                                    return (
                                                        <Td key={index}>
                                                            {cell}
                                                        </Td>
                                                    )
                                                })}
                                            </Tr>)
                                    })}
                                </Tbody>
                            </Table>
                        </TableContainer>
                }
            </Grid>


        </>
    )
}