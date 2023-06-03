import React, { useState } from "react";
import { useEntries } from "../context";
import Branches from "./UGFormBranches";

function UGEntry(props) {
  const entries = useEntries();

  const [branches, setBranches] = useState([]);

  const add_branch = () => {
    setBranches([...branches, <Branches index={branches.length} />]);
    entries.ug.add_branch()
 }

  return (
    <>
      {branches.map((i, j) => (
        <React.Fragment key={j}>{i}</React.Fragment>
      ))}
      <button
        onClick={add_branch}
      >
        New Branch
      </button>
    </>
  );
}

export default UGEntry;



