import React from "react";
import { FcFlashOn } from "react-icons/fc";

export const HeexLogo = () => {
    return (
        <div className="heex-logo">
            <span className="heex-logo-icon">
                <FcFlashOn size={"1rem"} />
            </span>
            <span className="heex-logo-text">
                Powered By{" "}
                <a
                    href="https://heex.dev"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    Heex
                </a>
            </span>
        </div>
    );
};
