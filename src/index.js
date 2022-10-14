import React from "react";
import ReactDOMClient from "react-dom/client";
import { HeexComponent } from "./Heex";

const defaultOptions = {
    rootElement: "#heex",
    apiBaseUrl: "https://heex-api-lambda.netlify.app",
    appName: "heex-demo",
    appId: "aGVleC1kZW1v", // just some random string so that api knows which is which
};

export default class Heex {
    static _instance;

    static init(opts) {
        // allow user just overwrites a part of the default options
        const _opts = opts ? { ...defaultOptions, ...opts } : defaultOptions;

        if (!Heex._instance) {
            Heex._instance = new Heex(_opts);
        }

        return Heex._instance;
    }

    _options = {};
    _rootElement = null;
    _root = null;

    constructor(options) {
        this._options = options;
        this._render();
    }

    _render() {
        this._rootElement = document.querySelector(this._options.rootElement);
        this._root = ReactDOMClient.createRoot(this._rootElement);
        this._root.render(<HeexComponent />);
    }
}
