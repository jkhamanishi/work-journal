import "./Menu.scss";

import React, { MouseEventHandler, ReactNode, RefObject, useContext, useEffect, useRef } from 'react';
import { useEventListener } from "usehooks-ts";

import {
  classNames,
  HOTKEY,
  HOTKEY_INVISIBLE,
  ICON,
  ICON_LEFT,
  ICON_RIGHT,
  ICON_ROOT,
  LABEL,
  LABEL_CONTAINER,
  LABEL_EM,
  MENU,
  MENU_DISABLED,
  MENU_ROOT,
  SUBMENUS,
} from '../utils/classNames';
import { Keys } from '../utils/Keys';
import { Callback, MenuBarContext } from "./MenubarContext";
import toTitleCase from "../utils/toTitleCase";
import { parentMenu } from "../utils/menuTraversal";

const alt = Keys.alt;
const MenuContext = React.createContext<string | null>(null);

type MenuProps = {
  menuId?: string;
  label: string;
  icon?: string | React.ReactNode;
  hotKeys?: string[];
  focusKey?: string;
  show?: boolean;
  disabled?: boolean;
  checked?: boolean;
  onSelect?: Callback,
  closeOnSelect?: boolean,
  children?: ReactNode
}

export function Menu({
  onSelect,
  menuId,
  label,
  icon,
  hotKeys,
  focusKey,
  show = true,
  disabled = false,
  checked,
  closeOnSelect = true,
  children,
}: MenuProps) {
  const {active, ...menuBar} = useContext(MenuBarContext)!;
  const longestSiblingHotkey = useContext(MenuContext);
  const ref = useRef<HTMLLIElement>(null) as RefObject<HTMLLIElement>;
  const isRootMenu = longestSiblingHotkey === null;
  
  useEventListener('mouseover', (event: MouseEvent) => {
    if (!active) return;
    ref.current?.focus();
    event.stopPropagation();
  }, ref);
  
  useEventListener('mouseleave', (event: MouseEvent) => {
    if (!active || children) return;
    const parent = parentMenu(ref.current) as HTMLLIElement;
    parent?.focus();
    event.stopPropagation();
  }, ref);
  
  if (children || isRootMenu) {
    hotKeys = undefined;
  }
  
  const hotKeysEnabled = menuBar?.hotKeysEnabled;
  const hotKeyActive = hotKeys && !disabled && show;
  
  useEffect(function registerHotKey() {
    if (hotKeysEnabled && hotKeyActive && onSelect) {
      menuBar?.registerHotKey(hotKeys!, onSelect);
    }
    if (hotKeysEnabled && hotKeyActive && !onSelect && menuId) {
      menuBar?.registerHotKey(hotKeys!, () => menuBar?.onSelect && menuBar?.onSelect(menuId));
    }
    if (hotKeysEnabled && focusKey) {
      menuBar?.registerHotKey(alt(focusKey), () => ref.current?.focus());
    }
    return function unRegister() {
      if (hotKeysEnabled && hotKeyActive && hotKeyActive) {
        menuBar?.unregisterHotKey(hotKeys!);
      }
      if (hotKeysEnabled && focusKey) {
        menuBar?.unregisterHotKey(Keys.alt(focusKey));
      }
    };
  }, [menuId, focusKey, onSelect, hotKeys, hotKeysEnabled, hotKeyActive]);
  
  
  if (!show || !menuBar) {
    return null;
  } else if (isRootMenu) {
    return (
      <li ref={ref} tabIndex={0} className={classNames(MENU, MENU_ROOT, {[MENU_DISABLED]: disabled})}>
        <div className={LABEL_CONTAINER}>
          {icon && (
            <span className={classNames(ICON, ICON_ROOT)}>{icon}</span>
          )}
          <span className={LABEL}>
            {!focusKey || !label.includes(focusKey) ? label :(
              <>
                <span>{label.substring(0, label.indexOf(focusKey))}</span>
                <span className={LABEL_EM}>{focusKey}</span>
                <span>{label.substring(label.indexOf(focusKey) + 1)}</span>
              </>
            )}
          </span>
        </div>
        {children && !disabled && (
          <ul tabIndex={-1} className={SUBMENUS}>
            <MenuContext.Provider value={getLongestHotkeyInChildren(children)}>
              {children}
            </MenuContext.Provider>
          </ul>
        )}
      </li>
    );
  } else {
    const clickHandler: unknown = children || disabled ? undefined : (e?: Event) => selectMenu(e);
    const keyDownHandler: React.KeyboardEventHandler | undefined = children || disabled ? undefined : (e) => {
      if (e.key === "Enter") selectMenu();
    }
    
    const selectMenu = (e?: Event) => {
      if ((typeof menuBar.disableMenubar === "boolean" && menuBar.disableMenubar) || (typeof menuBar.disableMenubar === "function" && menuBar.disableMenubar() === true)) {
        return;
      }
      
      if (closeOnSelect !== false && document.activeElement) {
        (document.activeElement as HTMLElement).blur();
      }
      if (onSelect) {
        onSelect(e);
      } else if (menuId && menuBar.onSelect) {
        menuBar.onSelect(menuId);
      } else {
        console.warn(`No handlers found for menu ${label}`);
      }
    }
    
    return (
      <li ref={ref} tabIndex={-1} className={classNames(MENU, {[MENU_DISABLED]: disabled})} onKeyDown={keyDownHandler}>
        <div className={LABEL_CONTAINER} onClick={clickHandler as MouseEventHandler}>
          <span className={classNames(ICON, ICON_LEFT)}>{checked ? menuBar.checkedIcon : icon}</span>
          <span className={LABEL}>{label}</span>
          {hotKeysEnabled && hotKeys && <span className={HOTKEY}>{hotKeys.map(toTitleCase).join('+')}</span>}
          {hotKeysEnabled && !hotKeys && longestSiblingHotkey &&
          <span className={classNames(HOTKEY, HOTKEY_INVISIBLE)}>{longestSiblingHotkey}</span>}
          {children && <span className={classNames(ICON, ICON_RIGHT)}>{menuBar.expandIcon}</span>}
        </div>
        {children && !disabled && (
          <ul tabIndex={-1} className={SUBMENUS}>
            <MenuContext.Provider value={hotKeysEnabled ? getLongestHotkeyInChildren(children) : ''}>
              {children}
            </MenuContext.Provider>
          </ul>
        )}
      </li>
    );
  }
};

const getLongestHotkeyInChildren = (children: React.ReactNode): string => {
  let longestSubmenuHotKey = '';
  React.Children.toArray(children).forEach((child) => {
    const menuChild = (child as React.ReactElement<MenuProps>);
    if (menuChild.props.hotKeys) {
      const hotKeyStr = menuChild.props.hotKeys.join('+');
      if (hotKeyStr.length > longestSubmenuHotKey.length) {
        longestSubmenuHotKey = hotKeyStr;
      }
    }
  });
  return longestSubmenuHotKey;
};
