import React from "react";

export const CommentEditor = () => {
    return (
        <div className="heex-editor-container">
            <div className="heex-editor-header heex-user-info">
                <input className="heex-user-info-item" />
                <input className="heex-user-info-item" />
            </div>
            <textarea className="heex-editor-body" />
            <div className="heex-editor-footer">
                <button className="heex-button">Submit</button>
            </div>
        </div>
    );
};
