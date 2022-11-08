import { ACTION } from "./action";

export const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case ACTION.SET_PAGE:
            return { ...state, page: payload.page };
        case ACTION.PAGE_INCR:
            return { ...state, page: state.page + 1 };
        case ACTION.SET_COMMENTS:
            return { ...state, comments: payload.comments };
        case ACTION.APPEND_COMMENTS:
            return {
                ...state,
                comments: [...state.comments, ...payload.comments],
            };
        case ACTION.SET_COMMENT_COUNT:
            return {
                ...state,
                commentCount: payload.commentCount,
            };
        case ACTION.INCR_COMMENT_COUNT:
            return {
                ...state,
                commentCount: state.commentCount + 1,
            };
        case ACTION.REFRESH_THREAD:
            const toBeRefreshedIndex = payload.toBeRefreshedIndex;
            state.comments[toBeRefreshedIndex] = payload.toBeRefreshed;
            return { ...state };
        case ACTION.THUMBUP_THREAD:
            const toBeUpdatedThread = state.comments[payload.threadIndex];
            toBeUpdatedThread.likes = payload.likes;
            state.comments[payload.threadIndex] = toBeUpdatedThread;
            return { ...state }; // the destructor is a must
        case ACTION.THUMBUP_THREAD_REPLY:
            const thread = state.comments[payload.threadIndex];
            thread.replies[payload.replyIndex].likes = payload.likes;
            state.comments[payload.threadIndex] = thread;
            return { ...state }; // the destructor is a must
        case ACTION.TOGGLE_SORTING_METHOD:
            return {
                ...state,
                sortingMethod:
                    state.sortingMethod === "newest" ? "hottest" : "newest",
            };
        default:
            return state;
    }
};
