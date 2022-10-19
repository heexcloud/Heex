import React, { useCallback } from "react";
import { query } from "../../utils";
import { useHeexContext, ACTION } from "../../context";

export const CommentEditor = () => {
    const { dispatch } = useHeexContext();

    const handleCreateComment = useCallback(async () => {
        const username = document
            .querySelector("input[name='username']")
            .value.trim();
        const email = document
            .querySelector("input[name='email']")
            .value.trim();
        const comment = document.querySelector("textarea").value.trim();

        if (!username || !email || !comment) return;

        const result = await query.createComment({ username, email, comment });
        if (result === undefined) return;

        console.log("result :>> ", result);
        dispatch({
            type: ACTION.SET_COMMENT_COUNT,
            payload: { commentCount: result.count },
        });

        document.querySelector("input[name='username']").value = "";
        document.querySelector("input[name='email']").value = "";
        document.querySelector("textarea").value = "";
    }, [dispatch]);

    return (
        <div className="heex-editor-container">
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
