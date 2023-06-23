import React, { lazy, Suspense } from 'react'

const Authorized = lazy(() => import('@/components/name_change/NameChangeView/Authorized'))
const UnAuthorized = lazy(() => import('@/components/name_change/NameChangeView/UnAuthorized'))

export default function NameChangeView() {

    return (
        <>
            <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                <Authorized />
            </Suspense>
        </>
    )
}
