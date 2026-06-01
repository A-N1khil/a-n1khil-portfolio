"use client";

import { Context, createContext, ReactNode, RefObject, useContext, useEffect, useRef } from "react";
import MouseFollower from "mouse-follower";
import gsap from "gsap";


type CursorContextType = {
    addClass: (className: string) => void,
    removeClass: (className: string) => void,
    hollowCursor: () => void,
    solidCursor: () => void,
};

const CursorContext: Context<CursorContextType | null> = createContext<CursorContextType | null>(null);

export function useCursor(): CursorContextType {
    const context: CursorContextType | null = useContext(CursorContext);

    if (!context) {
        throw new Error("useCursor must be used within the CursorProvider");
    }

    return context;
}

export default function CursorProvider({ children }: { children: ReactNode }) {
    const cursorRef: RefObject<MouseFollower | null> = useRef<MouseFollower | null>(null)

    useEffect(() => {
        MouseFollower.registerGSAP(gsap);

        cursorRef.current = new MouseFollower({
            className: "mf-cursor cursor-circle", speed: 0.45, ease: "expo.out", skewing: 2
        });

        return () => {
            cursorRef.current?.destroy();
            cursorRef.current = null;
        };
    }, []);

    const addClass = (className: string) => {
        cursorRef.current?.el?.classList.add(className);
    };

    const removeClass = (className: string) => {
        cursorRef.current?.el?.classList.remove(className);
    };

    const hollowCursor = () => {
        addClass("cursor-hollow");
        removeClass("cursor-circle");
    };

    const solidCursor = () => {
        addClass("cursor-circle");
        removeClass("cursor-hollow");
    };

    const value: CursorContextType = {
        addClass, removeClass, hollowCursor, solidCursor
    };

    return (<CursorContext.Provider value={ value }>
            { children }
        </CursorContext.Provider>);
}