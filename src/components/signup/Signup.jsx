import { Box, Button, FormControl, FormErrorMessage, FormLabel, Grid, Input, Text, useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const form_schema = z.object({
    email: z.string().email(),
    fullname: z.string().min(3),
    password: z.string().min(8).max(16),
    dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    phone: z.string().length(10)
})

export default function Signup(){
    const toast = useToast()

    const navigate = useNavigate()

    const [err_msgs, set_err_msgs] = useState({
        email: '',
        fullname: '',
        password: '',
        dob: '',
        phone: ''

    })

    // const [img_src, set_img_src] = useState('')
    const [confirm_password_error, set_confirm_password_error] = useState(false)

    const password_ref = useRef(null)
    const confirm_password_ref = useRef(null)
    const email_ref = useRef(null)
    const fullname_ref = useRef(null)
    const dob_ref = useRef(null)
    const phone_ref = useRef(null)

    const signup = async (e) => {
        e.preventDefault()

        const form_fields = {
            email: email_ref.current.value,
            fullname: fullname_ref.current.value,
            password: password_ref.current.value,
            dob: dob_ref.current.value,
            phone: phone_ref.current.value
        }

        const parsed = form_schema.safeParse(form_fields)
        const errors = {email: '', fullname: '', password: '', dob: '', phone: ''}
        if(!parsed.success){
            parsed.error.errors.map(i => (errors[i.path[0]] = i.message))
            set_err_msgs(errors)
            toast({
                title: 'Invalid Input',
                description: 'Please check the input fields',
                status: 'error',
                position: 'top',
                isClosable: true
            })
            return
        }

        set_err_msgs(errors)
        
        try{

            const request = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...form_fields}),
                credentials: 'include'
            })
            const response = await request.json()
            toast({
                title: response.success ? 'Account Created' : response.msg,
                description: response.success ? 'Account has been created successfully' : '',
                status: response.success ? 'success' : 'error',
                position: 'top',
                isClosable: true
            })

            if(response.success){
                navigate('/login')
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

    // const change_image = (e) => {
    //     const file = e.target.files[0]
    //     const object_url = URL.createObjectURL(file)
    //     set_img_src(object_url)
    // }



    return (
        <Box w='50%' m='auto' color='black'>
            {/* <Text color={'white'} textAlign={'center'} fontSize={'2xl'} mb={3} mt={2}>Signup</Text> */}
            <Text textAlign={'center'} fontSize={'3xl'} fontWeight={'bold'} mb={6} mt={12}>Sign-up</Text>

            <form onSubmit={signup}>

                <Grid 
                    border={'1px solid #cccccc'}
                    borderRadius={'5px'}
                    p={8}
                    gap={8}  
                    m='auto'
                    templateColumns={'1fr 1fr'}
                    justifyContent={'end'}
                    color='black'
                    boxShadow={'lg'}
                >
                    <FormControl isRequired size='sm' isInvalid={err_msgs.email.length > 0}>
                        <FormLabel  size={'sm'}>Email</FormLabel>
                        <Input 
                            ref={email_ref} 
                            border={'1px solid #cccccc'} 
                            borderRadius={'2px'} 
                            size={'sm'}
                            type='email' 
                            placeholder="Enter your email address" 
                            _placeholder={{color: 'gray.500'}}    
                        />
                        <FormErrorMessage>{err_msgs.email}</FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired size='sm' isInvalid={err_msgs.fullname.length > 0}>
                        <FormLabel  size={'sm'}>Full Name</FormLabel>
                        <Input 
                            ref={fullname_ref} 
                            border={'1px solid #cccccc'} 
                            borderRadius={'2px'} 
                            size={'sm'} 
                            type='text' 
                            placeholder="Enter your name" 
                            _placeholder={{color: 'gray.500'}}
                        />
                        <FormErrorMessage>{err_msgs.fullname}</FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired size='sm' isInvalid={confirm_password_error}>
                        <FormLabel  size={'sm'}>Password</FormLabel>
                        <Input 
                            ref={password_ref} 
                            minLength={8} 
                            border={'1px solid #cccccc'} 
                            borderRadius={'2px'} size={'sm'}  
                            type='password' 
                            placeholder="Create a new password"
                            _placeholder={{color: 'gray.500'}}
                            onChange={e => {set_confirm_password_error(confirm_password_ref.current.value !== e.target.value)}}
                        />
                        <FormErrorMessage>Password doesn't match</FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired size='sm' isInvalid={confirm_password_error}>
                        <FormLabel  size={'sm'}>Confirm Password</FormLabel>
                        <Input 
                            border={'1px solid #cccccc'} 
                            borderRadius={'2px'} 
                            size={'sm'}  
                            type='password' 
                            placeholder="Re-enter the password"
                            _placeholder={{color: 'gray.500'}}
                            ref={confirm_password_ref}
                            onChange={e => {set_confirm_password_error(password_ref.current.value !== e.target.value)}}
                        />
                        <FormErrorMessage>Password doesn't match</FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired size='sm' isInvalid={err_msgs.dob.length > 0}>
                        <FormLabel  size={'sm'}>Date of Birth</FormLabel>
                        <Input ref={dob_ref} border={'1px solid #cccccc'} borderRadius={'2px'} size={'sm'}  type='date' />
                        <FormErrorMessage>{err_msgs.dob}</FormErrorMessage>
                    </FormControl>

                    <FormControl isRequired size='sm' isInvalid={err_msgs.phone.length > 0} >
                        <FormLabel  size={'sm'}>Phone / Mobile number</FormLabel>
                        <Grid templateColumns={'.2fr .8fr'}>
                            <Input border={'1px solid #cccccc'} borderRadius={'2px'} readOnly size={'sm'}  backgroundColor={'#cccccc10'} type='text' defaultValue='+91' />
                            <Input ref={phone_ref} border={'1px solid #cccccc'} borderRadius={'2px'} size={'sm'}  type='number'  
                            _placeholder={{color: 'gray.500'}}
                            
                            placeholder="Enter your Phone / Mobile number" />
                        </Grid>
                        <FormErrorMessage>{err_msgs.phone}</FormErrorMessage>
                    </FormControl>

                    {/* <FormControl size='sm'>
                        <FormLabel  size={'sm'}>Upload your image</FormLabel>
                        <Input 
                            onChange={change_image} 
                            accept="image/*" 
                            border={'1px solid #cccccc'} 
                            borderRadius={'2px'} 
                            size={'sm'} 
                             
                            type='file' 
                            />
                    </FormControl>

                    <Image 
                        p={5}
                        border={'1px solid #cccccc'}
                        borderRadius={'5px'}
                        src={img_src} 
                        width={'250px'}
                    /> */}

                    
                    <Button 
                        type='reset' 
                        size='md'
                        width='100%' 
                        // colorScheme='green' 
                        backgroundColor={'red'}
                        // border='1px solid lightgreen'
                        color='white'
                        fontWeight={'bold'}
                        _hover={{backgroundColor: 'red', color: 'white' }}
                    >
                        Reset
                    </Button>
                    <Button 
                        type='submit' 
                        size='md'
                        width='100%' 
                        backgroundColor={'green'}
                        // border='1px solid lightgreen'
                        color='white'
                        fontWeight={'bold'}
                        // _hover={{backgroundColor: 'lightskyblue', color: 'black'}}
                    >
                        Submit
                    </Button>
                </Grid>
            </form>
        </Box>
    )
}