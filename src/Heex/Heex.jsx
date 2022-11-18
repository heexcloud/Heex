import React, { useEffect } from "react";
import { CommentEditor, CommentList, CommentMeta } from "./components";
import { HeexContextProvider } from "./context";
import { fetchAnonymousToken } from "./utils/query";
import { validate } from "./utils";

export const Heex = ({ options }) => {
    if (typeof window !== "undefined") {
        validate.options(options);
        window.HeexOptions = options;
    }

    useEffect(() => {
        if (options.auth.use === "anonymous") {
            fetchAnonymousToken();
        }
    }, []);

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
