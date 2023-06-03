import React, { useState } from 'react'
import {useAsyncDebounce} from 'react-table'
import 'regenerator-runtime'

export function GlobalFilter({filter, set_filter }) {
    const [value, set_value] = useState(filter)

    const onChange = useAsyncDebounce(value => {
        set_filter(value || undefined)
    }, 300)

    return (
    <span>
        <input placeholder="Search any column" value={value || ''} onChange={e => {
            set_value(e.target.value)
            onChange(e.target.value)
        } 
        }/>
    </span>
  )
}



