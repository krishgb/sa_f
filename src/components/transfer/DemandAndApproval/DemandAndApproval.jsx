import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { Suspense, lazy } from 'react'
import Skeleton from '@/ui/Skeleton'

const Demand = lazy(() => import('./Demand/Demand'))
const Approval = lazy(() => import('./Approval/Approval'))

export default function DemandAndApproval() {
  return (
    <>
        <Tabs position="relative" colorScheme='teal' width={'95%'} m='auto'>
            
            <TabList >
                <Tab>Demand</Tab>
                <Tab>Approval</Tab>
            </TabList>
            
            <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="teal.500"
                borderRadius="1px"
            />

            <TabPanels>
                <TabPanel>
                    <Suspense fallback={<Skeleton />}>
                        <Demand />
                    </Suspense>
                </TabPanel>

                <TabPanel>
                <Suspense fallback={<Skeleton />}>
                        <Approval />
                    </Suspense>
                </TabPanel>
        </TabPanels>
        </Tabs>

    
    </>
  )
}
