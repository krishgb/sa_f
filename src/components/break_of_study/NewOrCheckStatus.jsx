import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { Suspense, lazy } from 'react'

const BreakOfStudyForm = lazy(() => import("./BreakOfStudyForm"));
const CheckStatus = lazy(() => import("./CheckStatus"));
const UploadDocuments = lazy(() => import('./UploadDocuments'))

export default function NewOrCheckStatus() {
  return (
    <>
        <Tabs color={'white'}>
            <TabList>
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
                        <BreakOfStudyForm />
                    </Suspense>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </>
  )
}
