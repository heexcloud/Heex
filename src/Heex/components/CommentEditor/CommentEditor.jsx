import React from "react";
import { query } from "../../utils";
import { useHeexContext, ACTION } from "../../context";
import { useMemoizedFn } from "../../hooks";

export const CommentEditor = (props) => {
    const { dispatch } = useHeexContext();
    const { thread, reply, onSubmitSuccess, onSubmitFailure } = props;
    const editorId = reply?.objectId || thread?.objectId || "Heex";

    const handleCreateComment = useMemoizedFn(async () => {
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

        dispatch({
            type: ACTION.SET_COMMENT_COUNT,
            payload: { commentCount: result.count },
        });

        document.querySelector(usernameSelector).value = "";
        document.querySelector(emailSelector).value = "";
        document.querySelector(commentContentSelector).value = "";
        onSubmitSuccess && onSubmitSuccess();
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
                    Submit
                </button>
            </div>
        </div>
    );
};
