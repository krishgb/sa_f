import { Box, Button, FormControl, FormLabel, Grid, Input, Text, useToast } from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import hash from "@/utils/hash";
import { useGlobalContext } from "@/lib/global_context";


export default function Login(){
    const { global_user, global_allowed_routes, global_is_admin, global_set_user } = useGlobalContext()

    const toast = useToast()

    const navigate = useNavigate()

    const password_ref = useRef(null)
    const email_ref = useRef(null)

    const login = async (e) => {
        e.preventDefault()

        const form_fields = {
            email: email_ref.current.value,
            password: await hash(password_ref.current.value)
        }

        try{

            const request = await fetch('/api/login', {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...form_fields})
            })

            const response = await request.json()
            toast({
                title: response.success ? 'Login successful' : response.msg,
                description: response.success ? 'Login successfully' : '',
                status: response.success ? 'success' : 'error',
                position: 'top',
                isClosable: true
            })

            if(response.success){
                console.log(response.data);
                global_set_user(response.data)
                navigate('/', {
                    replace: true
                })
            }

            if(!response.success){
                if(response.redirect)
                    navigate(response.redirect, {replace: true})
                global_set_user(null)
            }

        }catch(e){
            console.log(e);
            toast({
                title: 'Server Error',
                description: 'Please try again later',
                status: 'error',
                position: 'top',
                isClosable: true
            })
        }


    }



    return (
        <Box w='500px' m='auto' color='black'>
            <Text textAlign={'center'} fontSize={'3xl'} fontWeight={'bold'} mb={6} mt={12}>Sign in to your account</Text>

            <form onSubmit={login}>

                <Grid 
                    // border={'1px solid #000'}s
                    borderRadius={'5px'}
                    p={8}
                    gap={8}  
                    m='auto'
                    w='80%'
                    rounded={'lg'}
                    boxShadow={'lg'}
                    color='black'
                    border='1px solid #ccc'

                >
                    <FormControl isRequired size='sm' color={'black'}>
                        <FormLabel size={'sm'}>Email</FormLabel>
                        <Input 
                            ref={email_ref} 
                            border={'1px solid #cccccc'} 
                            borderRadius={'5px'} 
                            color='black' 
                            size={'sm'} 
                            type='email' 
                            placeholder="Enter your email address" 
                            _placeholder={{opacity: 1, color: 'gray.500'}}
                        />
                    </FormControl>

                    <FormControl isRequired size='sm'>
                        <FormLabel size={'sm'}>Password</FormLabel>
                        <Input 
                            ref={password_ref} 
                            minLength={8} 
                            border={'1px solid #cccccc'} 
                            borderRadius={'5px'} 
                            color='black' 
                            size={'sm'} 
                            type='password' 
                            placeholder="Enter your password"
                            _placeholder={{opacity: 1, color: 'gray.500'}}
                        
                        />
                    </FormControl>

                    <Button 
                        type='submit' 
                        // size='sm'
                        width='100%' 
                        // backgroundColor={'transparent'}
                        // color='lightgreen'
                        // fontWeight={'normal'}
                        bg={'blue.400'}
                        fontSize={'lg'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}
                    >
                        Submit
                    </Button>
                </Grid>
            </form>
        </Box>
    )
}

