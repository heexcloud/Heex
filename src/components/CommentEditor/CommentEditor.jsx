import React from "react";
import { query } from "../../utils";
import { useHeexContext, ACTION } from "../../context";
import { useMemoizedFn } from "../../hooks";

export const CommentEditor = (props) => {
    const { dispatch } = useHeexContext();
    const { thread, reply } = props;
    const editorId = reply?.objectId || thread?.objectId || "Heex";

    const handleCreateComment = useMemoizedFn(async () => {
        const usernameSelector = `#comment-editor-${editorId} input[name='username']`;
        const emailSelector = `#comment-editor-${editorId} input[name='email']`;
        const commentSelector = `#comment-editor-${editorId} textarea`;

        const username = document.querySelector(usernameSelector).value.trim();
        const email = document.querySelector(emailSelector).value.trim();
        const comment = document.querySelector(commentSelector).value.trim();

        if (!username || !email || !comment) return;

        const result = await query.createComment({
            username,
            email,
            pageId: window.location.pathname,
            comment,
            tid: thread?.objectId,
            rid: reply?.objectId,
            at: reply?.username || thread?.username,
        });
        if (result === undefined) return;

        dispatch({
            type: ACTION.SET_COMMENT_COUNT,
            payload: { commentCount: result.count },
        });

        document.querySelector(usernameSelector).value = "";
        document.querySelector(emailSelector).value = "";
        document.querySelector(commentSelector).value = "";
    });

    return (
        <div
            id={`comment-editor-${editorId}`}
            className="heex-editor-container"
        >
            <div className="heex-editor-header">
                <input
                    className="heex-user-info"
                    placeholder="Username"
                    name="username"
                />
                <input
                    className="heex-user-info"
                    placeholder="Email"
                    name="email"
                />
            </div>
            <div className="heex-editor-body">
                <textarea required name="comment" />
                <button
                    onClick={handleCreateComment}
                    className="heex-submit-comment-button"
                >
                    Submit
                </button>
            </div>
            <div className="heex-editor-footer"></div>
        </div>
    );
};
