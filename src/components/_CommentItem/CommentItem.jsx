import React from "react";
import { CommentEditor } from "../CommentEditor";

export const CommentItem = (props) => {
    const { comment, replyEditor, setReplyEditor, toggleReplyEditor } = props;

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

                {replyEditor?.cid === comment.objectId && (
                    <CommentEditor
                        thread={comment}
                        onSubmitSuccess={setReplyEditor}
                    />
                )}
            </div>
            {comment.replies?.length > 0 && (
                <div className="heex-comment-thread-reply">
                    {comment.replies.map((reply) => {
                        return (
                            <CommentItem
                                comment={reply}
                                replyEditor={replyEditor}
                                toggleReplyEditor={toggleReplyEditor}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};
