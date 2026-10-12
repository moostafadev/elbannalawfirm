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
let instancePromise: Promise<ScrollRevealInstance> | null = null;
let flushScheduled = false;

const getInstance = (): Promise<ScrollRevealInstance> => {
  if (!instancePromise) {
    instancePromise = import("scrollreveal")
      .then((m) => {
        // `export =` interop: unwrap `.default` if present, otherwise use
        // the module object itself. The runtime decides; the types don't
        // have to model both cases.
        const factory = ((m as { default?: ScrollRevealFactory }).default ??
          m) as ScrollRevealFactory;
        return factory();
      })
      .catch((err) => {
        instancePromise = null; // allow retry after a failed load
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
    targets.forEach(({ selector, config }) => sr.reveal(selector, config));
  } catch {
    // swallow — don't let the timer path produce an unhandled rejection
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

export const cleanReveal = (element: HTMLElement): void => {
  void instancePromise?.then((sr) => sr.clean(element)).catch(() => undefined);
};
