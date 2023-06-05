import { Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

const BreakOfStudyForm = lazy(() => import("@/components/break_of_study/BreakOfStudyForm"));
const BreakOfStudyHome = lazy(() => import("@/components/break_of_study/BreakOfStudyHome"));

export default function BreakOfStudyRoutes() {
    return (
        <>
            <Route path="/break_of_study/new"
                element={
                    <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                        <BreakOfStudyForm />
                    </Suspense>
                }
            />

            <Route path="/break_of_study/view"
                element={
                    <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                        <BreakOfStudyHome />
                    </Suspense>
                }
            />
        </>
    )
}

