import React from "react";
import { CommentEditor } from "../CommentEditor";

export const CommentItem = (props) => {
    const { comment, replyEditor, setReplyEditor, toggleReplyEditor } = props;

    const renderCommentEditor = (thread, reply, replyToId) => {
        if (replyEditor?.cid !== replyToId) return null;

        // reply to thread only
        if (thread && !reply) {
            return (
                <CommentEditor
                    thread={thread}
                    onSubmitSuccess={setReplyEditor}
                />
            );
        }

        // reply to thread's reply
        if (thread && reply) {
            return (
                <CommentEditor
                    thread={thread}
                    reply={reply}
                    onSubmitSuccess={setReplyEditor}
                />
            );
        }

        return null;
    };

    return (
        <div className="heex-comment-list-item" key={comment.objectId}>
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
                                <div>{reply.username}</div>
                                <div>{reply.comment}</div>
                                <div>{reply.createdAt}</div>
                                <button
                                    onClick={() =>
                                        toggleReplyEditor({
                                            cid: reply.objectId,
                                            at: reply.username,
                                        })
                                    }
                                >
                                    Reply
                                </button>
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
