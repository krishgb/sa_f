import { lazy, Suspense, useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useGlobalContext } from './lib/global_context.jsx'

import NOT from '@/components/transfer/Upload/NotFoundModal.JSX'

import Layout from "@/ui/Layout";
import Csv from "./components/scan/csv.jsx";

const Signup = lazy(() => import("@/components/signup/Signup"));
const Login = lazy(() => import("@/components/login/Login"));
const ChangePassword = lazy(() => import("@/components/profile/ChangePassword"));

const TransferHome = lazy(() => import('@/components/transfer/TransferHome.jsx'))
const TransferUpload = lazy(() => import("@/components/transfer/Upload/Upload"));
const TransferView = lazy(() => import("@/components/transfer/DemandAndApproval/DemandAndApproval"));
const AddTransferData = lazy(() => import("@/components/transfer/AddTransferData.jsx"));

const NameChangeNewOrCheckStatus = lazy(() => import("@/components/name_change/NewOrCheckStatus"));
const NameChangeView = lazy(() => import("@/components/name_change/NameChangeView"));

const ReadmissionHome = lazy(() => import("@/components/readmission/ReadmissionHome"));
const ReadmissionUpload = lazy(() => import("@/components/readmission/Upload/Upload"));
const ReadmissionView = lazy(() => import("@/components/readmission/DemandAndApproval/DemandAndApproval"));

const GrievanceForm = lazy(() => import("@/components/grievance/NewOrCheckStatus"));
const GrievanceView = lazy(() => import("@/components/grievance/GrievanceView"));

const BreakOfStudyForm = lazy(() => import("@/components/break_of_study/NewOrCheckStatus"));
const BreakOfStudyHome = lazy(() => import("@/components/break_of_study/BreakOfStudyView"));

// ADMIN
const AddUser = lazy(() => import('@/components/admin/AddUser.jsx'))

const RRAUpload = lazy(() => import("@/components/rra/RRAUpload"));
const RRAView = lazy(() => import("@/components/rra/DemandAndApproval/DemandAndApproval"));
const RRAHome = lazy(() => import("@/components/rra/RRAHome"));

// Homepage
const Homepage = lazy(() => import("@/ui/Homepage"));


function App() {
  const { global_user, global_allowed_routes, global_is_admin, global_is_college } = useGlobalContext();

  const [authorized, set_authorized] = useState({
    transfer: false,
    readmission: false,
    break_of_study: false,
    name_change: false,
    rra: false,
    grievance: false,
    admin: false,
    college: false,
  })

  useEffect(() => {
    const obj = {}
    for (const route of global_allowed_routes) {
      obj[route] = true
    }
    if (global_is_admin) obj['admin'] = true
    else if (global_is_college) obj['college'] = true
    set_authorized(obj)
  }, [global_user, global_allowed_routes, global_is_admin, global_is_college])

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/"
            element={
              <div>
                  <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                    <Homepage />
                  </Suspense>
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

          <Route path="/change_password"
            element={
              <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                <ChangePassword />
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

            <Route
              path="/transfer/add"
              element={
                // authorized.transfer ?
                  <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                    <AddTransferData />
                  </Suspense>
                  // :
                  // <></>
              }
            />


          </>

          {/* Name Change Routes */}
          <>
            <Route
              path="/name_change/new_or_check_status"
              element={
                (authorized.name_change || authorized.college) ?
                  <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                    <NameChangeNewOrCheckStatus />
                  </Suspense>
                  :
                <></>
              }
            />

            <Route
              path="/name_change/view"
              element={
                authorized.name_change ?
                <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                  <NameChangeView authorized={authorized.name_change} />
                </Suspense>
                :
                <></>
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


            <Route path="/rra/upload"
              element={
                !authorized.rra ?
                  <></>
                  :
                  <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                    <RRAUpload />
                  </Suspense>
              }
            />


            <Route path="/rra/view"
              element={
                !authorized.rra ?
                  <></>
                  :
                  <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                    <RRAView />
                  </Suspense>
              }
            />
          </>

          {/* Grievance */}
          <>
            <Route
              path="/grievance/new_or_check_status"
              element={
                  <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                    <GrievanceForm/>
                  </Suspense>
              }
            />
             <Route
              path="/grievance/view"
              element={
                authorized.grievance ?
                <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
                  <GrievanceView />
                </Suspense>
                :
                <></>
              }
            />
          </>

          {/* Break of Study */}
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