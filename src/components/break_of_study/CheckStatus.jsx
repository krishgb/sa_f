import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Card, CardBody, CardHeader, Flex, FormControl, FormLabel, Heading, Input, Table, TableContainer, Tbody, Thead, Tr, Th, Td } from '@chakra-ui/react'
import React, { memo, useRef, useState } from 'react'

function CheckStatus() {
  const [status, set_status] = useState('')
  const [student_details, set_student_details] = useState({
    name: 'John Doe',
    application_id: '1234567890',
    status: 'success',
    roll_no: '1234567890',
    email: 'email@email.com',
    phone: '1234567890',
    address: 'address',
    name:'Blueberry',
    course:'B. E',
    branch:'Computer Science',
    sem:'V',
    college:'Hindusthan College of Engineering',
    new_name:'Blackberry',
    gazette_page_no:'135',
    gazette_date: new Date().toLocaleDateString(),
    email:'',
    phone:'',
    dd_no:'123456',
    dd_branch:'Anna Nagar',
    dd_bank:'SBI',
    dd_date:'2021-08-01',
    date:`${(new Date).getDate()}/${(new Date).getMonth()+1}/${(new Date).getFullYear()}`
  })

  const application_id_ref = useRef(null)
  const check_status = async () => {
    const application_id = application_id_ref.current.value.trim()
    if(application_id.length === 0){
      set_status('error')
      return
    }

    set_status('loading')

    try {
      const req = await fetch('/api/break_of_study/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ application_id })
      ,credentials: 'include'})
      const res = await req.json()
      if(res.success){
        set_student_details(res.data)
        set_status(res.status)
      }else{
        set_status('error')
      }
    }catch(e){
      console.log(e);
    }
  }



  return (
    <>
      <FormControl>
        <FormLabel color='black'>Application ID</FormLabel>
        <Flex gap={3} mb={5}>
          <Input maxW='300px' ref={application_id_ref} type='text' size='sm' border={'1px solid #cccccc50'} placeholder='Enter your application ID' color='black' />
          <Button colorScheme='blue' size='sm' borderRadius={'2px'}  onClick={check_status}>Check</Button>
        </Flex>
      </FormControl>

      {
        status === 'error' && 
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Application ID</AlertTitle>
          <AlertDescription>not found </AlertDescription>
        </Alert>
      }


    {
        status === 'loading' && 
        <Alert status='loading'>
          <AlertIcon />
          <AlertTitle>Checking your application status...</AlertTitle>
        </Alert>
      }

      <Box>
        {
          status === 'pending' &&
          <>
            <Alert status='info'>
              <AlertIcon />
              <AlertTitle>Your application is being reviewed.</AlertTitle>
            </Alert>
          </>
        }
         {
          status === 'file not uploaded' &&
          <>
            <Alert status='info'>
              <AlertIcon />
              <AlertTitle>Please upload your files</AlertTitle>
            </Alert>
          </>
        }

        {
          status === 'cancelled' &&
          <>
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>Your application is cancelled.</AlertTitle>
            </Alert>
          </>
        }

        {
          status === 'approved' &&
          <>
            <Alert status='success'>
              <AlertIcon />
              <AlertTitle>Your application is accepted.</AlertTitle>
            </Alert>
          </>
        }

        {
          (status === 'approved' || status === 'pending' || status === 'cancelled' || status ==='file not uploaded') && 
          // <Box mt={6}>
            <Card
              size='md' 
              maxW='800px' 
              m='auto' 
              mt={4} 
              alignItems={'center'}
              >
              <CardHeader>
                <Heading size='md'>Student Details</Heading>
              </CardHeader>
              <CardBody>
                <TableContainer>
                  <Table colorScheme='blue' variant={'striped'}>
                    <Tbody>
                      <Tr>
                        <Td>Name</Td>
                        <Td>{student_details.name}</Td>
                      </Tr>


                      <Tr>
                        <Td>Roll no</Td>
                        <Td>{student_details.roll}</Td>
                      </Tr>

                      <Tr>
                        <Td>Application ID</Td>
                        <Td>{student_details.reference_id}</Td>
                      </Tr>

                      <Tr>
                        <Td>Course & Branch</Td>
                        <Td>{student_details.course}.&nbsp;&nbsp;{student_details.branch}</Td>
                      </Tr>

                      <Tr>
                        <Td>Break of Study Semester</Td>
                        <Td>{student_details.break_sem}</Td>
                      </Tr>


                      <Tr>
                        <Td>Break of Study From</Td>
                        <Td>{student_details.break_from}</Td>
                      </Tr>

                      <Tr>
                        <Td>Break of Study To</Td>
                        <Td>{student_details.break_to}</Td>
                      </Tr>

                      <Tr>
                        <Td>Rejoin Session</Td>
                        <Td>{student_details.rejoin_session}</Td>
                      </Tr>

                      <Tr>
                        <Td>Rejoin Year</Td>
                        <Td>{student_details.rejoin_year}</Td>
                      </Tr>

                      <Tr>
                        <Td>Reason</Td>
                        <Td>{student_details.reason}</Td>
                      </Tr>

                      <Tr>
                        <Td>Address</Td>
                        <Td>{student_details.address}</Td>
                      </Tr>

                      <Tr>
                        <Td>Submitted Date</Td>
                        <Td>{student_details.date}</Td>
                      </Tr>

                    </Tbody>
                  </Table>
                </TableContainer>
              </CardBody>
            </Card>
          // </Box>
        }
      </Box>
    </>
  )
}

export default memo(CheckStatus)
