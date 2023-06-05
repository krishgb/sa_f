import {Route} from 'react-router-dom'
import { Suspense, lazy } from 'react'

const GrievanceForm = lazy(() => import("@/components/grievance/GrievanceForm"));

export default function BreakOfStudyRoutes() {
  return (
    <>
          <Route
            path="/grievance/new"
            element={
              <Suspense fallback={<div style={{color: 'white'}}>Loading...</div>}>
                <GrievanceForm />
              </Suspense>
            }
          />
    </>
  )
}

