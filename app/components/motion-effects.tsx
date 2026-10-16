"use client";

import { useEffect, useState } from "react";

export function MotionEffects() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout> | undefined;
    const update = () => {
      clearTimeout(timer);
      setPaused(preference.matches);
      // Without a pause control, decorative motion must settle automatically.
      if (!preference.matches) timer = setTimeout(() => setPaused(true), 4500);
    };
    update();
    preference.addEventListener("change", update);
    return () => { clearTimeout(timer); preference.removeEventListener("change", update); };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "playing";
    return () => { delete document.documentElement.dataset.motion; };
  }, [paused]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("motion-arrived");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12 });
    document.querySelectorAll(".service-showcase-card, .vfd-pillar, .who-card, .process-step, .difference-visual, .included-card, .article-card, .final-cta-inner").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
