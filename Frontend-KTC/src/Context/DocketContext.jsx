import React, { createContext, useContext, useState } from 'react';

export const DocketContext = createContext();

export const DocketContextProvider = ({ children }) => {
    const [docketMainSpaceComponentNo, setDocketMainSpaceComponentNo] = useState(0);
    const [currentDocketNo, setCurrentDocketNo] = useState(null);

    return (
        <DocketContext.Provider value={{ docketMainSpaceComponentNo, setDocketMainSpaceComponentNo,currentDocketNo, setCurrentDocketNo }}>
            {children}
        </DocketContext.Provider>
    );
};

export function useDocketContextData() {
    return useContext(DocketContext);
}
