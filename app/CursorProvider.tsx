"use client";

import { useEffect } from "react";
import MouseFollower from "mouse-follower";
import gsap from "gsap";

export default function MouseFollowerClient() {
    useEffect(() => {
        MouseFollower.registerGSAP(gsap);

        const cursor = new MouseFollower({
            speed: 0.55,
            stateDetection: {
                "-pointer": "a,button",
                "-hidden": "input,textarea,iframe",
            },
            className: "mf-cursor cursor-circle",
        });

        return () => cursor.destroy();
    }, []);

    return null;
}