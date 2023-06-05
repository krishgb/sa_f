import {createContext, useContext, useState} from 'react'
import {z} from 'zod'

const BreakOfStudyContext = createContext()

export const useBreakOfStudy = () => useContext(BreakOfStudyContext)

// const entry_schema = z.object({
//     name: z.string().min(3),
//     rno: z.string().nonempty(),
//     programme: z.enum(['UG', 'PG']),
//     course: z.string().nonempty(),
//     branch: z.string().nonempty(),
//     mode: z.string().nonempty(),
//     // admission_month_year: z.string(),
//     sems_completed: z.string().length(1),
//     // completed_from: z.string(),
//     // completed_to: z.string(),
//     break_of_study_sem: z.string().length(1),
//     break_of_study_duration_months: z.string().length(2),
//     // break_of_study_from: z.string(),
//     // break_of_study_to: z.string(),
//     rejoining_sem: z.string().length(1),
//     rejoining_academic_year: z.string().length(4),
//     max_period_of_completion: z.string().length(4),
//     remaining_period_as_per_regulations: z.enum(['yes', 'no']),
//     break_of_study_availed_previously: z.enum(['yes', 'no']),
//     break_of_study_availed_previously_sem: z.string().length(1).optional(),
//     // break_of_study_availed_previously_from: z.string(),
//     // break_of_study_availed_previously_to: z.string(),
//     lack_of_attendence_break_of_study: z.enum(['yes', 'no']),
//     lack_of_attendence_break_of_study_sem: z.string().length(1).optional(),
//     // lack_of_attendence_break_of_study_from: z.string(),
//     // lack_of_attendence_break_of_study_to: z.string(),
//     reason: z.string().nonempty,
//     door_no: z.string().nonempty,
//     street: z.string().nonempty,
//     city: z.string().nonempty,
//     state: z.string().nonempty,
//     pincode: z.string().length(6),
//     admission_month: z.string().length(2),
//     admission_year: z.string().length(4),
//     completed_from_month: z.string().length(2),
//     completed_from_year: z.string().length(4),
//     completed_to_month: z.string().length(2) ,
//     completed_to_year: z.string().length(4),
//     break_from_month: z.string().length(2),
//     break_from_year: z.string().length(4),
//     break_to_month: z.string().length(2),
//     break_to_year: z.string().length(4),
//     break_of_study_availed_previously_from_month: z.string().length(2).optional(),
//     break_of_study_availed_previously_from_year: z.string().length(4).optional(),
//     break_of_study_availed_previously_to_month: z.string().length(2).optional(),
//     break_of_study_availed_previously_to_year: z.string().length(4).optional(),
//     lack_of_attendance_from_month: z.string().length(2).optional(),
//     lack_of_attendance_from_year: z.string().length(4).optional(),
//     lack_of_attendance_to_month: z.string().length(2).optional(),
//     lack_of_attendance_to_year: z.string().length(4).optional(),
// })  

export function Data({children}) {

    const [entries, set_entries] = useState({
        name: '',
        rno:'',
        programme:'UG',
        course:'',
        branch:'',
        mode:'Regular',
        // admission_month_year:'',
        sems_completed:'',
        // completed_from:'',
        // completed_to:'',
        break_of_study_sem:'',
        break_of_study_duration_months:'',
        // break_of_study_from:'',
        // break_of_study_to:'',
        rejoining_sem:'1',
        rejoining_academic_year:'',
        max_period_of_completion:'',
        remaining_period_as_per_regulations:'',
        break_of_study_availed_previously:'no',
        break_of_study_availed_previously_sem:'',
        // break_of_study_availed_previously_from:'',
        // break_of_study_availed_previously_to:'',
        lack_of_attendance_break_of_study:'no',
        lack_of_attendance_break_of_study_sem:'',
        // lack_of_attendence_break_of_study_from:'',
        // lack_of_attendence_break_of_study_to:'',
        reason:'',
        door_no:'',
        street:'',
        city:'',
        state:'',
        pincode:'',
        admission_month:'0',
        admission_year:'0',
        completed_from_month:'0',
        completed_from_year:'0',
        completed_to_month:'0',
        completed_to_year:'0',
        break_from_month:'0',
        break_from_year:'0',
        break_to_month:'0',
        break_to_year:'0',
        break_of_study_availed_previously_from_month:'',
        break_of_study_availed_previously_from_year:'',
        break_of_study_availed_previously_to_month:'',
        break_of_study_availed_previously_to_year:'',
        lack_of_attendance_from_month:'',
        lack_of_attendance_from_year:'',
        lack_of_attendance_to_month:'',
        lack_of_attendance_to_year:'',
    })

    function set_data(key, value) {
        set_entries({...entries, [key]: value})
    }


    const submit = async () => {
        // const parse = await entry_schema.safeParseAsync(entries)
        // console.log(parse);
        // const success = entry_schema.safeParse(entries).success

        // console.log(entries);
        // if(!success) {
        //     return
        // }
        // console.log("success");
        const url = import.meta.env.VITE_REACT_APP_SERVER_URL + 'break_of_study/pdf'   
        console.log(url);
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entries)
        })

        const data = await res.json()
        console.log(data);
        const link = document.createElement('a')
        link.href = `${data.pdf}`
        link.download = 'break_of_study_application.pdf'
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        link.click()
        link.style.display = 'none'
        document.body.appendChild(link)
    }


    return (
        <BreakOfStudyContext.Provider value={{set_data, submit, entries}}>
            {children}
        </BreakOfStudyContext.Provider>
    )

}

