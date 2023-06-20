import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
    Grid,
    GridItem,
    Flex,
    Text,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react'
import { lazy } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../lib/global_context'

const SideBar = lazy(() => import('@/ui/Sidebar'))

export default function Header() {
    const navigate = useNavigate()

    const { global_user, global_allowed_routes, global_is_admin, global_set_user } = useGlobalContext()
    const signout = () => {
        fetch('/api/signout', { credentials: 'include' })
        .then(res => res.json())
        .then(res => {
            if (!res.success) {
                throw new Error(res.msg)
            }
            localStorage.removeItem('user')
            global_set_user(null)
            navigate('/', { replace: true })
        }).catch(err => console.log(err))
    }

    return (
        <Grid
            templateColumns={'.2fr .6fr .2fr'}
            alignItems={'center'}
            justifyContent={'space-between'}

            w="100%"
            position={'sticky'}
            top={0}
            // backgroundColor="rgba(255, 255, 255, 0.95)" 
            backgroundColor={'blackAlpha.900'}
            // backdropFilter="saturate(180%) blur(5px)"
            zIndex={1000}

            boxShadow={'0 0 10px #00000010'}
            borderBottom={'1px solid #cccccc50'}
            color='white'
            p={3}
            px={0}
        >
            <GridItem display={'grid'} placeItems={'center'}>
                <Flex alignItems={'center'} gap={2}>
                    <Flex gap={1}>
                        <ChevronLeftIcon onClick={() => { window.history.back() }} transform={'scale(2)'} color='whiteAlpha.600' cursor={'pointer'} _hover={{ color: 'white' }} />
                        <ChevronRightIcon onClick={() => { window.history.forward() }} transform={'scale(2)'} color='whiteAlpha.600' cursor={'pointer'} _hover={{ color: 'white' }} />
                    </Flex>
                    <Text fontSize={'2xl'} textAlign={'center'} fontWeight={'semibold'} >Student Affairs</Text>
                </Flex>
            </GridItem>

            <GridItem
                backgroundColor={global_allowed_routes.length ? '#3182ce' : 'transparent'}
                p={1}
                borderRadius={'50px'}
                color='whitesmoke'
            >

                <Flex justifyContent={'space-around'} alignItems={'center'}>
                    {
                        global_allowed_routes.includes('transfer') &&
                        <Menu isLazy>
                            <MenuButton
                                borderRadius={'50px'}
                                _hover={{ color: '#000' }}
                                fontWeight={'500'}
                                p={'1.5'}
                                fontSize={'15px'}
                            >
                                Transfer
                            </MenuButton>
                            <MenuList color='white' backgroundColor={'blackAlpha.800'} minWidth={'150px'}>
                                <MenuItem backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/transfer/view'>View</MenuItem>
                                <MenuItem backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/transfer/upload'>Upload</MenuItem>
                            </MenuList>
                        </Menu>
                    }


                    {
                        global_allowed_routes.includes('readmission') &&
                        <Menu isLazy>
                            <MenuButton
                                borderRadius={'50px'}
                                _hover={{ color: '#000' }}
                                fontWeight={'500'}
                                p={'1.5'}
                                fontSize={'15px'}
                            >
                                Readmission
                            </MenuButton>
                            <MenuList color='white' backgroundColor={'blackAlpha.800'} minWidth={'150px'}>
                                <MenuItem backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/readmission/view'>View</MenuItem>
                                <MenuItem backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/readmission/upload'>Upload</MenuItem>
                            </MenuList>
                        </Menu>

                    }

                    {
                        global_allowed_routes.includes('rcumt') &&
                        <Menu isLazy>
                            <MenuButton
                                borderRadius={'50px'}
                                _hover={{ color: '#000' }}
                                fontWeight={'500'}
                                p={'1.5'}
                                fontSize={'15px'}
                            >
                                R Cum T
                            </MenuButton>
                            <MenuList color='white' backgroundColor={'blackAlpha.800'} minWidth={'150px'}>
                                <MenuItem backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/rcumt/view'>View</MenuItem>
                                <MenuItem backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/rcumt/upload'>Upload</MenuItem>
                            </MenuList>
                        </Menu>
                    }

                    {
                        global_allowed_routes.includes('rra') &&

                        <Menu isLazy>
                            <MenuButton
                                borderRadius={'50px'}
                                _hover={{ color: '#000' }}
                                fontWeight={'500'}
                                p={'1.5'}
                                fontSize={'15px'}
                            >
                                RRA
                            </MenuButton>
                            <MenuList color='white' backgroundColor={'blackAlpha.800'} minWidth={'150px'}>
                                <MenuItem backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/rra/view'>View</MenuItem>
                                <MenuItem backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/rra/upload'>Upload</MenuItem>
                            </MenuList>
                        </Menu>
                    }

                    {
                        global_allowed_routes.includes('break_of_study') &&
                        <Menu isLazy>
                            <MenuButton
                                borderRadius={'50px'}
                                _hover={{ color: '#000' }}
                                fontWeight={'500'}
                                p={'1.5'}
                                fontSize={'15px'}
                            >
                                Break of Study
                            </MenuButton>
                            <MenuList color='white' backgroundColor={'blackAlpha.800'} minWidth={'150px'}>
                                <MenuItem backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/break_of_study/view'>View</MenuItem>
                                <MenuItem backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/break_of_study/new'>New or Check Status</MenuItem>
                            </MenuList>
                        </Menu>
                    }

                    {
                        global_allowed_routes.includes('name_change') &&
                        <Menu isLazy>
                            <MenuButton
                                borderRadius={'50px'}
                                _hover={{ color: '#000' }}
                                fontWeight={'500'}
                                p={'1.5'}
                                fontSize={'15px'}
                            >
                                Name Change
                            </MenuButton>
                            <MenuList color='white' backgroundColor={'blackAlpha.800'} minWidth={'150px'}>
                                <MenuItem backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/name_change/view'>View</MenuItem>
                                <MenuItem backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/name_change/new_or_check_status'>New or Check Status</MenuItem>
                            </MenuList>
                        </Menu>
                    }

                    {
                        global_allowed_routes.includes('grievance') &&

                        <Menu isLazy>
                            <MenuButton
                                borderRadius={'50px'}
                                _hover={{ color: '#000' }}
                                fontWeight={'500'}
                                p={'1.5'}
                                fontSize={'15px'}
                            >
                                Grievance
                            </MenuButton>
                            <MenuList color='white' backgroundColor={'blackAlpha.800'} minWidth={'150px'}>
                                <MenuItem backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/grievance/view'>View</MenuItem>
                                <MenuItem backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/grievance/new_or_check_status'>New or Check Status</MenuItem>
                            </MenuList>
                        </Menu>
                    }
                </Flex>
            </GridItem>

            <GridItem placeItems={'center'} display={'grid'}>
                <Flex>
                    {
                        global_user ?
                            <>
                                <Link
                                        as={NavLink}
                                        to="/"
                                        p={2}
                                        _activeLink={{ color: 'blue' }}
                                    >
                                        Dashboard
                                    </Link>
                                    <Text
                                        cursor={'pointer'}
                                        title='Sign out'
                                        p={2}
                                        onClick={signout}
                                    >
                                        Sign out
                                    </Text>
                            </>
                            :
                            <>
                                <Link
                                    as={NavLink}
                                    to="/login"
                                    p={2}
                                    _activeLink={{ color: 'blue' }}
                                >
                                    Staff Login
                                </Link>

                                <Link
                                as={NavLink}
                                to="/signup"
                                p={2}
                                _activeLink={{ color: 'blue' }}
                                >
                                    Staff Signup
                                </Link>
                            </>
                    }
                </Flex>
            </GridItem>
        </Grid>

    )
}