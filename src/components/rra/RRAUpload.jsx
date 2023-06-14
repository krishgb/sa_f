import { Divider, Grid, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { Suspense, lazy, useEffect, useState } from 'react'

const RRAUploadTable = lazy(() => import('./RRAUploadTable'))


export default function RRAUpload() {
    const [admission_type, set_admission_type] = useState('ug')


    return (
        <>
            <Text 
                color='white' 
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
                color='white' 
                width={'95%'} 
                m='auto'
                mb={2}
            >
                <Stack spacing={5} direction='row'>
                    <Radio color='white' colorScheme='blue' value='ug'>
                        <Text color='white'>UG</Text>
                    </Radio>
                    <Radio color='white' colorScheme='blue' value='pg'>
                        <Text color='white'>PG</Text>
                    </Radio>
                    <Radio color='white' colorScheme='blue' value='le'>
                        <Text color='white'>LE</Text>
                    </Radio>
                </Stack>
            </RadioGroup>

            <Suspense fallback={<div>Loading...</div>}>
                <RRAUploadTable admission_type={admission_type} />
            </Suspense>
        </>
    )
}
