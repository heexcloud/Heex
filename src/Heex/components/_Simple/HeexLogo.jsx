import React from "react";
import { FcFlashOn } from "react-icons/fc";

export const HeexLogo = () => {
    return (
        <div className="heex-logo">
            <span className="heex-logo-icon">
                <FcFlashOn size={"1.5rem"} />
            </span>
            <span className="heex-logo-text">
                Powered by{" "}
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
