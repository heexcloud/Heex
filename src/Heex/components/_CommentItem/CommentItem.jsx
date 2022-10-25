import React from "react";
import { CommentEditor } from "../CommentEditor";
import { format } from "../../utils";
import { FaReply, FaThumbsUp } from "react-icons/fa";

export const CommentItem = (props) => {
    const { comment, replyEditor, setReplyEditor, toggleReplyEditor } = props;

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

    return (
        <div className="heex-comment-list-item" key={comment.objectId}>
            <div className="heex-comment-thread-root">
                <div className="thread-header">
                    <div className="thread-meta">
                        <span>{comment.username}</span>
                        <span>{format.formatTime(comment.createdAt)}</span>
                    </div>
                    <div className="thread-action">
                        <button>
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
                                    </div>

                                    <div className="reply-action">
                                        <button>
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
