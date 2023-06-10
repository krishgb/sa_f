import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { Suspense, lazy, useState } from 'react'
import Skeleton from '@/ui/Skeleton'

const UG = lazy(() => import('./UG/UG'))
const PG = lazy(() => import('./PG/PG'))
const LE = lazy(() => import('./LE/LE'))

export default function RRAForm() {
    return (
        <>
            <Text color='white' ml={2}>
                <span style={{fontWeight: '600'}}>RRA</span>
                &nbsp;&nbsp;
                Upload New Batch
            </Text>
            <Tabs colorScheme='teal'>
                <TabList color={'white'} >
                    <Tab fontWeight={'bold'}  >UG</Tab>
                    <Tab fontWeight={'bold'}  >PG</Tab>
                    <Tab fontWeight={'bold'} >LE</Tab>
                </TabList>

                <TabPanels color={'white'}>
                    <TabPanel>
                        <Suspense fallback={<Skeleton />} >
                            <UG />
                        </Suspense>
                    </TabPanel>
                    
                    <TabPanel>
                        <Suspense fallback={<Skeleton />} >
                            <PG />
                        </Suspense>
                    </TabPanel>
                    
                    <TabPanel>
                        <Suspense fallback={<Skeleton />} >
                            <LE />
                        </Suspense>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}


// import {useState, useContext, createContext} from 'react'
// import UGEntry from './UG/UGForm';
// import LEEntry from './LE/LEForm';
// import PGEntry from './PG/PGForm';
// import {Entries} from './context'


// export default function RRA(){
//     const [admission_type, set_admission_type] = useState('ug')
    

//     return (
//         <Entries>
//             <div>
//                 <p onClick={() => set_admission_type('ug')}>UG</p>
//                 <p onClick={() => set_admission_type('le')}>LE</p>
//                 <p onClick={() => set_admission_type('pg')} >PG</p>
//             </div>

//             <input type="text" placeholder='College name'  />
//             <div style={{display: admission_type === 'ug' ? 'block' : 'none', color: 'white' }}>
//                 <UGEntry  />
//             </div>

//             <div style={{display: admission_type === 'pg' ? 'block' : 'none' }}>
//                 <PGEntry />
//             </div>

//             <div style={{display: admission_type === 'le' ? 'block' : 'none' }}>
//                 <LEEntry />
//             </div>
//         </Entries>
//     )
// }


// import { useRef, useState } from "react";
// import UGEntry from "./UGEntry";

// export default function App() {
//   const [admission_type, set_admission_type] = useState("ug");
//   const [ug_entries, set_ug_entries] = useState([]);
//   const [branch_entries, set_branch_entries] = useState([<UG />]);

//   const [data, setData] = useState({ rows: [], columns: [] });

//   const UG = (
//     <>
    
//       <input type="text" id="branch" list="branch_dl" />
//       <button
//         onClick={() => {
//           set_ug_entries([...ug_entries, <UGEntry />]);
//         }}
//       >
//         Add
//       </button>

//       <table>
//         <thead>
//           <tr>
//             <th>Application No</th>
//             <th>Quota</th>
//             <th>Name</th>
//             <th>Nationality</th>
//             <th>Community</th>
//             <th>State Board</th>
//             <th>MOB</th>
//             <th>POB</th>
//             <th>COB</th>
//             <th>Total</th>
//             <th>First Graduate</th>
//             <th>AFW</th>
//           </tr>
//         </thead>

//         <tbody>{ug_entries}</tbody>
//       </table>
//     </>
//   );

//   return (
//     <>
//       <label htmlFor="admission_type">Type</label>
//       <select
//         id="admission_type"
//         onChange={(e) => {
//           set_admission_type(e.target.value);
//         }}
//       >
//         <option value="ug">
//           FIRST YEAR B.E / B.TECH / B.ARCH DEGRXE COURSES
//         </option>
//         <option value="pg">
//           PG (M.BA/MCA/ME/M.TECH/M.ARCH/M.PLAN/M.SC) AND BSC
//         </option>
//         <option value="le">
//           LATERAL DIRECT ENTRY SECOND YEAR B.E / B.TECH
//         </option>
//       </select>

//       <br />
//       <br />
//       <br />

    

//       <label htmlFor="college">College Name</label>
//       <input type="text" id="college" list="college_dl" />

     
//       <datalist id="college_dl">
//         <option value="KLNCE">KLNCE</option>
//         <option value="KLNCIT">KLNCIT</option>
//         <option value="KLNCAS">KLNCAS</option>
//         <option value="KLNCBS">KLNCBS</option>
//         <option value="KLNCMS">KLNCMS</option>
//         <option value="KLNCME">KLNCME</option>
//         <option value="KLNCET">KLNCET</option>
//         <option value="KLNCIT">KLNCIT</option>
//       </datalist>

//       <br />
//       <br />
//       <br />

//       {admission_type === "ug" && <>
//         {branch_entries}
//       </>
//       }

//       {admission_type === "le" && (
//         <>
//           <h3 style={{ marginLeft: "1rem", marginBottom: "1rem" }}>
//             LATERAL DIRECT ENTRY SECOND YEAR B.E / B.TECH
//           </h3>
//         </>
//       )}

//       {admission_type === "pg" && (
//         <>
//           <h3 style={{ marginLeft: "1rem", marginBottom: "1rem" }}>
//             PG (M.BA/MCA/ME/M.TECH/M.ARCH/M.PLAN/M.SC) AND BSC
//           </h3>
//         </>
//       )}
//     </>
//   );
// }

// // <div style={{marginTop: "2rem"}}>

// //     <h3 style={{marginLeft: '1rem', marginBottom: '1rem'}}>RRA Application</h3>
// //     <hr style={{marginBottom: '2rem'}}/>
// //     <UploadBatchForm table_data={data} set_table_data={setData} show_del={show_del} save={save} academic_year_ref={academic_year_ref} batch_ref={batch_ref} />

// //     <div style={{height: '90vh'}}>
// //         <DataGrid
// //             sx={{
// //                 boxShadow: 2,
// //                 border: 2,
// //                 borderColor: 'transparent',
// //                 '& .MuiDataGrid-cell:hover': {
// //                   color: 'primary.main',
// //                 },
// //                 '& .MuiDataGrid-columnHeader': {
// //                     fontWeight: 600,
// //                     backgroundColor: '#cccccc80'
// //                 }
// //               }}
// //             rows={data.rows}
// //             columns={data.columns}
// //             processRowUpdate={process_row_update}
// //             onProcessRowUpdateError={e => {console.log(e);}}
// //             checkboxSelection
// //             disableRowSelectionOnClick
// //             onRowSelectionModelChange={(i,j) => {set_show_del({selected: [...i], show: !!i.length})}}

// //         />

// //     </div>

// //     <datalist id="batch">
// //         <option>Hello</option>
// //     </datalist>
// // </div>)
