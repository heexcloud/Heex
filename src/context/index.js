import React, { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";
import { ACTION } from "./action";

const HeexContext = createContext();

const initialState = { page: 1, commentCount: 0, comments: [] };

const HeexContextProvider = (props) => {
    const { children } = props;

    const [state, dispatch] = useReducer(reducer, { ...initialState });

    return (
        <HeexContext.Provider value={{ state, dispatch }}>
            {children}
        </HeexContext.Provider>
    );
};

const useHeexContext = () => useContext(HeexContext);

export { ACTION, HeexContextProvider, useHeexContext };
