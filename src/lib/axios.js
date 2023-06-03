import axios from "axios";

export const fetchDetails = async (endpoint, method = 'get', data = null) => {
    const url = process.env.REACT_APP_SERVER_URL + endpoint

    const options = {}

    if(data) {
        options.data = data
    }

    try{
        const _ = await axios[method](url, { withCredentials: true, ...options })
        const __ = _.data
        
        if(!__.success) throw new Error(data.msg)
        return {data: __.data, redirect: false, error: null}
    }catch(e){
        if(e.response && e.response.status === 304)
            return {redirect: true, error: null, data: null}
        return {redirect: false, error: e, data: null}
    }

}
