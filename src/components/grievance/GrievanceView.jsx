import React, { lazy, Suspense } from 'react'

const Authorized = lazy(() => import('./GrievanceView/Authorized'))
const UnAuthorized = lazy(() => import('./GrievanceView/UnAuthorized'))

export default function GrievanceView() {

    return (
        <>
                <Suspense fallback={<div style={{ color: 'black' }}>Loading...</div>}>
                    <Authorized />
                </Suspense>
        </>
    )
}
