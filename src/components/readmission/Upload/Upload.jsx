//Readmission Upload.jsx
import { lazy, Suspense, useRef, useState } from 'react'
import { Input, FormControl, Flex, Button, FormErrorMessage, Text, FormLabel, useToast} from '@chakra-ui/react'
import {PlusSquareIcon} from '@chakra-ui/icons'
import base64 from '@/utils/base64'
import remove_runes from '@/utils/remove_runes'

const Table = lazy(() => import('@/ui/Table/Table'))
const Title = lazy(() => import('@/ui/Title/Title'))

export default function Upload() {
    const toast = useToast()
    const [data, set_data] = useState({columns: [], rows: []})
    const [data_file, set_data_file] = useState({file: '', name: ''})
    
    const [error_msgs, set_error_msgs] = useState([false, false, false])

    const batch_ref = useRef(null)
    const academic_year_ref = useRef(null)
    
    const file_ref = useRef(null)

    const file_types = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']

    const update_data = (row_index, column_id, value) => {
        set_data(old => {
            const new_data = structuredClone(old)
            new_data.rows[row_index][column_id] = value
            return new_data
        })
      }



    const handle_file = async (e) => {
        const {readExcel} = await import ('@/lib/danfo/bundle.esm.js')
        const file = e.target.files[0]
        const name = file.name

        const columns = [
            {accessor:'sno', Header: 'S. No'},  
            {accessor:'rollno', Header: 'Roll no'}, 
            {accessor:'name', Header: 'Name'}, 
            {accessor:'branch', Header: 'Branch'}, 
            {accessor:'discontinuance_sem', Header: 'Discontinuance Sem'}, 
            {accessor:'discontinuance_year', Header: 'Discontinuance Year'}, 
            {accessor:'clg', Header: 'College'}, 
            {accessor:'continuance_sem', Header: 'Continuance Sem'}, 
            {accessor:'continuance_year', Header: 'Continuance Year'}, 
            {accessor:'attendance', Header: 'Attendance Percent'}
        ]

        const base = await base64(file)
        set_data_file({file: base, name})


        const {$data} = await readExcel(file)
        const rows = []

        console.log($data);

        const keys = columns.map(i => i.accessor)
        for(let i = 1; i < $data.length; i++) {
            const row = $data[i]
            const d = {}
            for(let k= 0; k < keys.length; k++){
                d[keys[k]] = typeof (row[k]) === 'string' ? remove_runes(row[k]) : row[k]
            }
            d.id = i
            rows.push(d)
        }
        set_data({rows, columns})
    }

    const is_valid = (ref) => ref.current.value.trim().length > 0

    const save = async () => {
        const batch_ref_valid = is_valid(batch_ref)
        const academic_year_ref_valid = is_valid(academic_year_ref)
        const file_ref_valid = data_file.name.length > 0

        const err_msgs = [false,false,false]


        if(!batch_ref_valid) {
            err_msgs[3] = true
            batch_ref.current.focus()
            set_error_msgs([...err_msgs])
            return
        }

        if(!academic_year_ref_valid) {
            err_msgs[4] = true
            academic_year_ref.current.focus()
            set_error_msgs([...err_msgs])
            return
        }

        if(!file_ref_valid) {
            err_msgs[5] = true
            file_ref.current.focus()
            set_error_msgs([...err_msgs])
            return
        }

        set_error_msgs([false,false,false])
        try{
            const request = await fetch(import.meta.env.VITE_REACT_APP_SERVER_URL + 'readmission/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    batch: batch_ref.current.valueAsNumber,
                    year: academic_year_ref.current.value,
                    data: data.rows
                })
                
            })
    
            const response = await request.json()
            if(!response.success){
                toast({title: response.msg, status: 'error', isClosable: true, size: 'sm'})
            }

            if(response.success){
                toast({title: response.msg, status: 'success', isClosable: true, size: 'sm'})
            }

           /* if(response.not_found_list){
                setTimeout(() => {
                    localStorage.setItem('not_found_list', JSON.stringify(response.not_found_list))
                    window.open(`/not`)
                }, 1000)
            }*/

        }catch(e){
            console.log(e);
            toast({title: 'Server Error, Please try again later', status: 'error', isClosable: true, size: 'sm'})
        }

    }

    return (
        <div style={{width: '95%', margin: 'auto'}}>
            <Text  fontSize={'1.15rem'} color='white' mb={6}> 
                Readmission <span style={{color: 'teal', fontWeight: 'bold'}}>/</span> Upload New Batch 
            </Text>
                {/* <Divider mt={2} borderColor='teal' /> */}
            
                <Flex gap={'1rem'} mb={'1'}>
                    
                    <FormControl isInvalid={error_msgs[0]} size={'sm'} width={'200px'}>
                        <FormLabel color={'white'}
                         fontSize={'1rem'}  size={'sm'}>Batch</FormLabel>
                        <Input 
                            color='white'
                            borderRadius={'base'} 
                            size={'sm'} 
                            border={'1px'} 
                            type="number" 
                            placeholder='Batch' 
                            required
                            ref={batch_ref}
                            borderColor={'teal.600'}

                            />
                        <FormErrorMessage>Batch is required</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={error_msgs[1]} size={'sm'} width={'200px'}>
                        <FormLabel color='white'
                         fontSize={'1rem'}  size={'sm'}>Academic Year</FormLabel>
                        <Input 
                            color='white'
                            borderRadius={'base'} 
                            size={'sm'} 
                            border={'1px'} 
                            type="text" 
                            placeholder='Academic Year' 
                            required
                            ref={academic_year_ref}
                            borderColor={'teal.600'}
                            />
                        <FormErrorMessage>Academic Year is required</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={error_msgs[2]} width={'300px'}>
                        <FormLabel color='white'
                         fontSize={'1rem'}  size={'sm'}>Upload File</FormLabel>
                        <Button 
                            _hover={{backgroundColor: 'teal.500'}} 
                            size='sm' 
                            width={'70%'} 
                            onClick={() => {file_ref.current.click()}} 
                            // variant={'outline'} 
                            backgroundColor={'teal.500'} 
                            borderRadius={'4px'}
                            color={'black'}
                            textAlign={'left'}
                            fontWeight={'normal'}
                        > 
                            {data_file.name ? data_file.name : <> <PlusSquareIcon /> &nbsp; Upload File</>}
                        </Button>
                        <FormErrorMessage>File not found</FormErrorMessage>
                        <Input 
                            onChange={handle_file} 
                            ref={file_ref} 
                            size={'sm'} 
                            border={'1px'} 
                            display={'none'} 
                            type="file" 
                            placeholder='Semester' 
                            borderColor={'teal.600'}
                            accept={file_types.join(',')}
                        />
                    </FormControl>
                </Flex>
        

            {
                data.rows.length === 0 ? null :
                <Suspense fallback={<div>Loading...</div>}>
                    <Table 
                        headers_data={data.columns} 
                        rows_data={data.rows} 
                        editable={false} 
                        update_data={update_data}
                        set_selected_rows={(d) => {}}
                        set_visible_rows={(d) => {}}
                        changeable={true}
                    >
                        <Button onClick={save}>Save</Button>
                    </Table>
                </Suspense>
            }
        </div>
    )
}

// import { lazy, Suspense, useRef, useState } from 'react'
// import { Input, FormControl, Flex, Button, FormErrorMessage, Text, FormLabel, Divider } from '@chakra-ui/react'
// import {PlusSquareIcon} from '@chakra-ui/icons'
// import base64 from '@/utils/base64'
// import remove_runes from '@/utils/remove_runes'

// const Table = lazy(() => import('@/ui/Table/Table'))
// const Title = lazy(() => import('@/ui/Title/Title'))

// export default function Upload() {
//     const [data, set_data] = useState({columns: [], rows: []})
//     const [data_file, set_data_file] = useState({file: '', name: ''})
    
//     const [error_msgs, set_error_msgs] = useState([false, false, false])

//     const batch_ref = useRef(null)
//     const academic_year_ref = useRef(null)
    
//     const file_ref = useRef(null)

//     const file_types = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']

//     const update_data = (row_index, column_id, value) => {
//         set_data(old => {
//             const new_data = structuredClone(old)
//             new_data.rows[row_index][column_id] = value
//             return new_data
//         })
//       }



//     const handle_file = async (e) => {
//         const {readExcel} = await import ('@/lib/danfo/bundle.esm.js')
//         const file = e.target.files[0]
//         const name = file.name

//         const columns = [
//             {accessor:'sno', Header: 'S. No'},  
//             {accessor:'rollno', Header: 'Roll no'}, 
//             {accessor:'name', Header: 'Name'}, 
//             {accessor:'branch', Header: 'Branch'}, 
//             {accessor:'discontinuance_sem', Header: 'Discontinuance Sem'}, 
//             {accessor:'discontinuance_year', Header: 'Discontinuance Year'}, 
//             {accessor:'clg', Header: 'College'}, 
//             {accessor:'continuance_sem', Header: 'Continuance Sem'}, 
//             {accessor:'continuance_year', Header: 'Continuance Year'}, 
//             {accessor:'attendance', Header: 'Attendance Percent'}
//         ]

//         const base = await base64(file)
//         set_data_file({file: base, name})


//         const {$data} = await readExcel(file)
//         const rows = []

//         console.log($data);

//         const keys = columns.map(i => i.accessor)
//         for(let i = 1; i < $data.length; i++) {
//             const row = $data[i]
//             const d = {}
//             for(let k= 0; k < keys.length; k++){
//                 d[keys[k]] = typeof (row[k]) === 'string' ? remove_runes(row[k]) : row[k]
//             }
//             d.id = i
//             rows.push(d)
//         }
//         set_data({rows, columns})
//     }

//     const is_valid = (ref) => ref.current.value.trim().length > 0

//     const save = async () => {
//         const batch_ref_valid = is_valid(batch_ref)
//         const academic_year_ref_valid = is_valid(academic_year_ref)
//         const file_ref_valid = data_file.name.length > 0

//         const err_msgs = [false,false,false]


//         if(!batch_ref_valid) {
//             err_msgs[3] = true
//             batch_ref.current.focus()
//             set_error_msgs([...err_msgs])
//             return
//         }

//         if(!academic_year_ref_valid) {
//             err_msgs[4] = true
//             academic_year_ref.current.focus()
//             set_error_msgs([...err_msgs])
//             return
//         }

//         if(!file_ref_valid) {
//             err_msgs[5] = true
//             file_ref.current.focus()
//             set_error_msgs([...err_msgs])
//             return
//         }

//         set_error_msgs([false,false,false])
//         try{
//             const request = await fetch(import.meta.env.VITE_REACT_APP_SERVER_URL + 'readmission/upload', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     batch: batch_ref.current.valueAsNumber,
//                     year: academic_year_ref.current.value,
//                     data: data.rows
//                 })
                
//             })
    
//             const response = await request.json()
//             if(!response.success){
//                 toast({title: response.msg, status: 'error', isClosable: true, size: 'sm'})
//             }

//             if(response.success){
//                 toast({title: response.msg, status: 'success', isClosable: true, size: 'sm'})
//             }

//            /* if(response.not_found_list){
//                 setTimeout(() => {
//                     localStorage.setItem('not_found_list', JSON.stringify(response.not_found_list))
//                     window.open(`/not`)
//                 }, 1000)
//             }*/

//         }catch(e){
//             console.log(e);
//             toast({title: 'Server Error, Please try again later', status: 'error', isClosable: true, size: 'sm'})
//         }

//     }

//     return (
//         <div style={{width: '95%', margin: 'auto'}}>
//             <Text  fontSize={'1.15rem'} color='white' mb={6}> 
//                 Readmission <span style={{color: 'teal', fontWeight: 'bold'}}>/</span> Upload New Batch 
//                 <Divider mt={2} borderColor='teal' />
//             </Text>
            
//                 <Flex gap={'1rem'} mb={'1'}>
                    
//                     <FormControl isInvalid={error_msgs[0]} size={'sm'} width={'200px'}>
//                         <FormLabel color={'white'}
//                          fontSize={'1rem'}  size={'sm'}>Batch</FormLabel>
//                         <Input 
//                             color='white'
//                             borderRadius={'base'} 
//                             size={'sm'} 
//                             border={'1px'} 
//                             type="number" 
//                             placeholder='Batch' 
//                             required
//                             ref={batch_ref}
//                             borderColor={'teal.600'}

//                             />
//                         <FormErrorMessage>Batch is required</FormErrorMessage>
//                     </FormControl>

//                     <FormControl isInvalid={error_msgs[1]} size={'sm'} width={'200px'}>
//                         <FormLabel color='white'
//                          fontSize={'1rem'}  size={'sm'}>Academic Year</FormLabel>
//                         <Input 
//                             color='white'
//                             borderRadius={'base'} 
//                             size={'sm'} 
//                             border={'1px'} 
//                             type="text" 
//                             placeholder='Academic Year' 
//                             required
//                             ref={academic_year_ref}
//                             borderColor={'teal.600'}
//                             />
//                         <FormErrorMessage>Academic Year is required</FormErrorMessage>
//                     </FormControl>

//                     <FormControl isInvalid={error_msgs[2]} width={'300px'}>
//                         <FormLabel color='white'
//                          fontSize={'1rem'}  size={'sm'}>Upload File</FormLabel>
//                         <Button 
//                             _hover={{backgroundColor: 'teal.500'}} 
//                             size='sm' 
//                             width={'70%'} 
//                             onClick={() => {file_ref.current.click()}} 
//                             // variant={'outline'} 
//                             backgroundColor={'teal.500'} 
//                             borderRadius={'4px'}
//                             color={'black'}
//                             textAlign={'left'}
//                             fontWeight={'normal'}
//                         > 
//                             {data_file.name ? data_file.name : <> <PlusSquareIcon /> &nbsp; Upload File</>}
//                         </Button>
//                         <FormErrorMessage>File not found</FormErrorMessage>
//                         <Input 
//                             onChange={handle_file} 
//                             ref={file_ref} 
//                             size={'sm'} 
//                             border={'1px'} 
//                             display={'none'} 
//                             type="file" 
//                             placeholder='Semester' 
//                             borderColor={'teal.600'}
//                             accept={file_types.join(',')}
//                         />
//                     </FormControl>
//                 </Flex>
        

//             {
//                 data.rows.length === 0 ? null :
//                 <Suspense fallback={<div>Loading...</div>}>
//                     <Table 
//                         headers_data={data.columns} 
//                         rows_data={data.rows} 
//                         editable={false} 
//                         update_data={update_data}
//                         set_selected_rows={(d) => {}}
//                         set_visible_rows={(d) => {}}
//                         changeable={true}
//                     >
//                         <Button onClick={save}>Save</Button>
//                     </Table>
//                 </Suspense>
//             }
//         </div>
//     )
// }
