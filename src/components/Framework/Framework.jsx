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

        const hiddenClip = "polygon(100% 0%, 100% 100%, 100% 100%, 100% 0%)";
        const fullClip = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";


        const trigger = ScrollTrigger.create({
            trigger: section.current,
            start: "top top",
            end: () => `+=${window.innerHeight * 4}px`,
            pin: isMobile ? false : true,
            pinSpacing: true,
            scrub: 0,

        onUpdate: (self) => {
            const progress = self.progress;
            const total = photo.length;

            const position = progress * total;

            const activeIndex = Math.min(
                Math.floor(position),
                total - 1
            );

            const localProgress = position - activeIndex;

            photo.forEach((item, index) => {
                if (index < activeIndex) {
                    gsap.to(item, {
                        clipPath: fullClip
                    });
                } else if (index > activeIndex) {
                    gsap.to(item, {
                        clipPath: hiddenClip
                    });
                }
            });

            if (activeIndex === 0) {
                gsap.set(photo[0], {
                    clipPath: fullClip
                });
            } else {
                gsap.to(photo[activeIndex], {
                    clipPath: `polygon(
                        ${100 - localProgress * 100}% 0%,
                        100% 0%,
                        100% 100%,
                        ${100 - localProgress * 100}% 100%
                    )`
                });
            }

            title.forEach((item, index) => {
                gsap.set(item, {
                    opacity: index === activeIndex ? 1 : 0.3
                });
            });
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