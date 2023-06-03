import { Button, Divider, Flex, FormControl, FormLabel, Grid, HStack, Input, PinInput, PinInputField, Radio, RadioGroup, Select, Switch, Textarea } from '@chakra-ui/react'
import React from 'react'

export default function Reason() {
    return (
        <Grid
            gap={'2.5'}
            margin='auto'
            width={'80%'}
            p={5}
            border={'1px solid #cccccc50'}
            borderRadius={'5px'}
            boxShadow={'0 0 10px rgba(0, 0, 0, 0.1)'}
            color={'white'}
        >
            <Grid>
                <FormControl isRequired>
                    <Flex gap={6}>
                        <FormLabel width={'70%'} fontSize={'14px'}>Details of prevention due to lack of attendance (if any) during the course of study till the date of application for Break of Study</FormLabel>
                        <RadioGroup size='sm'>
                            <HStack>
                                <Radio border='1px solid #cccccc50' value="yes">Yes</Radio>
                                <Radio border='1px solid #cccccc50' value="no">No</Radio>
                            </HStack>
                        </RadioGroup>
                    </Flex>
                </FormControl>

                <Flex gap={6} alignItems={'end'}>
                    <Input border='1px solid #cccccc50' size='sm' placeholder='Semester' />
                    <FormControl>
                        <FormLabel size='sm' fontSize={'14px'}>From</FormLabel>
                        <MonthYear />
                    </FormControl>
                    <FormControl>
                        <FormLabel size='sm' fontSize={'14px'}>To</FormLabel>
                        <MonthYear />
                    </FormControl>
                </Flex>
            </Grid>

            {/* <Divider my={2} /> */}

            <FormControl size='sm'>
                <FormLabel size='sm' fontSize={'14px'} >Reason for Break of Study</FormLabel>
                <Textarea size='sm' fontSize='14px' border='1px solid #cccccc50' placeholder='Reason for Break of Study' />
            </FormControl>

            {/* <Divider my={2} /> */}

            <Grid>

                <FormControl size={'sm'}>
                    <FormLabel fontSize={'14px'} size='sm'>Full address for communication during the time of break of study</FormLabel>
                </FormControl>
                <Grid templateColumns={'1fr 1fr'} gap={6}>
                    <FormControl isRequired>
                        <FormLabel fontSize={'13px'}>Door No.</FormLabel>
                        <Input border='1px solid #cccccc50' size='sm' fontSize={'14px'} placeholder='Door no.' />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel fontSize={'13px'}>Street</FormLabel>
                        <Input border='1px solid #cccccc50' size='sm' fontSize={'14px'} placeholder='Street' />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel fontSize={'13px'}>City</FormLabel>
                        <Input border='1px solid #cccccc50' size='sm' fontSize={'14px'} placeholder='City' />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel fontSize={'13px'}>State</FormLabel>
                        <Input border='1px solid #cccccc50' size='sm' fontSize={'14px'} placeholder='State' />
                    </FormControl>

                    <FormControl isRequired >
                        <div>

                            <FormLabel fontSize={'14px'} >Pincode</FormLabel>
                            <HStack>
                                <PinInput size='sm' otp>
                                    <PinInputField border='1px solid #cccccc50' />
                                    <PinInputField border='1px solid #cccccc50' />
                                    <PinInputField border='1px solid #cccccc50' />
                                    <PinInputField border='1px solid #cccccc50' />
                                    <PinInputField border='1px solid #cccccc50' />
                                    <PinInputField border='1px solid #cccccc50' />
                                </PinInput>
                            </HStack>
                        </div>
                    </FormControl>
                    <Button colorScheme='green' mt={6}>Submit</Button>
                </Grid>
            </Grid>

        </Grid>
    )
}

function MonthYear() {
    return (
        <HStack>
            <PinInput otp size={'sm'} placeholder="M">
                <PinInputField border='1px solid #cccccc50' placeholder="M" />
                <PinInputField border='1px solid #cccccc50' placeholder="M" />
            </PinInput>
            <Input border='1px solid #cccccc50' color='white' size='sm' fontSize={'14px'} readOnly value='/' width='30px' />
            <PinInput otp size={'sm'} placeholder="Y">
                <PinInputField size={'sm'} border='1px solid #cccccc50' placeholder="Y" />
                <PinInputField border='1px solid #cccccc50' placeholder="Y" />
                <PinInputField border='1px solid #cccccc50' placeholder="Y" />
                <PinInputField border='1px solid #cccccc50' placeholder="Y" />
            </PinInput>
        </HStack>
    )
}
