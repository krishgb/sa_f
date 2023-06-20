import { Box, Button, Grid, Link, Select, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { AttachmentIcon } from '@chakra-ui/icons'


// const rows = [
//   {id: '15576565480', student_name: 'Rinesh', new_name: 'Suburaman', roll_no: '102345698', institution: 'Sathya Bama', course: 'B.Sc', branch: 'Physics', sem: 5, gazette_page_no: '5689', date_of_gazette_release: '15/02/2023', signed_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', gazette_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', status: 'approved'},
//   {id: '15576565480', student_name: 'Rinesh', new_name: 'Suburaman', roll_no: '102345698', institution: 'Sathya Bama', course: 'B.Sc', branch: 'Physics', sem: 5, gazette_page_no: '5689', date_of_gazette_release: '15/02/2023', signed_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', gazette_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', status: 'pending'},
//   {id: '15576565480', student_name: 'Rinesh', new_name: 'Suburaman', roll_no: '102345698', institution: 'Sathya Bama', course: 'B.Sc', branch: 'Physics', sem: 5, gazette_page_no: '5689', date_of_gazette_release: '15/02/2023', signed_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', gazette_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', status: 'cancelled'},
//   {id: '15576565480', student_name: 'Rinesh', new_name: 'Suburaman', roll_no: '102345698', institution: 'Sathya Bama', course: 'B.Sc', branch: 'Physics', sem: 5, gazette_page_no: '5689', date_of_gazette_release: '15/02/2023', signed_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', gazette_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', status: 'approved'},
//   {id: '15576565480', student_name: 'Rinesh', new_name: 'Suburaman', roll_no: '102345698', institution: 'Sathya Bama', course: 'B.Sc', branch: 'Physics', sem: 5, gazette_page_no: '5689', date_of_gazette_release: '15/02/2023', signed_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', gazette_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', status: 'approved'},
//   {id: '15576565480', student_name: 'Rinesh', new_name: 'Suburaman', roll_no: '102345698', institution: 'Sathya Bama', course: 'B.Sc', branch: 'Physics', sem: 5, gazette_page_no: '5689', date_of_gazette_release: '15/02/2023', signed_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', gazette_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', status: 'approved'},
//   {id: '15576565480', student_name: 'Rinesh', new_name: 'Suburaman', roll_no: '102345698', institution: 'Sathya Bama', course: 'B.Sc', branch: 'Physics', sem: 5, gazette_page_no: '5689', date_of_gazette_release: '15/02/2023', signed_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', gazette_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', status: 'approved'},
//   {id: '15576565480', student_name: 'Rinesh', new_name: 'Suburaman', roll_no: '102345698', institution: 'Sathya Bama', course: 'B.Sc', branch: 'Physics', sem: 5, gazette_page_no: '5689', date_of_gazette_release: '15/02/2023', signed_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', gazette_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', status: 'approved'},
//   {id: '15576565480', student_name: 'Rinesh', new_name: 'Suburaman', roll_no: '102345698', institution: 'Sathya Bama', course: 'B.Sc', branch: 'Physics', sem: 5, gazette_page_no: '5689', date_of_gazette_release: '15/02/2023', signed_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', gazette_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', status: 'approved'},
//   {id: '15576565480', student_name: 'Rinesh', new_name: 'Suburaman', roll_no: '102345698', institution: 'Sathya Bama', course: 'B.Sc', branch: 'Physics', sem: 5, gazette_page_no: '5689', date_of_gazette_release: '15/02/2023', signed_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', gazette_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', status: 'approved'},
//   {id: '15576565480', student_name: 'Rinesh', new_name: 'Suburaman', roll_no: '102345698', institution: 'Sathya Bama', course: 'B.Sc', branch: 'Physics', sem: 5, gazette_page_no: '5689', date_of_gazette_release: '15/02/2023', signed_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', gazette_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', status: 'approved'},
//   {id: '15576565480', student_name: 'Rinesh', new_name: 'Suburaman', roll_no: '102345698', institution: 'Sathya Bama', course: 'B.Sc', branch: 'Physics', sem: 5, gazette_page_no: '5689', date_of_gazette_release: '15/02/2023', signed_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', gazette_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', status: 'pending'},
//   {id: '15576565480', student_name: 'Rinesh', new_name: 'Suburaman', roll_no: '102345698', institution: 'Sathya Bama', course: 'B.Sc', branch: 'Physics', sem: 5, gazette_page_no: '5689', date_of_gazette_release: '15/02/2023', signed_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', gazette_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', status: 'cancelled'},
//   {id: '15576565480', student_name: 'Rinesh', new_name: 'Suburaman', roll_no: '102345698', institution: 'Sathya Bama', course: 'B.Sc', branch: 'Physics', sem: 5, gazette_page_no: '5689', date_of_gazette_release: '15/02/2023', signed_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', gazette_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', status: 'approved'},
//   {id: '15576565480', student_name: 'Rinesh', new_name: 'Suburaman', roll_no: '102345698', institution: 'Sathya Bama', course: 'B.Sc', branch: 'Physics', sem: 5, gazette_page_no: '5689', date_of_gazette_release: '15/02/2023', signed_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', gazette_doc: 'https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf', status: 'approved'},
// ]



export default function Authorized() {
  const [state, set_state] = useState([])
  const [years, set_years] = useState([new Date().getFullYear(), new Date().getFullYear() - 1])
  const [current_year, set_current_year] = useState(new Date().getFullYear())
  const toast = useToast()
  const get_years = async()=>{
    try{
      const req = await fetch(`/api/grievance/get_years`, {credentials: 'include'})
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
        const req = await fetch(`/api/grievance/read/${value}`, {credentials: 'include'})
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
    const req = await fetch(`/api/grievance/change_status`, {
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
            color={'white'} 
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
      <Grid color='white'>
        <TableContainer 
          border={'1px solid #cccccc50'} 
          py={4} 
          px={2}
          pt={0} 
          borderRadius={'5px'} 
          maxH={600} 
          overflowY={'scroll'}
          css={{
            '&::-webkit-scrollbar': {
                backgroundColor: '#cccccc10',
              width: '8px',
              height: '8px'
            },
            '&::-webkit-scrollbar-track': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#cccccc50',
              borderRadius: '24px',
            },
          }}
        >
          <Table size={'sm'} position='relative'>
            <Thead top={0}>
              <Tr fontSize={'10px'}>
                <Th bgColor={'blue'} position='sticky' top='0' w={'1%'} color='white' zIndex={'100'}>S.No</Th>
                <Th bgColor={'blue'} position='sticky' top='0' w={'10%'} color='white' zIndex={'100'}>Student Name</Th>
                <Th bgColor={'blue'} position='sticky' top='0' w={'10%'} color='white' zIndex={'100'}>Roll no</Th>
                <Th bgColor={'blue'} position='sticky' top='0' w={'15%'} color='white' zIndex={'100'}>Institution</Th>
                <Th bgColor={'blue'} position='sticky' top='0' w={'10%'} color='white' zIndex={'100'}>Course / Branch</Th>
                <Th bgColor={'blue'} position='sticky' top='0' w={'5%'} color='white' zIndex={'100'}>Semester</Th>
                <Th bgColor={'blue'} position='sticky' top='0' w={'5%'} color='white' zIndex={'100'}>Mode</Th>
                <Th bgColor={'blue'} position='sticky' top='0' w={'9%'} color='white' zIndex={'100'}>Grievance Type</Th>
                <Th bgColor={'blue'} position='sticky' top='0' w={'10%'} color='white' zIndex={'100'}>Related To</Th>
                <Th bgColor={'blue'} position='sticky' top='0' w={'10%'} color='white' zIndex={'100'}>Grievance</Th>
                <Th bgColor={'blue'} position='sticky' top='0' w={'10%'} color='white' zIndex={'100'}>Attachments</Th>

                <Th bgColor={'blue'} position='sticky' top='0' w={'10%'} color='white' zIndex={'100'}>Status</Th>
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
                        <Td>{i.college}</Td>
                        <Td>{i.course}&nbsp;{i.branch}</Td>
                        <Td>{i.sem}</Td>
                        <Td>{i.mode}</Td>
                        <Td>{i.grievance_type}</Td>
                        <Td>{i.related_to}</Td>
                        <Td>{i.grievance}</Td>

                        {i.attachments!==''&&<Td><Link target='_blank' href={`/api/grievance/get_pdf?path=${i.year}/${i.reference_id}/attachments.pdf`}><AttachmentIcon /></Link></Td>}
                        <Td display={'flex'}>
                          <Select size='sm' w='110px' borderRightRadius={'none'} defaultValue={i.status_id}>
                            <option style={{color: 'black'}} value={1}>Pending</option>
                            <option style={{color: 'black'}} value={2}>Closed</option>
                          
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
