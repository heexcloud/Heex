import React from "react";
import { ACTION, useHeexContext } from "../../context";

export const CommentMeta = () => {
    const { state, dispatch } = useHeexContext();

    const handleToggeSortingMethod = () => {
        dispatch({
            type: ACTION.TOGGLE_SORTING_METHOD,
        });
    };

    return (
        state.commentCount > 0 && (
            <div className="heex-comment-meta">
                <div className="heex-comment-meta-item heex-comment-count">{`${
                    state.commentCount
                } Comment${state.commentCount > 1 ? "s" : ""}`}</div>
                <div
                    className="heex-comment-meta-item heex-comment-sort"
                    onClick={handleToggeSortingMethod}
                >
                    <button
                        // onClick={handleToggeSortingMethod}
                        className={
                            state.sortingMethod === "newest" ? "active" : ""
                        }
                    >
                        Newest
                    </button>
                    <button
                        // onClick={handleToggeSortingMethod}
                        className={
                            state.sortingMethod === "hottest" ? "active" : ""
                        }
                    >
                        Hottest
                    </button>
                </div>
            </div>
        )
    );
};
