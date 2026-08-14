"use client";

import "./home.css";
import Preloader from "@/components/Preloader/Preloader";
import Framework from "@/components/Framework/Framework";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const page = useRef(null);

    useGSAP(() => {

    }, { scope: page })
  return (
    <>
        <main ref={page}>
            <Preloader/>  
            <div style={{height:"100vh"}}></div>
            <Framework/>
            <div style={{height:"100vh"}}></div>
        </main>
    </>
  );
}