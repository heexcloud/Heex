import React, { useEffect } from "react";
import { query } from "../../utils";
import { ACTION, useHeexContext } from "../../context";

export const CommentList = () => {
    const { state, dispatch } = useHeexContext();
    useEffect(() => {
        Promise.all([query.getCommentCount(), query.getComments()]).then(
            (res) => {
                const [count, comments] = res;

                dispatch({
                    type: ACTION.SET_COMMENT_COUNT,
                    payload: {
                        commentCount: count,
                    },
                });
                dispatch({
                    type: ACTION.APPEND_COMMENTS,
                    payload: {
                        comments,
                    },
                });
            }
        );
    }, []);

    return (
        <div className="heex-comment-list">
            {state.comments.map((comment) => {
                return (
                    <div className="heex-comment-list-item">
                        <div>{comment.username}</div>
                        <div>{comment.comment}</div>
                        <div>{comment.createdAt}</div>
                    </div>
                );
            })}
        </div>
    );
};
