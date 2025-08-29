import { useRef, useState, ChangeEvent, KeyboardEvent, HTMLAttributes } from "react";
import { tabToPrevious, tabToNext } from "../../utils/tabToNext";


interface EditableEntryProps {
  entry: string;
  saveFcn: (s: string) => void;
  newEntryFcn: (s: string) => void;
  deleteEntry: () => void;
  moveEntryFcn: (i: number) => void;
}

function EditableEntry({entry, saveFcn, newEntryFcn, deleteEntry, moveEntryFcn}: EditableEntryProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [size, setSize] = useState(entry.length + 10);
  const [value, setValue] = useState(entry);
  
  const save = () => {
    saveFcn(value);
    if (!value) {
      deleteEntry();
    }
  }
  
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSize(event.currentTarget.value.length + 10);
    setValue(event.currentTarget.value);
  };
  const inputHandler = (event: KeyboardEvent) => {
    if (ref.current) {
      switch (event.key) {
        case "Enter":
          newEntryFcn(value);
          return;
        case "ArrowUp":
          return event.altKey ? moveEntryFcn(+1) : tabToPrevious(ref.current);
        case "ArrowDown":
          return event.altKey ? moveEntryFcn(-1) : tabToNext(ref.current);
        case "Escape":
          ref.current.blur();
          return save();
        default:
          return;
      }
    }
  };
  
  const inputProps: HTMLAttributes<HTMLInputElement> = {
    defaultValue: entry,
    onKeyDown: inputHandler,
    onBlur: save,
    autoFocus: (!entry),
    onChange: onChange,
  };
  return ( <input ref={ref} type="text" spellCheck="true" size={size} {...inputProps} /> );
}


export default EditableEntry;

