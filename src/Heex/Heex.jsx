import React, { useEffect } from "react";
import { CommentEditor, CommentList, CommentMeta } from "./components";
import "./heex.scss";
import { HeexContextProvider } from "./context";

export const Heex = ({ options }) => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.HeexOptions = options;
        }
    }, []);

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
