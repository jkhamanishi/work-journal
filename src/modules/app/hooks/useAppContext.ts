import { createContext, ReactNode, useContext } from "react";
import renderContextProvider from "../../../lib/react/renderContextProvider";
import { useBoolean } from "usehooks-ts";

interface AppContextType {
  showAppVersion: () => void;
  showSettings: boolean;
  toggleShowSettings: () => void;
  hideSettings: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({children}: {children: ReactNode}) {
  const showAppVersion = () => alert('App Version: v'+APP_VERSION);
  const {value: showSettings, toggle: toggleShowSettings, setFalse: hideSettings} = useBoolean(false);
  
  const context: AppContextType = {
    showAppVersion,
    showSettings, toggleShowSettings, hideSettings,
  };
  
  return renderContextProvider(AppContext.Provider, context, children);
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContextProvider element not found.");
  }
  return context;
}


