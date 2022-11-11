import React, { useEffect, useState } from "react";
import { query } from "../../utils";
import { ACTION, useHeexContext } from "../../context";
import { useMemoizedFn } from "ahooks";
import { CommentItem } from "../_CommentItem";
import { FaAngleDown } from "react-icons/fa";

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
        Promise.all([
            query.getCommentCount(),
            query.getComments({ limit: 25 }),
        ]).then((res) => {
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
                    comments: comments || [],
                },
            });
        });
    }, []);

    const handleLoadMore = useMemoizedFn(() => {
        query
            .getComments({ limit: 25, offset: 25 * state.page })
            .then((comments) => {
                dispatch({
                    type: ACTION.APPEND_COMMENTS,
                    payload: {
                        comments: comments || [],
                    },
                });

                dispatch({
                    type: ACTION.PAGE_INCR,
                });
            });
    });

    const sortFn = useMemoizedFn((a, b) => {
        if (state.sortingMethod === "newest") {
            return new Date(b.createdAt) - new Date(a.createdAt);
        }

        // hottest: thread's likes + number ofreplies (does not count replies' likes)
        // and 1 reply equals two likes, reply has more weight than like
        const aHotness = (a.likes || 0) + (a.replies?.length || 0) * 2;
        const bHotness = (b.likes || 0) + (b.replies?.length || 0) * 2;

        return bHotness - aHotness;
    });

    return (
        <div className="heex-comment-list">
            {state.comments.sort(sortFn).map((comment) => {
                return (
                    <CommentItem
                        key={comment.objectId}
                        comment={comment}
                        replyEditor={replyEditor}
                        setReplyEditor={setReplyEditor}
                        toggleReplyEditor={toggleReplyEditor}
                    />
                );
            })}
            {state.commentCount > state.page * 25 && (
                <button onClick={handleLoadMore} className="load-more-button">
                    Show More Replies <FaAngleDown size="1.25rem" />
                </button>
            )}
        </div>
    );
};
