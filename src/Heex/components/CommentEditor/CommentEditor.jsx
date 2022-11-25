import React, { useRef, useState } from "react";
import { query } from "../../utils";
import { useMemoizedFn } from "ahooks";
import { FaSpinner, FaImage, FaLaugh } from "react-icons/fa";
import { useHeexContext } from "../../context";
import { useDebouncedCallback } from "use-debounce";
import { Avatar, HeexLogo } from "../_Simple";

export const CommentEditor = (props) => {
    const { thread, reply, onSubmitSuccess, onSubmitFailure, isTopLevel } =
        props;

    const [loading, setLoading] = useState(false);
    const submitButtonRef = useRef();
    const { refreshCommentsWithLimit, refreshThread, state } = useHeexContext();

    const editorId = reply?.objectId || thread?.objectId || "Heex";

    const handleCreateComment = useMemoizedFn(async () => {
        setLoading(true);
        submitButtonRef.current.disabled = true;
        const usernameSelector = `#comment-editor-${editorId} input[name='username']`;
        const emailSelector = `#comment-editor-${editorId} input[name='email']`;
        const commentContentSelector = `#comment-editor-${editorId} textarea[name='commentContent']`;

        const username = document.querySelector(usernameSelector).value.trim();
        const email = document.querySelector(emailSelector).value.trim();
        const commentContent = document
            .querySelector(commentContentSelector)
            .value.trim();

        if (!username || !email || !commentContent) {
            setLoading(false);
            submitButtonRef.current.disabled = false;
            return;
        }

        const result = await query.createComment({
            username,
            email,
            pageId: state.pageId,
            comment: commentContent,
            tid: thread?.objectId,
            rid: reply?.objectId,
            at: reply?.username || thread?.username,
        });
        if (result === undefined) {
            onSubmitFailure && onSubmitFailure();
            setLoading(false);
            submitButtonRef.current.disabled = false;
            return;
        }

        // document.querySelector(usernameSelector).value = "";
        // document.querySelector(emailSelector).value = "";
        document.querySelector(commentContentSelector).value = "";
        setLoading(false);
        // top level comment
        if (isTopLevel) {
            await refreshCommentsWithLimit();
        }

        // reply to a thread, or to a thread's reply
        if (!isTopLevel && thread) {
            await refreshThread({ cid: thread.objectId });
        }

        onSubmitSuccess && onSubmitSuccess();
        setLoading(false);
        submitButtonRef.current.disabled = false;
    });

    const debouncedHandleCreateComment = useDebouncedCallback(
        handleCreateComment,
        1000
    );

    return (
        <div id={`comment-editor-${editorId}`} className="heex-comment-editor">
            <div className="left">
                <Avatar />
            </div>
            <div className="right">
                <div className="heex-editor-header">
                    {window.HeexOptions.auth.use === "anonymous" ? (
                        <React.Fragment>
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
                        </React.Fragment>
                    ) : null}
                </div>
                <div className="heex-editor-body">
                    <textarea required name="commentContent" />
                </div>
                <div className="heex-editor-footer">
                    <div className="footer-left">
                        <FaImage size={"1.5rem"} color="#9EA6B6" />
                        <FaLaugh size={"1.5rem"} color="#9EA6B6" />
                    </div>
                    <div className="footer-right">
                        <HeexLogo />
                        <button
                            ref={submitButtonRef}
                            onClick={debouncedHandleCreateComment}
                            className="heex-editor-submit-button"
                        >
                            {loading ? (
                                <FaSpinner
                                    className="spinner"
                                    size="1.5rem"
                                    color="#fff"
                                />
                            ) : (
                                "Comment"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
