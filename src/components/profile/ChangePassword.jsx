import { Box, Button, FormControl, FormLabel, Grid, Input, Text, useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import hash from "@/utils/hash";
import { useGlobalContext } from "@/lib/global_context";


export default function ChangePassword(){
    const { global_user, global_allowed_routes, global_is_admin, global_set_user } = useGlobalContext()
    const [disabled, set_disabled] = useState(true)

    const toast = useToast()

    const navigate = useNavigate()

    const password_ref = useRef(null)
    const old_password_ref = useRef(null)

    const login = async (e) => {
        e.preventDefault()

        const form_fields = {
            old_password: await hash(old_password_ref.current.value),
            password: await hash(password_ref.current.value)
        }

        try{

            const request = await fetch('/api/change_password', {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...form_fields})
            })

            const response = await request.json()
            toast({
                title: response.success ? 'Password updated ' : response.msg,
                description: response.success ? 'Password updated ' : '',
                status: response.success ? 'success' : 'error',
                position: 'top',
                isClosable: true
            })

            if(response.success){
                console.log(response.data);
                // global_set_user(response.data)
                navigate('/login', {
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
            <Text textAlign={'center'} fontSize={'3xl'} fontWeight={'bold'} mb={6} mt={12}>Change your password</Text>

            <form onSubmit={login}>

                <Grid
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
                        <FormLabel size={'sm'}>Old Password</FormLabel>
                        <Input 
                            ref={old_password_ref} 
                            border={'1px solid #cccccc'} 
                            borderRadius={'5px'} 
                            color='black' 
                            size={'sm'} 
                            type='password' 
                            placeholder="Enter your old password" 
                            _placeholder={{opacity: 1, color: 'gray.500'}}
                        />
                    </FormControl>

                    <FormControl isRequired size='sm' color={'black'}>
                        <FormLabel size={'sm'}>New Password</FormLabel>
                        <Input 
                            minLength={8} 
                            ref={password_ref} 
                            border={'1px solid #cccccc'} 
                            borderRadius={'5px'} 
                            color='black' 
                            size={'sm'} 
                            type='password' 
                            placeholder="Enter your new password" 
                            _placeholder={{opacity: 1, color: 'gray.500'}}
                        />
                    </FormControl>

                    <FormControl isRequired size='sm'>
                        <FormLabel size={'sm'}>Confirm New Password</FormLabel>
                        <Input 
                            minLength={8} 
                            border={'1px solid #cccccc'} 
                            borderRadius={'5px'} 
                            color='black' 
                            size={'sm'} 
                            type='password' 
                            placeholder="Enter password again"
                            _placeholder={{opacity: 1, color: 'gray.500'}}
                            onChange={(e) => set_disabled(e.target.value !== password_ref.current.value)}
                        />
                    </FormControl>

                    <Button 
                        type='submit'
                        width='100%' 
                        bg={'blue.400'}
                        fontSize={'lg'}
                        color={'white'}
                        _hover={{
                            bg: 'blue.500',
                        }}
                        isDisabled={disabled}
                    >
                        Submit
                    </Button>
                </Grid>
            </form>
        </Box>
    )
}

