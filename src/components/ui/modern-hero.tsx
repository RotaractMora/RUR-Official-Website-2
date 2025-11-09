"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, animate } from "framer-motion";

interface ModernHeroProps {
  products: { title: string; link: string; thumbnail: any }[];
}

const headlineVariant = {
  hidden: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const copyVariant = {
  hidden: { opacity: 0, y: 8 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.12, ease: "easeOut" } },
};

const ctaVariant = {
  hidden: { opacity: 0, y: 6 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.24 } },
};

// (thumbVariant removed - thumbnails replaced by sliding carousel)

const ModernHero: React.FC<ModernHeroProps> = ({ products }) => {
  // Slides (first 8 products)
  const slides = products?.slice(0, 8) ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideIntervalRef = useRef<number | null>(null);
  const slideDuration = 3000;
  const portalLink = "https://rur.rotaractmora.org/student/sign-up";

  // motion x for drag & programmatic animation
  const x = useMotionValue(0);
  const slideViewportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!slides.length) return;
    slideIntervalRef.current = window.setInterval(() => {
      setCurrentIndex((s) => (s + 1) % slides.length);
    }, slideDuration) as unknown as number;
    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current as unknown as number);
        slideIntervalRef.current = null;
      }
    };
  }, [slides.length]);

  // Sync motion x when currentIndex changes (autoplay or programmatic)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const vw = slideViewportRef.current?.clientWidth ?? window.innerWidth;
    const target = -currentIndex * vw;
    const controls = animate(x, target, { type: "spring", stiffness: 220, damping: 28 });
    return () => controls.stop();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  function pauseSlideshow() {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current as unknown as number);
      slideIntervalRef.current = null;
    }
  }

  function resumeSlideshow() {
    if (!slides.length) return;
    if (!slideIntervalRef.current) {
      slideIntervalRef.current = window.setInterval(() => {
        setCurrentIndex((s) => (s + 1) % slides.length);
      }, slideDuration) as unknown as number;
    }
  }

  return (
    <section className="relative w-full bg-gradient-to-br from-[#0f172a] via-[#0f4c81] to-[#0fb4ff] text-white overflow-hidden">
      {/* decorative shapes */}
      <div className="absolute -left-40 -top-40 w-96 h-96 rounded-full opacity-20 blur-3xl bg-white/10 pointer-events-none"></div>
      <div className="absolute -right-40 -bottom-40 w-96 h-96 rounded-full opacity-15 blur-2xl bg-black/20 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left">
          <div className="space-y-6">
            <motion.h1 initial="hidden" animate="enter" variants={headlineVariant} className="text-4xl md:text-6xl font-extrabold leading-tight">
              Are You Ready? <span className="block text-2xl md:text-3xl font-semibold text-blue-100 mt-2">Career prep, company connections & real opportunities</span>
            </motion.h1>

            <motion.p initial="hidden" animate="enter" variants={copyVariant} className="text-md md:text-md text-blue-50 max-w-lg">
              Join the Rotaract Club of University of Moratuwa’s flagship event — connect with over 100 companies, sharpen your interview skills, and land your first role.
            </motion.p>

            <motion.div initial="hidden" animate="enter" variants={ctaVariant} className="flex flex-wrap gap-3 justify-center md:justify-start">
              <motion.a
                whileHover={{ scale: 1.02 }}
                href={portalLink}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-slate-900 px-5 py-3 rounded-lg font-medium shadow-lg"
              >
                Register Now
              </motion.a>

              <motion.a whileHover={{ scale: 1.02 }} href="#timeline" className="inline-flex items-center gap-3 border border-white/40 text-white px-5 py-3 rounded-lg transition-colors">
                See Timeline
              </motion.a>
            </motion.div>
          </div>

          {/* Image slide */}
          <div>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }} className="bg-white/5 backdrop-blur-md rounded-xl p-4 md:p-6">
              <h3 className="text-sm text-blue-100/90 font-semibold mb-3">Event highlights</h3>

              {/* Sliding carousel (constrained container) */}
              <div
                ref={(el) => { /* placeholder ref set below via slideViewportRef */ }}
                className="w-full overflow-hidden rounded-lg mb-3"
              >
                <div ref={slideViewportRef} className="w-full relative" onMouseEnter={() => pauseSlideshow()} onMouseLeave={() => resumeSlideshow()}>
                  {/* Left / Right controls */}
                  <button
                    aria-label="Previous slide"
                    onClick={() => setCurrentIndex((s) => Math.max(0, s - 1))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-[#0f4c81] hover:bg-blue-400 text-white rounded-full p-2 md:p-3"
                  >
                    ‹
                  </button>
                  <button
                    aria-label="Next slide"
                    onClick={() => setCurrentIndex((s) => Math.min(slides.length - 1, s + 1))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-[#0f4c81] hover:bg-blue-400 text-white rounded-full p-2 md:p-3"
                  >
                    ›
                  </button>

                  <motion.div
                    className="flex h-44 md:h-56"
                    style={{ x }}
                    drag="x"
                    dragElastic={0.12}
                    onDragStart={() => pauseSlideshow()}
                    onDragEnd={(_, info) => {
                      const currentX = x.get();
                      const vw = slideViewportRef.current?.clientWidth ?? window.innerWidth;
                      const newIndex = Math.max(0, Math.min(slides.length - 1, Math.round(-currentX / vw)));
                      setCurrentIndex(newIndex);
                      setTimeout(() => resumeSlideshow(), 300);
                    }}
                  >
                    {slides.map((p, i) => (
                      <div key={i} className="flex-none w-full h-full relative">
                        <motion.div initial={false} animate={currentIndex === i ? { opacity: 1, scale: 1 } : { opacity: 0.85, scale: 0.98 }} transition={{ duration: 0.5 }} className="w-full h-full">
                          {p.thumbnail ? (
                            typeof p.thumbnail === "string" ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
                            ) : (
                              <Image src={p.thumbnail} alt={p.title} fill className="object-cover" />
                            )
                          ) : (
                            <div className="w-full h-full bg-white/10 flex md:items-center md:justify-center">{p.title}</div>
                          )}
                        </motion.div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>

              <p className="mt-4 text-sm text-blue-50/80">Swipe to preview photos from previous events.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHero;
