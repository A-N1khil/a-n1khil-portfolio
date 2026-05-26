"use client";

import { Context, createContext, ReactNode, RefObject, useContext, useEffect, useRef } from "react";
import MouseFollower from "mouse-follower";
import gsap from "gsap";


type CursorContextType = {
    addClass: (className: string) => void,
    removeClass: (className: string) => void,
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
            className: "mf-cursor cursor-hollow",
            speed: 0.45,
            ease: "expo.out",
            skewing: 2
        });

        return () => {
            cursorRef.current?.destroy();
            cursorRef.current = null;
        };
    }, []);

    const value: CursorContextType = {
        addClass: (className: string) => {
            cursorRef.current?.el?.classList.add(className);
        },

        removeClass: (className: string) => {
            cursorRef.current?.el?.classList.remove(className);
        }
    };

    return (
        <CursorContext.Provider value={value}>
            {children}
        </CursorContext.Provider>
    );
}