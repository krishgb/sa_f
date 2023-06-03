import React, { useEffect, useState } from 'react'
import {fetchDetails} from 'lib/axios'


function Home() {
  const [grievance_data, set_grievance_data] = useState([])

  const get_grievance_data = async () => {

    const response = await fetchDetails('/grievance/read')
    if(response.error !== null) {
      console.log("Error in fetching data", response.error);
      return
    }

    set_grievance_data(response.data)
  }

  useEffect(() => {
    console.log(grievance_data);
  }, [grievance_data])

  useEffect(() => {
    get_grievance_data()
  }, [])


  return (
    <div>
        <h1>Home</h1>
    </div>
  )
}

export default Home