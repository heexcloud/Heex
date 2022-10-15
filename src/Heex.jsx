import React from "react";
import { CommentEditor, CommentList, CommentMeta } from "./components";
import "./heex.scss";
import { HeexContextProvider } from "./context";

export const Heex = (props) => {
    return (
        <HeexContextProvider {...props}>
            <div className="heex-container">
                <CommentEditor />
                <CommentMeta />
                <CommentList />
            </div>
        </HeexContextProvider>
    );
};
