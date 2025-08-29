import { useEffect, useState } from "react";


const DEFAULT_FONT_SIZE = '1.0rem';

const changeFontSize = (size: string) => {
  const container = document.getElementById("container")!;
  container.style.setProperty('--font-size', size);
  localStorage.setItem("font-size", size);
}

const valToFontSize = (val: number) => (val*0.1).toFixed(2) + 'rem';
const fontSizeToVal = (size: string) => 10*Number.parseFloat(size);

function useFontSize() {
  const [val, setVal] = useState(() => fontSizeToVal(DEFAULT_FONT_SIZE));
  
  useEffect(() => {
    const size = localStorage.getItem("font-size");
    if (size) {
      changeFontSize(size);
      setVal(fontSizeToVal(size));
    }
  }, []);
  
  const increment = (step: number) => () => {
    const newVal = val + step;
    setVal(newVal);
    changeFontSize(valToFontSize(newVal));
  }
  
  const reset = () => {
    setVal(fontSizeToVal(DEFAULT_FONT_SIZE));
    changeFontSize(DEFAULT_FONT_SIZE);
  }
  
  return {
    size: valToFontSize(val),
    increase: increment(+1),
    decrease: increment(-1),
    reset,
  }
}


export default useFontSize;
