export const options = (opts) => {
    if (!opts) throw new Error("Options must be provided");
    if (!opts.apiBaseUrl) throw new Error("apiBaseUrl must be provided");
    if (!opts.clientId) throw new Error("clientId must be provided");
    if (!opts.auth || !["anonymous", "heex", "host"].includes(opts.auth.use)) {
        throw new Error(
            "auth must be provided and its use must be one of 'anonymous', 'heex', 'host'"
        );
    }
};
