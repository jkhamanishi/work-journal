import "./MenuBar.scss";

import { Win32MenuBar, MenuItem, RootMenu, SubMenu, Keys } from 'react-win32-menu';
import useAppMenu from "../../hooks/useAppMenu";


function MenuBar() {
  const menu = useAppMenu();
  
  return (  
    <nav id="menubar">
      <Win32MenuBar>
        <RootMenu label="File">
          <MenuItem label="Open..." hotKey={Keys.Ctrl("O")} onSelect={menu.open} />
          <MenuItem label="Save" hotKey={Keys.Ctrl("S")} onSelect={menu.save} />
          <MenuItem label="Save As..." hotKey={Keys.CtrlShift("S")} onSelect={menu.saveAs} />
          <MenuItem label="AutoSave" checked={menu.autoSave} onSelect={menu.toggleAutoSave} keepOpenOnSelect />
        </RootMenu>
        <RootMenu label="Edit">
          <MenuItem label="Settings..." onSelect={menu.toggleShowSettings} />
        </RootMenu>
        <RootMenu label="View">
          <SubMenu label="Font Size">
            <MenuItem label="Increase Font Size" onSelect={menu.font.increase} keepOpenOnSelect />
            <MenuItem label="Decrease Font Size" onSelect={menu.font.decrease} keepOpenOnSelect />
            <MenuItem label="Restore Default Font Size" onSelect={menu.font.reset} keepOpenOnSelect />
          </SubMenu>
          <SubMenu label="Branch Width">
            <MenuItem label="Increase Branch Width" onSelect={menu.branchWidth.increase} keepOpenOnSelect />
            <MenuItem label="Decrease Branch Width" onSelect={menu.branchWidth.decrease} keepOpenOnSelect />
            <MenuItem label="Restore Default Branch Width" onSelect={menu.branchWidth.reset} keepOpenOnSelect />
          </SubMenu>
        </RootMenu>
        <RootMenu label="Help">
          <MenuItem label="Version..." onSelect={menu.showAppVersion} />
        </RootMenu>
      </Win32MenuBar>
    </nav>
  );
}


export default MenuBar;
