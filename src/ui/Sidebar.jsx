import {
    Grid, 
    Text,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

export default function Sidebar({ isOpen, onClose, btnRef }) {


    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent
                    backgroundColor={'blackAlpha.800'}
                    color='white'
                >
                    <DrawerCloseButton />
                    <DrawerHeader alignItems={'center'} fontSize={'1.4rem'}>Student Affairs</DrawerHeader>

                    <DrawerBody>
                        <Grid
                            gap={12}
                            alignItems={'center'}
                            mt={10}
                        >

                            <Text
                                as={NavLink}
                                to='/transfer/demand'

                                pl={4}
                                size={'sm'}
                                onClick={onClose}
                                fontSize={'1.15rem'}
                                border={'1px solid white'}
                                padding={2}
                                borderRadius={5}
                                _hover={{ backgroundColor: 'white', color: 'black' }}
                            >
                                Transfer
                            </Text>

                            <Text
                                as={NavLink}
                                to='/readmission/demand'

                                pl={4}
                                size={'sm'}
                                onClick={onClose}
                                fontSize={'1.15rem'}
                                border={'1px solid white'}
                                padding={2}
                                borderRadius={5}
                                _hover={{ backgroundColor: 'white', color: 'black' }}
                            >
                                Readmission
                            </Text>

                            <Text
                                as={NavLink}
                                to='/rcumt/demand'

                                pl={4}
                                size={'sm'}
                                onClick={onClose}
                                fontSize={'1.15rem'}
                                border={'1px solid white'}
                                padding={2}
                                borderRadius={5}
                                _hover={{ backgroundColor: 'white', color: 'black' }}
                            >
                                Readmission Cum Transfer
                            </Text>

                            <Text
                                as={NavLink}
                                to='/rra/demand'

                                pl={4}
                                size={'sm'}
                                onClick={onClose}
                                fontSize={'1.15rem'}
                                border={'1px solid white'}
                                padding={2}
                                borderRadius={5}
                                _hover={{ backgroundColor: 'white', color: 'black' }}
                            >
                                RRA
                            </Text>


                            <Text
                                as={NavLink}
                                to='/name_change'
                                
                                pl={4}
                                size={'sm'}
                                onClick={onClose}
                                fontSize={'1.15rem'}
                                border={'1px solid white'}
                                padding={2}
                                borderRadius={5}
                                _hover={{ backgroundColor: 'white', color: 'black' }}
                            >
                                Name Change
                            </Text>


                            <Text
                                as={NavLink}
                                to='/break_of_study'
                                
                                pl={4}
                                size={'sm'}
                                onClick={onClose}
                                fontSize={'1.15rem'}
                                border={'1px solid white'}
                                padding={2}
                                borderRadius={5}
                                _hover={{ backgroundColor: 'white', color: 'black' }}
                            >
                                Break of Study
                            </Text>


                            <Text
                                as={NavLink}
                                to='/grievance'
                                
                                pl={4}
                                size={'sm'}
                                onClick={onClose}
                                fontSize={'1.15rem'}
                                border={'1px solid white'}
                                padding={2}
                                borderRadius={5}
                                _hover={{ backgroundColor: 'white', color: 'black' }}
                            >
                                Grievance
                            </Text>
                        </Grid>

                    </DrawerBody>

                    <DrawerFooter>
                        {/* <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Save</Button> */}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}