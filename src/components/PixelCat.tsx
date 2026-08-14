"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./PixelCat.module.css";

function playMeowSound() {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    const now = ctx.currentTime;

    // Pitch envelope: starts mid, goes higher, then smoothly drops (meow sound)
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(780, now + 0.12);
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.35);

    // Volume envelope
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  } catch {
    // Audio might be blocked by browser policy until interaction
  }
}

const MEOW_QUOTES = [
  "Meow! 🐾",
  "Ngeong~ ✨",
  "Semangat kerjanya! 💪",
  "Mau buka app apa? 🚀",
  "Purrr purr... 😸",
  "Udah ngopi belum? ☕",
  "Rawr! Macan mini 🐯",
  "Jangan lupa istirahat! 🌸",
  "*stretches* 🐱",
  "Portal NG mantap! 🔥",
];

type CatState = "walk" | "sit" | "sleep" | "meow" | "jump";

export default function PixelCat() {
  const [posX, setPosX] = useState(20); // percentage 5% - 88%
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [catState, setCatState] = useState<CatState>("walk");
  const [walkFrame, setWalkFrame] = useState(0);
  const [speech, setSpeech] = useState<string | null>(null);
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger Meow Speech
  const triggerMeow = useCallback((quote?: string) => {
    const text = quote || MEOW_QUOTES[Math.floor(Math.random() * MEOW_QUOTES.length)];
    setSpeech(text);
    playMeowSound();

    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    speechTimeoutRef.current = setTimeout(() => {
      setSpeech(null);
    }, 2800);
  }, []);

  // Handle Cat Click / Tap Interaction
  const handleCatClick = () => {
    setCatState("jump");
    triggerMeow();

    // Spawn floating heart
    const newHeart = { id: Date.now(), x: posX };
    setHearts((prev) => [...prev.slice(-4), newHeart]);

    setTimeout(() => {
      setCatState("sit");
    }, 600);
  };

  // Walking & animation frame cycle
  useEffect(() => {
    const frameInterval = setInterval(() => {
      setWalkFrame((f) => (f + 1) % 4);
    }, 180);

    return () => clearInterval(frameInterval);
  }, []);

  // Autonomous state machine (walking, sitting, sleeping, meowing)
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const runBehaviorLoop = () => {
      // Pick random next state
      const rand = Math.random();

      if (rand < 0.55) {
        // Walk mode
        setCatState("walk");
        const walkDuration = 2500 + Math.random() * 3500;
        timer = setTimeout(runBehaviorLoop, walkDuration);
      } else if (rand < 0.78) {
        // Sit mode
        setCatState("sit");
        if (Math.random() < 0.4) {
          triggerMeow();
        }
        const sitDuration = 3000 + Math.random() * 4000;
        timer = setTimeout(runBehaviorLoop, sitDuration);
      } else if (rand < 0.92) {
        // Sleep mode
        setCatState("sleep");
        const sleepDuration = 4000 + Math.random() * 5000;
        timer = setTimeout(runBehaviorLoop, sleepDuration);
      } else {
        // Direct Meow
        setCatState("sit");
        triggerMeow();
        timer = setTimeout(runBehaviorLoop, 3000);
      }
    };

    runBehaviorLoop();

    return () => clearTimeout(timer);
  }, [triggerMeow]);

  // Movement update when in "walk" state
  useEffect(() => {
    if (catState !== "walk") return;

    const moveInterval = setInterval(() => {
      setPosX((prevX) => {
        const step = direction === "right" ? 0.35 : -0.35;
        let nextX = prevX + step;

        if (nextX >= 88) {
          nextX = 88;
          setDirection("left");
        } else if (nextX <= 5) {
          nextX = 5;
          setDirection("right");
        }

        // Slight chance to randomly turn around
        if (Math.random() < 0.005) {
          setDirection((d) => (d === "right" ? "left" : "right"));
        }

        return nextX;
      });
    }, 50);

    return () => clearInterval(moveInterval);
  }, [catState, direction]);

  return (
    <div className={styles.catArea} ref={containerRef}>
      {/* Cat Track Line / Lawn */}
      <div className={styles.trackLine}></div>

      {/* Floating Hearts */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className={styles.heartFloat}
          style={{ left: `${h.x}%` }}
        >
          ❤️
        </div>
      ))}

      {/* Speech Bubble */}
      {speech && (
        <div
          className={`${styles.speechBubble} ${direction === "left" ? styles.bubbleLeft : styles.bubbleRight}`}
          style={{ left: `${posX}%` }}
        >
          <span className={styles.speechText}>{speech}</span>
          <div className={styles.bubbleArrow}></div>
        </div>
      )}

      {/* The Pixel Cat Actor */}
      <div
        className={`${styles.catWrapper} ${styles[catState]} ${direction === "left" ? styles.flipLeft : styles.flipRight}`}
        style={{ left: `${posX}%` }}
        onClick={handleCatClick}
        title="Klik kucingnya! 🐾"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleCatClick()}
      >
        {/* Render SVG Pixel Cat Sprite based on state & frame */}
        <PixelCatSvg state={catState} frame={walkFrame} />

        {/* Sleeping Zzz Indicator */}
        {catState === "sleep" && (
          <div className={styles.zzzContainer}>
            <span className={styles.z1}>z</span>
            <span className={styles.z2}>Z</span>
            <span className={styles.z3}>Z</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Crisp Pixel Art SVG Vector component
function PixelCatSvg({ state, frame }: { state: CatState; frame: number }) {
  // 24x20 grid pixel art representation
  return (
    <svg
      viewBox="0 0 28 22"
      className={styles.catSvg}
      shapeRendering="crispEdges"
    >
      {/* CAT SHADOW */}
      <ellipse cx="14" cy="20" rx="10" ry="2" fill="var(--color-border)" opacity="0.6" />

      {state === "sleep" ? (
        /* SLEEPING CAT SPRITE */
        <g className={styles.catGroup}>
          {/* Main body curled */}
          <rect x="5" y="10" width="16" height="8" rx="3" fill="#F59E0B" />
          <rect x="7" y="11" width="12" height="6" fill="#FBBF24" />
          {/* Back Stripes */}
          <rect x="9" y="10" width="2" height="5" fill="#D97706" />
          <rect x="13" y="10" width="2" height="5" fill="#D97706" />
          {/* Head resting */}
          <rect x="18" y="12" width="7" height="6" rx="2" fill="#F59E0B" />
          {/* Ears */}
          <polygon points="19,12 21,9 22,12" fill="#D97706" />
          <polygon points="23,12 24,9 25,12" fill="#D97706" />
          {/* Closed eyes (peaceful sleep) */}
          <line x1="20" y1="14" x2="22" y2="14" stroke="#78350F" strokeWidth="1" />
          <line x1="23" y1="14" x2="25" y2="14" stroke="#78350F" strokeWidth="1" />
          {/* Cute Nose */}
          <rect x="23" y="15" width="1" height="1" fill="#EF4444" />
          {/* Tail wrapped around */}
          <path d="M5,15 Q3,12 4,10" stroke="#D97706" strokeWidth="2" fill="none" />
        </g>
      ) : state === "sit" ? (
        /* SITTING CAT SPRITE */
        <g className={styles.catGroup}>
          {/* Sitting Body */}
          <rect x="8" y="9" width="10" height="9" rx="2" fill="#F59E0B" />
          <rect x="9" y="10" width="8" height="7" fill="#FBBF24" />
          {/* White Chest */}
          <rect x="11" y="11" width="5" height="6" rx="1" fill="#FEF3C7" />
          {/* Stripes */}
          <rect x="8" y="11" width="2" height="2" fill="#D97706" />
          <rect x="8" y="14" width="2" height="2" fill="#D97706" />
          {/* Front Paws */}
          <rect x="11" y="17" width="2" height="2" fill="#FFFFFF" />
          <rect x="14" y="17" width="2" height="2" fill="#FFFFFF" />
          {/* Head */}
          <rect x="11" y="3" width="9" height="7" rx="2" fill="#F59E0B" />
          <rect x="12" y="4" width="7" height="5" fill="#FBBF24" />
          {/* Ears */}
          <polygon points="12,3 14,0 15,3" fill="#D97706" />
          <polygon points="17,3 18,0 20,3" fill="#D97706" />
          <polygon points="13,3 14,1 14.5,3" fill="#FCA5A5" />
          <polygon points="17.5,3 18,1 19,3" fill="#FCA5A5" />
          {/* Eyes (Open & Curious) */}
          <rect x="13" y="5" width="2" height="2" fill="#1E293B" />
          <rect x="17" y="5" width="2" height="2" fill="#1E293B" />
          <rect x="13" y="5" width="1" height="1" fill="#FFFFFF" />
          <rect x="17" y="5" width="1" height="1" fill="#FFFFFF" />
          {/* Pink Nose & Mouth */}
          <rect x="15.5" y="7" width="1" height="1" fill="#EF4444" />
          {/* Whiskers */}
          <line x1="10" y1="7" x2="12" y2="7.5" stroke="#78350F" strokeWidth="0.75" />
          <line x1="19" y1="7.5" x2="21" y2="7" stroke="#78350F" strokeWidth="0.75" />
          {/* Tail wagging */}
          <path
            d="M8,16 Q4,13 6,9"
            stroke="#D97706"
            strokeWidth="2.2"
            fill="none"
            className={styles.waggingTail}
          />
        </g>
      ) : state === "jump" ? (
        /* JUMPING / HAPPY CAT SPRITE */
        <g className={styles.catGroup}>
          {/* Body stretched */}
          <rect x="6" y="5" width="13" height="8" rx="2" fill="#F59E0B" />
          <rect x="7" y="6" width="11" height="6" fill="#FBBF24" />
          {/* Head raised */}
          <rect x="15" y="1" width="9" height="7" rx="2" fill="#F59E0B" />
          {/* Ears perk up */}
          <polygon points="16,1 18,-2 19,1" fill="#D97706" />
          <polygon points="21,1 22,-2 24,1" fill="#D97706" />
          {/* Happy Happy Eyes (^ ^) */}
          <path d="M17,4 Q18,2 19,4" stroke="#1E293B" strokeWidth="1" fill="none" />
          <path d="M21,4 Q22,2 23,4" stroke="#1E293B" strokeWidth="1" fill="none" />
          {/* Mouth open :D */}
          <rect x="19.5" y="5.5" width="1.5" height="1.5" fill="#EF4444" />
          {/* Paws reaching out */}
          <rect x="20" y="8" width="3" height="2" fill="#FFFFFF" />
          <rect x="4" y="10" width="3" height="2" fill="#FFFFFF" />
          {/* Tail up in joy */}
          <path d="M6,9 Q3,5 4,1" stroke="#D97706" strokeWidth="2.5" fill="none" />
        </g>
      ) : (
        /* WALKING CAT SPRITE (FRAME ANIMATED) */
        <g className={styles.catGroup}>
          {/* Body */}
          <rect x="6" y="8" width="13" height="7" rx="2" fill="#F59E0B" />
          <rect x="7" y="9" width="11" height="5" fill="#FBBF24" />
          {/* Stripes on back */}
          <rect x="9" y="8" width="1.5" height="4" fill="#D97706" />
          <rect x="13" y="8" width="1.5" height="4" fill="#D97706" />
          {/* Head */}
          <rect x="15" y="4" width="8" height="7" rx="2" fill="#F59E0B" />
          <rect x="16" y="5" width="6" height="5" fill="#FBBF24" />
          {/* Ears */}
          <polygon points="16,4 18,1 19,4" fill="#D97706" />
          <polygon points="20,4 21,1 23,4" fill="#D97706" />
          <polygon points="17,4 18,2 18.5,4" fill="#FCA5A5" />
          <polygon points="20.5,4 21,2 22,4" fill="#FCA5A5" />
          {/* Eyes */}
          <rect x="17" y="6" width="1.5" height="1.5" fill="#1E293B" />
          <rect x="20" y="6" width="1.5" height="1.5" fill="#1E293B" />
          <rect x="17" y="6" width="0.8" height="0.8" fill="#FFFFFF" />
          <rect x="20" y="6" width="0.8" height="0.8" fill="#FFFFFF" />
          {/* Pink Nose */}
          <rect x="19" y="8" width="1" height="1" fill="#EF4444" />
          {/* Whiskers */}
          <line x1="14" y1="7.5" x2="16" y2="8" stroke="#78350F" strokeWidth="0.6" />
          <line x1="21" y1="8" x2="23" y2="7.5" stroke="#78350F" strokeWidth="0.6" />

          {/* LEGS ANIMATION (4-Frame Walk cycle) */}
          {frame === 0 && (
            <>
              {/* Front right forward, Front left back, Back right back, Back left forward */}
              <rect x="18" y="15" width="2" height="4" fill="#FFFFFF" />
              <rect x="15" y="14" width="2" height="4" fill="#E5E7EB" />
              <rect x="6" y="15" width="2" height="4" fill="#FFFFFF" />
              <rect x="9" y="14" width="2" height="4" fill="#E5E7EB" />
              {/* Tail */}
              <path d="M6,10 Q2,8 3,4" stroke="#D97706" strokeWidth="2" fill="none" />
            </>
          )}
          {frame === 1 && (
            <>
              {/* Passing frame */}
              <rect x="17" y="15" width="2" height="4" fill="#FFFFFF" />
              <rect x="16" y="15" width="2" height="3.5" fill="#E5E7EB" />
              <rect x="7" y="15" width="2" height="4" fill="#FFFFFF" />
              <rect x="8" y="15" width="2" height="3.5" fill="#E5E7EB" />
              {/* Tail */}
              <path d="M6,10 Q1,9 2,5" stroke="#D97706" strokeWidth="2" fill="none" />
            </>
          )}
          {frame === 2 && (
            <>
              {/* Inverted stride */}
              <rect x="15" y="15" width="2" height="4" fill="#FFFFFF" />
              <rect x="18" y="14" width="2" height="4" fill="#E5E7EB" />
              <rect x="9" y="15" width="2" height="4" fill="#FFFFFF" />
              <rect x="6" y="14" width="2" height="4" fill="#E5E7EB" />
              {/* Tail */}
              <path d="M6,10 Q2,7 4,3" stroke="#D97706" strokeWidth="2" fill="none" />
            </>
          )}
          {frame === 3 && (
            <>
              {/* Passing frame back */}
              <rect x="16" y="15" width="2" height="3.5" fill="#FFFFFF" />
              <rect x="17" y="15" width="2" height="4" fill="#E5E7EB" />
              <rect x="8" y="15" width="2" height="3.5" fill="#FFFFFF" />
              <rect x="7" y="15" width="2" height="4" fill="#E5E7EB" />
              {/* Tail */}
              <path d="M6,10 Q2,8 3,4" stroke="#D97706" strokeWidth="2" fill="none" />
            </>
          )}
        </g>
      )}
    </svg>
  );
}
