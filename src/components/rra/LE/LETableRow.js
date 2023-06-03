import { useEffect, useState } from "react";
import { useEntries } from "../context";

export default function TR({index, branch_index}) {
    const entries = useEntries()

    const [state, set_state] = useState({
        app_no: "",
        reg_no: "",
        quota: "",
        name: "",
        nationality: "",
        community: "",
        board: "",
        marks_obtained: 0,
        max_marks: 0,
        percent: 0,
        fg: false,
        pmss: false
    })

    const change = (e) => {
      const input_type = e.target.type
      set_state({
        ...state, 
        [e.target.id]: e.target[input_type === 'number' ? 'valueAsNumber' : (input_type === 'checkbox' ? 'checked' : 'value') ]
      })
    }

    useEffect(() => {
        set_state({...state, percent: ((state.marks_obtained/state.max_marks)*100).toFixed(2)})
    }, [state.marks_obtained, state.max_marks])
    
    useEffect(() => {
        entries.le.add_data(branch_index, index, state)
    }, [state])

  return (
    
      <tr>
        <>
          <td>
            <input onChange={change} type="text" id="app_no" />
          </td>

          <td>
            <input onChange={change} type="text" id="reg_no" />
          </td>

          <td>
            <input onChange={change} type="text" list="quota_dl" id="quota" />
            <datalist id="quota_dl">
              {["govt", "mngt", "lap"].map((i, j) => (
                <option key={j} value={i}>
                  {i.toUpperCase()}
                </option>
              ))}
            </datalist>
          </td>
          <td>
            <input onChange={change} type="text" id="name" />
          </td>
          <td>
            <input onChange={change} type="text" id="nationality" list="le_nationality_dl" />
            <datalist id="le_nationality_dl">
              <option value="TN">TamilNadu</option>
              <option value="OS">Other State</option>
              <option value="OC">Other Country</option>
            </datalist>
          </td>
          <td>
            <input onChange={change} type="text" id="community" list="le_community_dl" />
            <datalist id="le_community_dl">
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
            <input onChange={change} type="text" id="board" list="le_board_dl" />
            <datalist id="le_board_dl">
              <option value="TN ACA">TamilNadu</option>
            </datalist>
          </td>
          <td>
            <input onChange={change} type="number" id="marks_obtained" />
          </td>
          <td>
            <input onChange={change} type="number" id="max_marks" />
          </td>
          <td>
            <input onChange={change} type="number" id="percent" value={state.percent} />
          </td>
          <td>
            <input onChange={change} type="checkbox" id="fg" />
          </td>
          <td>
            <input onChange={change} type="checkbox" id="pmss" />
          </td>
        </>
      </tr>
    
  );
};
