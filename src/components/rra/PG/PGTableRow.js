import { useEffect, useState } from "react";
import { useEntries } from "../context";


const STATES = {
  "AN":"Andaman and Nicobar Islands",
  "AP":"Andhra Pradesh",
  "AR":"Arunachal Pradesh",
  "AS":"Assam",
  "BR":"Bihar",
  "CG":"Chandigarh",
  "CH":"Chhattisgarh",
  "DN":"Dadra and Nagar Haveli",
  "DD":"Daman and Diu",
  "DL":"Delhi",
  "GA":"Goa",
  "GJ":"Gujarat",
  "HR":"Haryana",
  "HP":"Himachal Pradesh",
  "JK":"Jammu and Kashmir",
  "JH":"Jharkhand",
  "KA":"Karnataka",
  "KL":"Kerala",
  "LA":"Ladakh",
  "LD":"Lakshadweep",
  "MP":"Madhya Pradesh",
  "MH":"Maharashtra",
  "MN":"Manipur",
  "ML":"Meghalaya",
  "MZ":"Mizoram",
  "NL":"Nagaland",
  "OR":"Odisha",
  "PY":"Puducherry",
  "PB":"Punjab",
  "RJ":"Rajasthan",
  "SK":"Sikkim",
  "TN":"Tamil Nadu",
  "TS":"Telangana",
  "TR":"Tripura",
  "UP":"Uttar Pradesh",
  "UK":"Uttarakhand",
  "WB":"West Bengal"
}

export default function TR({index, branch_index}) {
    const entries = useEntries()

    const [state, set_state] = useState({
        id: "",
        quota: "",
        name: "",
        nationality: "",
        community: "",
        entrance_exam: "",
        marks: 0,
        pattern1: 10,
        pattern2: 0,
        pattern3: 0,
        mode_of_study: '',
        degree: '',
        discipline: '',
        university: '',
        state: ''
    })

    const change = (e) => {
        
        set_state({...state, [e.target.id]: e.target[e.target.type === 'number' ? 'valueAsNumber' : 'value']})
    }
    
    useEffect(() => {
        entries.pg.add_data(branch_index, index, state)
    }, [state])

  return (
    
      <tr>
        <>
          <td>
            <input onChange={change} type="text" id="id" placeholder="Unique ID" />
          </td>
          
          <td>
            <input onChange={change} type="text" list="pg_quota_dl" id="quota" />
            <datalist id="pg_quota_dl">
              {["govt", "mngt", "lap"].map((i, j) => (
                <option key={j} value={i}>
                  {i.toUpperCase()}
                </option>
              ))}
            </datalist>
          </td>
          
          <td>
            <input onChange={change} type="text" id="name" placeholder="Name" />
          </td>
          
          <td>
            <input onChange={change} type="text" id="nationality" list="nationality_dl" />
            <datalist id="nationality_dl">
              <option value="TN">TamilNadu</option>
              <option value="OS">Other State</option>
              <option value="OC">Other Country</option>
            </datalist>
          </td>
          
          <td>
            <input onChange={change} type="text" id="community" list="community_dl" />
            <datalist id="community_dl">
              <option value="BC">BC</option>
              <option value="MBC">MBC</option>
              <option value="DNC">DNC</option>
              <option value="OC">OC</option>
              <option value="SC">SC</option>
              <option value="SCA">SCA</option>
              <option value="ST">ST</option>
              <option value="BCM">BCM</option>
            </datalist>
          </td>
          
          <td>
            <input onChange={change} type="text" id="entrance_exam" list="pg_entrance_exam_dl" />
            <datalist id="pg_entrance_exam_dl">
              <option value="TANCET">TANCET</option>
              <option value="CONSORTIUM">CONSORTIUM</option>
            </datalist>
          </td>
          
          <td>
            <input onChange={change} type="number" id="marks" />
          </td>
          
          <td>
            <input onChange={change} type="number" value={state.pattern1} id="pattern1" />
            <input onChange={change} type="number" value={state.pattern2} id="pattern2" />
            <input onChange={change} type="number" value={state.pattern3} id="pattern3" />
          </td>
          
          <td>
            <input onChange={change} type="text" id="mode_of_study" list="pg_mode_of_study_dl" />

            <datalist id="pg_mode_of_study_dl">
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
            </datalist>
          </td>
          
          <td>
            <input onChange={change} type="text" id="degree" list="pg_degree_dl" />

            <datalist id="pg_degree_dl">
              <option value="B.E">B.E</option>
              <option value="B.TECH">B.TECH</option>
              <option value="B.Sc">B.Sc</option>
              <option value="B.COM">B.COM</option>
              <option value="BBA">BBA</option>
              <option value="BA">BA</option>
            </datalist>
          </td>
          
          <td>
            <input onChange={change} type="text" id="discipline" list="pg_discipline_dl" />

            <datalist id="pg_discipline_dl" >
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
            </datalist>
          </td>
          
          <td>
            <input onChange={change} type="text" id="university" list="pg_university_dl" />

            <datalist id="pg_university_dl">
              <option value="ANNA UNIVERSITY">ANNA UNIVERSITY</option>
              <option value="BHARATHIYAR UNIVERSITY">BHARATHIYAR UNIVERSITY</option>
            </datalist>
          </td>

          <td>
            <input onChange={change} type="text" id="state" list="pg_state_dl" />

            <datalist id="pg_state_dl">
              {
                Object.values(STATES).map((i, j) => (
                  <option key={j} value={i}>
                    {i}
                  </option>
                ))
              }
            </datalist>
          </td>
        </>
      </tr>
    
  );
};
