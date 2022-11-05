export const formatTime = (t) => {
    const tArr = new Date(t).toISOString().split("T");
    return `${tArr[0]} ${tArr[1].slice(0, 8)}`;
};
