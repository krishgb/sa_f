import React, { lazy, Suspense } from 'react'

const Authorized = lazy(() => import('@/components/name_change/NameChangeView/Authorized'))
const UnAuthorized = lazy(() => import('@/components/name_change/NameChangeView/UnAuthorized'))

export default function NameChangeView({ authorized }) {

    return (
        <>
            {authorized ?
                <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                    <Authorized />
                </Suspense>
                :
                <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                    <UnAuthorized />
                </Suspense>
            }
        </>
    )
}
