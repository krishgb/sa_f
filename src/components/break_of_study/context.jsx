import {createContext, useCallback, useContext, useRef, useState} from 'react'
// import {z} from 'zod'
import {get_break_of_study_PDF} from './ApplicationPdf'

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
    const pdf_ref = useRef(null)
    const [entries, set_entries] = useState({
        name: '',
        rno:'',
        programme:'UG',
        course:'',
        branch:'',
        mode:'regular',
        sems_completed:'',
        break_of_study_sem:'',
        break_of_study_duration_months:'',
        rejoining_sem:'1',
        rejoining_academic_year:'',
        max_period_of_completion:'',
        remaining_period_as_per_regulations:'',
        reason:'',
        door_no:'',
        street:'',
        city:'',
        state:'',
        pincode:'',
        admission_month:'',
        admission_year:'',
        completed_from_month:'',
        completed_from_year:'',
        completed_to_month:'',
        completed_to_year:'',
        break_from_month:'',
        break_from_year:'',
        break_to_month:'',
        break_to_year:'',
        break_of_study_availed_previously:'no',
        break_of_study_availed_previously_sem:'',
        break_of_study_availed_previously_from_month:'',
        break_of_study_availed_previously_from_year:'',
        break_of_study_availed_previously_to_month:'',
        break_of_study_availed_previously_to_year:'',
        lack_of_attendance_break_of_study:'no',
        lack_of_attendance_break_of_study_sem:'',
        lack_of_attendance_from_month:'',
        lack_of_attendance_from_year:'',
        lack_of_attendance_to_month:'',
        lack_of_attendance_to_year:'',
    })

    const set_data = (key, value) => {
        set_entries({...entries, [key]: value})
    }

        
    const transform = () => ({
        name: entries.name,
        register_no: entries.rno,
        programme: entries.programme,
        branch: entries.branch,
        admission: {month: entries.admission_month, year: entries.admission_year},
        mode_of_study: entries.mode === 'ss' ? 'Full Time (SS)' : entries.mode === 'regular' ? 'Full Time (Regular)' : entries.mode === 'part_time' ? 'Part Time(Evening)' : '',
        sems_completed: {
            sem: entries.sems_completed,
            from: {month: entries.completed_from_month, year: entries.completed_from_year},
            to: {month: entries.completed_to_month, year: entries.completed_to_year},
        },
        break_of_study_period: {
            sem: entries.break_of_study_sem, 
            duration: entries.break_of_study_duration_months,
            from: {month: entries.break_from_month, year: entries.break_from_year}, 
            to: {month: entries.break_to_month, year: entries.break_to_year}
        },
        rejoin: {sem: entries.rejoining_sem, academic_year: entries.rejoining_academic_year},
        completion_academic_year: entries.max_period_of_completion,
        remaining_period_as_per_regulations: entries.remaining_period_as_per_regulations,
        reason: entries.reason,
        address: `${entries.door_no}, ${entries.street}, ${entries.city} ${entries.state} ${entries.pincode}`,
        prev_break_of_study: {
            sem: entries.break_of_study_availed_previously_sem,
            from: {month: entries.break_of_study_availed_previously_from_month, year: entries.break_of_study_availed_previously_from_year},
            to: {month: entries.break_of_study_availed_previously_to_month, year: entries.break_of_study_availed_previously_to_year},
        },
        prevention_details: {
            sem: entries.lack_of_attendance_break_of_study_sem,
            from: {month: entries.lack_of_attendance_from_month, year: entries.lack_of_attendance_from_year},
            to: {month: entries.lack_of_attendance_to_month, year: entries.lack_of_attendance_to_year},
        }
    })
    const submit = async () => {

        // const parse = await entry_schema.safeParseAsync(entries)
        // console.log(parse);
        // const success = entry_schema.safeParse(entries).success

        // console.log(entries);
        // if(!success) {
        //     return
        // }
        // console.log("success");
        try{
            let req = await fetch('/api/break_of_study/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(entries),
                credentials: 'include'
            })
    
            const res = await req.json()
            
            if(res.success){
                pdf_ref.current.href = await get_break_of_study_PDF(transform())
                pdf_ref.current.download =  `${res.reference_id || 'Break of Study'}.pdf`
                pdf_ref.current.click()
            }else{
                console.log(res);
            }
        }catch(e){
            console.log(e);
        }
        console.log(transform());
    }


    return (
        <BreakOfStudyContext.Provider value={{set_data, submit, entries}}>
            {children}
            <a download={'Break of Study Application.pdf'} href='#' ref={pdf_ref}></a>
        </BreakOfStudyContext.Provider>
    )

}

