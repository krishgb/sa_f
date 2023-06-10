//Readmission Home
import { useState, lazy, Suspense, useEffect } from "react"
import { readmission as over_all_data } from "@/ui/data"
import { Button, InputGroup, InputLeftAddon, Flex, Select } from "@chakra-ui/react"
import {useLocation} from 'react-router-dom'
import {useGlobalContext} from '@/lib/global_context'

const Table = lazy(() => import('@/ui/Table/Table'))
const RaiseDemandModal = lazy(() => import('@/components/readmission/RaiseDemandModal/RaiseDemandModal'))

const cols = [
  {accessor:'sno', Header: 'S. No'},  
  {accessor:'name', Header: 'Name'}, 
  {accessor:'roll_no', Header: 'Roll no'}, 
  {accessor:'discontinued_sem', Header: 'Discontinuance Sem'}, 
  {accessor:'branch', Header: 'Branch'}, 
  {accessor:'clg', Header: 'Name of the college'},
  {accessor:'discontinued_year', Header: 'Discontinuance Year'}, 
  {accessor:'readmission_status.status_name', Header: 'Status'},
];

const groupby = (data, key) => {
  const result = {};

  for (let i = 0; i < data.length; i++) {
    const k = data[i][key];
    if (!(k in result)) {
      result[data[i][key]] = [];
    }

    result[k].push({
      ...data[i],
      sno: result[k].length + 1,
      action: <Button>Generate</Button>,
    });
  }
  return result;
};

export default function T() {
  const [year, set_year] = useState("2022-2023");
  const [academic_years, set_academic_years] = useState([]);

  const [all_data, set_all_data] = useState(groupby(over_all_data, "batch"));
  const [batch, set_batch] = useState(Object.keys(all_data).sort()[0]);
  const [selected, set_selected] = useState([]);
  // const [visible, set_visible] = useState([]);
  const {global_user, global_allowed_routes, global_is_admin} = useGlobalContext()
  const options = {
    'Staff':[[0,'Pending'],[10,'Cancel']],
    'Finance Clerk':[[5,'Approve'],[10,'Cancel']]
  }

  const [status, setStatus] = useState(Object.keys(options).includes(global_user.designation.name)?options[global_user.designation.name][0][0]:0)
  


  
  const {search} = useLocation()

  const change_status = async() => {
    try{
      const request = await fetch(import.meta.env.VITE_REACT_APP_SERVER_URL + `readmission/change_status/${year}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status,
          students: selected
        }),
        credentials: 'include'
      })
      const response = await request.json()

      if(!response.success){
        throw new Error(response.msg)
      }

      get_data()
    }catch(err){
      console.log(err)
    }
  }







  const get_academic_years = async() => {
    try{
      const request = await fetch(import.meta.env.VITE_REACT_APP_SERVER_URL + 'readmission/get_academic_years',{credentials: 'include'})
      const response = await request.json()
      
      if(!response.success){
        throw new Error(response.msg)
      }
      
      const {data} = response
      set_academic_years(data)
      set_year(data[0])
    }catch(err) {
      console.log(err)
    }
  }
  const get_data = async() => {
    try{
      const request = await fetch(import.meta.env.VITE_REACT_APP_SERVER_URL + `readmission/${year}`, {credentials: 'include'})
      const response = await request.json()

      if(!response.success){
        throw new Error(response.msg)
      }
      
      const {data} = response
      console.log(data);
      const students_data = data.students

      console.log(students_data)
      set_all_data(groupby(students_data, "batch"))

    }catch(err) {
      console.log(err)
    }
  }
  useEffect(() => {
    get_academic_years()
    get_data()
    if(search.length) {
      const params = new URLSearchParams(search)
      const is_batch = params.has('batch') && /^\d{1,2}$/.test(params.get('batch'))
      const is_year = params.has('year') && /^\d{4}-\d{4}$/.test(params.get('year'))
      if(is_batch && is_year) {
        set_batch(parseInt(params.get('batch')))
        set_year(params.get('year'))
      }
    }
  }, [])

  const [open_raise_demand_modal, set_open_raise_demand_modal] = useState(false)
  const set_selected_rows = (rows) => {
    set_selected(rows);
  }

  const set_visible_rows = (rows) => {
  }



  return (
    <>
    <Suspense fallback={<p>Loading...</p>} >
      <Table  
        headers_data={cols}
        rows_data={all_data[batch]}
        set_selected_rows={set_selected_rows}
        set_visible_rows={set_visible_rows}
        editable={false}
        changeable={true}
      >

        <Flex gap={2} display={'inline-flex'}>

          <InputGroup size={'sm'} width={'auto'}>
            <InputLeftAddon 
              borderLeftRadius={'5px'} 
              border={'1px solid #5169f6'} 
              borderRight={'none'}
              bgColor={'#5169f6'} 
              color='white' 
              children="Academic Year" 

            />
            <Select backgroundColor={'white'} size={'sm'} onChange={e => {set_year(e.target.value)}} value={year} borderRightRadius={'5px'}>
            {
                academic_years.map((year, index) => {
                  return (
                    <option key={index} value={year}>{year}</option>
                  )
                })
              }
            </Select>
          </InputGroup>

          <InputGroup size={'sm'} width={'auto'} >
            <InputLeftAddon 
              borderLeftRadius={'5px'} 
              border={'1px solid #5169f6'} 
              borderRight={'none'}
              bgColor={'#5169f6'} 
              color='white' 
              children="Batch" 

            />
            <Select backgroundColor={'white'} size='sm' onChange={e => {set_batch(parseInt(e.target.value))}} value={batch} borderRightRadius={'5px'}>
              {
                Object.keys(all_data).map((batch, index) => {
                  return (
                    <option key={index} value={batch}>{batch}</option>
                  )
                })
              }
            </Select>
          </InputGroup>
          {
          (global_user.designation.name==='Staff' || global_user.designation.name==='Finance Clerk')&&(<InputGroup size={'sm'} width={'auto'} >
            <Select backgroundColor={'white'} size='sm' onChange={(e)=>{setStatus(e.target.value)}} value={batch} borderLeftRadius={'5px'}>
              {
                options[global_user.designation.name].map((option, index) => {
                  return (
                    <option key={index} value={option[0]}>{option[1]}</option>
                  )
                })
              }
            </Select>
            <Button
              bgColor={'#5169f6'} 
              color='white' 
              children="Set Status"
              size={'sm'}
              px={6}
              borderTopLeftRadius={'0px'}
              borderBottomLeftRadius={'0px'}
              onClick={change_status}

            >
              Set Status
            </Button>
          </InputGroup>)}
          
          {global_user.designation.name==='Staff'&&(
            <>
            <RaiseDemandModal batch={batch} year={year} data={selected.length>0?selected:all_data} name="Raise Demand"/>

            <RaiseDemandModal batch={batch} year={year} data={selected.length>0?selected:all_data} name="Generate Approval"/>
            </>)}
        </Flex>
      </Table>
    </Suspense>
    </>
  );
}


