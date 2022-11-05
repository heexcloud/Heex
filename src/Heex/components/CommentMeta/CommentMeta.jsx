import React from "react";
import { useHeexContext } from "../../context";

export const CommentMeta = () => {
    const { state } = useHeexContext();

    return (
        state.commentCount > 0 && (
            <div className="heex-comment-meta">
                <div className="heex-comment-meta-item heex-comment-count">{`${
                    state.commentCount
                } Comment${state.commentCount > 1 ? "s" : ""}`}</div>
                <div className="heex-comment-meta-item heex-comment-sort">
                    <button className="active">Newest</button>
                    <button>Hottest</button>
                </div>
            </div>
        )
    );
};
