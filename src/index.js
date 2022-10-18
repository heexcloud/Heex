import React from "react";
import ReactDOMClient from "react-dom/client";
import { Heex } from "./Heex";

const defaultOptions = {
    rootElement: "#heex",
    apiBaseUrl: "https://heex-api-nextjs.vercel.app",
    clientName: "heex-dogfooding",
    clientId: "aGVleC1kb2dmb29kaW5n", // just some random string so that api knows which is which
};

export default class Singleton {
    static _instance;

    static init(opts) {
        // allow user just overwrites a part of the default options
        const _opts = opts ? { ...defaultOptions, ...opts } : defaultOptions;

        if (typeof window !== "undefined") {
            window.HeexOptions = _opts;
        }

        if (!Singleton._instance) {
            Singleton._instance = new Singleton(_opts);
        }

        return Singleton._instance;
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
        this._root.render(<Heex _options={this._options} />);
    }
}
