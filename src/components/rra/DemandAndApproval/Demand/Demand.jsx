import {Divider, Grid } from '@chakra-ui/react'
import React, { Suspense, lazy } from 'react'
const DemandTable = lazy(() => import('./DemandTable'))

export default function Demand() {

    return (
        <Grid gap={12}>
            <Suspense fallback={<div>Loading...</div>}>
                <DemandTable admission_type='ug' />
            </Suspense>

            <Divider />

            <Suspense fallback={<div>Loading...</div>}>
                <DemandTable admission_type='pg' />
            </Suspense>

            <Divider />

            <Suspense fallback={<div>Loading...</div>}>
                <DemandTable admission_type='le' />
            </Suspense>

        </Grid>
    )
}

