import React, { useRef, useMemo } from "react";

export function useMemoizedFn(fn) {
    const fnRef = useRef(fn);
    fnRef.current = useMemo(() => fn, [fn]);

    const memoizedFn = useRef();
    if (!memoizedFn.current) {
        memoizedFn.current = function (...args) {
            return fnRef.current.apply(null, args);
        };
    }

    return memoizedFn.current;
}
