"use client";

import { useEffect, useRef } from "react";

/** Rácsköz (px) – a „specifikációs” pontháló sűrűsége. */
const SPACING = 30;
/** Ekkora sugarú körben reagálnak a pontok az egérre (px). */
const RADIUS = 180;
/** A kattintásra induló hullám sebessége (px/s) és élettartama (s). */
const RIPPLE_SPEED = 700;
const RIPPLE_LIFE = 1.3;
/** Görgetési parallax: a rács lassabban mozog, mint a tartalom. */
const PARALLAX = 0.12;

type Ripple = { x: number; y: number; start: number };

function withAlpha(hex: string, alpha: number): string {
  const value = hex.replace("#", "");
  const full = value.length === 3 ? [...value].map((c) => c + c).join("") : value;
  const n = Number.parseInt(full, 16);
  if (Number.isNaN(n)) return `rgba(29, 117, 109, ${alpha})`;
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

/**
 * Teljes képernyős pontháló a tartalom mögött: az egér körül a pontok
 * felizzanak és szétnyílnak, kattintásra hullám fut végig a rácson.
 * Csökkentett mozgásnál statikus rács, érintőképernyőn csak a hullám.
 */
export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const colors = { dot: "#20384a", dotAlpha: 0.2, accent: "#1d756d" };
    const pointer = { x: -1e4, y: -1e4, targetX: -1e4, targetY: -1e4, visible: false };
    const ripples: Ripple[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    // A görgetési parallaxot a vászon CSS-eltolása adja (0 és −SPACING között), így görgetéskor
    // nem kell a teljes vásznat újrarajzolni és a GPU-ra feltölteni; ez Safariban szaggatott.
    let shift = 0;
    let shiftCycle = 0;

    function readColors() {
      const style = getComputedStyle(document.documentElement);
      colors.dot = style.getPropertyValue("--dot").trim() || colors.dot;
      colors.accent = style.getPropertyValue("--accent").trim() || colors.accent;
      colors.dotAlpha = Number(style.getPropertyValue("--dot-alpha")) || colors.dotAlpha;
    }

    function draw(now: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const motion = !reducedMotion.matches;
      const offsetX = (width % SPACING) / 2;
      // A mutató és a hullámok a nézethez kötöttek; a vászon `shift`-tel el van tolva.
      const pointerY = pointer.y - shift;

      if (motion && pointer.visible) {
        const aura = ctx.createRadialGradient(pointer.x, pointerY, 0, pointer.x, pointerY, 360);
        aura.addColorStop(0, withAlpha(colors.accent, 0.14));
        aura.addColorStop(1, withAlpha(colors.accent, 0));
        ctx.fillStyle = aura;
        ctx.fillRect(0, 0, width, height);
      }

      const activeRipples = ripples.map((ripple) => {
        const age = (now - ripple.start) / 1000;
        return {
          ...ripple,
          y: ripple.y - shift,
          radius: age * RIPPLE_SPEED,
          fade: 1 - age / RIPPLE_LIFE,
        };
      });

      for (let y = 0; y < height; y += SPACING) {
        for (let x = offsetX; x < width; x += SPACING) {
          const dx = x - pointer.x;
          const dy = y - pointerY;
          const distance = Math.hypot(dx, dy) || 1;

          let influence = motion && pointer.visible ? Math.max(0, 1 - distance / RADIUS) : 0;
          for (const ripple of activeRipples) {
            const rippleDistance = Math.hypot(x - ripple.x, y - ripple.y);
            const band = Math.max(0, 1 - Math.abs(rippleDistance - ripple.radius) / 46);
            influence = Math.max(influence, band * ripple.fade * 0.9);
          }

          if (influence <= 0.01) {
            ctx.globalAlpha = colors.dotAlpha;
            ctx.fillStyle = colors.dot;
            ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
            continue;
          }

          const eased = influence * influence * (3 - 2 * influence);
          const push = eased * 9;

          // A kurzor közeli csomópontok „kapcsolatot” kapnak, mint egy adatmodell entitásai.
          if (distance < RADIUS * 0.42 && pointer.visible && motion) {
            ctx.globalAlpha = eased * 0.35;
            ctx.strokeStyle = colors.accent;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointerY);
            ctx.lineTo(x + (dx / distance) * push, y + (dy / distance) * push);
            ctx.stroke();
          }

          ctx.globalAlpha = Math.min(1, colors.dotAlpha + eased * 0.9);
          ctx.fillStyle = colors.accent;
          ctx.beginPath();
          ctx.arc(
            x + (dx / distance) * push,
            y + (dy / distance) * push,
            0.9 + eased * 1.8,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }

    function tick(now: number) {
      frame = 0;
      // Az aura rugószerűen követi az egeret.
      pointer.x += (pointer.targetX - pointer.x) * 0.18;
      pointer.y += (pointer.targetY - pointer.y) * 0.18;
      while (ripples[0] && (now - ripples[0].start) / 1000 > RIPPLE_LIFE) ripples.shift();

      draw(now);

      const settling =
        Math.abs(pointer.targetX - pointer.x) > 0.5 || Math.abs(pointer.targetY - pointer.y) > 0.5;
      if (settling || ripples.length > 0) schedule();
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(tick);
    }

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight + SPACING;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      schedule();
    }

    /**
     * Görgetéskor csak a vászon eltolása változik. Újrarajzolás csak akkor kell, ha az eltolás
     * körbeért (ilyenkor a mutatóhoz kötött kiemelés a helyére ugrik), vagy hullám fut.
     */
    function onScroll() {
      if (!canvas) return;
      const travel = reducedMotion.matches ? 0 : window.scrollY * PARALLAX;
      shift = -(travel % SPACING);
      canvas.style.transform = `translate3d(0, ${shift}px, 0)`;
      const cycle = Math.floor(travel / SPACING);
      if (cycle !== shiftCycle || ripples.length > 0) {
        shiftCycle = cycle;
        if (pointer.visible || ripples.length > 0) schedule();
      }
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType === "touch" || reducedMotion.matches) return;
      if (!pointer.visible) {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
      }
      pointer.visible = true;
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
      schedule();
    }

    function onPointerDown(event: PointerEvent) {
      if (reducedMotion.matches) return;
      ripples.push({ x: event.clientX, y: event.clientY, start: performance.now() });
      if (ripples.length > 4) ripples.shift();
      schedule();
    }

    function onPointerLeave() {
      pointer.visible = false;
      schedule();
    }

    readColors();
    resize();
    onScroll();

    const themeObserver = new MutationObserver(() => {
      readColors();
      schedule();
    });
    themeObserver.observe(document.documentElement, { attributeFilter: ["data-theme"] });

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    const onMotionChange = () => {
      onScroll();
      schedule();
    };
    reducedMotion.addEventListener("change", onMotionChange);

    return () => {
      cancelAnimationFrame(frame);
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      // Egy rácsköznyivel (SPACING) magasabb a nézetnél, hogy az eltolás alatt se látsszon a széle.
      className="pointer-events-none fixed top-0 left-0 -z-10 h-[calc(100%+30px)] w-full will-change-transform"
    />
  );
}
