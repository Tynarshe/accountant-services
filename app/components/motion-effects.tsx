"use client";

import { useEffect, useState } from "react";

export function MotionEffects() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPaused(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
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

  return <button className="motion-control" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Enable motion" : "Pause motion"}</button>;
}
