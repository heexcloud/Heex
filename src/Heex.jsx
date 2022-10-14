import React from "react";
import { CommentEditor, CommentList, CommentMeta } from "./components";
import "./heex.scss";

export const Heex = () => {
    return (
        <div className="heex-container">
            <CommentEditor />
            <CommentMeta />
            <CommentList />
        </div>
    );
};
