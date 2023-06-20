import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Grid, Input, Text, Alert, AlertTitle, AlertIcon } from '@chakra-ui/react'
import React, { memo, useCallback, useRef, useState } from 'react'
import {getPDF} from './ApplicationPdf'

function NameChangeForm() {
    const [status, set_status] = useState({
        type: '',
        desc: ''
    })

    const [form, setForm] = useState({
        old_name: '',
        register_no: '',
        course: '',
        branch: '',
        sem: '',
        institution: '',
        new_name: '',
        gazette_page_no: '',
        gazette_release_date: '',
        email_id: '',
        phone: '',
        dd_no: '123456',
        dd_branch: 'Anna Nagar',
        dd_bank: 'SBI',
        dd_date: '2021-08-01',
        date: `${(new Date()).getDate()}/${(new Date()).getMonth() + 1}/${(new Date()).getFullYear()}`,
        price: 1500
    })

    const pdf_ref = useRef(null)
    const pdf_callback = useCallback(async () => await getPDF(form), [form])

    const submit = async (e) => {
        e.preventDefault();

        set_status({
            type: 'loading',
            desc: 'Your request is being processed...'
        })

        try {
            const req = await fetch('/api/name_change/pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form),
                credentials: 'include'
            })

            const res = await req.json()

            if (res.success) {
                set_status({
                    type: 'success',
                    desc: 'Your request has been submitted successfully'
                })
                pdf_ref.current.href = await pdf_callback()
                pdf_ref.current.download = `${res.reference_id}.pdf`
                pdf_ref.current.click()
                
            }else{
                set_status({
                    type: 'error',
                    desc: res.msg
                })
            }
            
            
        }
        catch (err) {
            console.log(err)
            set_status({
                type: 'error',
                desc: 'Something went wrong. Please try again later'
            })
        }


      

    }

    const change = (key, value) => {
        setForm({ ...form, [key]: value })
    }

    return (
        <>
            {
                (status.type === 'error' || status.type === 'success' || status.type === 'loading' )
                ?
                <Alert status={status.type}>
                    <AlertIcon />
                    <AlertTitle>{status.desc}</AlertTitle>
                </Alert>
                :
                <></>
            }
            <Text
                color='#fff'
                textAlign={'center'}
                mb={4}
                fontSize={'1.2rem'}
            >
                Name Change Application
            </Text>
            <Grid w={'50%'} m='auto' gap={1}>

                {/* <Text style={{color: 'white'}}>Visit this&nbsp;<a style={{textDecoration: 'underline', color: 'blue'}} target='_blank' href='https://www.annauniv.edu/dsa/assets/downloads/Application-Name%20Change.pdf'>link</a>&nbsp;to fill the form and upload it <a href='#signed_document' style={{color: 'blue', textDecoration: 'underline'}}>here</a>.</Text> */}
                <form onSubmit={submit}>

                    <Grid
                        gap={'2rem'}
                        m={'auto'}
                        alignItems={'end'}
                        p={3}
                        border={'1px solid #cccccc50'}
                        borderRadius={'5px'}
                        color='white'
                    >
                        <Flex gap={12} justifyContent={'space-between'}>
                            <FormControl size='sm' isRequired isInvalid={false}>
                                <FormLabel size='sm' fontSize={'14px'}>Student Name</FormLabel>
                                <Input 
                                    border='1px solid #cccccc50' 
                                    fontSize={'14px'} 
                                    size='sm' 
                                    placeholder='Name'
                                    onChange={(e) => { e.target.value = e.target.value.toUpperCase(); change('old_name', e.target.value.toUpperCase()) }}
                                />
                                <FormErrorMessage>Enter Student Name</FormErrorMessage>
                            </FormControl>

                            <FormControl size='sm' isRequired>
                                <FormLabel size='sm' fontSize={'14px'}>Roll / Register number</FormLabel>
                                <Input 
                                    border='1px solid #cccccc50' 
                                    fontSize={'14px'} 
                                    size='sm' 
                                    placeholder='Roll / Register number' 
                                    onChange={(e) => { change('register_no', e.target.value) }} />
                            </FormControl>
                        </Flex>

                        <Flex gap={12} justifyContent={'space-between'}>
                            <FormControl size='sm' isRequired>
                                <FormLabel size='sm' fontSize={'14px'}>Institution Name</FormLabel>
                                <Input 
                                    border='1px solid #cccccc50' 
                                    fontSize={'14px'} 
                                    size='sm' 
                                    placeholder='Institution Name' 
                                    onChange={(e) => { change('institution', e.target.value) }} 
                                />
                            </FormControl>

                            <FormControl size='sm' isRequired>
                                <FormLabel size='sm' fontSize={'14px'}>Course</FormLabel>
                                <Input 
                                    border='1px solid #cccccc50' 
                                    fontSize={'14px'} 
                                    size='sm' 
                                    placeholder='Course' 
                                    onChange={(e) => { change('course', e.target.value) }} 
                                />
                            </FormControl>
                        </Flex>

                        <Flex gap={12} justifyContent={'space-between'}>
                            <FormControl size='sm' isRequired>
                                <FormLabel size='sm' fontSize={'14px'}>Branch</FormLabel>
                                <Input 
                                    border='1px solid #cccccc50' 
                                    fontSize={'14px'} size='sm' 
                                    placeholder='Branch' 
                                    onChange={(e) => { change('branch', e.target.value) }} 
                                />
                            </FormControl>

                            <FormControl size='sm' isRequired>
                                <FormLabel size='sm' fontSize={'14px'}>Semester</FormLabel>
                                <Input 
                                    border='1px solid #cccccc50' 
                                    fontSize={'14px'} 
                                    size='sm' 
                                    placeholder='Semester' 
                                    onChange={(e) => { change('sem', e.target.value) }} 
                                />
                            </FormControl>
                        </Flex>

                        <Flex gap={12} justifyContent={'space-between'}>
                            <FormControl size='sm' isRequired>
                                <FormLabel size='sm' fontSize={'14px'}>New Name (in CAPITAL LETTERS)</FormLabel>
                                <Input 
                                    border='1px solid #cccccc50' 
                                    fontSize={'14px'} 
                                    size='sm' 
                                    placeholder='New Name' 
                                    onChange={(e) => { e.target.value = e.target.value.toUpperCase(); change('new_name', e.target.value.toUpperCase()) }}

                                />
                            </FormControl>

                            <FormControl size='sm' isRequired>
                                <FormLabel size='sm' fontSize={'14px'}>Email ID</FormLabel>
                                <Input 
                                    border='1px solid #cccccc50' 
                                    fontSize={'14px'} 
                                    size='sm' 
                                    placeholder='Email ID' 
                                    type='email' 
                                    onChange={(e) => { change('email_id', e.target.value) }} 
                                />
                            </FormControl>

                        </Flex>

                        <Flex gap={12} justifyContent={'space-between'}>
                            <FormControl size='sm' isRequired>
                                <FormLabel size='sm' fontSize={'14px'}>Phone / Mobile number</FormLabel>
                                <Input 
                                    border='1px solid #cccccc50' 
                                    fontSize={'14px'} 
                                    size='sm' 
                                    placeholder='Phone / Mobile number' 
                                    type='number' 
                                    onChange={(e) => { change('phone', e.target.value) }} 
                                />
                            </FormControl>

                            <FormControl size='sm' isRequired>
                                <FormLabel size='sm' fontSize={'14px'}>Tamil Nadu Government Gazette Page No. (that includes the name change)</FormLabel>
                                <Input 
                                    border='1px solid #cccccc50' 
                                    fontSize={'14px'} 
                                    size='sm' 
                                    placeholder='Gazette Page No' 
                                    onChange={(e) => { change('gazette_page_no', e.target.value) }} 
                                />
                            </FormControl>
                        </Flex>

                        <Flex gap={12} justifyContent={'space-between'}>

                            <FormControl size='sm' isRequired>
                                <FormLabel size='sm' fontSize={'14px'}>Date of release of Gazette</FormLabel>
                                <Input 
                                    fontSize={'14px'} 
                                    border={'1px solid #cccccc50'} 
                                    size='sm' 
                                    placeholder='Date of release of Gazette' 
                                    type='date' 
                                    onChange={(e) => { change('gazette_release_date', e.target.value) }} 
                                />
                            </FormControl>

                        </Flex>

                        <Flex gap={12} >
                            <Button
                                type='reset'
                                size='sm'
                                backgroundColor={'white'}
                                color='black'
                                border='1px solid #cccccc50'
                                fontWeight={'normal'}
                                w='100%'
                            >
                                Reset
                            </Button>
                            <Button
                                type='submit'
                                size='sm'
                                colorScheme='green'
                                fontWeight={'normal'}
                                w='100%'
                            >
                                Submit
                            </Button>
                        </Flex>
                    </Grid>

                </form>
            </Grid>

            <a ref={pdf_ref} download='Name Change application PDF.pdf' href='#' style={{ display: 'none' }}></a>
        </>
    )
}


export default memo(NameChangeForm)
