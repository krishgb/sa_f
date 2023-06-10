import React, { useState } from "react";
import TR from "./UGTableRow";
import {useEntries} from "../context";

export default function Branches({ index }) {
    const [all_entries, set_all_entries] = useState([]);
    const entries = useEntries();

    const add_new_table_row = () => {
        set_all_entries([...all_entries, <TR branch_index={index} index={all_entries.length} />])
        entries.ug.add_data(index, all_entries.length, null)
    }

    const add_or_change_branch = (e) => {
        entries.ug.add_branch(e.target.value, index)
    }

    return (
      <>
        <input type="text" id="branch" list="ug_branch_dl" placeholder="Branch" onChange={add_or_change_branch} />
        <datalist id="ug_branch_dl">
          {["CSE", "ECE", "EEE", "MECH", "CIVIL"].map((i, j) => (
            <option key={j} value={i}>
              {i.toUpperCase()}
            </option>
          ))}
        </datalist>
  
        <table>
          <thead>
            <tr>
              <th>Application No</th>
              <th>Quota</th>
              <th>Name</th>
              <th>Nationality</th>
              <th>Community</th>
              <th>State Board</th>
              <th>MOB</th>
              <th>POB</th>
              <th>COB</th>
              <th>Total</th>
              <th>First Graduate</th>
              <th>AFW</th>
            </tr>
          </thead>
  
          <tbody>
            {all_entries.map((i, j) => (
              <React.Fragment key={j}>{i}</React.Fragment>
            ))}
          </tbody>
        </table>
        <button onClick={add_new_table_row}>Add</button>
      </>
    );
  };