// components/admin/AddUser.jsx

import {Box, FormControl, FormLabel, Grid, Text, Input, Select, Button, useToast, Checkbox, CheckboxGroup, Stack} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { z } from 'zod'
import {useMultiSelect, MultiSelect} from 'chakra-multiselect'

export default function AddUser(){
    const [state, set_state] = useState({
        email: '',
        designation: 'Staff',
        access_privileges: []
    })

    const toast = useToast()

    const body_schema = z.object({
        email: z.string().email(),
        designation: z.enum(['Director', 'Deputy Director', 'Staff', 'Finance Clerk'])
    })

    const add_user = async (e) => {
        e.preventDefault()

        const {email, designation} = state

        if(!body_schema.safeParse({email, designation}).success){
            toast({
                title: 'Invalid Input',
                description: 'Please check email and designation',
                status: 'error',
                position: 'top',
                isClosable: true
            })
            return
        }

        try{
            const request = await fetch(import.meta.env.VITE_REACT_APP_SERVER_URL + 'add_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...state})
            })
            const response = await request.json()
            toast({
                title: response.success ? 'User Added' : response.msg,
                description: response.success ? 'User has been added successfully' : '',
                status: response.success ? 'success' : 'error',
                position: 'top',
                isClosable: true
            })

        }catch(e){
            console.log(e);
            toast({
                title: 'Server Error',
                description: 'Please try again later',
                status: 'error',
                position: 'top'
            })
        }
        
    }

    return (
        <Box w={'400px'} m={'auto'} mt={12}>
            <Text style={{color: 'white'}} fontSize={'2xl'} mb={12}>Add New User</Text>

            <form onSubmit={add_user}>

                <Grid gap='4' border={'1px solid #cccccc50'} p={8} borderRadius={'5px'}>
                    <FormControl size={'sm'} isRequired>
                        <FormLabel size={'sm'} color={'white'}>Email</FormLabel>
                        <Input 
                            size={'sm'} 
                            color={'white'} 
                            onChange={e => {set_state({...state, email: e.target.value})}} 
                            type='email' 
                            placeholder='Enter Email ID' 
                        />
                    </FormControl>

                    <FormControl size={'sm'} isRequired>
                        <FormLabel size={'sm'} color={'white'}>Designation</FormLabel>
                        <Select 
                            size={'sm'} 
                            onChange={e => {set_state({...state, designation: e.target.value})}} 
                            color={'white'}
                        >
                            <option style={{color: 'black'}} value='Staff'>Staff</option>
                            <option style={{color: 'black'}} value='Director'>Director</option>
                            <option style={{color: 'black'}} value='Deputy Director'>Deputy Director</option>
                            <option style={{color: 'black'}} value='Finance Clerk'>Finance Clerk</option>
                        </Select>
                    </FormControl>

                {
                    state.designation === 'Staff' &&

                    <FormControl size={'sm'} >
                        <FormLabel size={'sm'} color={'white'}>Access to</FormLabel>
                        <CheckboxGroup 
                            colorScheme='green' 
                            defaultValue={[]} 
                            onChange={values => {set_state({...state, access_privileges: values})}}
                        >
                            <Stack display={'flex'}>
                                {['transfer', 'name_change', 'readmission', 'rra', 'break_of_study', 'grievance'].map((label, idx) => (
                                    <Checkbox key={idx} color='white' value={label}>{label === 'rra' ? label.toUpperCase() :  label.split('_').map(i => i[0].toUpperCase() + i.slice(1)).join(' ')}</Checkbox>
                                    ))
                            }
                            </Stack>
                        </CheckboxGroup>
                    </FormControl>
                }

                    <Button type='submit' mt={4}>Add User</Button>
                </Grid>
            </form>
        
        </Box>
    )
}