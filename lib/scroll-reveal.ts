import type ScrollReveal from "scrollreveal";

type ScrollRevealFactory = typeof ScrollReveal;
type ScrollRevealInstance = ReturnType<ScrollRevealFactory>;

export interface RevealConfig {
  origin: "top" | "bottom" | "left" | "right";
  distance: string;
  duration: number;
  interval: number;
  reset: boolean;
}

const pending = new Map<string, RevealConfig>();
let srInstance: ScrollRevealInstance | null = null;
let instancePromise: Promise<ScrollRevealInstance> | null = null;
let flushScheduled = false;

const getInstance = (): Promise<ScrollRevealInstance> => {
  if (srInstance) return Promise.resolve(srInstance);
  if (!instancePromise) {
    instancePromise = import("scrollreveal")
      .then((m) => {
        const factory = ((m as { default?: ScrollRevealFactory }).default ??
          m) as ScrollRevealFactory;
        srInstance = factory();
        return srInstance;
      })
      .catch((err) => {
        instancePromise = null;
        throw err;
      });
  }
  return instancePromise;
};

const flush = async (): Promise<void> => {
  flushScheduled = false;

  const batch = Array.from(pending);
  pending.clear();

  const targets = batch
    .map(([name, config]) => ({
      config,
      selector: `.${name}:not([data-sr-id])`,
    }))
    .filter(({ selector }) => document.querySelector(selector) !== null);

  if (targets.length === 0) return;

  try {
    const sr = await getInstance();
    targets.forEach(({ selector, config }) => {
      try {
        sr.reveal(selector, config);
      } catch {
        /* ignore if element disappeared mid-reveal */
      }
    });
  } catch {
    /* swallow — don't let the timer path produce an unhandled rejection */
  }
};

export const scheduleReveal = (name: string, config: RevealConfig): void => {
  if (!pending.has(name)) pending.set(name, config);
  if (flushScheduled) return;

  flushScheduled = true;
  setTimeout(() => {
    void flush();
  }, 0);
};

/**
 * Synchronous cleanup — critical to prevent stale elements from being
 * processed by ScrollReveal on the next scroll/resize tick.
 */
export const cleanReveal = (element: HTMLElement | null): void => {
  if (!element || !srInstance) return;
  try {
    srInstance.clean(element);
  } catch {
    /* element already detached / cleaned — safe to ignore */
  }
};
