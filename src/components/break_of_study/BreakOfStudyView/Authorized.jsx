import { Box, Button, Grid, Link, Select, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { AttachmentIcon } from '@chakra-ui/icons'



export default function Authorized() {

  const [state, set_state] = useState([])
  const [years, set_years] = useState([new Date().getFullYear(), new Date().getFullYear() - 1])
  const [current_year, set_current_year] = useState(new Date().getFullYear())
  const toast = useToast()
  const get_years = async()=>{
    try{
      const req = await fetch(`/api/break_of_study/get_years`, {credentials: 'include'})
      const res = await req.json()
      console.log(res.data)
      if(res.success){
        set_years(res.data)

      }else{
        console.log(res.error)
        toast({
          title: 'Something went wrong',
          description: res.msg,
          status: 'info',
          isClosable: true,
        })
      }

    }catch(e){
      console.log(e)
      toast({
        title: 'Server Error',
        description: 'Please try again later',
        status: 'error',
        isClosable: true,
      })
    }
  }
  useEffect(() => {
    get_years()
    year_change(years[0])
  }, [])

  const year_change = useCallback( async(value) => {
    console.log(value);
      try{
        const req = await fetch(`/api/break_of_study/read/${value}`, {credentials: 'include'})
        const res = await req.json()

        if(res.success){
          const data = [...res.data].map(i => ({...i, year: value}))
          set_state(data)
          set_current_year(value)
        }else{
          console.log(res.error)
          toast({
            title: 'Something went wrong',
            description: res.msg,
            status: 'info',
            isClosable: true,
          })
        }
      }catch(e){
        console.log(e)
        toast({
          title: 'Server Error',
          description: 'Please try again later',
          status: 'error',
          isClosable: true,
        })
      }
    }
  )

  const change_status = async(student, status) => {
    const remarks = prompt('Enter remarks (optional)')
    try{
    const req = await fetch('/api/break_of_study/change_status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        student,
        status,
        remarks
      }),
      credentials: 'include'
    })
    const res = await req.json()
    if(res.success){
      toast({
        title: 'Success',
        description: 'Status updated',
        status: 'success',
        isClosable: true,
      })
      year_change(current_year)
    }

  }catch(e){
    console.log(e)
    toast({
      title: 'Server Error',
      description: 'Please try again later',
      status: 'error',
      isClosable: true,
    })
  }
    
  }

  return (
    <>
     <Box m={2}>
        <Stack spacing={3}>
          <Select 
            onChange={(e) => {year_change(e.target.value)}} 
            color={'black'} 
            w='80px' 
            defaultValue={years[0]} 
            size='sm'
          >
            {
              years.map((year, index) => (
                <option style={{color: 'black'}} key={index} value={year}>{year}</option>
              ))
            }
          
          </Select>
        </Stack>
      </Box>
    <Grid color='black'>
       <TableContainer 
        border={'1px solid #cccccc'} 
        py={4} 
        px={2}
        pt={0} 
        borderRadius={'5px'} 
        // maxH={600} 
        overflowY={'scroll'}
        css={{
          '&::-webkit-scrollbar': {
              backgroundColor: '#00000020',
            width: '8px',
            height: '8px'
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#00000040',
            borderRadius: '24px',
          },
        }}
      >
        <Table size={'sm'} position='relative'>
          <Thead top={0}>
            <Tr fontSize={'10px'}>
              <Th bgColor={'blue'} position='sticky' top='0' w={'1%'} color='white'>S.No</Th>
              <Th bgColor={'blue'} position='sticky' top='0' w={'10%'} color='white'>Student Name</Th>
              <Th bgColor={'blue'} position='sticky' top='0' w={'10%'} color='white'>Roll no</Th>
              <Th bgColor={'blue'} position='sticky' top='0' w={'10%'} color='white'>Course / Branch</Th>
              <Th bgColor={'blue'} position='sticky' top='0' w={'10%'} color='white'>Break of Study Sem</Th>
              <Th bgColor={'blue'} position='sticky' top='0' w={'15%'} color='white'>Break of Study From</Th>
              <Th bgColor={'blue'} position='sticky' top='0' w={'5%'} color='white'>Break of Study To</Th>
              <Th bgColor={'blue'} position='sticky' top='0' w={'5%'} color='white'>Rejoin Session</Th>
              <Th bgColor={'blue'} position='sticky' top='0' w={'9%'} color='white'>Reason</Th>
              <Th bgColor={'blue'} position='sticky' top='0' w={'10%'} color='white'>Signed <br /> Doc</Th>
              <Th bgColor={'blue'} position='sticky' top='0' w={'10%'} color='white'>Attachment <br /> File</Th>
              <Th bgColor={'blue'} position='sticky' top='0' w={'10%'} color='white'>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
              {
                state.map((i, idx) => {
                  return (
                    <Tr key={idx}>
                      <Td>{idx+1}</Td>
                      <Td>{i.name}</Td>
                      <Td>{i.roll}</Td>
                      <Td>{i.course}&nbsp;{i.branch}</Td>
                      <Td>{i.break_sem}</Td>
                      <Td>{i.break_from}</Td>
                      <Td>{i.break_to}</Td>
                      <Td>{i.rejoin_session}</Td>
                      <Td>{i.reason}</Td>

                      <Td><Link target='_blank' href={`/api/break_of_study/get_pdf?path=${i.year}/${i.reference_id}/application.pdf`}><AttachmentIcon /></Link></Td>
                        <Td><Link target='_blank' href={`/api/break_of_study/get_pdf?path=${i.year}/${i.reference_id}/attachments.pdf`}><AttachmentIcon /></Link></Td>
                        <Td display={'flex'}>
                          <Select size='sm' w='110px' borderRightRadius={'none'} defaultValue={i.status}>
                            <option style={{color: 'black'}} value={1}>File not uploaded</option>
                            <option style={{color: 'black'}} value={2}>Pending</option>
                            <option style={{color: 'black'}} value={3}>Approved</option>
                            <option style={{color: 'black'}} value={4}>Cancelled</option>
                            <option style={{color: 'black'}} value={5}>Time Exceeded</option>
                          </Select> 
                          <Button 
                            borderLeftRadius={'none'} 
                            borderRightRadius={'2px'}
                            size='sm'
                            onClick={(e) => change_status(i, e.target.previousSibling.querySelector('select').value)}
                          >Set</Button>
                        </Td>
                      </Tr>
                )
              })
            }
          </Tbody>
        </Table>
       </TableContainer>

       
    </Grid>
    </>

  )
}
