import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Badge, Button, Divider, Select, Stack, Table, TableCaption, TableContainer, Tag, TagLabel, Tbody, Td, Text, Tfoot, Th, Thead, Tooltip, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link, NavLink ,useNavigate} from 'react-router-dom'
import {useGlobalContext} from '@/lib/global_context'


export default function Demand() {
    const {global_user, global_allowed_routes, global_is_admin} = useGlobalContext()


    const [table_data, set_table_data] = useState({rows: [], cols: []})
    const [year, set_year] = useState('Loading...')
    const [academic_years, set_academic_years] = useState([])
    const navigate = useNavigate()
    const [isodd, set_isodd] = useState(true)

    const users_actions ={
        'admin':[[0,1,2,3,4,5,6,7,8],0,[9]],
        'Superintendent':[[0],1,[1,2,3,4,5,6,7,8,9]],
        'Deputy Director':[[1],2,[2,3,4,5,6,7,8,9]],
        'Director':[[2],3,[3,4,5,6,7,8,9]],
        'Finance Clerk':[[4],5,[5,6,7,8,9]],
        'Staff':[[3],4,[4,5,6,7,8,9]]
    }

    const pending = users_actions[global_user.designation.name][0]
    const status = users_actions[global_user.designation.name][1]
    const approved = users_actions[global_user.designation.name][2]
    console.log(`pending: ${pending}, status: ${status}, approved: ${approved}`)


    const get_academic_years = async() => {
        try{
            const request = await fetch('/api/readmission/get_academic_years', {credentials: 'include'})
            
            if(request.status === 401){
                navigate('/login', {
                    replace: true
                })
            }

            const response = await request.json()

            if(!response.success){
                throw new Error(response.msg)
            }
            
            const {data} = response
            set_academic_years(data)
            set_year(data[0])
        }catch(err){
            console.log(err.message)
        }
    }
    const get_info = async() => {
        try{
            const request = await fetch(`/api/readmission/info/${year}`, 
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({pending:pending,approved:approved,isodd:isodd}),
                credentials: 'include'})
            const response = await request.json()
            
            if(!response.success){
                throw new Error(response.msg)
            }
            
            const {data} = response
            const info = data.info
            
           
            const cols = [
                {Header: 'Batch', accessor: 'batch'},
                {Header: 'Students', accessor: 'students'},
            ]
            const rows = info
            console.log(rows)
            set_table_data({rows, cols})
        }catch(err){
            console.log(err.message)
        }
    }

    const approve = async(batch) => {
        try{
            console.log(
                'approve initiated'
            );
            const request = await fetch(`/api/readmission/approve/${year}`,
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({status:status, batch:batch,pending:pending,isodd}),
                credentials: 'include'
            }
            )
            const response = await request.json()
            
            if(!response.success){
                throw new Error(response.msg)
            }
            
            get_info()

        }catch(e){
            console.log()
        }
    }






    useEffect(() => {
       console.log(year)
       if(year!='Loading...' && year!=''){
        get_info()
       }
    }, [year,isodd]
)
useEffect(() => {
    get_academic_years()
 },[])
  return (
    <>
        <Select color='black' onChange={(e) => {set_year(e.target.value)}} size='sm' width={'120px'} >
        {
                academic_years.map((year, i) => {
                    return (
                        <option style={{color: 'black'}} key={i} value={year}>{year}</option>
                    )
                })
            }
        </Select>
        <Select color='black' onChange={(e) => { set_isodd(e.target.value === '0') }} size='sm' width={'120px'} >

<option style={{ color: 'black' }} value={0}>Odd</option>
<option style={{ color: 'black' }} value={1}>Even</option>



</Select>

        <TableContainer width={'700px'} mt={3} borderRadius={'5px'} border={'1px solid black'} >
            <Table variant={'simple'} border={'1px solid #cccccc50'}>
                <Thead bgColor={'teal.600'} border={'1px solid #cccccc50'}>
                <Tr>
                    <Th textAlign={'center'} color='white'>Batch</Th>
                    <Th textAlign={'center'} color='white'>Students</Th>
                    <Th textAlign={'center'} color='white'></Th>
                    <Th textAlign={'center'} color='white'>Action</Th>
                    <Th textAlign={'center'} color='white'>View</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {
                        table_data.rows &&
                        table_data.rows.reverse().map((row, i) => {
                            return (
                                <Tr key={i}>
                                    <Td textAlign={'center'} color='black'>{row.batch}</Td>
                                    <Td textAlign={'center'} color='black'>{row.students}</Td>
                                    <Td>
                                        <Tooltip 
                                            bg={'green.400'} 
                                            hasArrow 
                                            label='Approved Records' 
                                            aria-label='Approved Records'
                                        >
                                            <Badge cursor={'default'} colorScheme='green'>{row.approved}</Badge>
                                        </Tooltip>
                                        
                                        <Tooltip 
                                            bg={'purple.400'} 
                                            hasArrow 
                                            label='Pending Records' 
                                            aria-label='Pending Records'
                                        >
                                            <Badge cursor={'default'} colorScheme='purple'>{row.pending}</Badge>
                                        </Tooltip>
                                        
                                        <Tooltip 
                                            bg={'red.500'} 
                                            hasArrow 
                                            label='Cancelled Records' 
                                            aria-label='Cancelled Records'
                                        >
                                            <Badge cursor={'default'} colorScheme='red'>{row.cancelled}</Badge>
                                        </Tooltip>
                                    </Td>
                                    <Td textAlign={'center'}>
                                        
                                       
                                        <Button onClick={()=>{console.log('Button clicked');approve(row.batch)}} isDisabled={row.pending===0 | global_user.designation.name==='Staff'} backgroundColor={'teal.400'} _hover={{backgroundColor: 'teal.600'}} color='white' size='sm'>
                                                 {(global_user.designation.name==='Staff') ? "Cick view raise demand" : "Approve for Raising Demand"}
                                             </Button>
                                         
                                     </Td>
                                    <Td>
                                        <Button as={Link} to={`/readmission?year=${year}&batch=${row.batch}&isodd=${isodd}`}>
                                            <ExternalLinkIcon color={'black'} />
                                        </Button>
                                    </Td>
                                </Tr>
                            )
                        })
                    }
                </Tbody>
            </Table>
        </TableContainer>
    </>
  )
}

// import { ExternalLinkIcon } from '@chakra-ui/icons'
// import { Badge, Button, Divider, Select, Stack, Table, TableCaption, TableContainer, Tag, TagLabel, Tbody, Td, Text, Tfoot, Th, Thead, Tooltip, Tr } from '@chakra-ui/react'
// import React, { useEffect, useState } from 'react'
// import { Link, NavLink } from 'react-router-dom'

// export default function Demand() {

//     const [table_data, set_table_data] = useState({rows: [], cols: []})
//     const [year, set_year] = useState('2022-2023')


//     useEffect(() => {
//         const cols = [
//             {Header: 'Batch', accessor: 'batch'},
//             {Header: 'Students', accessor: 'students'},
//         ]
    
//         const rows = {
//             '2022-2023': [
//                 {batch: 1, students: 520},
//                 {batch: 2, students: 458},
//                 {batch: 3, students: 469},
//             ],
//             '2021-2022': [
//                 {batch: 1, students: 458},
//                 {batch: 2, students: 520},
//                 {batch: 3, students: 469},
//             ],
//             '2020-2021': [
//                 {batch: 1, students: 469},
//                 {batch: 2, students: 458},
//                 {batch: 3, students: 520},
//             ]
//         }

//         set_table_data({rows, cols})
//     }, [])

//   return (
//     <>
//         <Select color='white' onChange={(e) => {set_year(e.target.value)}} size='sm' width={'120px'} >
//             <option style={{color: 'black'}} value='2022-2023'>2022-2023</option>
//             <option style={{color: 'black'}} value='2021-2022'>2021-2022</option>
//             <option style={{color: 'black'}} value='2020-2021'>2020-2021</option>
//         </Select>

//         <TableContainer width={'700px'} mt={3} borderRadius={'5px'} border={'1px solid black'} >
//             <Table variant={'simple'} border={'1px solid #cccccc50'}>
//                 <Thead bgColor={'teal.600'} border={'1px solid #cccccc50'}>
//                 <Tr>
//                     <Th textAlign={'center'} color='white'>Batch</Th>
//                     <Th textAlign={'center'} color='white'>Students</Th>
//                     <Th textAlign={'center'} color='white'></Th>
//                     <Th textAlign={'center'} color='white'>Action</Th>
//                     <Th textAlign={'center'} color='white'>View</Th>
//                 </Tr>
//                 </Thead>
//                 <Tbody>
//                     {
//                         table_data.rows[year] &&
//                         table_data.rows[year].reverse().map((row, i) => {
//                             return (
//                                 <Tr key={i}>
//                                     <Td textAlign={'center'} color='white'>{row.batch}</Td>
//                                     <Td textAlign={'center'} color='white'>{row.students}</Td>
//                                     <Td>
//                                         <Tooltip 
//                                             bg={'green.400'} 
//                                             hasArrow 
//                                             label='Approved Records' 
//                                             aria-label='Approved Records'
//                                         >
//                                             <Badge cursor={'default'} colorScheme='green'>400</Badge>
//                                         </Tooltip>
                                        
//                                         <Tooltip 
//                                             bg={'purple.400'} 
//                                             hasArrow 
//                                             label='Pending Records' 
//                                             aria-label='Pending Records'
//                                         >
//                                             <Badge cursor={'default'} colorScheme='purple'>100</Badge>
//                                         </Tooltip>
                                        
//                                         <Tooltip 
//                                             bg={'red.500'} 
//                                             hasArrow 
//                                             label='Cancelled Records' 
//                                             aria-label='Cancelled Records'
//                                         >
//                                             <Badge cursor={'default'} colorScheme='red'>20</Badge>
//                                         </Tooltip>
//                                     </Td>
//                                     <Td textAlign={'center'} >
//                                         <Button backgroundColor={'teal.400'} _hover={{backgroundColor: 'teal.600'}} color='white' size='sm'>
//                                             Approve for Raising Demand
//                                         </Button>
//                                     </Td>
//                                     <Td>
//                                         <Button as={Link} to={`/readmission?year=${year}&batch=${row.batch}`}>
//                                             <ExternalLinkIcon color={'black'} />
//                                         </Button>
//                                     </Td>
//                                 </Tr>
//                             )
//                         })
//                     }
//                 </Tbody>
//             </Table>
//         </TableContainer>
//     </>
//   )
// }
