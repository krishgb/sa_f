import { Divider, Flex, FormControl, FormLabel, Grid, HStack, Input, PinInput, PinInputField, Radio, RadioGroup, Select, Switch } from '@chakra-ui/react'
import React from 'react'
import { useBreakOfStudy } from "../context";

export default function BreakOfStudyDetails() {
    const {set_data,entries} = useBreakOfStudy()
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
                    <Input 
                        border='1px solid #cccccc50' 
                        size='sm' 
                        onChange={(e)=>{set_data('break_of_study_sem',e.target.value)}} 
                        placeholder='Semester' 
                        defaultValue={entries.break_of_study_sem}
                    />
                    <Input 
                        border='1px solid #cccccc50' 
                        size='sm' 
                        onChange={(e)=>{set_data('break_of_study_duration_months',e.target.value)}} 
                        placeholder='Duration in months' 
                        defaultValue={entries.break_of_study_duration_months}
                    />
                </Flex>
            </FormControl>

            <Flex gap={6}>

                <FormControl isRequired>
                    <FormLabel size='sm' fontSize={'14px'}>Form</FormLabel>
                        <HStack>
                            <PinInput 
                                otp 
                                size={'sm'} 
                                placeholder="M" 
                                onChange={(e)=>{set_data('break_from_month',e)}}
                                defaultValue={entries.break_from_month}
                            >
                                <PinInputField border='1px solid #cccccc50' placeholder="M" />
                                <PinInputField border='1px solid #cccccc50' placeholder="M" />
                            </PinInput>
                            <Input border='1px solid #cccccc50' color='white' size='sm' fontSize={'14px'} readOnly value='/' width='30px' />
                            <PinInput 
                                otp 
                                size={'sm'} 
                                placeholder="Y" 
                                onChange={(e)=>{set_data('break_from_year',e)}}
                                defaultValue={entries.break_from_year}
                            >
                                <PinInputField size={'sm'} border='1px solid #cccccc50' placeholder="Y" />
                                <PinInputField border='1px solid #cccccc50' placeholder="Y" />
                                <PinInputField border='1px solid #cccccc50' placeholder="Y" />
                                <PinInputField border='1px solid #cccccc50' placeholder="Y" />
                            </PinInput>
                        </HStack>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel size='sm' fontSize={'14px'}>To</FormLabel>
                        <HStack>
                            <PinInput 
                                otp 
                                size={'sm'} 
                                placeholder="M" 
                                onChange={(e)=>{set_data('break_to_month',e)}}
                                defaultValue={entries.break_to_month}
                            >
                                <PinInputField border='1px solid #cccccc50' placeholder="M" />
                                <PinInputField border='1px solid #cccccc50' placeholder="M" />
                            </PinInput>
                            <Input border='1px solid #cccccc50' color='white' size='sm' fontSize={'14px'} readOnly value='/' width='30px' />
                            <PinInput 
                                otp 
                                size={'sm'} 
                                placeholder="Y" 
                                onChange={(e)=>{set_data('break_to_year',e)}}
                                defaultValue={entries.break_to_year}
                            >
                                <PinInputField size={'sm'} border='1px solid #cccccc50' placeholder="Y" />
                                <PinInputField border='1px solid #cccccc50' placeholder="Y" />
                                <PinInputField border='1px solid #cccccc50' placeholder="Y" />
                                <PinInputField border='1px solid #cccccc50' placeholder="Y" />
                            </PinInput>
                        </HStack>
                </FormControl>
            </Flex>

            <Divider my={2} />


            <Flex gap={6}>
                <FormControl isRequired>
                    <FormLabel size='sm' fontSize={'14px'}>Rejoining Semester</FormLabel>
                    <Select 
                        size='sm' 
                        border='1px solid #cccccc50' 
                        onChange={(e)=>{set_data('rejoining_sem',e.target.value)}}
                        defaultValue={entries.rejoining_sem}
                    >
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
                    <Input 
                        border='1px solid #cccccc50' 
                        size='sm' 
                        type='number' 
                        placeholder='Academic Year' 
                        onChange={(e)=>{set_data('rejoining_academic_year',e.target.value)}}
                        defaultValue={entries.rejoining_academic_year}
                    />
                </FormControl>
            </Flex>

            <Flex gap={5}>

                <FormControl isRequired>
                    <FormLabel size='sm' fontSize={'14px'}>Mention the academic year in which the maximum period for completion of the programme normally ends as per Regulations (UG / PG)</FormLabel>
                    <Input
                        border='1px solid #cccccc50' 
                        size='sm' 
                        type='number' 
                        placeholder='Academic Year' 
                        onChange={(e)=>{set_data('max_period_of_completion',e.target.value)}}
                        defaultValue={entries.max_period_of_completion}
                    />
                </FormControl>


                <FormControl isRequired>
                    <FormLabel size='sm' fontSize={'14px'}> Whether the remaining period after rejoining the course is as per Regulations (Tick the relevant column)</FormLabel>

                    <RadioGroup 
                        mt={5} 
                        size='sm' 
                        onChange={(e)=>{set_data('remaining_period_as_per_regulations',e)}}
                        defaultValue={entries.remaining_period_as_per_regulations}
                    >
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
                    <RadioGroup 
                        size='sm' 
                        onChange={(e)=>{set_data('break_of_study_availed_previously',e)}}
                        defaultValue={entries.break_of_study_availed_previously}
                    >
                        <HStack>
                            <Radio border='1px solid #cccccc50' value="yes">Yes</Radio>
                            <Radio border='1px solid #cccccc50' value="no">No</Radio>
                        </HStack>
                    </RadioGroup>
                </Flex>
            </FormControl>
            {
            entries.break_of_study_availed_previously === 'yes' ?(
            <Flex gap={6} alignItems={'end'}>
                <Input border='1px solid #cccccc50' size='sm' placeholder='Semester' onChange={(e)=>{set_data('break_of_study_availed_previously_sem',e.target.value)}}/>
                <FormControl>
                    <FormLabel size='sm' fontSize={'14px'}>From</FormLabel>
                        <HStack>
                            <PinInput 
                                otp size={'sm'} 
                                placeholder="M" 
                                onChange={(e)=>{set_data('break_of_study_availed_previously_from_month',e)}}
                                defaultValue={entries.break_of_study_availed_previously_from_month}
                            >
                                <PinInputField border='1px solid #cccccc50' placeholder="M" />
                                <PinInputField border='1px solid #cccccc50' placeholder="M" />
                            </PinInput>
                            <Input border='1px solid #cccccc50' color='white' size='sm' fontSize={'14px'} readOnly value='/' width='30px' />
                            <PinInput 
                                otp size={'sm'} 
                                placeholder="Y" 
                                onChange={(e)=>{set_data('break_of_study_availed_previously_from_year',e)}}
                                defaultValue={entries.break_of_study_availed_previously_from_year}
                            >
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
                            <PinInput 
                                otp size={'sm'} 
                                placeholder="M" 
                                onChange={(e)=>{set_data('break_of_study_availed_previously_to_month',e)}}
                                defaultValue={entries.break_of_study_availed_previously_to_month}
                            >
                                <PinInputField border='1px solid #cccccc50' placeholder="M" />
                                <PinInputField border='1px solid #cccccc50' placeholder="M" />
                            </PinInput>
                            <Input border='1px solid #cccccc50' color='white' size='sm' fontSize={'14px'} readOnly value='/' width='30px' />
                            <PinInput 
                                otp size={'sm'} 
                                placeholder="Y" 
                                onChange={(e)=>{set_data('break_of_study_availed_previously_to_year',e)}}
                                defaultValue={entries.break_of_study_availed_previously_to_year}
                            >
                                <PinInputField size={'sm'} border='1px solid #cccccc50' placeholder="Y" />
                                <PinInputField border='1px solid #cccccc50' placeholder="Y" />
                                <PinInputField border='1px solid #cccccc50' placeholder="Y" />
                                <PinInputField border='1px solid #cccccc50' placeholder="Y" />
                            </PinInput>
                        </HStack>
                </FormControl>
            </Flex>):<></>
            }

        </Grid>
    )
}
