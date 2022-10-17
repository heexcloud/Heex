import React, { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";

const HeexContext = createContext();

const initialState = { page: 1, commentTotalCount: 0 };

export const HeexContextProvider = (props) => {
    const { children, _options } = props;

    const [state, dispatch] = useReducer(reducer, {
        ...initialState,
        _options,
    });

    return (
        <HeexContext.Provider value={{ state, dispatch }}>
            {children}
        </HeexContext.Provider>
    );
};

export const useHeexContext = () => useContext(HeexContext);
