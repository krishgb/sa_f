import React, { useState } from "react";
import TR from "./PGTableRow";
import {useEntries} from "../context";

export default function Branches({ index }) {
    const [all_entries, set_all_entries] = useState([]);
    const entries = useEntries();

    const add_new_table_row = () => {
        set_all_entries([...all_entries, <TR branch_index={index} index={all_entries.length} />])
        entries.pg.add_data(index, all_entries.length, null)
    }

    const add_or_change_branch = (e) => {
        entries.pg.add_branch(e.target.value, index)
    }

    return (
      <>
        <input type="text" id="branch" list="pg_branch_dl" placeholder="Branch" onChange={add_or_change_branch} />
        <datalist id="pg_branch_dl">
          {["MCA", "MBA", "ME", "M.TECH", "M.ARCH", 'M.PLAN', 'M.SC'].map((i, j) => (
            <option key={j} value={i}>
              {i.toUpperCase()}
            </option>
          ))}
        </datalist>
  
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Quota</th>
              <th>Name</th>
              <th>Nationality</th>
              <th>Community</th>
              <th>ENT Exam</th>
              <th>Marks</th>
              <th>Pattern</th>
              <th>Mode of study</th>
              <th>Degree</th>
              <th>Discipline</th>
              <th>University</th>
              <th>State</th>
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