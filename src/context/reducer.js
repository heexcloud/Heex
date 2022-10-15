import { ACTION } from "./action";

export const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case ACTION.SET_PAGE:
            return { ...state, page: payload.page };
        case ACTION.PAGE_INCR:
            return { ...state, page: state.page + 1 };
        default:
            return state;
    }
};
