import {createContext, useContext, useState} from 'react'

const EntriesContext = createContext()

export const useEntries = () => useContext(EntriesContext)


export function Entries({children}) {

    const [entries, set_entries] = useState({ug: [[], []], le: [[], []], pg: [[], []]})

    function ent(type) {

        return {
            add_branch: (branch = '', index = -1) => {
                let temp = [...entries[type]]
                if(index !== -1) {
                    temp[0][index] = branch
                } else {
                    temp[0].push(branch)
                    temp[1].push([])
                }
                set_entries({...entries, [type]: temp})
            },

            add_data: (branch_index, index, data) => {
                const entry = [...entries[type]]
                if(index >= entry[1][branch_index].length) 
                    entry[1][branch_index].push(data)

                entry[1][branch_index][index] = data
                set_entries({...entries, [type]: entry})
            }
        }
    }

    const ug = ent('ug')
    const pg = ent('pg')
    const le = ent('le')


    const submit = async (type) => {

        if(!entries[type].length) return 
            
        let res = await fetch(import.meta.env.VITE_REACT_APP_SERVER_URL + `rra/set_${type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entries[type])
        })

        console.log(res);
    }


    return (
        <EntriesContext.Provider value={{entries, ug, pg, le, submit}}>
            {children}
        </EntriesContext.Provider>
    )

}

