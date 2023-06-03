import { Button, Divider, Flex, FormControl, FormLabel, Grid, Input, Text } from '@chakra-ui/react'
import React from 'react'

export default function NameChangeForm() {
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
                            <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Course' />
                        </FormControl>
                    </Flex>

                    {/* <Divider my={1}/> */}

                    <Flex gap={12} justifyContent={'space-between'}>
                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Branch</FormLabel>
                            <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Branch' />
                        </FormControl>

                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Semester</FormLabel>
                            <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Semester' />
                        </FormControl>
                    </Flex>

                    {/* <Divider my={1}/> */}

                    <Flex gap={12} justifyContent={'space-between'}>
                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>New Name (in CAPITAL LETTERS)</FormLabel>
                            <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='New Name' />
                        </FormControl>

                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Email ID</FormLabel>
                            <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Email ID' type='email' />
                        </FormControl>
                    </Flex>

                    {/* <Divider my={1}/> */}

                    <Flex gap={12} justifyContent={'space-between'}>
                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Phone / Mobile number</FormLabel>
                            <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Phone / Mobile number' type='number' />
                        </FormControl>

                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Tamil Nadu Government Gazette Page No. (that includes the name change)</FormLabel>
                            <Input border='1px solid #cccccc50' fontSize={'14px'} size='sm' placeholder='Gazette Page No' />
                        </FormControl>
                    </Flex>

                    {/* <Divider my={1}/> */}

                    <Flex gap={12} justifyContent={'space-between'}>

                        <FormControl size='sm' isRequired>
                            <FormLabel size='sm' fontSize={'14px'}>Date of release of Gazette</FormLabel>
                            <Input fontSize={'14px'} border={'1px solid #cccccc50'} size='sm' placeholder='Date of release of Gazette' type='date'/>
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
