"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "@/app/utilities/components/code-block";

type TranslateClass =
  | "translate-x-0"
  | "translate-x-1"
  | "translate-x-2"
  | "translate-x-4"
  | "translate-x-8"
  | "-translate-x-1"
  | "-translate-x-2"
  | "-translate-y-0"
  | "translate-y-1"
  | "translate-y-2"
  | "translate-y-4"
  | "translate-y-8"
  | "-translate-y-1"
  | "-translate-y-2";

type DurationClass =
  | "duration-75"
  | "duration-150"
  | "duration-300"
  | "duration-500";
type EasingClass = "ease-linear" | "ease-in" | "ease-out" | "ease-in-out";

export default function TranslatePage() {
  const [copied, setCopied] = useState<string | null>(null);

  // Playground state
  const [translate, setTranslate] = useState<TranslateClass>("translate-x-0");
  const [duration, setDuration] = useState<DurationClass>("duration-150");
  const [easing, setEasing] = useState<EasingClass>("ease-in-out");
  const [hoverOnly, setHoverOnly] = useState(false);

  // Map classes to pixel/percent approximations for inline preview
  const translateMap: Record<TranslateClass, string> = {
    "translate-x-0": "0px",
    "translate-x-1": "4px",
    "translate-x-2": "8px",
    "translate-x-4": "16px",
    "translate-x-8": "32px",
    "-translate-x-1": "-4px",
    "-translate-x-2": "-8px",
    "-translate-y-1": "-4px",
    "-translate-y-2": "-8px",
    "-translate-y-0": "0px",
    "translate-y-0": "0px",
    "translate-y-1": "4px",
    "translate-y-2": "8px",
    "translate-y-4": "16px",
    "translate-y-8": "32px",
  };

  const utilities: { cls: TranslateClass; desc: string }[] = [
    { cls: "translate-x-0", desc: "No shift" },
    { cls: "translate-x-1", desc: "Tiny nudge — 4px" },
    { cls: "translate-x-2", desc: "Small nudge — 8px" },
    { cls: "translate-x-4", desc: "Clear offset — 16px" },
    { cls: "translate-x-8", desc: "Large offset — 32px" },
    { cls: "-translate-x-1", desc: "Tiny left nudge" },
    { cls: "-translate-x-2", desc: "Small left nudge" },
    { cls: "translate-y-1", desc: "Tiny down nudge" },
    { cls: "translate-y-2", desc: "Small down nudge" },
    { cls: "translate-y-4", desc: "Down offset — 16px" },
    { cls: "translate-y-8", desc: "Large down offset — 32px" },
    { cls: "-translate-y-1", desc: "Tiny up nudge" },
    { cls: "-translate-y-2", desc: "Small up nudge" },
  ];

  const durations: DurationClass[] = [
    "duration-75",
    "duration-150",
    "duration-300",
    "duration-500",
  ];
  const easings: EasingClass[] = [
    "ease-linear",
    "ease-in",
    "ease-out",
    "ease-in-out",
  ];

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(null), 1400);
    } catch {
      setCopied(null);
    }
  };

  const playgroundMarkup = `<div class="transform ${
    hoverOnly ? "hover:translate-x-2" : ""
  } ${duration} ${easing}">\n  Preview content\n</div>`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-foreground">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Transform — Translate</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Translation (translate-x / translate-y) is useful for motion that
              doesn't affect layout — slide-ins, nudges, tooltips and stacked
              carousels. Prefer transform-based translation for smooth
              GPU-accelerated motion.
            </p>
          </div>

          {/* Quick guidance */}
          <section className="space-y-4 border-t border-border pt-8">
            <h2 className="text-2xl font-semibold">Quick guidance</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded bg-card/20">
                <div className="font-semibold">Entrance patterns</div>
                <div className="text-sm text-muted-foreground mt-2">
                  Use translate-y (down) or translate-x (left/right) with
                  opacity to create clear entrance motion for toasts, drawers
                  and modals.
                </div>
              </div>

              <div className="p-4 rounded bg-card/20">
                <div className="font-semibold">Micro-nudges</div>
                <div className="text-sm text-muted-foreground mt-2">
                  Tiny translations (4–8px) work well for hover nudges and small
                  adjustments. Keep them subtle.
                </div>
              </div>

              <div className="p-4 rounded bg-card/20">
                <div className="font-semibold">Performance</div>
                <div className="text-sm text-muted-foreground mt-2">
                  Translate uses the GPU—avoid animating layout properties.
                  Combine with will-change when necessary.
                </div>
              </div>
            </div>
          </section>

          {/* Utilities */}
          <section className="space-y-6 border-t border-border pt-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Translate utilities</h2>
              <p className="text-muted-foreground">
                Click a utility to copy the class.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {utilities.map((u) => (
                <button
                  key={u.cls}
                  onClick={() => copyToClipboard(u.cls)}
                  className="text-left border border-border rounded-lg p-4 hover:bg-card/50 transition flex flex-col group cursor-pointer"
                  aria-label={`Copy ${u.cls}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-14 h-10 rounded-sm bg-slate-700 text-white flex items-center justify-center"
                        style={{
                          transform: `translate(${
                            translateMap[u.cls] ?? "0px"
                          })`,
                        }}
                        aria-hidden
                      >
                        ↔
                      </div>

                      <div>
                        <code className="text-black text-sm font-mono text-accent font-semibold">
                          {u.cls}
                        </code>
                        <div className="text-xs text-muted-foreground">
                          {u.desc}
                        </div>
                      </div>
                    </div>

                    <span className="text-xs text-muted-foreground">
                      {copied === u.cls ? "Copied" : "Copy"}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Playground */}
          <section className="space-y-4 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Interactive playground</h2>
            <p className="text-muted-foreground">
              Choose a translate class, timing and whether it should be
              hover-only.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-3 md:col-span-1">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Translate
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {utilities.map((u) => (
                      <button
                        key={u.cls}
                        onClick={() => setTranslate(u.cls)}
                        className={`px-3 py-1 rounded border text-sm ${
                          translate === u.cls
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border"
                        }`}
                      >
                        {u.cls.replace("translate-", "").replace("-", "-")}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Duration
                  </label>
                  <div className="flex gap-2">
                    {durations.map((d) => (
                      <button
                        key={d}
                        onClick={() => setDuration(d)}
                        className={`px-3 py-1 rounded border text-sm ${
                          duration === d
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border"
                        }`}
                      >
                        {d.replace("duration-", "")}ms
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Easing
                  </label>
                  <div className="flex gap-2">
                    {easings.map((e) => (
                      <button
                        key={e}
                        onClick={() => setEasing(e)}
                        className={`px-3 py-1 rounded border text-sm ${
                          easing === e
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border"
                        }`}
                      >
                        {e.replace("ease-", "")}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Extras
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setHoverOnly((v) => !v)}
                      className={`px-3 py-1 rounded border text-sm ${
                        hoverOnly
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-border"
                      }`}
                    >
                      Hover-only
                    </button>

                    <button
                      onClick={() =>
                        copyToClipboard(
                          `${translate} ${duration} ${easing} ${
                            hoverOnly ? "hover-only" : ""
                          }`
                        )
                      }
                      className="px-3 py-1 rounded border text-sm border-border cursor-pointer"
                    >
                      Copy classes
                    </button>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="md:col-span-2 space-y-3">
                <div className="border border-border rounded-lg p-4 bg-card/30">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">Playground</div>
                      <div className="text-xs text-muted-foreground">
                        Live preview
                      </div>
                    </div>

                    <div className="flex gap-2 items-center">
                      <div className="text-xs text-muted-foreground">
                        Markup
                      </div>
                      <button
                        onClick={() => copyToClipboard(playgroundMarkup)}
                        className="text-xs px-3 py-1 rounded bg-muted/10 hover:bg-muted/20 cursor-pointer"
                      >
                        Copy markup
                      </button>
                    </div>
                  </div>

                  <div className="rounded p-4 bg-slate-800">
                    <div
                      className={`mb-4 transform ${
                        hoverOnly ? `hover:${translate}` : translate
                      } ${duration} ${easing} p-6 bg-slate-700 text-slate-100 inline-block`}
                      style={{
                        transform: `translate(${
                          translateMap[translate] ?? "0px"
                        })`,
                      }}
                    >
                      <strong className="block">Translate preview</strong>
                      <span className="text-sm">{translate}</span>
                    </div>

                    <div className="flex gap-3 flex-wrap items-center">
                      <div
                        className={`w-16 h-16 rounded ${
                          hoverOnly ? `hover:${translate}` : translate
                        } flex items-center justify-center bg-slate-700 text-white`}
                        style={{
                          transform: `translate(${
                            translateMap[translate] ?? "0px"
                          })`,
                        }}
                      >
                        AV
                      </div>

                      <button
                        className={`px-4 py-2 ${
                          hoverOnly ? `hover:${translate}` : translate
                        } rounded bg-blue-600 text-white`}
                        style={{
                          transform: `translate(${
                            translateMap[translate] ?? "0px"
                          })`,
                        }}
                      >
                        Primary
                      </button>

                      <div
                        className={`px-3 py-1 ${
                          hoverOnly ? `hover:${translate}` : translate
                        } rounded bg-slate-700 text-sm`}
                        style={{
                          transform: `translate(${
                            translateMap[translate] ?? "0px"
                          })`,
                        }}
                      >
                        Badge
                      </div>

                      <div className="flex items-center gap-2 ml-2">
                        <div
                          className="w-10 h-10 rounded-sm"
                          style={{
                            transform: `translate(${
                              translateMap[translate] ?? "0px"
                            })`,
                            background: "#111827",
                            border: "2px solid rgba(148,163,184,0.2)",
                          }}
                          aria-hidden
                        />
                        <div className="text-sm text-muted-foreground">
                          <div>{translate}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-3">
                    Tip: combine translate with opacity for entrance/exit motion
                    — translate alone feels like a reposition.
                  </p>

                  <CodeBlock code={playgroundMarkup} language="jsx" />
                </div>
              </div>
            </div>
          </section>

          {/* Real-world examples */}
          <section className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Real-World Examples</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Drawer / sheet slide in */}
              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Drawer / sheet — slide in
                    </h3>
                    <div className="text-xs text-muted-foreground">
                      Use{" "}
                      <code className="bg-slate-700 px-1 rounded">
                        translate-x-full
                      </code>{" "}
                      or negative translate to animate off-canvas drawers. Pair
                      with focus trapping and aria-hidden toggles.
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<div class=\"fixed right-0 top-0 h-full transform translate-x-full transition duration-300\">Drawer</div>`
                      )
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="text-white bg-slate-800 rounded p-3">
                  <div className="p-4 bg-slate-700">Main content</div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<div class="fixed right-0 top-0 h-full transform translate-x-full transition duration-300">Drawer</div>`}
                  />
                </div>
              </article>

              {/* Toast slide from top */}
              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Toast — slide from top
                    </h3>
                    <div className="text-xs text-muted-foreground">
                      Translate-y negative values combined with opacity make
                      smooth toast entrances.
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<div class=\"transform -translate-y-4 transition duration-200 opacity-0 animate-in\">Toast</div>`
                      )
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="text-white bg-slate-800 rounded p-3">
                  <div className="rounded-md p-3 bg-slate-700 transform -translate-y-4">
                    Toast preview
                  </div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<div class="transform -translate-y-4">Toast</div>`}
                  />
                </div>
              </article>

              {/* Dropdown offset */}
              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Dropdown — subtle offset
                    </h3>
                    <div className="text-xs text-muted-foreground">
                      Use tiny translate-y (4px) to offset dropdowns from their
                      trigger so they feel layered and avoid overlap with the
                      trigger element.
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<div class=\"mt-2 transform translate-y-1\">Dropdown menu</div>`
                      )
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="text-white bg-slate-800 rounded p-3">
                  <div className="rounded-md p-3 bg-slate-700 transform translate-y-1">
                    Menu
                  </div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<div class="mt-2 transform translate-y-1">Dropdown menu</div>`}
                  />
                </div>
              </article>

              {/* Carousel item shift */}
              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Carousel — slide items
                    </h3>
                    <div className="text-xs text-muted-foreground">
                      Translate-x is useful for moving carousel track — use
                      transforms with requestAnimationFrame for complex
                      interactions.
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<div class=\"transform translate-x-8\">Slide item</div>`
                      )
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="text-white bg-slate-800 rounded p-3 flex gap-3 overflow-hidden">
                  <div className="min-w-[140px] p-3 rounded bg-slate-700 transform translate-x-4">
                    Item 1
                  </div>
                  <div className="min-w-[140px] p-3 rounded bg-slate-700">
                    Item 2
                  </div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<div class="transform translate-x-8">Slide item</div>`}
                  />
                </div>
              </article>

              {/* Tooltip entrance */}
              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Tooltip — entrance
                    </h3>
                    <div className="text-xs text-muted-foreground">
                      Combine small translate-y with opacity for subtle tooltip
                      entrances. Provide aria-describedby and keyboard focus
                      support.
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<div class=\"transform translate-y-1 opacity-0 animate-in\">Tooltip</div>`
                      )
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="text-white bg-slate-800 rounded p-3">
                  <div className="rounded-md p-2 bg-slate-700 transform translate-y-1">
                    Tooltip preview
                  </div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<div class="transform translate-y-1">Tooltip</div>`}
                  />
                </div>
              </article>

              {/* Nudge for in-page feedback */}
              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Nudge on invalid input
                    </h3>
                    <div className="text-xs text-muted-foreground">
                      A small left-right shake can be implemented with
                      translate-x and keyframes to indicate invalid input—use
                      sparingly.
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<div class=\"animate-shake\">Invalid</div>`
                      )
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="text-white bg-slate-800 rounded p-3">
                  <div className="rounded-md p-3 bg-slate-700">Field</div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`/* CSS: @keyframes shake { 0%{ transform: translateX(0) } 25%{ transform: translateX(-4px)} 75%{ transform: translateX(4px)} 100%{ transform: translateX(0)} } .animate-shake { animation: shake 300ms ease } */`}
                  />
                </div>
              </article>

              <div className="md:col-span-2 text-sm text-muted-foreground">
                <strong>Accessibility & UX notes:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>
                    Combine translate with opacity for clear entrance/exit
                    motion and avoid sudden jumps.
                  </li>
                  <li>
                    Avoid large translations for critical content — test at
                    different viewport sizes.
                  </li>
                  <li>
                    Respect{" "}
                    <code className="bg-slate-700 px-1 rounded">
                      prefers-reduced-motion
                    </code>{" "}
                    — provide a non-animated fallback.
                  </li>
                  <li>
                    When translating off-screen content (drawers/toasts), ensure
                    focus is managed and screen readers are notified.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tips */}
          <section className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold">Tips & best practices</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <strong>Combine with opacity:</strong> translate + opacity feels
                natural for entrance/exit motions.
              </li>
              <li>
                <strong>Small is subtle:</strong> prefer 4–16px for nudges;
                reserve 32px+ for full slide patterns (drawers/carousels).
              </li>
              <li>
                <strong>Performance:</strong> translate is GPU-friendly—avoid
                animating layout properties.
              </li>
              <li>
                <strong>Accessibility:</strong> ensure keyboard focus and ARIA
                announcements for off-canvas content.
              </li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
