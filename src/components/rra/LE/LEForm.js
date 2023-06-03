import React, { useState } from "react";
import { useEntries } from "../context";
import Branches from "./LEFormBranches";

function LEEntry(props) {
  const entries = useEntries();

  const [branches, setBranches] = useState([]);

  const add_branch = () => {
    setBranches([...branches, <Branches index={branches.length} />]);
    entries.le.add_branch()
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

export default LEEntry;



