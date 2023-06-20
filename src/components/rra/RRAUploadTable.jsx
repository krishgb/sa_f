import { lazy, Suspense, useRef, useState } from 'react'
import { Input, FormControl, Flex, Button, FormErrorMessage, Text, FormLabel, useToast } from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'
import base64 from '@/utils/base64'
import remove_runes from '@/utils/remove_runes'

const Table = lazy(() => import('@/ui/Table/Table'))


const COLUMNS = {
    ug: [
        { accessor: "sno", Header: "S No" },
        { accessor: "application", Header: "Application No" },
        { accessor: "quota", Header: "Quota" },
        { accessor: "name", Header: "Name" },
        { accessor: "nationality", Header: "Nationality" },
        { accessor: "community", Header: "Community" },
        { accessor: "board", Header: "State Board" },
        { accessor: "maths", Header: "MOB" },
        { accessor: "physics", Header: "POB" },
        { accessor: "chemistry", Header: "COB" },
        { accessor: "total", Header: "Total" },
        { accessor: "percentage", Header: "Percentage" },
        { accessor: "first_graduate", Header: "First Graduate" },
        { accessor: "afw", Header: "AFW" },
        { accessor: "college", Header: "College" },
        { accessor: "branch", Header: "Branch" },
        { accessor: "sanctioned", Header: "Sanctioned" },
        { accessor: "admitted", Header: "Admitted" },
      
    ],
    pg: [
        { accessor: "sno", Header: "S No" },
        { accessor: "quota", Header: "Quota" },
        { accessor: "name", Header: "Name" },
        { accessor: "rno", Header: "Roll No" },
        { accessor: "nationality", Header: "Nationality" },
        { accessor: "community", Header: "Community" },
        { accessor: "entrance", Header: "Entrance Exam" },
        { accessor: "mark", Header: "Mark" },
        { accessor: "pattern_of_study", Header: "Pattern of Study" },
        { accessor: "mode", Header: "Mode" },
        { accessor: "degree", Header: "Degree" },
        { accessor: "discipline", Header: "Discipline" },
        { accessor: "university", Header: "University" },
        { accessor: "state", Header: "State" },
        { accessor: "college", Header: "College" },
        { accessor: "branch", Header: "Branch" },
       
    ],
    le: [
        { accessor: "sno", Header: "S No" },
        { accessor: "application", Header: "Application No" },
        { accessor: "rno", Header: "Reg No" },
        { accessor: "quota", Header: "Quota" },
        { accessor: "name", Header: "Name" },
        { accessor: "nationality", Header: "Nationality" },
        { accessor: "community", Header: "Community" },
        { accessor: "board", Header: "Board" },
        { accessor: "q_exam_ob", Header: "QOB" },
        { accessor: "q_exam_max", Header: "QMAX" },
        { accessor: "percentage", Header: "Percentage" },
        { accessor: "first_graduate", Header: "First Graduate" },
        { accessor: "pmss", Header: "PMSS" },
        { accessor: "college", Header: "College" },
        { accessor: "branch", Header: "Branch" },
       
    ]
}
export default function RRAUploadTable( {admission_type} ) {

    const toast = useToast()
    const [data, set_data] = useState({ columns: [], rows: [] })
    const [data_file, set_data_file] = useState({ file: '', name: '' })

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
        const { readExcel } = await import('@/lib/danfo/bundle.esm.js')
        const file = e.target.files[0]
        const name = file.name

        const base = await base64(file)
        set_data_file({ file: base, name })


        const { $data } = await readExcel(file)
        const rows = []

        console.log($data);

        const keys = COLUMNS[admission_type].map(i => i.accessor)
        for (let i = 0; i < $data.length; i++) {
            const row = $data[i]
            const d = {}
            for (let k = 0; k < keys.length; k++) {
                d[keys[k]] = typeof (row[k]) === 'string' ? remove_runes(row[k]) : row[k]
            }
            d.id = i
            rows.push(d)
        }
        set_data({ rows, columns: COLUMNS[admission_type] })
    }

    const is_valid = (ref) => ref.current.value.trim().length > 0
    const save = async () => {
        const batch_ref_valid = is_valid(batch_ref)
        const academic_year_ref_valid = is_valid(academic_year_ref)
        const file_ref_valid = data_file.name.length > 0

        const err_msgs = [false, false, false]


        if (!batch_ref_valid) {
            err_msgs[3] = true
            batch_ref.current.focus()
            set_error_msgs([...err_msgs])
            return
        }

        if (!academic_year_ref_valid) {
            err_msgs[4] = true
            academic_year_ref.current.focus()
            set_error_msgs([...err_msgs])
            return
        }

        if (!file_ref_valid) {
            err_msgs[5] = true
            file_ref.current.focus()
            set_error_msgs([...err_msgs])
            return
        }

        set_error_msgs([false, false, false])
        try {
            console.log(admission_type)
            const request = await fetch('/api/rra/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    admission_type:String(admission_type),
                    batch: batch_ref.current.valueAsNumber,
                    year: academic_year_ref.current.value,
                    data: data.rows
                }),
                credentials: 'include'


            })

            const response = await request.json()
            toast(
                {
                    title: response.msg,
                    status: response.success ? 'success' : 'error',
                    isClosable: true,
                    size: 'sm'
                }
            )
        } catch (e) {
            console.log(e);
            toast({ title: 'Server Error, Please try again later', status: 'error', isClosable: true, size: 'sm' })
        }

    }

    return (
        <>

            <Flex
                gap={'1rem'}
                color='white'
                width={'95%'}
                m='auto'
                mb={2}
            >

                <FormControl isInvalid={error_msgs[0]} size={'sm'} width={'200px'}>
                    <FormLabel color={'white'}
                        fontSize={'1rem'} size={'sm'}>Batch</FormLabel>
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
                        fontSize={'1rem'} size={'sm'}>Academic Year</FormLabel>
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
                        fontSize={'1rem'} size={'sm'}>Upload File</FormLabel>
                    <Button
                        _hover={{ backgroundColor: 'teal.500' }}
                        size='sm'
                        width={'70%'}
                        onClick={() => { file_ref.current.click() }}
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
                        {
                            admission_type === 'ug' &&
                            <Table
                                headers_data={COLUMNS.ug}
                                rows_data={data.rows}
                                editable={false}
                                update_data={update_data}
                                set_selected_rows={(d) => { }}
                                set_visible_rows={(d) => { }}
                                changeable={true}
                            >
                                <Button onClick={save}>Save</Button>
                            </Table>
                        }

                        {
                            admission_type === 'pg' &&
                            <Table
                                headers_data={COLUMNS.pg}
                                rows_data={data.rows}
                                editable={false}
                                update_data={update_data}
                                set_selected_rows={(d) => { }}
                                set_visible_rows={(d) => { }}
                                changeable={true}
                            >
                                <Button onClick={save}>Save</Button>
                            </Table>
                        }

                        {
                            admission_type === 'le' &&
                            <Table
                                headers_data={COLUMNS.le}
                                rows_data={data.rows}
                                editable={false}
                                update_data={update_data}
                                set_selected_rows={(d) => { }}
                                set_visible_rows={(d) => { }}
                                changeable={true}
                            >
                                <Button onClick={save}>Save</Button>
                            </Table>
                        }

                    </Suspense>
            }
        </>
    )
}
