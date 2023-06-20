import React, { lazy, Suspense } from 'react'

const Authorized = lazy(() => import('./BreakOfStudyView/Authorized'))
const UnAuthorized = lazy(() => import('./BreakOfStudyView/UnAuthorized'))

export default function BreakOfStudyView() {

    return (
        <>

                <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                    <Authorized />
                </Suspense>
        </>
    )
}
