import { lazy, Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";

import NOT from '@/components/transfer/Upload/NotFoundModal.JSX'

import Layout from "@/ui/Layout";
// import * as dfd from '@/lib/danfo/bundle.esm.js'

/**
 * The main application component.
 *
 * @component
 * @returns {JSX.Element} The JSX element representing the App.
 */
function App() {
  return (
    <>
      <Layout>
        <Routes>

          {/*  // ------------------------| Transfer |------------------------ // */}
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

          <Route
            path="/add_user"
            element={
              <Suspense fallback={<div style={{color: 'white'}}>Loading...</div>}>
                <AddUser />
              </Suspense>
            }
          />

          <Route
            path="/signup"
            element={
              <Suspense fallback={<div style={{color: 'white'}}>Loading...</div>}>
                <Signup />
              </Suspense>
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

          {/*  // ------------------------| readmission |------------------------ // */}
          {/* <Route
            path="/"
            element={
              <div>
                <Link to="/readmission">Readmission</Link>
                <br />
                <Link to="/readmission/upload">Upload</Link>
                <br />
              </div>
            }
          />

          <Route
            path="/readmission"
            element={
              <Suspense fallback={<div style={{color: 'white'}}>Loading...</div>}>
                <ReadmissionHome />
              </Suspense>
            }
          />

          <Route
            path="/readmission/upload"
            element={
              <Suspense fallback={<div style={{color: 'white'}}>Loading...</div>}>
                <ReadmissionUpload />
              </Suspense>
            }
          />

          <Route
            path="/readmission/view"
            element={
              <Suspense fallback={<div style={{color: 'white'}}>Loading...</div>}>
                <ReadmissionView />
              </Suspense>
            }
          /> */}

          {/*  // ------------------------| Break of Study |------------------------ // */}
          <Route
            path="/break_of_study/new"
            element={
              <Suspense fallback={<div style={{color: 'white'}}>Loading...</div>}>
                <BreakOfStudyForm />
              </Suspense>
            }
          />

          <Route
            path="/break_of_study/view"
            element={
              <Suspense fallback={<div style={{color: 'white'}}>Loading...</div>}>
                <BreakOfStudyForm />
              </Suspense>
            }
          />

          {/*  // ------------------------| Name Change |------------------------ // */}

          <Route
            path="/name_change/new"
            element={
              <Suspense fallback={<div style={{color: 'white'}}>Loading...</div>}>
                <NameChangeForm />
              </Suspense>
            }
          />


          {/*  // ------------------------| Grievance |------------------------ // */}

          <Route
            path="/grievance/new"
            element={
              <Suspense fallback={<div style={{color: 'white'}}>Loading...</div>}>
                <GrievanceForm />
              </Suspense>
            }
          />
        </Routes>
      </Layout>
    </>
  );
}

// ------------------------| Transfer |------------------------ //

/**
 * The Transfer Home component.
 *
 * @component
 * @returns {JSX.Element} The JSX element representing the TransferHome component.
 */
const TransferHome = lazy(() => import("@/components/transfer/TransferHome"));

/**
 * The Transfer Upload component.
 *
 * @component
 * @returns {JSX.Element} The JSX element representing the TransferUpload component.
 */
const TransferUpload = lazy(() => import("@/components/transfer/Upload/Upload"));

/**
 * The Transfer View component.
 *
 * @component
 * @returns {JSX.Element} The JSX element representing the TransferView component.
 */
const TransferView = lazy(() => import("@/components/transfer/DemandAndApproval/DemandAndApproval"));


// ------------------------| Readmission |------------------------ //

/**
 * The Readmission Home component.
 *
 * @component
 * @returns {JSX.Element} The JSX element representing the ReadmissionHome component.
 */
// const ReadmissionHome = lazy(() => import("@/components/readmission/ReadmissionHome"));

// /**
//  * The Readmission Upload component.
//  *
//  * @component
//  * @returns {JSX.Element} The JSX element representing the ReadmissionUpload component.
//  */
// const ReadmissionUpload = lazy(() => import("@/components/readmission/Upload/Upload"));

// /**
//  * The Readmission View component.
//  *
//  * @component
//  * @returns {JSX.Element} The JSX element representing the ReadmissionView component.
//  */
// const ReadmissionView = lazy(() => import("@/components/readmission/DemandAndApproval/DemandAndApproval"));


// ------------------------| Break of Study |------------------------ //

/**
 * The Break of Study Form component.
 *
 * @component
 * @returns {JSX.Element} The JSX element representing the BreakOfStudyForm component.
 */
const BreakOfStudyForm = lazy(() => import("@/components/break_of_study/BreakOfStudyForm"));



// ------------------------| Name Change |------------------------ //

/**
 * The Name Change Form component.
 *
 * @component
 * @returns {JSX.Element} The JSX element representing the NameChangeForm component.
 */
const NameChangeForm = lazy(() => import("@/components/name_change/NameChangeForm"));



// ------------------------| Grievance |------------------------ //

/**
 * The Grievance Form component.
 *
 * @component
 * @returns {JSX.Element} The JSX element representing the NameChangeForm component.
 */
const GrievanceForm = lazy(() => import("@/components/grievance/GrievanceForm"));


/**
 * The Add User component.
 *
 * @component
 * @returns {JSX.Element} The JSX element representing the NameChangeForm component.
 */
const AddUser = lazy(() => import("@/components/admin/AddUser"));

/**
 * The Add User component.
 *
 * @component
 * @returns {JSX.Element} The JSX element representing the NameChangeForm component.
 */
const Signup = lazy(() => import("@/components/signup/Signup"));

export default App;
