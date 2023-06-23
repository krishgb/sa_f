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
    Button,
    Image,
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
            templateColumns={'auto .8fr .2fr'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={3}
            w="100%"
            position={'sticky'}
            top={0}
            // backgroundColor="rgba(255, 255, 255, 0.95)" 
            backdropFilter="saturate(180%) blur(5px)"
            // backgroundColor={'blackAlpha.900'}
            bgColor={'whiteAlpha.400'}
            zIndex={1000}

            boxShadow={'0 0 10px #00000050'}
            // borderBottom={'1px solid #aaa'}
            // color='white'
            color='black'
            p={'2.5'}
            px={0}
        >
            <GridItem display={'grid'} placeItems={'center'} ml={4}>
                <Flex alignItems={'center'} gap={2}>
                    <Flex gap={1}>
                        <ChevronLeftIcon onClick={() => { window.history.back() }} transform={'scale(2)'} color='blackAlpha.500' cursor={'pointer'} _hover={{ color: 'black' }} />
                        <ChevronRightIcon onClick={() => { window.history.forward() }} transform={'scale(2)'} color='blackAlpha.500' cursor={'pointer'} _hover={{ color: 'black' }} />
                    </Flex>
                    <Image src={'images/anna_logo.png'} alt={'logo'} boxSize={'50px'} />
                    <Text fontSize={'md'} textAlign={'left'} fontWeight={'bold'} ><Link as={NavLink} to='/'>Centre for Student Affairs <br /> Anna University</Link></Text>
                </Flex>
            </GridItem>

            <GridItem
                backgroundColor={global_allowed_routes.length ? '#0000ff96' : 'transparent'}
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
                                // _hover={{ color: '#000' }}
                                fontWeight={'500'}
                                p={'1'}
                                fontSize={'14px'}
                            >
                                Transfer
                            </MenuButton>
                            <MenuList color='white' backgroundColor={'blackAlpha.800'} minWidth={'150px'}>
                                <MenuItem
                                    fontSize={'14px'}

                                    backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/transfer/view'>View</MenuItem>
                                <MenuItem
                                    fontSize={'14px'}

                                    backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/transfer/upload'>Upload</MenuItem>
                                <MenuItem
                                    fontSize={'14px'}

                                    backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/transfer/add'>Add Manually</MenuItem>
                            </MenuList>
                        </Menu>
                    }


                    {
                        global_allowed_routes.includes('readmission') &&
                        <Menu isLazy>
                            <MenuButton
                                borderRadius={'50px'}
                                // _hover={{ color: '#000' }}
                                fontWeight={'500'}
                                p={'1'}
                                fontSize={'14px'}
                            >
                                Readmission
                            </MenuButton>
                            <MenuList color='white' backgroundColor={'blackAlpha.800'} minWidth={'150px'}>
                                <MenuItem
                                    fontSize={'14px'}

                                    backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/readmission/view'>View</MenuItem>
                                <MenuItem
                                    fontSize={'14px'}

                                    backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/readmission/upload'>Upload</MenuItem>
                            </MenuList>
                        </Menu>

                    }

                    {
                        global_allowed_routes.includes('rcumt') &&
                        <Menu isLazy>
                            <MenuButton
                                borderRadius={'50px'}
                                // _hover={{ color: '#000' }}
                                fontWeight={'500'}
                                p={'1'}
                                fontSize={'14px'}
                            >
                                R Cum T
                            </MenuButton>
                            <MenuList color='white' backgroundColor={'blackAlpha.800'} minWidth={'150px'}>
                                <MenuItem
                                    fontSize={'14px'}

                                    backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/rcumt/view'>View</MenuItem>
                                <MenuItem
                                    fontSize={'14px'}

                                    backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/rcumt/upload'>Upload</MenuItem>
                            </MenuList>
                        </Menu>
                    }

                    {
                        global_allowed_routes.includes('rra') &&

                        <Menu isLazy>
                            <MenuButton
                                borderRadius={'50px'}
                                // _hover={{ color: '#000' }}
                                fontWeight={'500'}
                                p={'1'}
                                fontSize={'14px'}
                            >
                                RRA
                            </MenuButton>
                            <MenuList color='white' backgroundColor={'blackAlpha.800'} minWidth={'150px'}>
                                <MenuItem
                                    fontSize={'14px'}

                                    backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/rra/view'>View</MenuItem>
                                <MenuItem
                                    fontSize={'14px'}

                                    backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/rra/upload'>Upload</MenuItem>
                            </MenuList>
                        </Menu>
                    }

                    {
                        global_allowed_routes.includes('break_of_study') &&
                        <Menu isLazy>
                            <MenuButton
                                borderRadius={'50px'}
                                // _hover={{ color: '#000' }}
                                fontWeight={'500'}
                                p={'1'}
                                fontSize={'14px'}
                            >
                                Break of Study
                            </MenuButton>
                            <MenuList color='white' backgroundColor={'blackAlpha.800'} minWidth={'150px'}>
                                <MenuItem
                                    fontSize={'14px'}

                                    backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/break_of_study/view'>View</MenuItem>
                                <MenuItem
                                    fontSize={'14px'}

                                    backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/break_of_study/new'>New or Check Status</MenuItem>
                            </MenuList>
                        </Menu>
                    }

                    {
                        global_allowed_routes.includes('name_change') &&
                        <Menu isLazy>
                            <MenuButton
                                borderRadius={'50px'}
                                // _hover={{ color: '#000' }}
                                fontWeight={'500'}
                                p={'1'}
                                fontSize={'14px'}
                            >
                                Name Change
                            </MenuButton>
                            <MenuList color='white' backgroundColor={'blackAlpha.800'} minWidth={'150px'}>
                                <MenuItem
                                    fontSize={'14px'}

                                    backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/name_change/view'>View</MenuItem>
                                <MenuItem
                                    fontSize={'14px'}

                                    backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/name_change/new_or_check_status'>New or Check Status</MenuItem>
                            </MenuList>
                        </Menu>
                    }

                    {
                        global_allowed_routes.includes('grievance') &&

                        <Menu isLazy>
                            <MenuButton
                                borderRadius={'50px'}
                                fontWeight={'500'}
                                p={'1'}
                                fontSize={'14px'}
                            >
                                Grievance
                            </MenuButton>
                            <MenuList color='white' backgroundColor={'blackAlpha.800'} minWidth={'150px'}>
                                <MenuItem
                                    fontSize={'14px'}

                                    backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/grievance/view'>View</MenuItem>
                                <MenuItem
                                    fontSize={'14px'}

                                    backgroundColor='transparent' _hover={{ backgroundColor: 'black' }} as={NavLink} to='/grievance/new_or_check_status'>New or Check Status</MenuItem>
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
                                    _activeLink={{ color: '#682bd7', fontWeight: 'bold', textDecorationColor: '#682bd7' }}
                                    fontSize={'15px'}
                                >
                                    Dashboard
                                </Link>
                                <Text
                                    cursor={'pointer'}
                                    title='Sign out'
                                    p={2}
                                    onClick={signout}
                                    fontSize={'15px'}
                                    color={'#666'}
                                >
                                    Sign out
                                </Text>
                            </>
                            :
                            <Grid gap={4} gridTemplateColumns={'1fr 1fr'}>
                                <Link
                                    as={NavLink}
                                    to="login"
                                    p={2}
                                    _active={{ textDecoration: 'underline' }}
                                >
                                    Login
                                </Link>
                                <Link
                                    as={NavLink}
                                    to="/signup"
                                    p={2}
                                    _active={{ textDecoration: 'underline' }}
                                >
                                    Signup
                                </Link>
                            </Grid>

                    }
                </Flex>
            </GridItem>
        </Grid>

    )
}