import { Divider, Grid, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { Suspense, lazy, useEffect, useState } from 'react'

const RRAUploadTable = lazy(() => import('./RRAUploadTable'))


export default function RRAUpload() {
    const [admission_type, set_admission_type] = useState('ug')


    return (
        <>
            <Text 
                color='black' 
                width={'95%'} 
                m='auto'
                mb={2}
            >
                <b>RRA</b> &nbsp;&nbsp;/&nbsp;&nbsp; 
                Upload new batch
            </Text>
            <Divider 
                borderColor={'teal'}
                width={'95%'} 
                m='auto'
                mb={2}
            />
            <RadioGroup 
                defaultValue='ug' 
                onChange={(e)=>{set_admission_type(e)}}
                color='black' 
                width={'95%'} 
                m='auto'
                mb={2}
            >
                <Stack spacing={5} direction='row'>
                    <Radio color='black' colorScheme='blue' value='ug'>
                        <Text color='black'>UG</Text>
                    </Radio>
                    <Radio color='black' colorScheme='blue' value='pg'>
                        <Text color='black'>PG</Text>
                    </Radio>
                    <Radio color='black' colorScheme='blue' value='le'>
                        <Text color='black'>LE</Text>
                    </Radio>
                </Stack>
            </RadioGroup>

            <Suspense fallback={<div>Loading...</div>}>
                <RRAUploadTable admission_type={admission_type} />
            </Suspense>
        </>
    )
}
