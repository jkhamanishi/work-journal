import { useEffect, useState } from "react";


const DEFAULT_BRANCH_WIDTH = '0.1rem';

const changeBranchWidth = (size: string) => {
  const journal = document.getElementById("journal")!;
  journal.style.setProperty('--branch-width', size);
  localStorage.setItem("branch-width", size);
}

const valToBranchWidth = (val: number) => (val*0.01).toFixed(2) + 'rem';
const branchWidthToVal = (size: string) => 100*Number.parseFloat(size);

function useBranchWidth() {
  const [val, setVal] = useState(() => branchWidthToVal(DEFAULT_BRANCH_WIDTH));
  
  useEffect(() => {
    const size = localStorage.getItem("branch-width");
    if (size) {
      changeBranchWidth(size);
      setVal(branchWidthToVal(size));
    }
  }, []);
  
  const increment = (step: number) => () => {
    const newVal = val + step;
    setVal(newVal);
    changeBranchWidth(valToBranchWidth(newVal));
  }
  
  const reset = () => {
    setVal(branchWidthToVal(DEFAULT_BRANCH_WIDTH));
    changeBranchWidth(DEFAULT_BRANCH_WIDTH);
  }
  
  return {
    size: valToBranchWidth(val),
    increase: increment(+1),
    decrease: increment(-1),
    reset,
  }
}


export default useBranchWidth;
