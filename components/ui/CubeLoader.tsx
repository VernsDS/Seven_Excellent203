'use client'

import React from 'react'

/**
 * CubeLoader ReactBits, diadaptasi ke palet Seven Excellent:
 * coral / sky / sun di atas linen (bukan cyan/purple/indigo di gelap),
 * teks Indonesia, dan tetap animasi penuh kecuali reduced-motion aktif.
 */
export default function CubeLoader() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-12 p-12 perspective-container">

      {/* 3D Scene Wrapper */}
      <div className="relative flex h-24 w-24 items-center justify-center preserve-3d">

        {/* THE SPINNING CUBE CONTAINER */}
        <div className="animate-cube-spin relative h-full w-full preserve-3d">

          {/* Internal Core (The energy source) */}
          <div className="animate-pulse-fast absolute inset-0 m-auto h-8 w-8 rounded-full bg-white blur-md shadow-[0_0_40px_rgba(255,255,255,0.9)]" />

          {/* Front */}
          <div className="side-wrapper front">
            <div className="face bg-[rgb(255_107_74_/_0.10)] border-2 border-coral shadow-[0_0_15px_rgba(255,107,74,0.45)]" />
          </div>

          {/* Back */}
          <div className="side-wrapper back">
            <div className="face bg-[rgb(61_182_242_/_0.10)] border-2 border-sky shadow-[0_0_15px_rgba(61,182,242,0.45)]" />
          </div>

          {/* Right */}
          <div className="side-wrapper right">
            <div className="face bg-[rgb(255_212_71_/_0.10)] border-2 border-sun shadow-[0_0_15px_rgba(255,212,71,0.5)]" />
          </div>

          {/* Left */}
          <div className="side-wrapper left">
            <div className="face bg-[rgb(255_107_74_/_0.10)] border-2 border-coral shadow-[0_0_15px_rgba(255,107,74,0.45)]" />
          </div>

          {/* Top */}
          <div className="side-wrapper top">
            <div className="face bg-[rgb(61_182_242_/_0.10)] border-2 border-sky shadow-[0_0_15px_rgba(61,182,242,0.45)]" />
          </div>

          {/* Bottom */}
          <div className="side-wrapper bottom">
            <div className="face bg-[rgb(255_212_71_/_0.10)] border-2 border-sun shadow-[0_0_15px_rgba(255,212,71,0.5)]" />
          </div>
        </div>

        {/* Floor Shadow */}
        <div className="animate-shadow-breathe absolute -bottom-20 h-8 w-24 rounded-[100%] bg-[rgb(43_38_32_/_0.30)] blur-xl" />
      </div>

      {/* Loading Text */}
      <div className="mt-2 flex flex-col items-center gap-1">
        <h3 className="font-display text-sm font-bold tracking-[0.3em] text-accent-strong uppercase">
          Memuat Arsip 7E
        </h3>
        <p className="text-xs text-muted">
          Menyiapkan arsip kelas, sebentar ya…
        </p>
      </div>

      <style jsx>{`
        .perspective-container {
          perspective: 1200px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        @keyframes cubeSpin {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }

        @keyframes breathe {
          0%, 100% { transform: translateZ(48px); opacity: 0.8; }
          50% { transform: translateZ(80px); opacity: 0.4; border-color: rgba(255,255,255,0.85); }
        }

        @keyframes pulse-fast {
          0%, 100% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
        }

        @keyframes shadow-breathe {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.5); opacity: 0.2; }
        }

        .animate-cube-spin {
          animation: cubeSpin 8s linear infinite;
        }

        .animate-pulse-fast {
          animation: pulse-fast 2s ease-in-out infinite;
        }

        .animate-shadow-breathe {
          animation: shadow-breathe 3s ease-in-out infinite;
        }

        .side-wrapper {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
        }

        .face {
          width: 100%;
          height: 100%;
          position: absolute;
          animation: breathe 3s ease-in-out infinite;
          backdrop-filter: blur(2px);
        }

        .front  { transform: rotateY(0deg); }
        .back   { transform: rotateY(180deg); }
        .right  { transform: rotateY(90deg); }
        .left   { transform: rotateY(-90deg); }
        .top    { transform: rotateX(90deg); }
        .bottom { transform: rotateX(-90deg); }

        @media (prefers-reduced-motion: reduce) {
          html:not(.motion-forced) .animate-cube-spin,
          html:not(.motion-forced) .animate-pulse-fast,
          html:not(.motion-forced) .animate-shadow-breathe,
          html:not(.motion-forced) .face {
            animation: none;
          }
          html:not(.motion-forced) .face {
            transform: none;
          }
        }
      `}</style>
    </div>
  )
}
