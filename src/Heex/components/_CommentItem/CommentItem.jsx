import React, { useCallback } from "react";
import { CommentEditor } from "../CommentEditor";
import { format } from "../../utils";
import { FaReply, FaThumbsUp, FaHeart } from "react-icons/fa";
import { query } from "../../utils";
import { useHeexContext, ACTION } from "../../context";

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
                onSubmitSuccess={() => {
                    setReplyEditor();
                    thread && reply
                        ? onCreateReplySuccess()
                        : onCreateThreadSuccess();
                }}
            />
        );
    };

    // fetch all threads, do not forget page!
    // if there are more than 1 page loaded, fetch comments of all loaded pages
    const onCreateThreadSuccess = () => {};

    // fetch the thread and its replies
    // update the signle thread
    const onCreateReplySuccess = () => {};

    const thumbupComment = useCallback(async (comment) => {
        const updated = await query.thumbupComment(comment);
        const toBeUpdatedIndex = state.comments.findIndex(
            (c) => c.objectId === updated.objectId
        );
        if (toBeUpdatedIndex !== -1) {
            dispatch({
                type: ACTION.THUMBUP_COMMENT,
                payload: { likes: updated.likes, toBeUpdatedIndex },
            });
        }
    }, []);

    return (
        <div className="heex-comment-list-item" key={comment.objectId}>
            <div className="heex-comment-thread-root">
                <div className="thread-header">
                    <div className="thread-meta">
                        <span>{comment.username}</span>
                        <span>{format.formatTime(comment.createdAt)}</span>
                        {comment.likes && (
                            <span className="heex-chip">
                                <FaHeart />
                                {comment.likes}
                            </span>
                        )}
                    </div>
                    <div className="thread-action">
                        <button onClick={() => thumbupComment(comment)}>
                            <FaThumbsUp />
                        </button>

                        <button
                            onClick={() =>
                                toggleReplyEditor({
                                    cid: comment.objectId,
                                    at: comment.username,
                                })
                            }
                        >
                            <FaReply />
                        </button>
                    </div>
                </div>
                <div className="thread-body">{comment.comment}</div>

                {renderCommentEditor(comment, null, comment.objectId)}
            </div>
            {comment.replies?.length > 0 && (
                <div className="heex-comment-thread-reply">
                    {comment.replies.map((reply) => {
                        return (
                            <div
                                className="heex-comment-thread-reply-item"
                                key={reply.objectId}
                            >
                                <div className="reply-header">
                                    <div className="reply-meta">
                                        <span>{reply.username}</span>
                                        <span>
                                            {format.formatTime(reply.createdAt)}
                                        </span>
                                        {reply.likes && (
                                            <span className="heex-chip">
                                                <FaHeart />
                                                {reply.likes}
                                            </span>
                                        )}
                                    </div>

                                    <div className="reply-action">
                                        <button
                                            onClick={() =>
                                                thumbupComment(reply)
                                            }
                                        >
                                            <FaThumbsUp />
                                        </button>

                                        <button
                                            onClick={() =>
                                                toggleReplyEditor({
                                                    cid: reply.objectId,
                                                    at: reply.username,
                                                })
                                            }
                                        >
                                            <FaReply />
                                        </button>
                                    </div>
                                </div>

                                <div className="reply-body">
                                    <span>{`@${reply.at}: `}</span>
                                    {reply.comment}
                                </div>

                                {renderCommentEditor(
                                    comment,
                                    reply,
                                    reply.objectId
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
