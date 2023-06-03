import { forwardRef, useEffect, useRef } from "react"

export const Checkbox = forwardRef(({indererminate, ...rest}, ref) =>  {

    const default_ref = useRef()
    const resolved_ref = ref || default_ref

    useEffect(() => {
        resolved_ref.current.indererminate = indererminate
    }, [resolved_ref, indererminate])

    return(
            <input type="checkbox" ref={resolved_ref} {...rest} />
    )
})

