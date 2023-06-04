import {Box, FormControl, FormLabel, Grid, Text, Input, Select, Button, useToast} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { z } from 'zod'

export default function AddUser(){
    const [designation, set_designation] = useState('Staff')
    const email_ref = useRef(null)
    const designation_ref = useRef(null)

    const toast = useToast()

    const body_schema = z.object({
        email: z.string().email(),
        designation: z.enum(['Director', 'Deputy Director', 'Staff', 'Finance Clerk']),
    })


    const add_user = async (e) => {
        e.preventDefault()

        const email = email_ref.current.value
        const designation = designation_ref.current.value

        if(!body_schema.safeParse({email, designation}).success){
            toast({
                title: 'Invalid Input',
                description: 'Please check email and designation',
                status: 'error',
                position: 'top'
            })
            return
        }

        try{
            const request = await fetch(import.meta.env.VITE_REACT_APP_SERVER_URL + 'add_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, designation})
            })
    
            const response = await request.json()
    
            toast({
                title: response.success ? 'User Added' : response.msg,
                description: response.success ? 'User has been added successfully' : '',
                status: response.success ? 'success' : 'error',
                position: 'top'
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
                        <Input size={'sm'} color={'white'} ref={email_ref} type='email' placeholder='Enter Email ID' />
                    </FormControl>

                    <FormControl size={'sm'} isRequired>
                        <FormLabel size={'sm'} color={'white'}>Designation</FormLabel>
                        <Select size={'sm'} ref={designation_ref} color={'white'}>
                            <option style={{color: 'black'}} value='Staff'>Staff</option>
                            <option style={{color: 'black'}} value='Director'>Director</option>
                            <option style={{color: 'black'}} value='Deputy Director'>Deputy Director</option>
                            <option style={{color: 'black'}} value='Finance Clerk'>Finance Clerk</option>
                        </Select>
                    </FormControl>

                    <Button type='submit' mt={4}>Add User</Button>
                </Grid>
            </form>
        
        </Box>
    )
}