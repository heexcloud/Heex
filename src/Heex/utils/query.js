const heexHttpPost = (url, bodyObject) => {
    let headers = {
        "Content-Type": "application/json",
    };

    if (window.HeexOptions.auth.use === "anonymous") {
        headers = { ...headers, "X-Heex": window.HeexOptions.auth.token };
    }
    return fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(bodyObject),
    });
};

export const createComment = async function (payload) {
    const { clientName, clientId, apiBaseUrl } = window.HeexOptions;

    try {
        const response = await heexHttpPost(`${apiBaseUrl}/comment`, {
            ...payload,
            clientName,
            clientId,
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
            `${apiBaseUrl}/comment/count?pageId=${pageId}&clientId=${clientId}`
        );
        const json = await response.json();
        return json.data.count;
    } catch (err) {
        console.error(err);
    }
    return 0;
};

export const getComments = async function (params) {
    try {
        const pageId = window.location.pathname;
        const { apiBaseUrl, clientId } = window.HeexOptions;
        const { limit, offset } = params || {};
        const urlSearchParams = new URLSearchParams({
            pageId,
            clientId,
        });

        if (limit) {
            urlSearchParams.append("limit", limit);
        }

        if (offset) {
            urlSearchParams.append("offset", offset);
        }

        const response = await fetch(
            `${apiBaseUrl}/comments?${urlSearchParams}`
        );
        const json = await response.json();
        return json.data.comments;
    } catch (err) {
        console.error(err);
    }
};

export const thumbupComment = async function (comment) {
    const { apiBaseUrl } = window.HeexOptions;

    try {
        const response = await heexHttpPost(
            `${apiBaseUrl}/comment/${comment.objectId}`,
            {
                operation: "thumbup",
                likes: (comment.likes || 0) + 1,
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
        const response = await fetch(`${apiBaseUrl}/comment/${cid}`);
        const json = await response.json();
        return json.data; // comment and its replies
    } catch (err) {
        console.error("err :>> ", err);
    }
};

export const fetchAnonymousToken = async function () {
    const { apiBaseUrl } = window.HeexOptions;
    try {
        const response = await fetch(`${apiBaseUrl}/anonymous/token`);
        const json = await response.json();
        window.HeexOptions.auth.token = json.data.token;
    } catch (err) {
        console.error("err :>> ", err);
    }
};
