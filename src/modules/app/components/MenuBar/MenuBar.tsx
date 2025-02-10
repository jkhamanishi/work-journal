import { MenuBar as _MenuBar, Menu as _Menu, Keys } from "../../../menu-bar";
import "./MenuBar.scss";





function MenuBar() {
  
  
  return (
    <nav id="menubar">
      <_MenuBar>
        <_Menu label="File">
          <_Menu label="Open..." hotKeys={Keys.ctrl("O")} />
          <_Menu label="Save" hotKeys={Keys.ctrl("S")} />
          <_Menu label="Save As..." hotKeys={Keys.ctrlShift("S")} />
        </_Menu>
        <_Menu label="Edit">
          <_Menu label="Settings..." />
        </_Menu>
        <_Menu label="View">
          <_Menu label="Font Size">
            <_Menu label="Increase Font Size" />
            <_Menu label="Decrease Font Size" />
            <_Menu label="Restore Default Font Size" />
          </_Menu>
        </_Menu>
        <_Menu label="Help">
          <_Menu label="Version..." />
        </_Menu>
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
