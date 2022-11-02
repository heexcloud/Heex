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
    const { clientId, apiBaseUrl } = window.HeexOptions;

    try {
        const pageId = window.location.pathname;
        const response = await fetch(
            `${apiBaseUrl}/api/v1/comment/count?pageId=${pageId}&clientId=${clientId}`
        );
        const json = await response.json();
        return json.data.count;
    } catch (err) {
        console.error(err);
    }
    return 0;
};

export const getComments = async function (param) {
    try {
        const pageId = window.location.pathname;
        const { apiBaseUrl, clientId } = window.HeexOptions;
        const { limit } = param || {};
        const params = new URLSearchParams({
            pageId,
            clientId,
        });
        if (limit !== undefined) {
            params.append("limit", limit);
        }

        const response = await fetch(`${apiBaseUrl}/api/v1/comments?${params}`);
        const json = await response.json();
        return json.data.comments;
    } catch (err) {
        console.error(err);
    }
};

export const thumbupComment = async function (comment) {
    const { apiBaseUrl } = window.HeexOptions;

    try {
        const response = await fetch(
            `${apiBaseUrl}/api/v1/comment/${comment.objectId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    operation: "thumbup",
                    likes: (comment.likes || 0) + 1,
                }),
            }
        );

        const json = await response.json();

        return json.data;
    } catch (err) {
        console.error(err);
    }

    return {};
};

export const getCommentById = async function (cid) {
    const { apiBaseUrl } = window.HeexOptions;
    try {
        const response = await fetch(`${apiBaseUrl}/api/v1/comment/${cid}`);
        const json = await response.json();
        return json.data; // comment and its replies
    } catch (err) {
        console.error("err :>> ", err);
    }
};
