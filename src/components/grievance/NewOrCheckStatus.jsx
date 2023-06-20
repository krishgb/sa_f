import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { Suspense, lazy } from 'react'

const GrievanceForm = lazy(() => import("./GrievanceForm"));
const CheckStatus = lazy(() => import("./CheckStatus"));
const UploadDocuments = lazy(() => import('./UploadDocuments'))

export default function NewOrCheckStatus() {
  return (
    <>
        <Tabs>
            <TabList color={'white'}>
                <Tab>Check Status</Tab>
                <Tab>Upload Documents</Tab>
                <Tab>New</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <Suspense fallback={<>Loading...</>}>
                        <CheckStatus />
                    </Suspense>
                </TabPanel>

                <TabPanel>
                    <Suspense fallback={<>Loading...</>}>
                        <UploadDocuments />
                    </Suspense>
                </TabPanel>
                
                <TabPanel>
                    <Suspense fallback={<>Loading...</>}>
                        <GrievanceForm />
                    </Suspense>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </>
  )
}
