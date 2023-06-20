import { Divider, Flex, FormControl, FormLabel, Grid, HStack, Input, PinInput, PinInputField, Radio, RadioGroup, Select } from "@chakra-ui/react";
import { useBreakOfStudy } from "../context";

export default function AcademicDetails() {
    const {set_data, entries} = useBreakOfStudy()

    return (
        <Grid
            gap={6}
            margin='auto'
            p={5}
            border={'1px solid #cccccc50'}
            borderRadius={'5px'}
            boxShadow={'0 0 10px rgba(0, 0, 0, 0.1)'}
            width={'80%'}
        >
            <Flex gap={12}>
                <FormControl size={'sm'} isRequired >
                    <FormLabel color='white' fontSize={'14px'} size={'sm'}>Name of the student</FormLabel>
                    <Input 
                        onChange={(e) => set_data('name', e.target.value)} 
                        fontSize={'14px'} 
                        border='1px solid #cccccc50' 
                        color={'white'} 
                        size='sm' 
                        placeholder='Enter your name'
                        defaultValue={entries.name} 
                    />
                </FormControl>


                <FormControl size={'sm'} isRequired>
                    <FormLabel color='white' fontSize={'14px'} size={'sm'}>Roll number / Register number</FormLabel>
                    <Input 
                        fontSize={'14px'} 
                        border='1px solid #cccccc50' 
                        color={'white'} 
                        size='sm' 
                        placeholder='Roll / Register number of the Student' 
                        onChange={(e) => set_data('rno', e.target.value)} 
                        defaultValue={entries.rno}
                    />
                </FormControl>
            </Flex>

            <Divider />

            <Flex gap={12}>
                <FormControl size={'sm'} isRequired>
                    <FormLabel color='white' fontSize={'14px'} size={'sm'}>Programme</FormLabel>
                    <Grid templateColumns={'.3fr 1fr'}>
                        <Select 
                            size='sm' 
                            border='1px solid #cccccc50' 
                            color={'white'} 
                            defaultValue={entries.programme}
                            onChange={(e) => set_data('programme', e.target.value)} 
                        >
                            <option value="UG">UG</option>
                            <option value="PG">PG</option>
                        </Select>
                        <Input 
                            fontSize={'14px'} 
                            border='1px solid #cccccc50' 
                            color={'white'} 
                            size='sm' 
                            placeholder='Course Programme' 
                            defaultValue={entries.course}
                            onChange={(e) => set_data('course', e.target.value)} 
                        />
                    </Grid>
                </FormControl>

                <FormControl size={'sm'} isRequired>
                    <FormLabel color='white' fontSize={'14px'} size={'sm'}>Branch of Study</FormLabel>
                    <Input 
                        fontSize={'14px'} 
                        border='1px solid #cccccc50' 
                        color={'white'} 
                        size='sm' 
                        placeholder='Branch of Study' 
                        onChange={(e) => set_data('branch', e.target.value)} 
                        defaultValue={entries.branch}
                    />
                </FormControl>
            </Flex>

            <Divider />

            <Flex gap={12}>

                <FormControl size={'sm'} isRequired >
                    <Grid height={'100%'}>
                        <FormLabel color='white' fontSize={'14px'} size={'sm'}>Mode of Study</FormLabel>
                        <Select 
                            size='sm' mt={'6'} 
                            border='1px solid #cccccc50' color={'white'}
                            defaultValue={entries.mode}
                            onChange={(e) => set_data('mode', e.target.value)} 
                        >
                            <option style={{color: "black"}}  value="regular">Regular</option>
                            <option style={{color: "black"}}  value="ss">SS</option>
                            <option style={{color: "black"}}  value="part_time">Part time</option>
                        </Select>
                    </Grid>
                </FormControl>

                <FormControl size={'sm'} isRequired>
                    <FormLabel color='white' fontSize={'14px'} size={'sm'}>Month and year of admission to the Degree Programme (1<sup>st</sup> semester)</FormLabel>
                        <HStack>
                            <PinInput 
                                otp 
                                size={'sm'} 
                                placeholder="M" 
                                defaultValue={entries.admission_month} 
                                onChange={(e) => {set_data('admission_month',e)}}
                            > 
                                <PinInputField border='1px solid #cccccc50' color={'white'} placeholder="M" />
                                <PinInputField border='1px solid #cccccc50' color={'white'} placeholder="M" />
                            </PinInput>
                            <Input fontSize={'14px'} color='white' size='sm' readOnly value='/' width='30px' />
                            <PinInput 
                                otp 
                                size={'sm'} 
                                placeholder="Y" 
                                defaultValue={entries.admission_year} 
                                onChange={(e)=>{set_data('admission_year',e)}}
                            >
                                <PinInputField border='1px solid #cccccc50' color={'white'} placeholder="Y" />
                                <PinInputField border='1px solid #cccccc50' color={'white'} placeholder="Y" />
                                <PinInputField border='1px solid #cccccc50' color={'white'} placeholder="Y" />
                                <PinInputField border='1px solid #cccccc50' color={'white'} placeholder="Y" />
                            </PinInput>
                        </HStack>
                </FormControl>
            </Flex>

            <Divider />


            <FormControl size={'sm'} isRequired  >
                <FormLabel color='white' fontSize={'14px'} size={'sm'}>Number of semesters completed</FormLabel>
                <Input 
                    fontSize={'14px'} 
                    border='1px solid #cccccc50' 
                    color={'white'} size='sm' 
                    onChange={(e)=>{set_data('sems_completed',e.target.value)}} 
                    placeholder='Number of semesters completed'  type='number' 
                    defaultValue={entries.sems_completed}    
                />
            </FormControl>

            <Flex gap={12}>
                <FormControl size={'sm'} isRequired>
                    <FormLabel color='white' fontSize={'14px'} size={'sm'}>From</FormLabel>
                        <HStack>
                            <PinInput 
                                otp size={'sm'} 
                                placeholder="M" 
                                defaultValue={entries.completed_from_month} 
                                onChange={(e)=>{set_data('completed_from_month',e)}}
                            >
                                <PinInputField border='1px solid #cccccc50' color={'white'} placeholder="M" />
                                <PinInputField border='1px solid #cccccc50' color={'white'} placeholder="M" />
                            </PinInput>
                            <Input fontSize={'14px'} color='white' size='sm' readOnly value='/' width='30px' />
                            <PinInput 
                                otp size={'sm'} 
                                placeholder="Y" 
                                defaultValue={entries.completed_from_year} 
                                onChange={(e)=>{set_data('completed_from_year',e)}}
                            >
                                <PinInputField border='1px solid #cccccc50' color={'white'} placeholder="Y" />
                                <PinInputField border='1px solid #cccccc50' color={'white'} placeholder="Y" />
                                <PinInputField border='1px solid #cccccc50' color={'white'} placeholder="Y" />
                                <PinInputField border='1px solid #cccccc50' color={'white'} placeholder="Y" />
                            </PinInput>
                        </HStack>
                </FormControl>

                <FormControl size={'sm'} isRequired>
                    <FormLabel color='white' fontSize={'14px'} size={'sm'}>To</FormLabel>
                        <HStack>
                            <PinInput 
                                otp 
                                size={'sm'} 
                                placeholder="M" 
                                defaultValue={entries.completed_to_month}
                                onChange={(e)=>{set_data('completed_to_month',e)}}
                            >
                                <PinInputField border='1px solid #cccccc50' color={'white'} placeholder="M" />
                                <PinInputField border='1px solid #cccccc50' color={'white'} placeholder="M" />
                            </PinInput>
                            <Input fontSize={'14px'} color='white' size='sm' readOnly value='/' width='30px' />
                            <PinInput 
                                otp 
                                size={'sm'} 
                                placeholder="Y" 
                                defaultValue={entries.completed_to_year}
                                onChange={(e)=>{set_data('completed_to_year',e)}}
                            >
                                <PinInputField border='1px solid #cccccc50' color={'white'} placeholder="Y" />
                                <PinInputField border='1px solid #cccccc50' color={'white'} placeholder="Y" />
                                <PinInputField border='1px solid #cccccc50' color={'white'} placeholder="Y" />
                                <PinInputField border='1px solid #cccccc50' color={'white'} placeholder="Y" />
                            </PinInput>
                        </HStack>
                </FormControl>
            </Flex>
        </Grid>
    )
}


