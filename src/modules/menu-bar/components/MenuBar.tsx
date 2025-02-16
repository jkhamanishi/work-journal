import { ReactNode, RefObject, useCallback, useMemo, useRef, useState } from 'react';
import { useBoolean, useEventListener, useOnClickOutside } from "usehooks-ts";

import { firstChildMenu, isRootMenu, lastChildMenu, nextMenu, nextRootMenu, parentMenu } from "../utils/menuTraversal";
import { Key, keyWithModifiers, normalizeKey } from "../utils/hotKeys";
import { classNames, MENUBAR, MENUBAR_HOVERABLE } from "../utils/classNames";
import { Callback, IMenubarContext, MenuBarContext } from "./MenubarContext";


type DisableCallback = () => boolean;

type MenuBarProps = {
  onSelect?: (menuId: string) => void,
  className?: string;
  expandIcon?: string | ReactNode;
  checkedIcon?: string | ReactNode;
  enableHotKeys?: boolean;
  openMenusOnHover?: boolean;
  disableMenubar?: boolean | DisableCallback; // if provided will not process keys or menu clicks if true
  children: ReactNode;
}

export function MenuBar({
  onSelect, 
  expandIcon = "⮞", 
  checkedIcon = "✔", 
  enableHotKeys = true, 
  disableMenubar = false, 
  openMenusOnHover = false, 
  className, 
  children,
}: MenuBarProps) {
  const ref = useRef<HTMLUListElement>(null) as RefObject<HTMLUListElement>;
  
  const [callbacks] = useState<Record<string, Callback>>({});
  const { value: active, toggle: toggleActive, setFalse: unsetActive } = useBoolean(false);
  
  const hotKeyHandler = useCallback((keyboardEvent: KeyboardEvent): void => {
    if (!enableHotKeys || (typeof disableMenubar === "boolean" && disableMenubar) || (typeof disableMenubar === "function" && disableMenubar() === true)) {
      return;
    }
    const hotKeyPressed = keyWithModifiers(keyboardEvent);
    if (hotKeyPressed) {
      const key = normalizeKey(hotKeyPressed);
      if (key && callbacks[key]) {
        keyboardEvent.stopPropagation();
        keyboardEvent.preventDefault();
        const callback = callbacks[key];
        callback(keyboardEvent);
      }
    }
  }, [enableHotKeys, disableMenubar, callbacks]);
  
  
  const handleKeyNavigation = useCallback((event: KeyboardEvent) => {
    if ((typeof disableMenubar === "boolean" && disableMenubar) || (typeof disableMenubar === "function" && disableMenubar() === true)) {
      return;
    }
    
    const currentMenu = document.activeElement;
    let nextFocusElement: Element | null = null;
    switch (event.key) {
      case Key.ESC:
        (document.activeElement as HTMLElement).blur();
        break;
      case Key.DOWN:
        nextFocusElement = isRootMenu(currentMenu) ? firstChildMenu(currentMenu) : nextMenu(currentMenu, 'DOWN');
        break;
      case Key.UP:
        nextFocusElement = isRootMenu(currentMenu) ? lastChildMenu(currentMenu) : nextMenu(currentMenu, 'UP');
        break;
      case Key.RIGHT: {
        const childMenu = firstChildMenu(currentMenu);
        nextFocusElement = isRootMenu(currentMenu) || !childMenu ? nextRootMenu(currentMenu, 'RIGHT') : childMenu;
        break;
      }
      case Key.LEFT: {
        const parent = parentMenu(currentMenu);
        nextFocusElement = isRootMenu(parent) || !parent ? nextRootMenu(currentMenu, 'LEFT') : parent;
        break;
      }
    }
    
    (nextFocusElement as HTMLLIElement)?.focus();
  }, [disableMenubar]);
  
  useEventListener('keydown', hotKeyHandler);
  useEventListener('keydown', handleKeyNavigation, ref);
  useEventListener('blur', unsetActive);
  useOnClickOutside(ref, unsetActive);
  
  const context: IMenubarContext = useMemo(() => ({
    active,
    toggleActive,
    onSelect,
    expandIcon,
    checkedIcon,
    hotKeysEnabled: enableHotKeys,
    disableMenubar,
    registerHotKey: (hotkey: Array<string>, callback: Callback): void => {
      const key = normalizeKey(hotkey);
      if (key) {
        if (callbacks[key]) {
          console.warn(`Duplicate hotkey ${key}. One of your hotkeys might not trigger`);
        }
        callbacks[key] = callback;
      }
    },
    unregisterHotKey: (hotkey: Array<string>): void => {
      const key = normalizeKey(hotkey);
      if (key) {
        delete callbacks[key];
      }
    }
  }), [disableMenubar, checkedIcon, expandIcon, enableHotKeys, onSelect, callbacks, active]);
  
  return (
    <ul {...{
      ref,
      tabIndex: 0,
      className: classNames(className, MENUBAR, {[MENUBAR_HOVERABLE]: openMenusOnHover}),
      children: (
        <MenuBarContext.Provider {...{value: context, children}} />
      ),
    }} />
  );
};