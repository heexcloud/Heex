import React from "react";

export const CommentEditor = () => {
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
                <textarea />
                <button className="heex-submit-comment-button">Submit</button>
            </div>
            <div className="heex-editor-footer"></div>
        </div>
    );
};
