import { Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

const NameChangeForm = lazy(() => import("@/components/name_change/NameChangeForm"));

export default function BreakOfStudyRoutes() {
    return (
        <>
            <Route
                path="/name_change/new"
                element={
                    <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                        <NameChangeForm />
                    </Suspense>
                }
            />
        </>
    )
}

