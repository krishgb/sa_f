import React, { useRef } from 'react'

function EditableCell(
    {
        value: initialValue,
        row: {index},
        column: {id},
        update_data
    }
) {

    const input_ref = useRef(null)

    const onBlur = () => {
        if(input_ref.current.value === initialValue) return
        update_data(index, id, input_ref.current.value)
    }

    return <input style={{width: '100%', color: 'black'}} defaultValue={initialValue || ''} ref={input_ref} onBlur={onBlur} />
}

export default EditableCell