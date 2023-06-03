import {Grid, Autocomplete, TextField, Button, Typography} from '@mui/material'
import {Upload, Delete, Save} from '@mui/icons-material'
import { useState} from 'react'
import {readExcel, readCSV} from 'danfojs'
import {base64} from 'lib/base64'



const academic_year = ['2020-2021', '2021-2022', '2022-2023', '2023-2024'].map(i => ({label: i, value: i}))

const file_types = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf', 'text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];


export default function UploadBatch(props){
    const {table_data, set_table_data, show_del, save, academic_year_ref, batch_ref} = props

    const [data_file, set_data_file] = useState({file: '', name: ''})

    const change = async (e) => {
        const file = e.target.files[0]
        const name = file.name

        const base = await base64(file)
        set_data_file({file: base, name})

        const columns = [
            {field:'sno', headerName: 'S. No'}, 
            {field:'code', headerName: 'Code', editable: true}, 
            {field:'clg_name', headerName: 'College Name', editable: true}, 
            {field:'sanctioned', headerName: 'Sanctioned', editable: true}, 
            {field:'admitted', headerName: 'Admitted', editable: true}, 
            {field:'approved', headerName: 'Approved', editable: true}, 
            {field:'not_approved', headerName: 'Not Approved', editable: true}, 
            {field:'dis', headerName: 'DIS', editable: true}, 
            {field:'tn', headerName: 'TN', editable: true}, 
            {field:'os', headerName: 'Other State', editable: true}, 
            {field:'oc', headerName: 'Other Country', editable: true}
        ]

        const {$data} = await readExcel(file)
        console.log($data);
        const rows = []

        const keys = columns.map(i => i.field)
        for(let i = 2; i < $data.length; i++) {
            const row = $data[i]
            const d = {}
            for(let k= 0; k < keys.length; k++){
                d[keys[k]] = row[k]
            }
            d.id = i
            rows.push(d)
        }
        set_table_data({rows, columns})
    }

    const delete_table_data = () => {
        const {selected} = show_del
        console.log(selected);
        set_table_data({...table_data, rows: table_data.rows.filter((i) => !selected.includes(i.id))})
    }

    return (
        <>
            <Grid container spacing={1} alignItems={'center'} alignContent={'end'} >


                <Grid item>
                    <Button variant='outlined'  component='label' size='small' startIcon={<Upload />}>
                        Upload file <input hidden onChange={change} accept={file_types.join(',')} type='file' />
                    </Button>
                </Grid>

                {
                    show_del.show &&
                    <Grid item>
                        <Button onClick={delete_table_data} variant='contained' color='error' size='small' startIcon={<Delete />}>
                            Delete
                        </Button>
                    </Grid>
                }

                {
                    !!table_data.rows.length &&
                    <Grid item>
                        <Button variant='contained' startIcon={<Save />} size='small' component='label' color='success' onClick={save}>
                            Save
                        </Button>
                    </Grid>
                }

            </Grid>
                

            <Typography fontSize={14}>{data_file.name}</Typography>
        </>

    )
}
