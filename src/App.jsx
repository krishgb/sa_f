import { lazy, Suspense, useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useGlobalContext } from './lib/global_context.jsx'

import NOT from '@/components/transfer/Upload/NotFoundModal.JSX'

import Layout from "@/ui/Layout";
import Csv from "./components/scan/csv.jsx";

const Signup = lazy(() => import("@/components/signup/Signup"));
const Login = lazy(() => import("@/components/login/Login"));

const TransferHome = lazy(() => import('@/components/transfer/TransferHome.jsx'))
const TransferUpload = lazy(() => import("@/components/transfer/Upload/Upload"));
const TransferView = lazy(() => import("@/components/transfer/DemandAndApproval/DemandAndApproval"));

const NameChangeForm = lazy(() => import("@/components/name_change/NameChangeForm"));
const NameChangeView = lazy(() => import("@/components/name_change/NameChangeView"));

const ReadmissionHome = lazy(() => import("@/components/readmission/ReadmissionHome"));
const ReadmissionUpload = lazy(() => import("@/components/readmission/Upload/Upload"));
const ReadmissionView = lazy(() => import("@/components/readmission/DemandAndApproval/DemandAndApproval"));

// const NameChangeForm = lazy(() => import("@/components/name_change/NameChangeForm"));
const GrievanceForm = lazy(() => import("@/components/grievance/GrievanceForm"));

const BreakOfStudyForm = lazy(() => import("@/components/break_of_study/BreakOfStudyForm"));
const BreakOfStudyHome = lazy(() => import("@/components/break_of_study/BreakOfStudyHome"));

// ADMIN
const AddUser = lazy(() => import('@/components/admin/AddUser.jsx'))

const RRAHome = lazy(() => import("@/components/rra/RRAForm"));


function App() {
  const { global_user, global_allowed_routes, global_is_admin } = useGlobalContext();

  const [authorized, set_authorized] = useState({
    transfer: false,
    readmission: false,
    break_of_study: false,
    name_change: false,
    rra: false,
    grievance: false,
    admin: false
  })

  useEffect(() => {
    const obj = {}
    for (const route of global_allowed_routes) {
      obj[route] = true
    }
    if(global_is_admin) obj['admin'] = true
    set_authorized(obj)
  }, [global_user, global_allowed_routes, global_is_admin])

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/"
            element={
              <div>
                <Link to="/signup" style={{ color: 'white' }}>Signup</Link>
                <br />
                <Link to="/login" style={{ color: 'white' }}>Login</Link>
                <br />
              </div>
            }
          />

          <Route path="/signup"
            element={
              <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                <Signup />
              </Suspense>
            }
          />

          <Route path="/login"
            element={
              <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                <Login />
              </Suspense>
            }
          />

          {/* Transfer Routes */}
          <>
            <Route
              path="/"
              element={
                <div>
                  <Link to="/transfer" style={{ color: 'white' }}>Transfer</Link>
                  <br />
                  <Link to="/transfer/upload" style={{ color: 'white' }}>Upload</Link>
                  <br />
                </div>
              }
            />



            <Route path='/not' element={<NOT />} />

            <Route
              path="/transfer"
              element={
                authorized.transfer ?
                  <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                    <TransferHome />
                  </Suspense>
                  :
                  <></>
              }
            />

            <Route
              path="/transfer/upload"
              element={
                authorized.transfer ?
                  <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                    <TransferUpload />
                  </Suspense>
                  : <></>
              }
            />

            <Route
              path="/transfer/view"
              element={
                authorized.transfer ?
                  <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                    <TransferView />
                  </Suspense>
                  :
                  <></>
              }
            />
          </>

          {/* Name Change Routes */}
          <>
            <Route
              path="/name_change/new"
              element={
                authorized.name_change ?
                  <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                    <NameChangeForm />
                  </Suspense>
                  :
                  <></>
              }
            />

            <Route
              path="/name_change/view"
              element={
                  <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                    <NameChangeView authorized={authorized.name_change} />
                  </Suspense>
              }
            />

          </>

          {/* Readmission Routes */}
          <>

            <Route path="/readmission"
              element={
                authorized.readmission ?
                  <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                    <ReadmissionHome />
                  </Suspense>
                  : <></>
              }
            />

            <Route path="/readmission/upload"
              element={
                authorized.readmission ?
                  <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                    <ReadmissionUpload />
                  </Suspense>
                  : <></>
              }
            />

            <Route path="/readmission/view"
              element={
                authorized.readmission ?
                  <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                    <ReadmissionView />
                  </Suspense>
                  : <></>
              }
            />

          </>

          {/* RRA Routes  */}
          <>
              <Route path="/rra"
              element={
                !authorized.rra ?
                <></>
                :
                <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                  <RRAHome />
                </Suspense>
              }
              />
          </>


          {/* Name Change Routes */}

          <>
            <Route
              path="/name_change/new"
              element={
                authorized.rra ?
                  <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                    <NameChangeForm />
                  </Suspense>
                  :
                  <></>
              }
            />
          </>


          {/* Grievance */}
          <>
            <Route
              path="/grievance/new"
              element={
                authorized.grievance ?
                  <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                    <GrievanceForm />
                  </Suspense>
                  : <></>
              }
            />
          </>

          {/* Break of Study */}
          <>
            <Route path="/break_of_study/new"
              element={
                authorized.break_of_study ?
                  <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                    <BreakOfStudyForm />
                  </Suspense>
                  :
                  <></>
              }
            />

            <Route path="/break_of_study/view"
              element={
                authorized.break_of_study ?
                  <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                    <BreakOfStudyHome />
                  </Suspense>
                  :
                  <></>
              }
            />
          </>
            {/**CSV Route */}
            <>
            <Route path="/scan"
            element={
              <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                <Csv />
              </Suspense>
            }
          />
            </>

          {/* ADMIN Routes */}
          <>
            <Route path="/add_user"
              element={
                authorized.admin ?
                  <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                    <AddUser />
                  </Suspense>
                  :
                  <></>
              }
            />
          </>

        </Routes>
      </Layout>
    </>
  );
}



export default App;