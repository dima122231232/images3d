"use client";

import "./Framework.css";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Framework() {
    const section = useRef(null);

    useGSAP((context) => {
        const q = context.selector;
        const isMobile = window.innerWidth < 800;

        const photo = q(".framework__image");
        const title = q(".framework__list li");
        const track = q(".framework__images-track");

        const updateStep = (index, progress) => {
            const start = index / photo.length;

            const activeIndex = Math.min(
                Math.floor(progress * photo.length),
                photo.length - 1
            );

            gsap.to(photo[index], {
                scale: progress >= start ? 1 : 0,
                duration: .75,
                ease: "power2.out"
            });

            gsap.set(title[index], {
                opacity: index === activeIndex ? 1 : .3
            });
        };

        const updateTrack = (progress) => {
            const step = 1 / photo.length;

            const activeIndex = Math.min(
                Math.floor(progress / step),
                photo.length - 1
            );

            const stepProgress = gsap.utils.mapRange(
                activeIndex * step,
                (activeIndex + 1) * step,
                0,
                1,
                progress
            );

            if (activeIndex === 0) {
                gsap.set(track, {
                    scale: 1
                });
            }

            if (activeIndex === 1) {
                gsap.set(track, {
                    // scale: 1 - stepProgress * .6
                });
            }

            if (activeIndex === 2) {
                gsap.set(track, {
                    // scale: .4 + stepProgress * .6
                });
            }
        };

        const trigger = ScrollTrigger.create({
            trigger: section.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 2}px`,
            pin: isMobile ? false : true,
            pinSpacing: true,
            scrub: 0,

            onUpdate: (self) => {
                const progress = self.progress;

                photo.forEach((item, index) => {
                    updateStep(index, progress);
                });

                updateTrack(progress);
            }
        });

        const clickHandlers = [];

        title.forEach((item, index) => {
            const handler = () => {
                const progress = index / photo.length;

                const scrollPosition =
                    trigger.start +
                    (trigger.end - trigger.start) * progress;

                window.scrollTo({
                    top: scrollPosition,
                    behavior: "smooth"
                });
            };

            clickHandlers.push(handler);
            item.addEventListener("click", handler);
        });

        return () => {
            title.forEach((item, index) => {
                item.removeEventListener(
                    "click",
                    clickHandlers[index]
                );
            });

            trigger.kill();
        };
    }, { scope: section });

    return (
        <section className="framework" ref={section}>
            <div className="container">
                <div className="framework__content">
                    <div className="framework__focus">
                        <h6>Areas of focus</h6>

                        <ul className="framework__list font-additional">
                            <li>Adaptive Health</li>
                            <li>Civic Life</li>
                            <li>Catalytic Philanthropy</li>
                            <li>Regenerative Homes</li>
                            <li>AI Humanism</li>
                            <li>Experiential Learning</li>
                            <li>Communities of Tomorrow</li>
                            <li>Transformative Travel</li>
                        </ul>
                    </div>

                    <div className="framework__description">
                        <p className="font-additional">
                            Healthcare is built around preventing what can go wrong.
                            We’re interested in what happens next: how technology,
                            biology, and behavior can help people recover faster,
                            adapt sooner, and come back stronger.
                        </p>
                    </div>
                </div>
            </div>

            <div className="framework__images">
                <div className="framework__images-track">

                    <img
                        className="framework__image"
                        src="/framework/img1.jpg"
                        alt=""
                    />

                    <img
                        className="framework__image"
                        src="/framework/img2.jpg"
                        alt=""
                    />

                    <img
                        className="framework__image"
                        src="/framework/img3.jpg"
                        alt=""
                    />

                    <img
                        className="framework__image"
                        src="/framework/img4.jpg"
                        alt=""
                    />

                    <img
                        className="framework__image"
                        src="/preloader/1.jpg"
                        alt=""
                    />

                    <img
                        className="framework__image"
                        src="/preloader/2.jpg"
                        alt=""
                    />

                    <img
                        className="framework__image"
                        src="/preloader/3.jpg"
                        alt=""
                    />

                    <img
                        className="framework__image"
                        src="/preloader/4.jpg"
                        alt=""
                    />

                </div>
            </div>
        </section>
    );
}