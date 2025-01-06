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
    <label>{label}: <input type="text" value={defaultValue} onChange={onChange} /></label>
  );
}

function ThemeOption({textColor, bgColor, setTheme, name}: {textColor: string, bgColor: string, setTheme: (tc: string, bc: string) => void, name: string}) {
  const onClick = () => setTheme(textColor, bgColor);  
  return (
    <button onClick={onClick}>{name}</button>
  );
}

function Settings() {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(show => !show);
  
  const [textColor, setTextColor] = useState("#11c700");
  const changeTextColor = (color: string) => {
    const root = document.getElementById("root")!;
    root.style.setProperty('--text-color', color);
    localStorage.setItem("text-color", color);
    setTextColor(color);
  }
  
  const [bgColor, setBgColor] = useState("#000000");
  const changeBgColor = (color: string) => {
    const root = document.getElementById("root")!;
    root.style.setProperty('--bg-color', color);
    localStorage.setItem("bg-color", color);
    setBgColor(color);
  }
  
  const setTheme = (themeTextColor: string, themeBgColor: string) => {
    changeTextColor(themeTextColor);
    changeBgColor(themeBgColor);
  }
  
  useEffect(() => {
    getFromLocalStorage("text-color", changeTextColor);
    getFromLocalStorage("bg-color", changeBgColor);
  }, []);
  
  return (
    <>
      <button onClick={toggleShow}>Settings</button>
      {show && (
        <div id="settings">
          <div className="section-title">Settings</div>
          <div id="preset-themes">
            <div style={{marginBottom: "0.5rem"}}>Preset themes: </div>
            <ThemeOption name="Hacker (default)" textColor="#11c700"   bgColor="#000000" setTheme={setTheme}></ThemeOption>
            <ThemeOption name="Dev's Theme"      textColor="#FF75CA"   bgColor="#550034" setTheme={setTheme}></ThemeOption>
            <ThemeOption name="Noir"             textColor="lightgray" bgColor="black"   setTheme={setTheme}></ThemeOption>
            <ThemeOption name="Hotdog Stand"     textColor="yellow"    bgColor="red"     setTheme={setTheme}></ThemeOption>
          </div>
          <TextSetting label="Text color" defaultValue={textColor} changeFcn={changeTextColor}/>
          <TextSetting label="Background color" defaultValue={bgColor} changeFcn={changeBgColor}/>
        </div>
      )}
    </>
  );
}


export default Settings;
