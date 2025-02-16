import "./MenuBar.scss";

import { MenuBar as _MenuBar, Menu, Keys } from "../../../menu-bar";
import useAppMenu from "../../hooks/useAppMenu";


function MenuBar() {
  const menu = useAppMenu();
  
  return (  
    <nav id="menubar">
      <_MenuBar>
        <Menu label="File">
          <Menu label="Open..." hotKeys={Keys.ctrl("O")} onSelect={menu.open} />
          <Menu label="Save" hotKeys={Keys.ctrl("S")} onSelect={menu.save} />
          <Menu label="Save As..." hotKeys={Keys.ctrlShift("S")} onSelect={menu.saveAs} />
          <Menu label="AutoSave" checked={menu.autoSave} onSelect={menu.toggleAutoSave} keepOpenOnSelect />
        </Menu>
        <Menu label="Edit">
          <Menu label="Settings..." onSelect={menu.toggleShowSettings} />
        </Menu>
        <Menu label="View">
          <Menu label="Font Size">
            <Menu label="Increase Font Size" onSelect={menu.font.increase} keepOpenOnSelect />
            <Menu label="Decrease Font Size" onSelect={menu.font.decrease} keepOpenOnSelect />
            <Menu label="Restore Default Font Size" onSelect={menu.font.reset} keepOpenOnSelect />
          </Menu>
          <Menu label="Branch Width">
            <Menu label="Increase Branch Width" />
            <Menu label="Decrease Branch Width" />
            <Menu label="Restore Default Branch Width" />
          </Menu>
        </Menu>
        <Menu label="Help">
          <Menu label="Version..." onSelect={menu.showAppVersion} />
        </Menu>
      </_MenuBar>
    </nav>
  );
}


export default MenuBar;









// function MenuBar() {
  
  
//   return (
//     <nav id="menubar">
//       <ul>
//         <li>
//           <a href="#">File</a>
//           <ul>
//             <li><a href="#">Open</a></li>
//             <li><a href="#">Save</a></li>
//             <li><a href="#">Save as&#8230;</a></li>
//             <li><a href="#">Close</a></li>
//             <li className="separator"></li>
//             <li><a href="#">Exit</a></li>
//           </ul>
//         </li>
//         <li>
//           <a href="#">Edit</a>
//           <ul>
//             <li><a href="#">Cut</a></li>
//             <li><a href="#">Copy</a></li>
//             <li><a href="#">Paste</a></li>
//           </ul>
//         </li>
//         <li>
//           <a href="#">Help</a>
//           <ul>
//             <li><a href="#">About</a></li>
//           </ul>
//         </li>
//       </ul>
//     </nav>
//   );
// }


// export default MenuBar;
