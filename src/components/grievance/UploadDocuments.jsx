import { Alert, AlertDescription, AlertIcon, AlertTitle, Button, Flex, FormControl, FormLabel, Grid, Input } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import {base64} from '@/lib/base64'

export default function UploadDocuments() {
    const [status, setStatus] = useState({
        type: '',
        desc: ''
    })
    const app_id = useRef(null)
    const attachments = useRef(null)

    const submit = async (e) => {
        e.preventDefault()

        if(app_id.current.value.trim().length === 0){
            setStatus({
                type: 'error',
                desc: 'Application ID is required'
            })
            return
        }

        if(attachments.current.files.length === 0){
            setStatus({
                type: 'error',
                desc: 'attachments file is required'
            })
            return 
        }

        // if pdf size is greater than 1mb set status as error
       

        // if pdf size is greater than 10mb set status as error
        if(attachments.current.files[0].size > 10000000){
            setStatus({
                type: 'error',
                desc: 'attachments file size should be less than 10mb'
            })
            return
        }

        setStatus({
            type: 'loading',
            desc: 'Uploading Documents...'
        })

        try{
            const request = await fetch('/api/grievance/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    app_id: app_id.current.value,
                    attachments: await base64(attachments.current.files[0])
                })
            ,credentials: 'include'})
    
            const response = await request.json()
            setStatus({
                type: response.success ? 'success' : 'error',
                desc: response.success ? 'Documents uploaded successfully' : response.msg
            })
        }catch(e){
            setStatus({
                type: 'error',
                desc: 'Something went wrong. Please try again later'
            })
        }

    }
  return (
    <form onSubmit={submit}>

        {
            status.type === 'error' || status.type === 'success' || status.type === 'loading' ?
            <Alert status={status.type}>
                <AlertIcon />
                <AlertTitle>{status.desc}</AlertTitle>
            </Alert>
            :
            <></>
        }
        <Grid gap={4}  placeItems={'center'} p={10} border={'1px solid #cccccc50'}  borderRadius={'5px'} color={'white'}>

            <FormControl>
                <FormLabel>Application ID</FormLabel>
                <Input type='text' ref={app_id} size='sm' border={'1px solid #cccccc50'} placeholder='Enter your application ID' width={'100%'} color='white' />
            </FormControl>
         
            <FormControl>
                <FormLabel>Attachments</FormLabel>
                <Input accept='application/pdf' type='file' ref={attachments} size='sm' border={'1px solid #cccccc50'} placeholder='Upload your documents' color='white' />
            </FormControl>
            <center>
                <Button type='submit' colorScheme='blue'>Submit</Button>
            </center>
        </Grid>
    </form>
  )
}
