import React, { createContext, useContext, useState } from 'react';

export const DocketContext = createContext();

export const DocketContextProvider = ({ children }) => {
    const [docketMainSpaceComponentNo, setDocketMainSpaceComponentNo] = useState(0);
    const [currentDocketNo, setCurrentDocketNo] = useState(null);
    const [searchedDocketNo, setSearchedDocketNo] = useState(null);
    const [isReadOnly, setIsReadOnly] = useState(false);

    return (
        <DocketContext.Provider value={{ docketMainSpaceComponentNo, setDocketMainSpaceComponentNo,currentDocketNo, setCurrentDocketNo,searchedDocketNo,setSearchedDocketNo,isReadOnly, setIsReadOnly }}>
            {children}
        </DocketContext.Provider>
    );
};

export function useDocketContextData() {
    return useContext(DocketContext);
}
