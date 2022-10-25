import React, { useEffect, useState } from "react";
import { query } from "../../utils";
import { ACTION, useHeexContext } from "../../context";
import { useMemoizedFn } from "../../hooks";
import { CommentItem } from "../_CommentItem";

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
                    <CommentItem
                        key={comment.objectId}
                        comment={comment}
                        replyEditor={replyEditor}
                        toggleReplyEditor={toggleReplyEditor}
                    />
                );
            })}
        </div>
    );
};
