import React from "react";
import { CommentEditor } from "../CommentEditor";
import { format, query } from "../../utils";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsChatSquareText } from "react-icons/bs";
import { useHeexContext, ACTION } from "../../context";
import { useMemoizedFn } from "../../hooks";
import { useDebouncedCallback } from "use-debounce";
import { Avatar } from "../_Simple";

export const CommentItem = (props) => {
    const { comment, replyEditor, setReplyEditor, toggleReplyEditor } = props;
    const { state, dispatch } = useHeexContext();

    const renderCommentEditor = (thread, reply, replyToId) => {
        if (!thread) throw new Error("Thread is missing");
        if (replyEditor?.cid !== replyToId) return null;

        // if only !!thread, reply to a thread
        // if both !!thread and !!reply, reply to a thread's reply
        return (
            <CommentEditor
                thread={thread}
                reply={reply}
                onSubmitSuccess={setReplyEditor}
            />
        );
    };

    const thumbupComment = useMemoizedFn(async (comment) => {
        const updated = await query.thumbupComment(comment);
        const threadIndex = state.comments.findIndex(
            (c) => c.objectId === updated.objectId
        );

        if (threadIndex !== -1) {
            dispatch({
                type: ACTION.THUMBUP_THREAD,
                payload: { likes: updated.likes, threadIndex },
            });
        } else {
            const _threadIndex = state.comments.findIndex(
                (c) => c.objectId === updated.tid
            );

            const replyIndex = state.comments[_threadIndex].replies.findIndex(
                (r) => r.objectId === updated.objectId
            );

            dispatch({
                type: ACTION.THUMBUP_THREAD_REPLY,
                payload: {
                    likes: updated.likes,
                    threadIndex: _threadIndex,
                    replyIndex,
                },
            });
        }
    });

    const debouncedThumbupComment = useDebouncedCallback(thumbupComment, 400);

    return (
        <div className="heex-comment-list-item" key={comment.objectId}>
            <div className="left">
                <Avatar />
            </div>
            <div className="right">
                <div className="heex-comment-thread-root">
                    <div className="thread-header">
                        <span>{comment.username}</span>
                        <span>{format.formatTime(comment.createdAt)}</span>
                    </div>
                    <div className="thread-body">{comment.comment}</div>
                    <div className="thread-footer">
                        <button
                            onClick={() => debouncedThumbupComment(comment)}
                        >
                            {!!comment.likes ? <FaHeart /> : <FaRegHeart />}
                            <span>{!!comment.likes && comment.likes}</span>
                        </button>

                        <button
                            onClick={() =>
                                toggleReplyEditor({
                                    cid: comment.objectId,
                                    at: comment.username,
                                })
                            }
                        >
                            <BsChatSquareText />
                        </button>
                    </div>

                    {renderCommentEditor(comment, null, comment.objectId)}
                </div>
                {comment.replies?.length > 0 && (
                    <div className="heex-comment-thread-reply-list">
                        {comment.replies.map((reply) => {
                            return (
                                <div
                                    className="heex-comment-thread-reply-item"
                                    key={reply.objectId}
                                >
                                    <div className="reply-left">
                                        <Avatar />
                                    </div>
                                    <div className="reply-right">
                                        <div className="reply-header">
                                            <span>{reply.username}</span>
                                            <span>
                                                {format.formatTime(
                                                    reply.createdAt
                                                )}
                                            </span>
                                        </div>

                                        <div className="reply-body">
                                            <span>{`@${reply.at}: `}</span>
                                            {reply.comment}
                                        </div>

                                        <div className="reply-footer">
                                            <button
                                                onClick={() =>
                                                    debouncedThumbupComment(
                                                        reply
                                                    )
                                                }
                                            >
                                                {!!comment.likes ? (
                                                    <FaHeart />
                                                ) : (
                                                    <FaRegHeart />
                                                )}
                                                <span>
                                                    {!!comment.likes &&
                                                        comment.likes}
                                                </span>
                                            </button>

                                            <button
                                                onClick={() =>
                                                    toggleReplyEditor({
                                                        cid: reply.objectId,
                                                        at: reply.username,
                                                    })
                                                }
                                            >
                                                <BsChatSquareText />
                                            </button>
                                        </div>

                                        {renderCommentEditor(
                                            comment,
                                            reply,
                                            reply.objectId
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
