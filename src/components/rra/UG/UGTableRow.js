import { useEffect, useState } from "react";
import { useEntries } from "../context";

export default function TR({index, branch_index}) {
    const entries = useEntries()

    const [state, set_state] = useState({
        app_no: "",
        quota: "",
        name: "",
        nationality: "",
        community: "",
        board: "",
        mob: 0,
        pob: 0,
        cob: 0,
        total: 0,
        fg: false,
        afw: false
    })

    const change = (e) => {
      const input_type = e.target.type
      set_state({
        ...state, 
        [e.target.id]: e.target[input_type === 'number' ? 'valueAsNumber' : (input_type === 'checkbox' ? 'checked' : 'value') ]
      })
    }
    
    useEffect(() => {
        entries.ug.add_data(branch_index, index, state)
    }, [state])

  return (
    
      <tr>
        <>
          <td>
            <input onChange={change} type="text" id="app_no" />
          </td>
          <td>
            <input onChange={change} type="text" list="ug_quota_dl" id="quota" />
            <datalist id="ug_quota_dl">
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
            <input onChange={change} type="text" id="nationality" list="ug_nationality_dl" />
            <datalist id="ug_nationality_dl">
              <option value="TN">TamilNadu</option>
              <option value="OS">Other State</option>
              <option value="OC">Other Country</option>
            </datalist>
          </td>
          <td>
            <input onChange={change} type="text" id="community" list="ug_community_dl" />
            <datalist id="ug_community_dl">
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
            <input onChange={change} type="text" id="board" list="ug_board" />
            <datalist id="ug_board">
              <option value="TN ACA">TamilNadu</option>
            </datalist>
          </td>
          <td>
            <input onChange={change} type="number" id="mob" />
          </td>
          <td>
            <input onChange={change} type="number" id="pob" />
          </td>
          <td>
            <input onChange={change} type="number" id="cob" />
          </td>
          <td>
            <input onChange={change} type="number" id="total" value={(state.mob || 0) + (state.pob || 0) + (state.cob || 0)} />
          </td>
          <td>
            <input onChange={change} type="checkbox" id="fg" value="FG" />
          </td>
          <td>
            <input onChange={change} type="checkbox" id="afw" value="AFW" />
          </td>
        </>
      </tr>
    
  );
};
