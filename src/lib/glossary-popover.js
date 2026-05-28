import { computePosition, flip, offset, shift } from "@floating-ui/dom";

export const POPOVER_ID = "glossary-popover";
export function footnoteId(slug) {
  return `def-${slug}`;
}

const POPOVER_GAP = 8;

let trigger = null;
let rafId = null;

function update() {
  if (!trigger) return;
  const popover = document.getElementById(POPOVER_ID);
  if (!popover) return;
  computePosition(trigger, popover, {
    placement: "bottom-start",
    middleware: [offset(POPOVER_GAP), flip(), shift({ padding: POPOVER_GAP })],
  }).then(({ x, y }) => {
    Object.assign(popover.style, { left: `${x}px`, top: `${y}px` });
  });
}

function scheduleUpdate() {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(() => {
    rafId = null;
    update();
  });
}

function onToggle(event) {
  if (event.newState === "open") {
    update();
    window.addEventListener("scroll", scheduleUpdate);
    window.addEventListener("resize", scheduleUpdate);
  } else {
    trigger = null;
    if (rafId !== null) cancelAnimationFrame(rafId);
    window.removeEventListener("scroll", scheduleUpdate);
    window.removeEventListener("resize", scheduleUpdate);
  }
}

export function setupGlossaryPopover() {
  if (typeof document === "undefined") return;
  const popover = document.getElementById(POPOVER_ID);
  if (popover) popover.addEventListener("toggle", onToggle);
}

export function openGlossaryPopover(event, slug) {
  if (typeof document === "undefined") return;
  const popover = document.getElementById(POPOVER_ID);
  const footnote = document.getElementById(footnoteId(slug));
  if (!popover || !footnote || typeof popover.showPopover !== "function")
    return;
  event.preventDefault();
  if (popover.matches(":popover-open")) {
    popover.hidePopover();
    return;
  }
  popover.innerHTML = footnote.innerHTML;
  trigger = event.currentTarget;
  popover.showPopover();
}

export function closeGlossaryPopover() {
  if (typeof document === "undefined") return;
  const popover = document.getElementById(POPOVER_ID);
  if (popover?.matches(":popover-open")) popover.hidePopover();
}
