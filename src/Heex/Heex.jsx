import React from "react";
import { CommentEditor, CommentList, CommentMeta } from "./components";
import "./heex.scss";
import { HeexContextProvider } from "./context";

export const Heex = () => {
    return (
        <div className="heex-container">
            <HeexContextProvider>
                <CommentEditor />
                <CommentMeta />
                <CommentList />
            </HeexContextProvider>
        </div>
    );
};
