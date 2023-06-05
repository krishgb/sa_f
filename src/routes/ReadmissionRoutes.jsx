import {Suspense, lazy} from 'react'
import { Route, Link } from 'react-router-dom'

const ReadmissionHome = lazy(() => import("@/components/readmission/ReadmissionHome"));
const ReadmissionUpload = lazy(() => import("@/components/readmission/Upload/Upload"));
const ReadmissionView = lazy(() => import("@/components/readmission/DemandAndApproval/DemandAndApproval"));


export default function ReadmissionRoutes() {
  return (
    <>
        <Route path="/"
            element={
              <div>
                <Link to="/readmission">Readmission</Link>
                <br />
                <Link to="/readmission/upload">Upload</Link>
                <br />
              </div>
            }
          />

          <Route path="/readmission"
            element={
              <Suspense fallback={<div style={{color: 'white'}}>Loading...</div>}>
                <ReadmissionHome />
              </Suspense>
            }
          />

          <Route path="/readmission/upload"
            element={
              <Suspense fallback={<div style={{color: 'white'}}>Loading...</div>}>
                <ReadmissionUpload />
              </Suspense>
            }
          />

          <Route path="/readmission/view"
            element={
              <Suspense fallback={<div style={{color: 'white'}}>Loading...</div>}>
                <ReadmissionView />
              </Suspense>
            }
          />
    
    </>
  )
}
