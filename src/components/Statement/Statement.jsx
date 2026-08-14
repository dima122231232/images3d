"use client";

import "./Statement.css";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Statement() {
    const section = useRef(null);

    useGSAP((context) => {
        const q = context.selector;
        const isMobile = window.innerWidth < 800;

        const wrappers = q(".statement__image-wrapper");
        const images = q(".statement__image");

        ScrollTrigger.create({
            trigger: q(".statement__feature"),
            start: "top top",
            end: () => `+=${window.innerHeight * 3}px`,
            pin: isMobile ? false : true,
            pinSpacing: true,
            scrub: 1,

            onUpdate: (self) => {
                const progress = self.progress;

                const stageProgress = progress * wrappers.length;

                wrappers.forEach((wrapper, index) => {
                    const localProgress = gsap.utils.clamp(
                        0,
                        1,
                        stageProgress - index
                    );

                    gsap.set(wrapper, {
                        y: `${65 * (1 - localProgress)}%`,
                        scale: 0.5 + (0.5 * localProgress),
                    });

                    gsap.set(images[index], {
                        scale: 1.5 - (.5 * localProgress),
                    });
                });
            }
        });
    }, { scope: section });
    return (
        <section className="statement" ref={section}>
            <div className="container statement__container">

                <div className="statement__content">
                    <p className="statement__eyebrow">
                        We are an operating system for
                    </p>

                    <h6 className="statement__title">
                        collaborating on society’s epic challenges.
                    </h6>
                </div>

                <div className="statement__feature">
                    <div className="statement__images">
                        <div className="statement__image-wrapper">
                            <img className="statement__image" src="/statement/img1.png" alt="" />
                        </div>

                        <div className="statement__image-wrapper">
                            <img className="statement__image" src="/statement/img2.png" alt="" />
                        </div>

                        <div className="statement__image-wrapper">
                            <img className="statement__image" src="/statement/img3.png" alt="" />
                        </div>

                        <div className="statement__image-wrapper">
                            <img className="statement__image" src="/statement/img4.png" alt="" />
                        </div>
                    </div>

                    <div className="statement__info">
                        <h6 className="statement__name">
                            Extraordinary People
                        </h6>

                        <p className="statement__link">
                            Learn More
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}