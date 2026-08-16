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

        const feature = q(".statement__feature");
        const wrappers = q(".statement__image-wrapper");
        const images = q(".statement__image");

        if (!isMobile) {
            ScrollTrigger.create({
                trigger: feature,
                start: "top top",
                end: () => `+=${window.innerHeight * 4}px`,
                pin: feature,
                pinSpacing: true,
            });
        }

        ScrollTrigger.create({
            trigger: feature,
            start: "top bottom",
            end: () => `+=${window.innerHeight * 5}px`,
            scrub: 1,

            onUpdate: (self) => {
                const progress = self.progress;
                const stageProgress = progress * wrappers.length;

                wrappers.forEach((wrapper, index) => {
                    const rawProgress = stageProgress - index;

                    const localProgress = gsap.utils.clamp(
                        0,
                        1,
                        rawProgress
                    );

                    const firstScale =
                        0.5 + (0.5 * localProgress);

                    const firstY =
                        65 * (1 - localProgress);

                    let secondProgress = 0;

                    if (index < wrappers.length - 1) {
                        const nextProgress = gsap.utils.clamp(
                            0,
                            1,
                            stageProgress - (index + 1)
                        );

                        secondProgress = gsap.utils.clamp(
                            0,
                            1,
                            (nextProgress - 0.5) / 0.5
                        );
                    } else {
                        secondProgress = gsap.utils.clamp(
                            0,
                            1,
                            rawProgress - 1
                        );
                    }

                    const secondScale =
                        1 - (0.075 * secondProgress);

                    const secondY =
                        -70 * secondProgress;

                    const secondBlur =
                        10 * secondProgress;

                    let thirdProgress = 0;

                    if (index < wrappers.length - 2) {
                        const targetProgress = gsap.utils.clamp(
                            0,
                            1,
                            stageProgress - (index + 2)
                        );

                        thirdProgress = targetProgress;
                    }

                    const thirdOpacity =
                        1 - thirdProgress;

                    if (rawProgress < 1) {
                        gsap.set(wrapper, {
                            y: `${firstY}%`,
                            scale: firstScale,
                            filter: "blur(0px)",
                            opacity: thirdOpacity,
                        });
                    } else {
                        gsap.set(wrapper, {
                            y: `${secondY}px`,
                            scale: secondScale,
                            filter: `blur(${secondBlur}px)`,
                            opacity: thirdOpacity,
                        });
                    }

                    gsap.set(images[index], {
                        scale: 2 - localProgress,
                    });
                });
            },
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
                            <img
                                className="statement__image"
                                src="/statement/img1.png"
                                alt=""
                            />
                            <div className="statement__info">
                                <h6 className="statement__name">
                                    Extraordinary People
                                </h6>

                                <p className="statement__link">
                                    Learn More
                                </p>
                            </div>
                        </div>

                        <div className="statement__image-wrapper">
                            <img
                                className="statement__image"
                                src="/statement/img2.png"
                                alt=""
                            />
                            <div className="statement__info">
                                <h6 className="statement__name">
                                    Transformative Places
                                </h6>

                                <p className="statement__link">
                                    Learn More
                                </p>
                            </div>
                        </div>

                        <div className="statement__image-wrapper">
                            <img
                                className="statement__image"
                                src="/statement/img3.png"
                                alt=""
                            />
                            <div className="statement__info">
                                <h6 className="statement__name">
                                    Design-based processes
                                </h6>

                                <p className="statement__link">
                                    Learn More
                                </p>
                            </div>
                        </div>

                        <div className="statement__image-wrapper">
                            <img
                                className="statement__image"
                                src="/statement/img4.png"
                                alt=""
                            />
                            <div className="statement__info">
                                <h6 className="statement__name">
                                    Real-World Outcomes
                                </h6>

                                <p className="statement__link">
                                    Learn More
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}