import { useEffect, useRef } from "react";
import { useLoading } from "../../context/LoadingProvider";
import { setCharTimeline, setAllTimeline } from "../utils/GsapScroll";
import {
  registerFrameSequenceLength,
  registerScrollFrameCallback,
  unregisterScrollFrameCallback,
} from "../utils/scrollFrameScroll";
import refreshScrollTimelinesAfterResize from "./scrollFrameResize";
import { loadAllFrameImages } from "../../config/scrollFrames";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function drawImageContain(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number
) {
  ctx.clearRect(0, 0, cw, ch);
  if (!img.complete || img.naturalWidth === 0) {
    ctx.fillStyle = "#0a0e17";
    ctx.fillRect(0, 0, cw, ch);
    return;
  }
  const ir = img.naturalWidth / img.naturalHeight;
  const cr = cw / ch;
  let dw: number;
  let dh: number;
  let dx: number;
  let dy: number;
  if (ir > cr) {
    dh = ch;
    dw = dh * ir;
    dx = (cw - dw) / 2;
    dy = 0;
  } else {
    dw = cw;
    dh = dw / ir;
    dx = 0;
    dy = (ch - dh) / 2;
  }
  ctx.drawImage(img, dx, dy, dw, dh);
}

function pickFrame(imgs: HTMLImageElement[], idx: number): HTMLImageElement | null {
  const max = imgs.length - 1;
  const i = Math.min(max, Math.max(0, idx));
  if (imgs[i]?.complete && imgs[i].naturalWidth > 0) return imgs[i];
  for (let j = i; j >= 0; j--) {
    if (imgs[j]?.complete && imgs[j].naturalWidth > 0) return imgs[j];
  }
  for (let j = i + 1; j < imgs.length; j++) {
    if (imgs[j]?.complete && imgs[j].naturalWidth > 0) return imgs[j];
  }
  return null;
}

const Scene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);
  const { setLoading } = useLoading();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cancelled = false;

    const drawFrame = (idx: number) => {
      const imgs = framesRef.current;
      if (!imgs.length) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const img = pickFrame(imgs, idx);
      if (!img) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = "#0a0e17";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        return;
      }
      drawImageContain(ctx, img, w, h);
    };

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(frameIndexRef.current);
    };

    const finishSetup = (count: number) => {
      if (cancelled) return;
      registerFrameSequenceLength(count);
      registerScrollFrameCallback((i) => {
        frameIndexRef.current = i;
        drawFrame(i);
      });
      resizeCanvas();
      document.body.classList.add("character-loaded");
      if (!cancelled) {
        setLoading(100);
        setCharTimeline();
        setAllTimeline();
      }
    };

    const run = async () => {
      setLoading(5);
      const imgs = await loadAllFrameImages((pct) => {
        if (!cancelled) setLoading(Math.min(99, pct));
      });
      if (cancelled) return;
      framesRef.current = imgs;
      finishSetup(imgs.length);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const ro = new ResizeObserver(() => resizeCanvas());
    ro.observe(container);
    window.addEventListener("resize", refreshScrollTimelinesAfterResize);

    run();

    return () => {
      cancelled = true;
      ro.disconnect();
      window.removeEventListener("resize", refreshScrollTimelinesAfterResize);
      unregisterScrollFrameCallback();
      document.body.classList.remove("character-loaded");
    };
  }, [setLoading]);

  return (
    <div className="character-container">
      <div className="character-model" ref={containerRef}>
        <div className="character-model-scroll">
          <div className="frame-scroll-meter" aria-hidden />
          <div className="character-frame-mask">
            <div className="character-frame-feather" aria-hidden />
            <canvas
              ref={canvasRef}
              className="character-frame-canvas"
              aria-hidden
            />
          </div>
          <div className="character-rim" />
        </div>
      </div>
    </div>
  );
};

export default Scene;
