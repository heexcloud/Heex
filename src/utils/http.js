export const createComment = async function (payload) {
    const { clientName, clientId, apiBaseUrl } = window.HeexOptions;

    try {
        const response = await fetch(`${apiBaseUrl}/api/v1/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...payload, clientName, clientId }),
        });

        const json = await response.json();
        return json.data;
    } catch (err) {
        console.error(err);
    }
};

export const getCommentCount = async function () {
    const { apiBaseUrl } = window.HeexOptions;

    try {
        const pageId = window.location.pathname;
        const response = await fetch(
            `${apiBaseUrl}/api/v1/comment/count?pageId=${pageId}`
        );
        const json = await response.json();
        return json.data.count;
    } catch (err) {
        console.error(err);
    }
    return 0;
};

export const getComments = async function () {
    const { apiBaseUrl } = window.HeexOptions;
    try {
        const pageId = window.location.pathname;
        const response = await fetch(
            `${apiBaseUrl}/api/v1/comments?pageId=${pageId}`
        );
        const json = await response.json();
        return json.data.comments;
    } catch (err) {
        console.error(err);
    }
    return [];
};
