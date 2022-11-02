import React, { useState } from "react";
import { query } from "../../utils";
import { useMemoizedFn } from "../../hooks";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import { useHeexContext } from "../../context";

export const CommentEditor = (props) => {
    const { thread, reply, onSubmitSuccess, onSubmitFailure, isTopLevel } =
        props;

    const [loading, setLoading] = useState(false);
    const { refreshCommentsWithLimit } = useHeexContext();

    const editorId = reply?.objectId || thread?.objectId || "Heex";

    const handleCreateComment = useMemoizedFn(async () => {
        setLoading(true);
        const usernameSelector = `#comment-editor-${editorId} input[name='username']`;
        const emailSelector = `#comment-editor-${editorId} input[name='email']`;
        const commentContentSelector = `#comment-editor-${editorId} textarea[name='commentContent']`;

        const username = document.querySelector(usernameSelector).value.trim();
        const email = document.querySelector(emailSelector).value.trim();
        const commentContent = document
            .querySelector(commentContentSelector)
            .value.trim();

        if (!username || !email || !commentContent) return;

        const result = await query.createComment({
            username,
            email,
            pageId: window.location.pathname,
            comment: commentContent,
            tid: thread?.objectId,
            rid: reply?.objectId,
            at: reply?.username || thread?.username,
        });
        if (result === undefined) {
            onSubmitFailure && onSubmitFailure();
            return;
        }

        // document.querySelector(usernameSelector).value = "";
        // document.querySelector(emailSelector).value = "";
        document.querySelector(commentContentSelector).value = "";
        setLoading(false);
        if (isTopLevel) {
            await refreshCommentsWithLimit();
        } else {
            onSubmitSuccess && onSubmitSuccess();
        }
    });

    return (
        <div id={`comment-editor-${editorId}`} className="heex-comment-editor">
            <div className="heex-editor-header">
                <input
                    className="heex-commenter-info"
                    placeholder="Username"
                    name="username"
                />
                <input
                    className="heex-commenter-info"
                    placeholder="Email"
                    name="email"
                />
            </div>
            <div className="heex-editor-body">
                <textarea required name="commentContent" />
            </div>
            <div className="heex-editor-footer">
                <button
                    onClick={handleCreateComment}
                    className="heex-editor-submit-button"
                >
                    {loading ? (
                        <FaSpinner className="spinner" />
                    ) : (
                        <FaPaperPlane />
                    )}
                </button>
            </div>
        </div>
    );
};
