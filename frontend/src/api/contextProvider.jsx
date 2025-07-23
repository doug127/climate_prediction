import { useContext, createContext, useState } from "react"

export const Context = createContext();
export const ContextProvider = ({children}) => {
    const [optionBanner, setOptionBanner] = useState('Statistics');
    return(
        <Context.Provider value={{
            optionBanner,setOptionBanner,
            
        }}>
            {children}
        </Context.Provider>
    )
}