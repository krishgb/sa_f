// Signup.tsx

import { Box, Button, FormControl, FormErrorMessage, FormLabel, Grid, Input, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { z } from "zod";

const form_schema = z.object({
    email: z.string().email(),
    fullname: z.string().min(3),
    password: z.string().min(8).max(16),
    dob: z.string(),
    phone: z.string().length(10)
})

export default function Signup(){
    const [img_src, set_img_src] = useState('')
    const [confirm_password_error, set_confirm_password_error] = useState(false)

    const password_ref = useRef(null)

    const signup = async (e) => {
        e.preventDefault()
    }

    const change_image = (e) => {
        const file = e.target.files[0]
        const object_url = URL.createObjectURL(file)
        set_img_src(object_url)
    }

    return (
        <Box w='50%' m='auto'>
            <Text color={'white'} textAlign={'center'} fontSize={'2xl'} mb={3} mt={2}>Create an account</Text>

            <form onSubmit={signup}>

                <Grid 
                    border={'1px solid #cccccc50'}
                    borderRadius={'5px'}
                    p={8}
                    gap={8}  
                    m='auto'
                    templateColumns={'1fr 1fr'}
                    justifyContent={'end'}
                >
                    <FormControl isRequired size='sm'>
                        <FormLabel color='white' size={'sm'}>Email</FormLabel>
                        <Input border={'1px solid #cccccc50'} borderRadius={'2px'} size={'sm'} color='white' type='email' placeholder="Enter your email address" />
                    </FormControl>

                    <FormControl isRequired size='sm'>
                        <FormLabel color='white' size={'sm'}>Full Name</FormLabel>
                        <Input border={'1px solid #cccccc50'} borderRadius={'2px'} size={'sm'} color='white' type='text' placeholder="Enter your name" />
                    </FormControl>

                    <FormControl isRequired size='sm'>
                        <FormLabel color='white' size={'sm'}>Password</FormLabel>
                        <Input ref={password_ref} minLength={8} border={'1px solid #cccccc50'} borderRadius={'2px'} size={'sm'} color='white' type='password' placeholder="Create a new password" />
                    </FormControl>

                    <FormControl isRequired size='sm' isInvalid={confirm_password_error}>
                        <FormLabel color='white' size={'sm'}>Confirm Password</FormLabel>
                        <Input border={'1px solid #cccccc50'} borderRadius={'2px'} size={'sm'} color='white' type='password' placeholder="Create a new password"
                            onChange={e => {set_confirm_password_error(password_ref.current.value !== e.target.value)}}
                        />
                        <FormErrorMessage>Password doesn't match</FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired size='sm'>
                        <FormLabel color='white' size={'sm'}>Date of Birth</FormLabel>
                        <Input border={'1px solid #cccccc50'} borderRadius={'2px'} size={'sm'} color='white' type='date' />
                    </FormControl>

                    <FormControl isRequired size='sm'>
                        <FormLabel color='white' size={'sm'}>Phone / Mobile number</FormLabel>
                        <Grid templateColumns={'.2fr .8fr'}>
                            <Input border={'1px solid #cccccc50'} borderRadius={'2px'} readOnly size={'sm'} color='white' backgroundColor={'#cccccc10'} type='text' defaultValue='+91' />
                            <Input border={'1px solid #cccccc50'} borderRadius={'2px'} size={'sm'} color='white' type='number' placeholder="Enter your Phone / Mobile number" />
                        </Grid>
                    </FormControl>

                    {/* <FormControl size='sm'>
                        <FormLabel color='white' size={'sm'}>Upload your image</FormLabel>
                        <Input 
                            onChange={change_image} 
                            accept="image/*" 
                            border={'1px solid #cccccc50'} 
                            borderRadius={'2px'} 
                            size={'sm'} 
                            color='white' 
                            type='file' 
                            />
                    </FormControl>

                    <Image 
                        p={5}
                        border={'1px solid #cccccc50'}
                        borderRadius={'5px'}
                        src={img_src} 
                        width={'250px'}
                    /> */}


                    <Button size='sm' type='submit' w={'210%'} m={'auto'}>Sign up</Button>
                </Grid>
            </form>
        </Box>
    )
}