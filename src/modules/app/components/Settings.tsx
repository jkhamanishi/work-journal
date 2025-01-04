import { ChangeEvent, useEffect, useState } from "react";


function getFromLocalStorage(key: string, callback: (s: string) => void) {
  const item = localStorage.getItem(key);
  if (item) {
    callback(item);
  }
}

function TextSetting({label, defaultValue, changeFcn}: {label: string, defaultValue: string, changeFcn: (s: string) => void}) {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    changeFcn(event.currentTarget.value);
  }
  return (
    <label>{label}: <input type="text" defaultValue={defaultValue} onChange={onChange} /></label>
  );
}

function Settings() {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(show => !show);
  
  const [textColor, setTextColor] = useState("");
  const changeTextColor = (color: string) => {
    const root = document.getElementById("root")!;
    root.style.setProperty('--text-color', color);
    localStorage.setItem("text-color", color);
    setTextColor(color);
  }
  
  const [bgColor, setBgColor] = useState("");
  const changeBgColor = (color: string) => {
    const root = document.getElementById("root")!;
    root.style.setProperty('--bg-color', color);
    localStorage.setItem("bg-color", color);
    setBgColor(color);
  }
  
  useEffect(() => {
    getFromLocalStorage("text-color", changeTextColor);
    getFromLocalStorage("bg-color", changeBgColor);
  }, []);
  
  return (
    <>
      <button onClick={toggleShow}>Settings</button>
      {show && (
        <div className="settings">
          <TextSetting label="Text color" defaultValue={textColor} changeFcn={changeTextColor}/>
          <TextSetting label="Background color" defaultValue={bgColor} changeFcn={changeBgColor}/>
        </div>
      )}
    </>
  );
}


export default Settings;
