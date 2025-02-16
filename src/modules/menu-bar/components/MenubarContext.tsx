import React, { ReactNode } from "react";

export type Callback = (e?: Event) => void
type DisableMenuBarCallback= () => boolean

export interface IMenubarContext {
    active: boolean;
    onSelect?: (menuId: string) => void
    expandIcon: string | ReactNode;
    checkedIcon: string | ReactNode;
    hotKeysEnabled: boolean;
    disableMenubar: boolean | DisableMenuBarCallback;
    registerHotKey: (hotKey: string[], callback: Callback) => void
    unregisterHotKey: (hotKey: string[]) => void
}

export const MenuBarContext = React.createContext<IMenubarContext | null>(null);