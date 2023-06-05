import { Button, Divider, Flex, FormControl, FormLabel, Grid, Input, Select, Text, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import { async } from 'regenerator-runtime'

export default function NameChangeForm() {
   
    const [form, setForm] = useState({
        name: '',
        roll: '',
        college: '',
        programme: 'UG',
        course: '',
        branch: '',
        sem: '1',
        mode:'regular',
        grievance_type:'academic',
        related_to: 'Related to Internal assesment',
        address: '',
        grievance: '',

    })
    const submit = async(e) => {
        e.preventDefault()
        const url = import.meta.env.VITE_REACT_APP_SERVER_URL + 'grievance'   

        const req = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data:form})
        })
        
    }

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
            <form onSubmit={submit}>

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
                            <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Name' onChange={(e)=>{setForm({...form,name:e.target.value})}}/>
                        </FormControl>

                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Roll / Register number</FormLabel>
                            <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Roll / Register number' onChange={(e)=>{setForm({...form,roll:e.target.value})}}/>
                        </FormControl>
                    </Flex>

                    {/* <Divider my={1}/> */}

                    <Flex gap={12} justifyContent={'space-between'}>
                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Institution Name</FormLabel>
                            <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Institution Name' onChange={(e)=>{setForm({...form,college:e.target.value})}}/>
                        </FormControl>

                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Course</FormLabel>
                            <Grid size='sm' templateColumns={'.2fr .8fr'}>
                                <Select size={'sm'} border={'1px solid #cccccc50'} onChange={(e)=>{setForm({...form,programme:e.target.value})}}>
                                    <option style={{color: 'black'}} value="UG">UG</option>
                                    <option style={{color: 'black'}} value="PG">PG</option>
                                </Select>
                                <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Course' onChange={(e)=>{setForm({...form,course:e.target.value})}}/>
                            </Grid>
                        </FormControl>
                    </Flex>

                    {/* <Divider my={1}/> */}

                    <Flex gap={12} justifyContent={'space-between'}>
                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Branch</FormLabel>
                            <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Branch' onChange={(e)=>{setForm({...form,branch:e.target.value})}}/>
                        </FormControl>

                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Semester & Mode of Study</FormLabel>
                            <Grid templateColumns={'.5fr .5fr'}>
                                <Select size='sm' border='1px solid #cccccc50' onChange={(e)=>{setForm({...form,sem:e.target.value})}}>
                                    <option style={{color: 'black'}} value="1">1</option>
                                    <option style={{color: 'black'}} value="2">2</option>
                                    <option style={{color: 'black'}} value="3">3</option>
                                    <option style={{color: 'black'}} value="4">4</option>
                                    <option style={{color: 'black'}} value="5">5</option>
                                    <option style={{color: 'black'}} value="6">6</option>
                                    <option style={{color: 'black'}} value="7">7</option>
                                    <option style={{color: 'black'}} value="8">8</option>
                                </Select>
                                <Select size='sm' border='1px solid #cccccc50' onChange={(e)=>{setForm({...form,mode:e.target.value})}}>
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
                                <Select size='sm' border='1px solid #cccccc50' onChange={(e)=>{setForm({...form,grievance_type:e.target.value})}}>
                                    <option style={{color: 'black'}} value="academic">Academic</option>
                                    <option style={{color: 'black'}} value="non_academic">Non Academic</option>
                                </Select>
                        </FormControl>

                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Related To</FormLabel>
                            {/* <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Email ID' type='email' /> */}
                            <Select size='sm' border='1px solid #cccccc50' onChange={(e)=>{setForm({...form,related_to:e.target.value})}}>
                                {
                                    form.grievance_type === 'academic' ?
                                    <>
                                        <option style={{color: 'black'}} value="Related to Internal assesment"> Related to Internal assessment</option>
                                        <option style={{color: 'black'}} value="Related to theory and practical classes"> Related to theory and practical classes</option>
                                        <option style={{color: 'black'}} value="Related to appearance of semester examinations"> Related to appearance of semester examinations</option>
                                        <option style={{color: 'black'}} value="Related to prevention of students to attend the class"> Related to prevention of students to attend the class</option>
                                        <option style={{color: 'black'}} value="Related to Academic schedule"> Related to Academic schedule</option>
                                        <option style={{color: 'black'}} value="Related to special classes"> Related to special classes</option>
                                    </>
                                    : 
                                    <>
                                        <option style={{color: 'black'}} value="Related to return of certificates.">Related to return of certificates.</option>
                                        <option style={{color: 'black'}} value="Related to basic facilities in the college and hostel">Related to basic facilities in the college and hostel</option>
                                        <option style={{color: 'black'}} value="Related to laboratory facilities">Related to laboratory facilities</option>
                                        <option style={{color: 'black'}} value="Related to quality of food in the hostel">Related to quality of food in the hostel</option>
                                        <option style={{color: 'black'}} value="Related to caution deposit">Related to caution deposit</option>
                                        <option style={{color: 'black'}} value="Related to Extracurricular and co-curricular activities">Related to Extracurricular and co-curricular activities</option>
                                        <option style={{color: 'black'}} value="Related to medical and transport facilities">Related to medical and transport facilities</option>
                                        <option style={{color: 'black'}} value="Related to code of conduct">Related to code of conduct</option>
                                        <option style={{color: 'black'}} value="Related to Issue of transfer certificate">Related to Issue of transfer certificate</option>
                                        <option style={{color: 'black'}} value="Related to impose of fine">Related to impose of fine</option>
                                        <option style={{color: 'black'}} value="Related to Ragging">Related to Ragging</option>
                                        <option style={{color: 'black'}} value="Related to Harassment of students by faculty / staff members / fellow students">Related to Harassment of students by faculty / staff members / fellow students</option>
                                        <option style={{color: 'black'}} value="Related to indisciplinary activities of the students / staff members">Related to indisciplinary activities of the students / staff members</option>
                                    </>
                                }
                            </Select>
                        </FormControl>
                    </Flex>

                    {/* <Divider my={1}/> */}

                    <Flex gap={12} justifyContent={'space-between'}>
                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Address</FormLabel>
                            <Textarea border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Address' onChange={(e)=>{setForm({...form,address:e.target.value})}}/>
                        </FormControl>

                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Grievance</FormLabel>
                            <Textarea border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Grievance' onChange={(e)=>{setForm({...form,grievance:e.target.value})}}/>
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
