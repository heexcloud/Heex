import React, { useEffect, useState } from "react";
import { debounce } from "../../utils";

export const HeexLogo = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const onResize = debounce(() => setWidth(window.innerWidth), 100);

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <div className="heex-logo">
            <span className="heex-logo-text">
                {width > 600 && "Powered by"}
                <a
                    href="https://heex.dev"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    Heex
                </a>
            </span>
            <span className="heex-logo-svg">
                <a
                    href="https://heex.dev"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    <svg
                        width="1.5rem"
                        height="1.5rem"
                        viewBox="0 0 70 70"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5 33.4746L5.00003 33.5097L5 33.5442C5 34.7481 5.10273 35.9324 5.30119 37.091C6.3872 43.5537 10.341 49.2335 16.0356 53.1751C16.1522 53.4275 16.2176 53.7106 16.2176 54.01C16.2176 54.1514 16.1916 54.2669 16.1683 54.3707C16.1493 54.4555 16.132 54.5324 16.132 54.6094C15.9401 55.3131 15.7123 56.172 15.4978 56.981L15.4978 56.9812C15.138 58.3381 14.8156 59.5543 14.7619 59.6616C14.6763 59.9185 14.5906 60.1754 14.5906 60.4323C14.5906 60.9461 15.0188 61.4599 15.6182 61.4599C15.8751 61.4599 16.0464 61.3742 16.2176 61.2886L22.8112 57.5208C23.1885 57.3322 23.5659 57.1897 23.9773 57.1273C27.3895 58.2703 31.1082 58.8983 35 58.8983C46.7449 58.8983 56.9135 53.1786 61.8388 44.8467C63.878 41.4714 65.0271 37.6604 65.0271 33.6299C65.0271 32.4622 64.9342 31.3144 64.7522 30.192C62.8522 17.7014 50.256 8.05084 35 8.05084C18.4315 8.05084 5 19.4334 5 33.4746ZM31.8308 20H23.6438L21 46H29.187L30.2533 35.4829H39.066L38.1331 46H46.3562L49 20H40.7769L39.8956 29.0982H30.9495L31.8308 20Z"
                            fill="url(#paint0_linear_60_2)"
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_60_2"
                                x1="14.0041"
                                y1="10.9444"
                                x2="48.34"
                                y2="58.9259"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stop-color="#FFA216" />
                                <stop offset="1" stop-color="#FF4016" />
                            </linearGradient>
                        </defs>
                    </svg>
                </a>
            </span>
        </div>
    );
};
