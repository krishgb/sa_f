import {Divider, Grid } from '@chakra-ui/react'
import React, { Suspense, lazy } from 'react'
const ApprovalTable = lazy(() => import('./ApprovalTable'))

export default function Approval() {

    return (
        <Grid gap={12}>
            <Suspense fallback={<div>Loading...</div>}>
                <ApprovalTable admission_type='ug' />
            </Suspense>

            <Divider />

            <Suspense fallback={<div>Loading...</div>}>
                <ApprovalTable admission_type='pg' />
            </Suspense>

            <Divider />

            <Suspense fallback={<div>Loading...</div>}>
                <ApprovalTable admission_type='le' />
            </Suspense>

        </Grid>
    )
}
