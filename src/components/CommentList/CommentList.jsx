import React, { useEffect, useState } from "react";
import { query } from "../../utils";
import { ACTION, useHeexContext } from "../../context";
import { useMemoizedFn } from "../../hooks";

export const CommentList = () => {
    const { state, dispatch } = useHeexContext();
    const [replyEditor, setReplyEditor] = useState();

    const toggleReplyEditor = useMemoizedFn((replyTo) => {
        if (replyEditor?.cid === replyTo.cid) {
            setReplyEditor();
        } else {
            setReplyEditor(replyTo);
        }
    });

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
                        <button
                            onClick={() =>
                                toggleReplyEditor({
                                    cid: comment.objectId,
                                    at: comment.username,
                                })
                            }
                        >
                            Reply
                        </button>
                        {replyEditor?.cid === comment.objectId && (
                            <div>Reply editor</div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
