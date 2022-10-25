import React from "react";
import { useHeexContext } from "../../context";

export const CommentMeta = () => {
    const { state } = useHeexContext();

    return (
        <div className="heex-comment-meta">
            <span className="heex-comment-meta-label">Comment count: </span>
            <span className="heex-comment-count">{state.commentCount}</span>
        </div>
    );
};
