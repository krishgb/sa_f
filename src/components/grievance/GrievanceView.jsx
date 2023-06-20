import React, { lazy, Suspense } from 'react'

const Authorized = lazy(() => import('./GrievanceView/Authorized'))
const UnAuthorized = lazy(() => import('./GrievanceView/UnAuthorized'))

export default function GrievanceView() {

    return (
        <>
                <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                    <Authorized />
                </Suspense>
                :
                <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                    <UnAuthorized />
                </Suspense>
        </>
    )
}
