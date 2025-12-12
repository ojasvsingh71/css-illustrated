"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "@/app/utilities/components/code-block";

type SkewClass =
  | "skew-x-0"
  | "skew-x-1"
  | "skew-x-2"
  | "skew-x-6"
  | "-skew-x-1"
  | "-skew-x-2"
  | "-skew-x-6"
  | "skew-y-0"
  | "skew-y-1"
  | "skew-y-2"
  | "skew-y-6"
  | "-skew-y-1"
  | "-skew-y-2"
  | "-skew-y-6";

type DurationClass =
  | "duration-75"
  | "duration-150"
  | "duration-300"
  | "duration-500";
type EasingClass = "ease-linear" | "ease-in" | "ease-out" | "ease-in-out";

export default function SkewPage() {
  const [copied, setCopied] = useState<string | null>(null);

  // Playground state
  const [skew, setSkew] = useState<SkewClass>("skew-x-0");
  const [duration, setDuration] = useState<DurationClass>("duration-150");
  const [easing, setEasing] = useState<EasingClass>("ease-in-out");
  const [hoverOnly, setHoverOnly] = useState(false);

  const skewMap: Record<SkewClass, number> = {
    "skew-x-0": 0,
    "skew-x-1": 1,
    "skew-x-2": 2,
    "skew-x-6": 6,
    "-skew-x-1": -1,
    "-skew-x-2": -2,
    "-skew-x-6": -6,
    "skew-y-0": 0,
    "skew-y-1": 1,
    "skew-y-2": 2,
    "skew-y-6": 6,
    "-skew-y-1": -1,
    "-skew-y-2": -2,
    "-skew-y-6": -6,
  };

  const utilities: { cls: SkewClass; desc: string }[] = [
    { cls: "skew-x-0", desc: "No skew — baseline" },
    { cls: "skew-x-1", desc: "Very subtle skew (1°) — tactile accent" },
    { cls: "skew-x-2", desc: "Subtle skew (2°) — badge/label use" },
    { cls: "skew-x-6", desc: "Noticeable skew (6°) — decorative" },
    { cls: "-skew-x-1", desc: "Tiny negative skew — visual balance" },
    { cls: "-skew-x-2", desc: "Negative skew (2°) — subtle counter-skew" },
    { cls: "-skew-x-6", desc: "Decorative negative skew — collage" },
    { cls: "skew-y-1", desc: "Vertical micro-skew (1°) — small tilt" },
    { cls: "skew-y-2", desc: "Vertical skew (2°) — decorative" },
    { cls: "skew-y-6", desc: "Vertical decorative skew — playful layouts" },
    { cls: "-skew-y-1", desc: "Negative vertical micro-skew" },
    { cls: "-skew-y-2", desc: "Negative vertical skew" },
    { cls: "-skew-y-6", desc: "Negative vertical decorative skew" },
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
    hoverOnly ? `hover:${skew}` : skew
  } ${duration} ${easing}">
  Preview content
</div>`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-foreground">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Transform — Skew</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Skew introduces slanted geometry that adds personality and motion.
              Use it sparingly for accents — subtle skews imply tactility, while
              stronger skews create playful, collage-like compositions.
            </p>
          </div>

          {/* At-a-glance guidance */}
          <section className="space-y-4 border-t border-border pt-8">
            <h2 className="text-2xl font-semibold">Quick guidance</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded bg-card/20">
                <div className="font-semibold">When to skew</div>
                <div className="text-sm text-muted-foreground mt-2">
                  Use very small skews (1–2°) for micro-accents (badges, icons).
                  Use larger skews (6°) only for decorative collage or hero
                  elements.
                </div>
              </div>

              <div className="p-4 rounded bg-card/20">
                <div className="font-semibold">Avoid on text</div>
                <div className="text-sm text-muted-foreground mt-2">
                  Don't skew long paragraphs or UI controls that require precise
                  reading. Skew readable text only in small, decorative labels.
                </div>
              </div>

              <div className="p-4 rounded bg-card/20">
                <div className="font-semibold">Performance & accessibility</div>
                <div className="text-sm text-muted-foreground mt-2">
                  Skew uses transform (GPU-friendly). Respect
                  prefers-reduced-motion and provide non-animated fallbacks.
                </div>
              </div>
            </div>
          </section>

          {/* Utilities */}
          <section className="space-y-6 border-t border-border pt-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Skew utilities</h2>
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
                        className={`w-14 h-10 rounded-sm flex items-center justify-center bg-slate-700 text-white transform`}
                        style={{ transform: `skewX(${skewMap[u.cls]}deg)` }}
                        aria-hidden
                      >
                        {skewMap[u.cls]}°
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
              Choose a skew axis, amount, duration and whether skew is
              hover-only.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Controls */}
              <div className="space-y-3 md:col-span-1">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Skew
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {utilities.map((u) => (
                      <button
                        key={u.cls}
                        onClick={() => setSkew(u.cls)}
                        className={`px-3 py-1 rounded border text-sm ${
                          skew === u.cls
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border"
                        }`}
                      >
                        {u.cls.replace("skew-", "").replace("-", "-")}
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
                          `${
                            hoverOnly ? `hover:${skew}` : skew
                          } ${duration} ${easing}`
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
                        hoverOnly ? `hover:${skew}` : skew
                      } ${duration} ${easing} p-6 bg-slate-700 text-slate-100 inline-block`}
                      style={{
                        transform: skew.includes("x")
                          ? `skewX(${skewMap[skew]}deg)`
                          : `skewY(${skewMap[skew]}deg)`,
                      }}
                    >
                      <strong className="block">Skew preview</strong>
                      <span className="text-sm">{skew}</span>
                    </div>

                    <div className="flex gap-3 flex-wrap items-center">
                      <div
                        className={`w-16 h-16 rounded ${
                          hoverOnly ? `hover:${skew}` : skew
                        } flex items-center justify-center bg-slate-700 text-white`}
                        style={{
                          transform: skew.includes("x")
                            ? `skewX(${skewMap[skew]}deg)`
                            : `skewY(${skewMap[skew]}deg)`,
                        }}
                      >
                        AV
                      </div>

                      <button
                        className={`px-4 py-2 ${
                          hoverOnly ? `hover:${skew}` : skew
                        } rounded bg-blue-600 text-white`}
                        style={{
                          transform: skew.includes("x")
                            ? `skewX(${skewMap[skew]}deg)`
                            : `skewY(${skewMap[skew]}deg)`,
                        }}
                      >
                        Primary
                      </button>

                      <div
                        className={`px-3 py-1 ${
                          hoverOnly ? `hover:${skew}` : skew
                        } rounded bg-slate-700 text-sm`}
                        style={{
                          transform: skew.includes("x")
                            ? `skewX(${skewMap[skew]}deg)`
                            : `skewY(${skewMap[skew]}deg)`,
                        }}
                      >
                        Badge
                      </div>

                      <div className="flex items-center gap-2 ml-2">
                        <div
                          className="w-10 h-10 rounded-sm"
                          style={{
                            transform: skew.includes("x")
                              ? `skewX(${skewMap[skew]}deg)`
                              : `skewY(${skewMap[skew]}deg)`,
                            background: "#111827",
                            border: "2px solid rgba(148,163,184,0.2)",
                          }}
                          aria-hidden
                        />
                        <div className="text-sm text-muted-foreground">
                          <div>{skew}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-3">
                    Tip: use subtle skews for accents; stronger skews are
                    decorative. Avoid skewing legible paragraphs or form
                    controls.
                  </p>

                  <CodeBlock code={playgroundMarkup} language="jsx" />
                </div>
              </div>
            </div>
          </section>

          {/* Real-world examples (expanded) */}
          <section className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Real-World Examples</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Skewed hero / band */}
              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Skewed hero band</h3>
                    <div className="text-xs text-muted-foreground">
                      A full-width, slightly skewed band adds energy to hero
                      sections. Keep text centered and use opposite skew on the
                      inner content to keep copy readable.
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(`<section class=\"w-full transform -skew-y-6 bg-gradient-to-r from-indigo-600 to-purple-600 py-12\">
  <div class=\"max-w-7xl mx-auto transform skew-y-6 px-4\">Hero content</div>
</section>`)
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3 overflow-hidden">
                  <div className="-skew-y-6 bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded">
                    <div className="skew-y-6 text-white font-semibold">
                      Skewed band
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<section class="w-full transform -skew-y-6 bg-gradient-to-r from-indigo-600 to-purple-600 py-12">
  <div class="max-w-7xl mx-auto transform skew-y-6 px-4">Hero content</div>
</section>`}
                  />
                </div>
              </article>

              {/* Skewed ribbon / badge */}
              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Ribbon / sale badge (skewed)
                    </h3>
                    <div className="text-xs text-muted-foreground">
                      Skewed ribbons feel tactile — use ~-12° to -20° for
                      classic diagonal ribbons. Keep text short and contrast
                      high.
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<div class=\"absolute top-2 right-2 -rotate-12 bg-rose-600 text-white px-3 py-1 rounded\">Sale</div>`
                      )
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="text-white bg-slate-800 rounded p-3 relative">
                  <div className="rounded-md p-4 bg-slate-700">
                    Product tile
                  </div>
                  <div className="absolute top-3 right-3 -skew-x-6 bg-rose-600 text-white px-3 py-1 rounded">
                    Sale
                  </div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<div class="absolute top-3 right-3 -skew-x-6 bg-rose-600 text-white px-3 py-1 rounded">Sale</div>`}
                  />
                </div>
              </article>

              {/* Tilted card stack */}
              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Tilted card stack</h3>
                    <div className="text-xs text-muted-foreground">
                      Layer multiple cards with alternating small skews for a
                      playful stack effect. Keep skews small so content remains
                      readable.
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(`<div class=\"relative\">
  <div class=\"transform -skew-y-2\">Card A</div>
  <div class=\"transform skew-y-2 translate-y-4\">Card B</div>
</div>`)
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="text-white bg-slate-800 rounded p-3 relative h-36">
                  <div className="absolute top-4 left-6 transform -skew-y-2 bg-slate-700 p-3 rounded">
                    Card A
                  </div>
                  <div className="absolute top-12 left-12 transform skew-y-2 bg-slate-700 p-3 rounded">
                    Card B
                  </div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<div class="relative">
  <div class="transform -skew-y-2">Card A</div>
  <div class="transform skew-y-2 translate-y-4">Card B</div>
</div>`}
                  />
                </div>
              </article>

              {/* Skewed image mask */}
              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Skewed image mask</h3>
                    <div className="text-xs text-muted-foreground">
                      Mask an image container with skew to create angled crops —
                      pair with object-cover for consistent results.
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(`<div class=\"overflow-hidden transform -skew-x-6\">
  <img src=\"/path.jpg\" class=\"object-cover w-full h-44\"/>
</div>`)
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3 overflow-hidden">
                  <div className="-skew-x-6 overflow-hidden rounded">
                    <div className="w-full h-28 bg-gradient-to-r from-slate-600 to-slate-700" />
                  </div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<div class="overflow-hidden transform -skew-x-6">
  <img src="/path.jpg" class="object-cover w-full h-44"/>
</div>`}
                  />
                </div>
              </article>
              {/* Skew on hover for micro-interactions */}
              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Hover skew — micro-interaction
                    </h3>
                    <div className="text-xs text-muted-foreground">
                      A small hover skew (1–2°) combined with a slight lift
                      feels tactile for cards and buttons.
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<div class=\"transform transition hover:skew-x-2 hover:-translate-y-1\">Card</div>`
                      )
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="text-white bg-slate-800 rounded p-3">
                  <div className="rounded-md p-4 transform transition hover:skew-x-2 hover:-translate-y-1 bg-slate-700">
                    Hover me
                  </div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<div class="transform transition hover:skew-x-2 hover:-translate-y-1">Card</div>`}
                  />
                </div>
              </article>

              {/* Skewed divider / decorative separator */}
              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Skewed divider</h3>
                    <div className="text-xs text-muted-foreground">
                      Use a thin skewed element as a decorative divider between
                      sections — keeps rhythm while adding personality.
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<div class=\"h-2 w-full transform skew-x-6 bg-gradient-to-r from-slate-700 to-slate-600\"></div>`
                      )
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3">
                  <div className="h-2 w-full transform skew-x-6 bg-gradient-to-r from-slate-700 to-slate-600 rounded" />
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<div class="h-2 w-full transform skew-x-6 bg-gradient-to-r from-slate-700 to-slate-600"></div>`}
                  />
                </div>
              </article>


              {/* Skewed CTA badge */}
              <article className="md:col-span-2 border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Skewed CTA badge</h3>
                    <div className="text-xs text-muted-foreground">
                      A small skewed pill can make CTAs feel unique — keep
                      accessibility in mind and test contrast.
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<div class=\"inline-block transform skew-x-2 bg-blue-600 text-white px-4 py-2 rounded\">Try it</div>`
                      )
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3">
                  <div className="inline-block transform skew-x-2 bg-blue-600 text-white px-4 py-2 rounded">
                    Try it
                  </div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<div class="inline-block transform skew-x-2 bg-blue-600 text-white px-4 py-2 rounded">Try it</div>`}
                  />
                </div>
              </article>

              <div className="md:col-span-2 text-sm text-muted-foreground">
                <strong>Accessibility & UX notes:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>
                    Keep skew subtle for functional UI elements; large angles
                    are decorative.
                  </li>
                  <li>
                    Avoid skewing important text-heavy content — prefer
                    decorative labels.
                  </li>
                  <li>
                    Test for contrast and legibility, especially on slanted
                    ribbons and CTAs.
                  </li>
                  <li>
                    Respect{" "}
                    <code className="bg-slate-700 px-1 rounded">
                      prefers-reduced-motion
                    </code>{" "}
                    and provide a straight alternative when required.
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
                <strong>Subtlety:</strong> 1–2° for accents; 6° for decorative
                treatments.
              </li>
              <li>
                <strong>Readability:</strong> keep copy unskewed or counter-skew
                inner containers when necessary.
              </li>
              <li>
                <strong>Performance:</strong> skew is transform-based—GPU
                friendly but still respect reduced-motion.
              </li>
              <li>
                <strong>Pairings:</strong> combine skew with shadow, translate,
                or scale for richer motion language.
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
