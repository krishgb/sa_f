import { Box, Button, FormControl, FormLabel, Grid, Input, Text, useToast } from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import hash from "@/utils/hash";


export default function Login(){
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

            const request = await fetch(import.meta.env.VITE_REACT_APP_SERVER_URL + 'login', {
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
                localStorage.setItem('user', JSON.stringify(response.data))
                navigate('/', {
                    replace: true
                })
            }

            if(!response.success){
                if(response.redirect){
                    navigate(response.redirect, {replace: true})
                }
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
        <Box w='500px' m='auto'>
            <Text color={'white'} textAlign={'center'} fontSize={'2xl'} mb={6} mt={12}>Login</Text>

            <form onSubmit={login}>

                <Grid 
                    border={'1px solid #cccccc50'}
                    borderRadius={'5px'}
                    p={8}
                    gap={8}  
                    m='auto'
                    w='80%'
                >
                    <FormControl isRequired size='sm'>
                        <FormLabel color='white' size={'sm'}>Email</FormLabel>
                        <Input ref={email_ref} border={'1px solid #cccccc50'} borderRadius={'2px'} size={'sm'} color='white' type='email' placeholder="Enter your email address" />
                    </FormControl>

                    <FormControl isRequired size='sm'>
                        <FormLabel color='white' size={'sm'}>Password</FormLabel>
                        <Input ref={password_ref} minLength={8} border={'1px solid #cccccc50'} borderRadius={'2px'} size={'sm'} color='white' type='password' placeholder="Create a new password"/>
                    </FormControl>

                    <Button 
                        type='submit' 
                        size='sm'
                        width='100%' 
                        backgroundColor={'transparent'}
                        border='1px solid lightgreen'
                        color='lightgreen'
                        fontWeight={'normal'}
                        _hover={{backgroundColor: 'lightgreen', color: 'black'}}
                    >
                        Submit
                    </Button>
                </Grid>
            </form>
        </Box>
    )
}


// import {useNavigate} from 'react-router-dom'
// import { useRef } from 'react'
// import styles from './Login.module.scss'


// export default function Login(){
//     const emailRef = useRef(null)
//     const passwordRef = useRef(null)
//     const router = useNavigate()

//     const hashed_password = async(password) => {
//         const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
//         return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
//     }

//     const submit = async (e) => {
//         e.preventDefault()
//         const email = emailRef.current?.value
//         let password = passwordRef.current?.value
//         password = await hashed_password(password)
        
//         try{
//             const validate = await fetch(process.env.REACT_APP_SERVER_URL +  '/login', {
//                 credentials: 'include',
//                 headers: {'Content-Type': 'application/json'},
//                 method: 'POST',
//                 body: JSON.stringify({email, password})
//             })
//             const data = await validate.json()
//             if(!data.success){
//                 alert('Login Failed')
//                 return
//             }
//             console.log(data);
            
//             router('/transfer')
//         }catch(e){
//             console.log(e);
//         }
//     }

//     return (
//         <div className={styles['form-container']}>
//             <form onSubmit={submit}>
//                 <h2 style={{textAlign: 'center', fontWeight: 700}}>Login</h2>
//                 <div>
//                     <label htmlFor='email'>Email</label>
//                     <input type="email" ref={emailRef} id="email" placeholder='Email ID' />
//                 </div>

//                 <div>
//                     <label htmlFor='password'>Password</label>
//                     <input type="password" ref={passwordRef} id='password' placeholder='Password' />
//                 </div>

//                 <button>Login</button>
//             </form>
//         </div>
//     )
// }

