import React, {Suspense, lazy} from 'react'
import { Route, Link } from 'react-router-dom'

const TransferHome = React.lazy(() => import('@/components/transfer/TransferHome.jsx'))
const TransferUpload = lazy(() => import("@/components/transfer/Upload/Upload"));
const TransferView = lazy(() => import("@/components/transfer/DemandAndApproval/DemandAndApproval"));

export default function TransferRoutes() {
  return (
    <>
      <Route
            path="/"
            element={
              <div>
                <Link to="/transfer" style={{color: 'white'}}>Transfer</Link>
                <br />
                <Link to="/transfer/upload" style={{color: 'white'}}>Upload</Link>
                <br />
              </div>
            }
          />



          <Route path='/not' element={<NOT />} />

          <Route
            path="/transfer"
            element={
              <Suspense fallback={<div style={{color: 'white'}}>Loading...</div>}>
                <TransferHome />
              </Suspense>
            }
          />

          <Route
            path="/transfer/upload"
            element={
              <Suspense fallback={<div style={{color: 'white'}}>Loading...</div>}>
                <TransferUpload />
              </Suspense>
            }
          />

          <Route
            path="/transfer/view"
            element={
              <Suspense fallback={<div style={{color: 'white'}}>Loading...</div>}>
                <TransferView />
              </Suspense>
            }
          />
    </>
  )
}
