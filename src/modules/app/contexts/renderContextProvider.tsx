import { Provider, ReactNode } from "react";


function renderContextProvider<T = object>(Provider: Provider<T>, contextValue: T, children: ReactNode) {
  return (
    <Provider value={contextValue} children={children} />
  );
}


export default renderContextProvider;
