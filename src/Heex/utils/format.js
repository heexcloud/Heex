export const formatTime = (t) => {
    try {
        const tArr = new Date(t).toISOString().split("T");
        return `${tArr[0]} ${tArr[1].slice(0, 8)}`;
    } catch (err) {
        console.log("err :>> ", err);
    }

    return "";
};
