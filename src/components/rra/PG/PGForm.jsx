import React, { useState } from "react";
import { useEntries } from "../context";
import Branches from "./PGFormBranches";

function PGEntry(props) {
  const entries = useEntries();

  const [branches, setBranches] = useState([]);

  const add_branch = () => {
    setBranches([...branches, <Branches index={branches.length} />]);
    entries.pg.add_branch()
 }

  return (
    <>
      {
        branches.map(
            (branch, idx) => <React.Fragment key={idx}>{branch}</React.Fragment>
        )
      }
      <button onClick={add_branch}>New Branch</button>
    </>
  );
}

export default PGEntry;



