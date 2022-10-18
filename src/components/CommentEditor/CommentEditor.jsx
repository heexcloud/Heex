import React, { useCallback } from "react";
import { query } from "../../utils";

export const CommentEditor = () => {
    const handleCreateComment = useCallback(() => {
        const username = document.querySelector("input[name='username']").value;
        const email = document.querySelector("input[name='email']").value;
        const comment = document.querySelector(
            "textarea[name='comment']"
        ).value;

        if (!username || !email || !comment) return;

        query
            .createComment({ username, email, comment })
            .then((res) => {
                console.log("res :>> ", res);
            })
            .catch((err) => console.error(err));
    }, []);

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
