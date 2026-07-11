import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let frameCallback: ((index: number) => void) | null = null;
let frameCount = 0;
let frameScrollTimeline: gsap.core.Timeline | null = null;
let lastSyncedIdx = -1;

export function registerFrameSequenceLength(count: number) {
  frameCount = Math.max(0, count);
}

export function registerScrollFrameCallback(cb: (index: number) => void) {
  frameCallback = cb;
  lastSyncedIdx = -1;
}

export function unregisterScrollFrameCallback() {
  ScrollTrigger.getById("scrollFrameSeq")?.kill();
  frameScrollTimeline?.kill();
  frameScrollTimeline = null;
  frameCallback = null;
  frameCount = 0;
  lastSyncedIdx = -1;
}

/**
 * With ScrollSmoother, polling from `gsap.ticker` can read stale `ScrollTrigger` state.
 * `onUpdate(self)` delivers the correct scrub progress; we fall back to scroll math if progress
 * stays at 0 while the scroll position is inside the trigger range.
 */
function syncFrameFromScrollTrigger(self?: ScrollTrigger) {
  if (!frameCallback || frameCount < 1) return;
  const max = frameCount - 1;

  const st = self ?? frameScrollTimeline?.scrollTrigger ?? ScrollTrigger.getById("scrollFrameSeq");
  if (!st) return;

  let p = self
    ? self.progress
    : (frameScrollTimeline?.progress() ?? st.progress);
  if (!Number.isFinite(p)) p = 0;

  const start = st.start;
  const end = st.end;
  const denom = end - start;
  if (denom > 0 && Number.isFinite(start) && Number.isFinite(end)) {
    const cur = typeof st.scroll === "function" ? st.scroll() : 0;
    const pScroll = (cur - start) / denom;
    if (Number.isFinite(pScroll) && Math.abs(p) < 1e-6 && Math.abs(pScroll) > 1e-6) {
      p = pScroll;
    }
  }

  p = Math.max(0, Math.min(1, p));
  if (!Number.isFinite(p)) p = 0;

  const idx = Math.round(p * max);
  const clamped = Math.min(max, Math.max(0, idx));
  if (clamped === lastSyncedIdx) return;
  lastSyncedIdx = clamped;
  frameCallback(clamped);
}

export function createScrollFrameScrollTrigger() {
  ScrollTrigger.getById("scrollFrameSeq")?.kill();
  frameScrollTimeline?.kill();
  frameScrollTimeline = null;

  if (frameCount < 1) return;

  lastSyncedIdx = -1;

  const meter = document.querySelector(".frame-scroll-meter");
  frameScrollTimeline = gsap.timeline({
    scrollTrigger: {
      id: "scrollFrameSeq",
      trigger: ".landing-section",
      start: "top top",
      endTrigger: ".whatIDO",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        syncFrameFromScrollTrigger(self);
      },
    },
  });

  if (meter) {
    frameScrollTimeline.fromTo(
      meter,
      { x: 0 },
      { x: 0.001, duration: 1, ease: "none" }
    );
  } else {
    const proxy = { _: 0 };
    frameScrollTimeline.to(proxy, { _: 1, duration: 1, ease: "none" });
  }

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    syncFrameFromScrollTrigger(
      frameScrollTimeline?.scrollTrigger ?? undefined
    );
  });
}
