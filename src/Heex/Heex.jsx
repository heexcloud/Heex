import React, { useEffect } from "react";
import { CommentEditor, CommentList, CommentMeta } from "./components";
import { HeexContextProvider } from "./context";

export const Heex = ({ options }) => {
    if (typeof window !== "undefined") {
        window.HeexOptions = options;
    }

    return (
        <div className="heex-container">
            <HeexContextProvider>
                <CommentEditor isTopLevel />
                <CommentMeta />
                <CommentList />
            </HeexContextProvider>
        </div>
    );
};
