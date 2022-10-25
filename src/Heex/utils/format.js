export const formatTime = (t) => {
    return new Date(t).toISOString().split("T")[0];
};
