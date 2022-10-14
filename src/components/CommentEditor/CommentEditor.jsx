import React from "react";

const defaultProps = {
    headerItems: [
        { name: "username", required: false },
        { name: "email", required: false },
    ],
};

export const CommentEditor = (props) => {
    const _props = { ...defaultProps, ...props };

    return (
        <div className="heex-editor-container">
            <div className="heex-editor-header">
                {_props.headerItems.map((headerItem, index) => {
                    return (
                        <input
                            key={index}
                            className="heex-user-info"
                            placeholder={headerItem.name}
                            name={headerItem.name}
                            required={headerItem.required}
                        />
                    );
                })}
            </div>
            <textarea className="heex-editor-body" />
            <div className="heex-editor-footer">
                <button className="heex-button">Submit</button>
            </div>
        </div>
    );
};
