import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setCharTimeline, setAllTimeline } from "../utils/GsapScroll";

export default function refreshScrollTimelinesAfterResize() {
  const workTrigger = ScrollTrigger.getById("work");
  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger !== workTrigger) {
      trigger.kill();
    }
  });
  setCharTimeline();
  setAllTimeline();
}
