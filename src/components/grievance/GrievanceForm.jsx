import { Button, Divider, Flex, FormControl, FormLabel, Grid, Input, Select, Text, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function NameChangeForm() {
    const [greivance_type, set_greivance_type] = useState('academic')


  return (
    <>

        <Grid w={'50%'} m='auto' gap={1}>
            <Text 
                fontSize={'1.2rem'} 
                color='#fff' 
                textAlign={'center'}
                // my={2}
            >
                Grievance Application
            </Text>
            <form>

                <Grid 
                    gap={'2rem'} 
                    m={'auto'} 
                    alignItems={'end'} 
                    p={3} 
                    border={'1px solid #cccccc50'}
                    // boxShadow={'0 0 10px rgba(0, 0, 0, 0.1)'}
                    borderRadius={'5px'}
                    // backgroundColor={'yellow.300'}
                    color='white'
                >
                    <Flex gap={12} justifyContent={'space-between'}>
                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Name</FormLabel>
                            <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Name' />
                        </FormControl>

                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Roll / Register number</FormLabel>
                            <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Roll / Register number' />
                        </FormControl>
                    </Flex>

                    {/* <Divider my={1}/> */}

                    <Flex gap={12} justifyContent={'space-between'}>
                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Institution Name</FormLabel>
                            <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Institution Name' />
                        </FormControl>

                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Course</FormLabel>
                            <Grid size='sm' templateColumns={'.2fr .8fr'}>
                                <Select size={'sm'} border={'1px solid #cccccc50'}>
                                    <option style={{color: 'black'}} value="UG">UG</option>
                                    <option style={{color: 'black'}} value="PG">PG</option>
                                </Select>
                                <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Course' />
                            </Grid>
                        </FormControl>
                    </Flex>

                    {/* <Divider my={1}/> */}

                    <Flex gap={12} justifyContent={'space-between'}>
                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Branch</FormLabel>
                            <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Branch' />
                        </FormControl>

                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Semester & Mode of Study</FormLabel>
                            <Grid templateColumns={'.5fr .5fr'}>
                                <Select size='sm' border='1px solid #cccccc50'>
                                    <option style={{color: 'black'}} value="1">1</option>
                                    <option style={{color: 'black'}} value="2">2</option>
                                    <option style={{color: 'black'}} value="3">3</option>
                                    <option style={{color: 'black'}} value="4">4</option>
                                    <option style={{color: 'black'}} value="5">5</option>
                                    <option style={{color: 'black'}} value="6">6</option>
                                    <option style={{color: 'black'}} value="7">7</option>
                                    <option style={{color: 'black'}} value="8">8</option>
                                </Select>
                                <Select size='sm' border='1px solid #cccccc50'>
                                    <option style={{color: 'black'}} value="regular">Full Time Regular</option>
                                    <option style={{color: 'black'}} value="ss">Full Time SS</option>
                                    <option style={{color: 'black'}} value="part_time">Part time</option>
                                </Select>
                            </Grid>
                        </FormControl>
                    </Flex>

                    {/* <Divider my={1}/> */}

                    <Flex gap={12} justifyContent={'space-between'}>
                        <FormControl size='sm' isRequired>
                            

                                <FormLabel size='sm' fontSize={'14px'}>Grievance Type</FormLabel>
                                {/* <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='New Name' /> */}
                                <Select size='sm' border='1px solid #cccccc50' onChange={e => {set_greivance_type(e.target.value)}}>
                                    <option style={{color: 'black'}} value="academic">Academic</option>
                                    <option style={{color: 'black'}} value="non_academic">Non Academic</option>
                                </Select>
                        </FormControl>

                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Related To</FormLabel>
                            {/* <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Email ID' type='email' /> */}
                            <Select size='sm' border='1px solid #cccccc50'>
                                {
                                    greivance_type === 'academic' ?
                                    <>
                                        <option style={{color: 'black'}}> Related to theory and practical classes</option>
                                        <option style={{color: 'black'}}> Related to Internal assessment</option>
                                        <option style={{color: 'black'}}> Related to appearance of semester examinations</option>
                                        <option style={{color: 'black'}}> Related to prevention of students to attend the class</option>
                                        <option style={{color: 'black'}}> Related to Academic schedule</option>
                                        <option style={{color: 'black'}}> Related to special classes</option>
                                    </>
                                    : 
                                    <>
                                        <option style={{color: 'black'}}>Related to return of certificates.</option>
                                        <option style={{color: 'black'}}>Related to basic facilities in the college and hostel</option>
                                        <option style={{color: 'black'}}>Related to laboratory facilities</option>
                                        <option style={{color: 'black'}}>Related to quality of food in the hostel</option>
                                        <option style={{color: 'black'}}>Related to caution deposit</option>
                                        <option style={{color: 'black'}}>Related to Extracurricular and co-curricular activities</option>
                                        <option style={{color: 'black'}}>Related to medical and transport facilities</option>
                                        <option style={{color: 'black'}}>Related to code of conduct</option>
                                        <option style={{color: 'black'}}>Related to Issue of transfer certificate</option>
                                        <option style={{color: 'black'}}>Related to impose of fine</option>
                                        <option style={{color: 'black'}}>Related to Ragging</option>
                                        <option style={{color: 'black'}}>Related to Harassment of students by faculty / staff members / fellow students</option>
                                        <option style={{color: 'black'}}>Related to indisciplinary activities of the students / staff members</option>
                                    </>
                                }
                            </Select>
                        </FormControl>
                    </Flex>

                    {/* <Divider my={1}/> */}

                    <Flex gap={12} justifyContent={'space-between'}>
                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Address</FormLabel>
                            <Textarea border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Address' />
                        </FormControl>

                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Grievance</FormLabel>
                            <Textarea border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Grievance' />
                        </FormControl>
                    </Flex>

                    {/* <Divider my={1}/> */}

                    <Flex gap={12} placeItems={'center'} m='auto'>

                        {/* <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Date of release of Gazette</FormLabel>
                            <Input fontSize={'14px'} border={'1px solid #cccccc50'} size='sm' placeholder='Date of release of Gazette' type='date'/>
                        </FormControl> */}

                        {/* <Grid templateColumns={'1fr 1fr'} gap={4} width='80%' m='auto' mt={8} > */}
                            <Button 
                                type='reset' 
                                size='sm'
                                width='200px' 
                                backgroundColor={'transparent'} 
                                color='red' 
                                border='1px solid red' 
                                fontWeight={'normal'}
                                _hover={{backgroundColor: 'red', color: 'white' }}
                            >
                                Reset
                            </Button>
                            <Button 
                                type='submit' 
                                size='sm'
                                width='200px' 
                                // colorScheme='green' 
                                backgroundColor={'transparent'}
                                border='1px solid lightgreen'
                                color='lightgreen'
                                fontWeight={'normal'}
                                _hover={{backgroundColor: 'lightgreen', color: 'black'}}
                            >
                                Submit
                            </Button>
                        {/* </Grid> */}
                    </Flex>                
                </Grid>

            </form>
        </Grid>
    </>
  )
}
