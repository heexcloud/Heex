export const debounce = (fn, interval) => {
    let timerId = null;

    return (...args) => {
        window.clearTimeout(timerId);
        timerId = setTimeout(() => {
            fn.apply(null, args);
        }, interval);
    };
};
