import {Suspense, lazy, useEffect} from 'react'
import { Box, Button, Flex, Grid, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, Text, useSteps } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Data } from './context';

const AcademicDetails = lazy(() => import('./FormSteps/AcademicDetails'))
const BreakOfStudyDetails = lazy(() => import('./FormSteps/BreakOfStudyDetails'))
const Reason = lazy(() => import('./FormSteps/Reason'))

export default function BreakOfStudyForm() {
    
    const steps = [
        { title: 'First', description: 'Academic Details' },
        { title: 'Second', description: 'Break of Study Details' },
        { title: 'Last', description: 'Reason' },
    ]

    const { activeStep, goToNext, goToPrevious, setActiveStep } = useSteps({
        index: 1,
        count: steps.length,
    })

    useEffect(() => {
        if(activeStep === 0)
        setActiveStep(1)
    }, [activeStep])

    return (
        <Data>
            <Box>
                <Text color='white' textAlign={'center'} mt={4} fontSize={'1.2rem'}>Break of Study Application</Text>
                <Stepper index={activeStep} size={'sm'} w={'70%'} m={'auto'} mt={4}>
                    {steps.map((step, index) => (
                        <Step key={index} >
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                    />
                            </StepIndicator>

                            <Box flexShrink='0'>
                                <StepTitle style={{color: 'white'}}>{step.title}</StepTitle>
                                <StepDescription style={{color: '#ffffff60'}}>{step.description}</StepDescription>
                            </Box>

                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>

                <Flex  alignItems={'center'} width='910px' margin='auto' mt={1}>
                    
                    <Button onClick={goToPrevious}>
                        <ChevronLeftIcon/>
                    </Button>

                    {
                        activeStep === 1 && (
                            <Suspense fallback={<>Loading...</>} >
                                <AcademicDetails />
                            </Suspense>
                        )
                    }

                    {
                        activeStep === 2 && (
                            <Suspense fallback={<>Loading...</>} >
                                <BreakOfStudyDetails />
                            </Suspense>
                        )
                    }

                    {
                        activeStep === 3 && (
                            <Suspense fallback={<>Loading...</>} >
                                <Reason />
                            </Suspense>
                        )
                    }

                    <Button onClick={goToNext}>
                        <ChevronRightIcon />
                    </Button>

                </Flex>

            </Box>
        </Data>
    )
}
