import { Divider, Flex, FormControl, FormLabel, Grid, HStack, Input, PinInput, PinInputField, Radio, RadioGroup, Select, Switch } from '@chakra-ui/react'
import React from 'react'

export default function BreakOfStudyDetails() {
    return (
        <Grid
            gap={3}
            margin='auto'
            width={'80%'}
            p={5}
            border={'1px solid #cccccc50'}
            borderRadius={'5px'}
            boxShadow={'0 0 10px rgba(0, 0, 0, 0.1)'}
        // backgroundColor={'black'}
        color='white'
        >
            <FormControl isRequired>
                <FormLabel size='sm' fontSize={'14px'}>Semester, Duration & Period for which the Break of study is sought for</FormLabel>
                <Flex gap={6}>
                    <Input border='1px solid #cccccc50' size='sm' placeholder='Semester' />
                    <Input border='1px solid #cccccc50' size='sm' placeholder='Duration in months' />
                </Flex>
            </FormControl>

            <Flex gap={6}>

                <FormControl isRequired>
                    <FormLabel size='sm' fontSize={'14px'}>Form</FormLabel>
                    <MonthYear />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel size='sm' fontSize={'14px'}>To</FormLabel>
                    <MonthYear />
                </FormControl>
            </Flex>

            <Divider my={2} />


            <Flex gap={6}>
                <FormControl isRequired>
                    <FormLabel size='sm' fontSize={'14px'}>Rejoining Semester</FormLabel>
                    <Select size='sm' border='1px solid #cccccc50'>
                        <option style={{ color: 'black' }} value="1">1</option>
                        <option style={{ color: 'black' }} value="2">2</option>
                        <option style={{ color: 'black' }} value="3">3</option>
                        <option style={{ color: 'black' }} value="4">4</option>
                        <option style={{ color: 'black' }} value="5">5</option>
                        <option style={{ color: 'black' }} value="6">6</option>
                        <option style={{ color: 'black' }} value="7">7</option>
                        <option style={{ color: 'black' }} value="8">8</option>
                    </Select>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel size='sm' fontSize={'14px'}>Rejoining Academic Year</FormLabel>
                    <Input border='1px solid #cccccc50' size='sm' type='number' placeholder='Academic Year' />
                </FormControl>
            </Flex>

            <Flex gap={5}>

                <FormControl isRequired>
                    <FormLabel size='sm' fontSize={'14px'}>Mention the academic year in which the maximum period for completion of the programme normally ends as per Regulations (UG / PG)</FormLabel>
                    <Input border='1px solid #cccccc50' size='sm' type='number' placeholder='Academic Year' />
                </FormControl>


                <FormControl isRequired>
                    <FormLabel size='sm' fontSize={'14px'}> Whether the remaining period after rejoining the course is as per Regulations (Tick the relevant column)</FormLabel>

                    <RadioGroup mt={5} size='sm'>
                        <HStack>
                            <Radio border='1px solid #cccccc50' value="yes">Yes</Radio>
                            <Radio border='1px solid #cccccc50' value="no">No</Radio>
                        </HStack>
                    </RadioGroup>
                </FormControl>
            </Flex>

            <Divider my={2} />

            <FormControl isRequired>
                <Flex gap={6}>
                    <FormLabel fontSize={'14px'}>Details of break of study availed previously, if any</FormLabel>
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
                <PinInputField border='1px solid #cccccc50' placeholder="Y" />
                <PinInputField border='1px solid #cccccc50' placeholder="Y" />
                <PinInputField border='1px solid #cccccc50' placeholder="Y" />
                <PinInputField border='1px solid #cccccc50' placeholder="Y" />
            </PinInput>
        </HStack>
    )
}
