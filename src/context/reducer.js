import { ACTION } from "./action";

export const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case ACTION.SET_PAGE:
            return { ...state, page: payload.page };
        case ACTION.PAGE_INCR:
            return { ...state, page: state.page + 1 };
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
        default:
            return state;
    }
};
