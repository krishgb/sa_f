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
      const req = await fetch('/api/grievance/status', {
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
        <FormLabel color='white'>Application ID</FormLabel>
        <Flex gap={3} mb={5}>
          <Input maxW='300px' ref={application_id_ref} type='text' size='sm' border={'1px solid #cccccc50'} placeholder='Enter your application ID' color='white' />
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
          status === 'closed' &&
          <>
            <Alert status='success'>
              <AlertIcon />
              <AlertTitle>Your application is closed.</AlertTitle>
            </Alert>
          </>
        }

        {
          (status === 'closed' || status === 'pending' ) && 
          // <Box mt={6}>
            <Card
              size='sm' 
              maxW='700px' 
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
                        <Td>Semester</Td>
                        <Td>{student_details.sem}</Td>
                      </Tr>

                      <Tr>
                        <Td>College</Td>
                        <Td>{student_details.college}</Td>
                      </Tr>


                      <Tr>
                        <Td>Grievance Type</Td>
                        <Td>{student_details.grievance_type}</Td>
                      </Tr>

                      <Tr>
                        <Td>Related to</Td>
                        <Td>{student_details.related_to}</Td>
                      </Tr>

                      <Tr>
                        <Td>Grievance</Td>
                        <Td>{student_details.grievance}</Td>
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
