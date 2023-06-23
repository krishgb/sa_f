import {createContext, useContext, useEffect, useState} from 'react'
import {z} from 'zod'

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);


// const user_schema = z.object({
//     email: z.string().email(),
//     designation: z.object({
//         name: z.string(),
//         id: z.number(),
//         created_at: z.string(),
//     }),
//     avatar: z.string().isNullable(),
//     privileges: z.array(z.number()),
//     created_at: z.string().optional(),
//     updated_at: z.string().optional(),
//     designation_id: z.number(),
//     dob: z.string().optional(),
//     fullname: z.string(),
//     id: z.number(),
//     last_login: z.string().optional(),
//     phone: z.string().isNullable(),

// })
export default function Global({children}){

    const [global_user, global_set_user] = useState(false);
    const [global_allowed_routes, global_set_allowed_routes] = useState([])
    const [global_is_admin, global_set_is_admin] = useState(false)
    const [global_is_college, global_set_is_college] = useState(false)

    const ACCESS_PRIVILEGES = {
        1: 'transfer',
        2: 'readmission',
        3: 'break_of_study',
        4: 'rra',
        5: 'name_change',
        6: 'grievance',
        7: 'r_cum_t',
    }

    const DESIGNATION = {
        'admin': [1,2,3,4,5,6],
        'Director': [1,2,3,4,5,6],
        'Deputy Director': [1,2,3,4,5,6],
        'Finance Clerk': [1,2,3,4,5]
    }


    useEffect(() => {
        if(global_user === false) return

        if(global_user === null){
            localStorage.removeItem('user');
            global_set_is_admin(false)
            global_set_allowed_routes([]);
            
            return 
        }

        localStorage.setItem('user', JSON.stringify(global_user));

        const {designation, privileges} = global_user;

        let allowed_routes = Object.values(ACCESS_PRIVILEGES);
        if(designation.name === 'Director' || designation.name === 'Deputy Director' || designation.name === 'admin'){
            global_set_is_admin(true)
        }else if (designation.name === 'College'){
            global_set_is_college(true)
            allowed_routes = []
        }else {
            allowed_routes = privileges.map(i => ACCESS_PRIVILEGES[i]);
            global_set_is_admin(false)
        }
        global_set_allowed_routes(allowed_routes);

    }, [global_user])



    useEffect(() => {
        const user = localStorage.getItem('user');

        if(user !== null && JSON.parse(user)?.privileges?.length){
            global_set_user(JSON.parse(user));
        }else {
            global_set_user(null);
        }
    }, [])


    return (
        <GlobalContext.Provider value={{global_user, global_set_user, global_allowed_routes, global_is_admin, global_is_college}}>
            {children}
        </GlobalContext.Provider>
    )

}