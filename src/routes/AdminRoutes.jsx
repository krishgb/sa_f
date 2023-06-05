import React, {Suspense, lazy} from 'react'
import { Route, Link } from 'react-router-dom'

const AddUser = lazy(() => import('@/components/admin/AddUser.jsx'))

export default function AdminRoutes() {
  return (
    <>        
        <Route path="/add_user"
            element={
                <Suspense fallback={<div style={{color: 'white'}}>Loading...</div>}>
                <AddUser />
                </Suspense>
            }
        />
    </>
  )
}
