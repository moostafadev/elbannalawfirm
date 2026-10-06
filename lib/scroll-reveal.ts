type ScrollRevealFactory = (typeof import("scrollreveal"))["default"];
type ScrollRevealInstance = ReturnType<ScrollRevealFactory>;

export interface RevealConfig {
  origin: "top" | "bottom" | "left" | "right";
  distance: string;
  duration: number;
  interval: number;
  reset: boolean;
}

const pending = new Map<string, RevealConfig>();
let instancePromise: Promise<ScrollRevealInstance> | null = null;
let flushScheduled = false;

const getInstance = (): Promise<ScrollRevealInstance> => {
  instancePromise ??= import("scrollreveal").then((module) => module.default());
  return instancePromise;
};

const flush = async () => {
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

  const sr = await getInstance();

  targets.forEach(({ selector, config }) => sr.reveal(selector, config));
};

export const scheduleReveal = (name: string, config: RevealConfig) => {
  if (!pending.has(name)) pending.set(name, config);
  if (flushScheduled) return;

  flushScheduled = true;
  setTimeout(flush, 0);
};

export const cleanReveal = (element: HTMLElement) => {
  instancePromise?.then((sr) => sr.clean(element)).catch(() => undefined);
};
