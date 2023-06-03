import { Divider, Flex, FormControl, FormLabel, Grid, HStack, Input, PinInput, PinInputField, Radio, RadioGroup, Select } from "@chakra-ui/react";

export default function AcademicDetails() {
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
                <FormControl size={'sm'} isRequired>
                    <FormLabel color='white' fontSize={'14px'} size={'sm'}>Name of the student</FormLabel>
                    <Input fontSize={'14px'} border='1px solid #cccccc50' color={'white'} size='sm' placeholder='Enter your name' />
                </FormControl>

                <FormControl size={'sm'} isRequired>
                    <FormLabel color='white' fontSize={'14px'} size={'sm'}>Roll number / Register number</FormLabel>
                    <Input fontSize={'14px'} border='1px solid #cccccc50' color={'white'} size='sm' placeholder='Roll / Register number of the Student' />
                </FormControl>
            </Flex>

            <Divider />

            <Flex gap={12}>
                <FormControl size={'sm'} isRequired>
                    <FormLabel color='white' fontSize={'14px'} size={'sm'}>Programme</FormLabel>
                    <Grid templateColumns={'.3fr 1fr'}>
                        <Select size='sm' border='1px solid #cccccc50' color={'white'}>
                            <option value="UG">UG</option>
                            <option value="PG">PG</option>
                        </Select>
                        <Input fontSize={'14px'} border='1px solid #cccccc50' color={'white'} size='sm' placeholder='Course Programme' />
                    </Grid>
                </FormControl>

                <FormControl size={'sm'} isRequired>
                    <FormLabel color='white' fontSize={'14px'} size={'sm'}>Branch of Study</FormLabel>
                    <Input fontSize={'14px'} border='1px solid #cccccc50' color={'white'} size='sm' placeholder='Branch of Study' />
                </FormControl>
            </Flex>

            <Divider />

            <Flex gap={12}>

                <FormControl size={'sm'} isRequired>
                    <Grid height={'100%'}>
                        <FormLabel color='white' fontSize={'14px'} size={'sm'}>Mode of Study</FormLabel>
                        <Select size='sm' mt={'6'} border='1px solid #cccccc50' color={'white'}>
                            <option style={{color: "black"}}  value="regular">Regular</option>
                            <option style={{color: "black"}}  value="ss">SS</option>
                            <option style={{color: "black"}}  value="part_time">Part time</option>
                        </Select>
                    </Grid>
                </FormControl>

                <FormControl size={'sm'} isRequired>
                    <FormLabel color='white' fontSize={'14px'} size={'sm'}>Month and year of admission to the Degree Programme (1<sup>st</sup> semester)</FormLabel>
                    <MonthYear />
                </FormControl>
            </Flex>

            <Divider />


            <FormControl size={'sm'} isRequired>
                <FormLabel color='white' fontSize={'14px'} size={'sm'}>Number of semesters completed</FormLabel>
                <Input fontSize={'14px'} border='1px solid #cccccc50' color={'white'} size='sm' placeholder='Number of semesters completed' type='number' />
            </FormControl>

            <Flex gap={12}>
                <FormControl size={'sm'} isRequired>
                    <FormLabel color='white' fontSize={'14px'} size={'sm'}>From</FormLabel>
                    <MonthYear />
                </FormControl>

                <FormControl size={'sm'} isRequired>
                    <FormLabel color='white' fontSize={'14px'} size={'sm'}>To</FormLabel>
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
                <PinInputField border='1px solid #cccccc50' color={'white'} placeholder="M" />
                <PinInputField border='1px solid #cccccc50' color={'white'} placeholder="M" />
            </PinInput>
            <Input fontSize={'14px'} color='white' size='sm' readOnly value='/' width='30px' />
            <PinInput otp size={'sm'} placeholder="Y">
                <PinInputField border='1px solid #cccccc50' color={'white'} placeholder="Y" />
                <PinInputField border='1px solid #cccccc50' color={'white'} placeholder="Y" />
                <PinInputField border='1px solid #cccccc50' color={'white'} placeholder="Y" />
                <PinInputField border='1px solid #cccccc50' color={'white'} placeholder="Y" />
            </PinInput>
        </HStack>
    )
}
