import React from "react";
import ReactDOMClient from "react-dom/client";
import { HeexComponent } from "./Heex";

const defaultOptions = {
    rootElement: "#heex",
    apiBaseUrl: "https://heex-api-lambda.netlify.app",
    appName: "heex-demo",
    appId: "aGVleC1kZW1v", // just some random string so that api can know which is which
};

export default class Heex {
    static _instance;

    static init(opts) {
        // allow user just overwrites a part of the default options
        const _options = opts ? { ...defaultOptions, ...opts } : defaultOptions;

        if (!Heex._instance) {
            Heex._instance = new Heex(_options);
        }

        return Heex._instance;
    }

    options = {};
    rootElement = null;
    root = null;

    constructor(_options) {
        this.options = _options;
        this.render();
    }

    render() {
        this.rootElement = document.querySelector(this.options.rootElement);
        this.root = ReactDOMClient.createRoot(this.rootElement);
        this.root.render(<HeexComponent />);
    }
}
