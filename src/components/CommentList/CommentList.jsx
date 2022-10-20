import React, { useEffect, useState } from "react";
import { query } from "../../utils";
import { ACTION, useHeexContext } from "../../context";
import { useMemoizedFn } from "../../hooks";
import { CommentEditor } from "../CommentEditor";

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
        // * leancloud can get count and comments in one query,
        // * but I am not sure whether other database can do that too
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
                    <div
                        className="heex-comment-list-item"
                        key={comment.objectId}
                    >
                        <div className="heex-comment-thread-root">
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
                                <CommentEditor
                                    thread={comment}
                                    onSubmitSuccess={setReplyEditor}
                                />
                            )}
                        </div>
                        <div className="heex-comment-thread-reply"></div>
                    </div>
                );
            })}
        </div>
    );
};
