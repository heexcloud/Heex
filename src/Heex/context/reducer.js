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
        case ACTION.THUMBUP_COMMENT:
            const toBeUpdatedIndex = state.comments.findIndex(
                (c) => c.objectId === payload.updated.objectId
            );
            if (toBeUpdatedIndex === -1) return state;
            const toBeUpdated = state.comments[toBeUpdatedIndex];
            toBeUpdated.likes = payload.updated.likes;
            state.comments[toBeUpdatedIndex] = toBeUpdated;
            return { ...state }; // the destructor is a must
        default:
            return state;
    }
};
