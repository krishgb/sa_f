import { Button, Grid, Table, TableContainer, Tbody, Th, Thead, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Flex, Tr, Td, Select, Text,  } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'

export default function AddTransferData() {
    const [data, set_data] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const batch_ref = useRef(null)
    const academic_year_ref = useRef(null)
    const [isodd, set_isodd] = useState(true)
    const [form_data, set_form_data] = useState({
        name: '',
        rollno: '',
        sem: '',
        branch: '',
        from: '',
        from_id: '',
        to: '',
        to_id: '',
        sanction: 0,
        admitted: 0,
        vacancy: 0,
        attendance: 0,
    })

    const save = async () => {
        try {
            console.log(isodd, data);
            const request = await fetch('/api/transfer/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    
                    batch: batch_ref.current.valueAsNumber,
                    year: academic_year_ref.current.value,

                    data: data,
                    isodd
                })

            })

            const response = await request.json()
            if (!response.success) {
                toast({ title: response.msg, status: 'error', isClosable: true, size: 'sm' })
            }

            if (response.success) {
                toast({ title: response.msg, status: 'success', isClosable: true, size: 'sm' })
            }

            /* if(response.not_found_list){
                 setTimeout(() => {
                     localStorage.setItem('not_found_list', JSON.stringify(response.not_found_list))
                     window.open(`/not`)
                 }, 1000)
             }*/

        } catch (e) {
            console.log(e);
            toast({ title: 'Server Error, Please try again later', status: 'error', isClosable: true, size: 'sm' })
        }
    }

    const change = (key, value) => {
        let val = value
        const numbers = ['sanction', 'admitted', 'vacancy', 'attendance']
        if (numbers.includes(key)) {
            val = parseInt(value)
        }

        set_form_data({...form_data, [key]: val})
    }

   const submit = (e) => {
    e.preventDefault()
    set_data([...data, {...form_data, from: form_data.from_id + '-' + form_data.from, to: form_data.to_id + '-' + form_data.to, cat: 'T'}])
    e.target.reset()
    onClose()
   } 
  return (
    <Grid ml={2}>
        <Text fontSize={'1.2rem'} fontWeight={'bold'}>Add Transfer Students Data</Text>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minWidth={'700px'}>
          <ModalHeader>Add New Student</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={submit}>
            <ModalBody>
                <Grid gap={5} gridTemplateColumns={'1fr 1fr'}>
                    <FormControl size='sm'>
                        <FormLabel size='sm'>Name</FormLabel>
                        <Input type='text' size='sm' placeholder='Name' onChange={e => change('name', e.target.value)} />
                    </FormControl>
                    <FormControl size='sm'>
                        <FormLabel size='sm'>Roll no</FormLabel>
                        <Input type='text' size='sm' placeholder='Roll no' onChange={e => change('rollno', e.target.value)} />
                    </FormControl>
                    <FormControl size='sm'>
                        <FormLabel size='sm'>Semester</FormLabel>
                        <Input type='text' size='sm' placeholder='Semester' onChange={e => change('sem', e.target.value)} />
                    </FormControl>
                    <FormControl size='sm'>
                        <FormLabel size='sm'>Branch</FormLabel>
                        <Input type='text' size='sm' placeholder='Branch' onChange={e => change('branch', e.target.value)} />
                    </FormControl>
                    <FormControl size='sm'>
                        <FormLabel size='sm'>From College</FormLabel>
                        <Input type='text' size='sm' placeholder='From College' onChange={e => change('from', e.target.value)} />
                    </FormControl>
                    <FormControl size='sm'>
                        <FormLabel size='sm'>From College DOTE ID</FormLabel>
                        <Input type='text' size='sm' placeholder='From College DOTE ID' onChange={e => change('from_id', e.target.value)} />
                    </FormControl>
                    <FormControl size='sm'>
                        <FormLabel size='sm'>To College</FormLabel>
                        <Input type='text' size='sm' placeholder='To College' onChange={e => change('to', e.target.value)} />
                    </FormControl>
                    <FormControl size='sm'>
                        <FormLabel size='sm'>To College DOTE ID</FormLabel>
                        <Input type='text' size='sm' placeholder='To College DOTE ID' onChange={e => change('to_id', e.target.value)} />
                    </FormControl>
                    <FormControl size='sm'>
                        <FormLabel size='sm'>Sanctioned</FormLabel>
                        <Input type='text' size='sm' placeholder='Sanctioned' onChange={e => change('sanction', e.target.value)} />
                    </FormControl>
                    <FormControl size='sm'>
                        <FormLabel size='sm'>Admitted</FormLabel>
                        <Input type='text' size='sm' placeholder='Admitted' onChange={e => change('admitted', e.target.value)} />
                    </FormControl>
                    <FormControl size='sm'>
                        <FormLabel size='sm'>Vacancy</FormLabel>
                        <Input type='text' size='sm' placeholder='Vacancy' onChange={e => change('vacancy', e.target.value)} />
                    </FormControl>
                    <FormControl size='sm'>
                        <FormLabel size='sm'>Attendance</FormLabel>
                        <Input type='text' size='sm' placeholder='Attendance' onChange={e => change('attendance', e.target.value)} />
                    </FormControl>

                </Grid>

            </ModalBody>

            <ModalFooter>
                <Button type='reset' variant='ghost'>Reset</Button>
                <Button type='submit'  colorScheme='blue' mr={3} >
                Add
                </Button>
            </ModalFooter>

          </form>
        </ModalContent>
      </Modal>


        <Grid mt={4} gap={4}>
            <Flex justifyContent={'space-between'} >

                <Button  onClick={save} colorScheme='green'>Save</Button>
                <Button  onClick={onOpen}> + Add</Button>
            </Flex>

            <Flex gap={8} >
                <FormControl size='sm' width={'200px'}>
                    <FormLabel size='sm'>Batch</FormLabel>
                    <Input ref={batch_ref} type='text' size='sm' placeholder='Batch' />
                </FormControl>
                <FormControl size='sm' width={'200px'}>
                    <FormLabel size='sm'>Academic Year</FormLabel>
                    <Input ref={academic_year_ref} type='text' size='sm' placeholder='Academic Year' />
                </FormControl>
                <FormControl size='sm' width={'200px'}>
                    <FormLabel size='sm'>College</FormLabel>
                    <Select size='sm' onChange={(e) => {set_isodd( e.target.value === 't' )} }>
                        <option value='t'>Odd Sem</option>
                        <option value='f'>Even Sem</option>
                    </Select>

                </FormControl>
            </Flex>
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>S.No</Th>
                            <Th>Roll no</Th>
                            <Th>Name</Th>
                            <Th>Sem</Th>
                            <Th>Branch</Th>
                            <Th>From</Th>
                            <Th>To</Th>
                            <Th>Sanctioned</Th>
                            <Th>Admitted</Th>
                            <Th>Vacancy</Th>
                            <Th>Attendance</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data.map((item, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td>{index + 1}</Td>
                                        <Td>{item.rollno}</Td>
                                        <Td>{item.name}</Td>
                                        <Td>{item.sem}</Td>
                                        <Td>{item.branch}</Td>
                                        <Td>{item.from}</Td>
                                        <Td>{item.to}</Td>
                                        <Td>{item.sanction}</Td>
                                        <Td>{item.admitted}</Td>
                                        <Td>{item.vacancy}</Td>
                                        <Td>{item.attendance}</Td>
                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </Grid>
    </Grid>
  )
}
