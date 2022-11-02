import React, { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";
import { ACTION } from "./action";
import { useMemoizedFn } from "../hooks";
import { getComments } from "../utils/query";
// import { useImmerReducer } from "use-immer"; // !TODO: maybe useful for some case

const HeexContext = createContext();

const initialState = { page: 1, commentCount: 0, comments: [] };

const HeexContextProvider = (props) => {
    const { children } = props;

    const [state, dispatch] = useReducer(reducer, { ...initialState });

    const refreshCommentsWithLimit = useMemoizedFn(async () => {
        const comments = await getComments({ limit: state.comments.length });
        if (comments !== undefined) {
            dispatch({
                type: ACTION.SET_COMMENTS,
                payload: { comments },
            });
        }
    });

    return (
        <HeexContext.Provider
            value={{ state, dispatch, refreshCommentsWithLimit }}
        >
            {children}
        </HeexContext.Provider>
    );
};

const useHeexContext = () => useContext(HeexContext);

export { ACTION, HeexContextProvider, useHeexContext };
