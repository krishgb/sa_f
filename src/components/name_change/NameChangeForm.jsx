import { Button, Divider, Flex, FormControl, FormLabel, Grid, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function NameChangeForm() {
    const submit = async (e)=>{
            e.preventDefault();
            try{
            const res = await fetch('http://localhost:5000/api/name_change/pdf',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({data:form})
            })
            const data = await res.json()
            console.log(data)
            const link = document.createElement('a')
            link.href = `${data.pdf}`
            link.download = 'name_change_application.pdf'
            link.target = '_blank'
            link.rel = 'noopener noreferrer'
            link.click()
            link.style.display = 'none'
            document.body.appendChild(link)
        }
            catch(err){
                console.log(err)
            }
    }
    const date = new Date();

    const [form,setForm] = useState({
        name:'',
        roll:'',
        course:'',
        branch:'',
        sem:'',
        college:'',
        new_name:'',
        gazette_no:'',
        gazette_date:'',
        email:'',
        phone:'',
        dd_no:'123456',
        dd_branch:'Anna Nagar',
        dd_bank:'SBI',
        dd_date:'2021-08-01',
        date:`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`

        
    })
  return (
    <div>

        <Grid w={'50%'} m='auto' gap={1}>
            <Text 
                fontSize={'1.2rem'} 
                color='#fff' 
                textAlign={'center'}
                my={5}
            >
                Name Change Application
            </Text>
            <form  onSubmit={submit}>

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
                            <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Name'onChange={(e)=>{setForm({...form,name:e.target.value})}} />
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
                            <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Course' onChange={(e)=>{setForm({...form,course:e.target.value})}}/>
                        </FormControl>
                    </Flex>

                    {/* <Divider my={1}/> */}

                    <Flex gap={12} justifyContent={'space-between'}>
                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Branch</FormLabel>
                            <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Branch' onChange={(e)=>{setForm({...form,branch:e.target.value})}}/>
                        </FormControl>

                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Semester</FormLabel>
                            <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Semester' onChange={(e)=>{setForm({...form,sem:e.target.value})}}/>
                        </FormControl>
                    </Flex>

                    {/* <Divider my={1}/> */}

                    <Flex gap={12} justifyContent={'space-between'}>
                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>New Name (in CAPITAL LETTERS)</FormLabel>
                            <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='New Name' onChange={(e)=>{setForm({...form,new_name:e.target.value})}}/>
                        </FormControl>

                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Email ID</FormLabel>
                            <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Email ID' type='email' onChange={(e)=>{setForm({...form,email:e.target.value})}}/>
                        </FormControl>
                    </Flex>

                    {/* <Divider my={1}/> */}

                    <Flex gap={12} justifyContent={'space-between'}>
                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Phone / Mobile number</FormLabel>
                            <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Phone / Mobile number' type='number' onChange={(e)=>{setForm({...form,phone:e.target.value})}}/>
                        </FormControl>

                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Tamil Nadu Government Gazette Page No. (that includes the name change)</FormLabel>
                            <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Gazette Page No' onChange={(e)=>{setForm({...form,gazette_no:e.target.value})}}/>
                        </FormControl>
                    </Flex>

                    {/* <Divider my={1}/> */}

                    <Flex gap={12} justifyContent={'space-between'}>

                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Date of release of Gazette</FormLabel>
                            <Input fontSize={'14px'} border={'1px solid #cccccc50'} size='sm' placeholder='Date of release of Gazette' type='date' onChange={(e)=>{setForm({...form,gazette_date:e.target.value})}}/>
                        </FormControl>

                        <Grid templateColumns={'1fr 1fr'} gap={4} width='80%' m='auto' mt={8} >
                            <Button 
                                type='reset' 
                                size='sm' 
                                backgroundColor={'white'} 
                                color='black' 
                                border='1px solid #cccccc50' 
                                fontWeight={'normal'}
                            >
                                Reset
                            </Button>
                            <Button 
                                type='submit' 
                                size='sm' 
                                colorScheme='green' 
                                // backgroundColor={'white'}
                                // border='1px solid green'
                                // color='green'
                                fontWeight={'normal'}
                               
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Flex>                
                </Grid>

            </form>
        </Grid>
    </div>
  )
}
