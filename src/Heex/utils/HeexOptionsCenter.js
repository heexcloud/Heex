export const assignHeexOptions = (options) => {
    window.HeexOptions = options;
};

export const assignAuthToken = (token) => {
    window.HeexOptions.auth.token = token;
};
