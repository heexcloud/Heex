import React, { useEffect } from "react";
import { CommentEditor, CommentList, CommentMeta } from "./components";
import { HeexContextProvider } from "./context";
import { fetchAnonymousToken } from "./utils/query";
import { validate, HeexOptionsCenter } from "./utils";

export const Heex = ({ options, pageId }) => {
    if (typeof window !== "undefined") {
        validate.options(options);
        HeexOptionsCenter.assignHeexOptions(options);
    }

    useEffect(() => {
        if (options.auth.use === "anonymous") {
            fetchAnonymousToken();
        }
    }, []);

    return (
        <div className="heex-container">
            <HeexContextProvider pageId={pageId}>
                <CommentEditor isTopLevel />
                <CommentMeta />
                <CommentList />
            </HeexContextProvider>
        </div>
    );
};
