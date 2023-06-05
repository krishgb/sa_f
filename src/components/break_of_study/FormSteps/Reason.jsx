import { Button, Divider, Flex, FormControl, FormLabel, Grid, HStack, Input, PinInput, PinInputField, Radio, RadioGroup, Select, Switch, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useBreakOfStudy } from "../context";

export default function Reason() {
    const {set_data, submit, entries } = useBreakOfStudy()
    const [lack,setLack] = useState(false)

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
                        <RadioGroup size='sm' onChange={(e)=>{set_data('lack_of_attendance_break_of_study',e)}}>
                            <HStack>
                                <Radio border='1px solid #cccccc50' value="yes">Yes</Radio>
                                <Radio border='1px solid #cccccc50' value="no">No</Radio>
                            </HStack>
                        </RadioGroup>
                    </Flex>
                </FormControl>

                {
                    entries.lack_of_attendance_break_of_study === 'yes' ?
                    <Flex gap={6} alignItems={'end'}>
                    <Input border='1px solid #cccccc50' size='sm' placeholder='Semester' onChange={(e)=>{set_data('lack_of_attendance_break_of_study_sem',e.target.value)}}/>
                    <FormControl>
                        <FormLabel size='sm' fontSize={'14px'}>From</FormLabel>
                            <HStack>
                                <PinInput otp size={'sm'} placeholder="M" onChange={(e)=>{set_data('lack_of_attendance_from_month',e)}}>
                                    <PinInputField border='1px solid #cccccc50' placeholder="M" />
                                    <PinInputField border='1px solid #cccccc50' placeholder="M" />
                                </PinInput>
                                <Input border='1px solid #cccccc50' color='white' size='sm' fontSize={'14px'} readOnly value='/' width='30px' />
                                <PinInput otp size={'sm'} placeholder="Y" onChange={(e)=>{set_data('lack_of_attendance_from_year',e)}}>
                                    <PinInputField size={'sm'} border='1px solid #cccccc50' placeholder="Y" />
                                    <PinInputField border='1px solid #cccccc50' placeholder="Y" />
                                    <PinInputField border='1px solid #cccccc50' placeholder="Y" />
                                    <PinInputField border='1px solid #cccccc50' placeholder="Y" />
                                </PinInput>
                            </HStack>
                    </FormControl>
                    <FormControl>
                        <FormLabel size='sm' fontSize={'14px'}>To</FormLabel>
                            <HStack>
                                <PinInput otp size={'sm'} placeholder="M" onChange={(e)=>{set_data('lack_of_attendance_to_month',e)}}>
                                    <PinInputField border='1px solid #cccccc50' placeholder="M" />
                                    <PinInputField border='1px solid #cccccc50' placeholder="M" />
                                </PinInput>
                                <Input border='1px solid #cccccc50' color='white' size='sm' fontSize={'14px'} readOnly value='/' width='30px' />
                                <PinInput otp size={'sm'} placeholder="Y" onChange={(e)=>{set_data('lack_of_attendance_to_year',e)}}>
                                    <PinInputField size={'sm'} border='1px solid #cccccc50' placeholder="Y" />
                                    <PinInputField border='1px solid #cccccc50' placeholder="Y" />
                                    <PinInputField border='1px solid #cccccc50' placeholder="Y" />
                                    <PinInputField border='1px solid #cccccc50' placeholder="Y" />
                                </PinInput>
                            </HStack>
                    </FormControl>
                    </Flex>
                    :
                    <></>
                }
            </Grid>

            {/* <Divider my={2} /> */}

            <FormControl size='sm'>
                <FormLabel size='sm' fontSize={'14px'} >Reason for Break of Study</FormLabel>
                <Textarea size='sm' fontSize='14px' border='1px solid #cccccc50' placeholder='Reason for Break of Study' onChange={(e)=>{set_data('reason',e.target.value)}}/>
            </FormControl>

            {/* <Divider my={2} /> */}

            <Grid>

                <FormControl size={'sm'}>
                    <FormLabel fontSize={'14px'} size='sm'>Full address for communication during the time of break of study</FormLabel>
                </FormControl>
                <Grid templateColumns={'1fr 1fr'} gap={6}>
                    <FormControl isRequired>
                        <FormLabel fontSize={'13px'}>Door No.</FormLabel>
                        <Input border='1px solid #cccccc50' size='sm' fontSize={'14px'} placeholder='Door no.' onChange={(e)=>{set_data('door_no',e.target.value)}}/>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel fontSize={'13px'}>Street</FormLabel>
                        <Input border='1px solid #cccccc50' size='sm' fontSize={'14px'} placeholder='Street' onChange={(e)=>{set_data('street',e.target.value)}}/>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel fontSize={'13px'}>City</FormLabel>
                        <Input border='1px solid #cccccc50' size='sm' fontSize={'14px'} placeholder='City' onChange={(e)=>{set_data('city',e.target.value)}}/>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel fontSize={'13px'}>State</FormLabel>
                        <Input border='1px solid #cccccc50' size='sm' fontSize={'14px'} placeholder='State' onChange={(e)=>{set_data('state',e.target.value)}}/>
                    </FormControl>

                    <FormControl isRequired >
                        <div>

                            <FormLabel fontSize={'14px'} >Pincode</FormLabel>
                            <HStack>
                                <PinInput size='sm' otp onChange={(e)=>{set_data('pincode',e)}}>
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
                    <Button colorScheme='green' onClick={submit} mt={6}>Submit</Button>
                </Grid>
            </Grid>

        </Grid>
    )
}

