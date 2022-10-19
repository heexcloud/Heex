import React, { useEffect } from "react";
import { ACTION, useHeexContext } from "../../context";
import { query } from "../../utils";

export const CommentMeta = () => {
    const { state, dispatch } = useHeexContext();

    useEffect(() => {
        query
            .getCommentCount()
            .then((res) => {
                dispatch({
                    type: ACTION.SET_COMMENT_COUNT,
                    payload: {
                        commentCount: res,
                    },
                });
            })
            .catch((err) => {
                console.log("err :>> ", err);
            });
    }, []);

    return (
        <div className="heex-comment-meta">
            <span className="heex-comment-meta-label">Comment count: </span>
            <span className="heex-comment-count">{state.commentCount}</span>
        </div>
    );
};
