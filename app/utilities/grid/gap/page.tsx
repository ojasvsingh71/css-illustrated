"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "@/app/utilities/components/code-block";

type GapMode = "gap" | "gap-x" | "gap-y";
type LayoutType = "flex" | "grid";

export default function GapPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(null), 1400);
    } catch {
      setCopied(null);
    }
  };

  const utilities = [
    { cls: "gap-0", desc: "No gap" },
    { cls: "gap-1", desc: "0.25rem gap" },
    { cls: "gap-2", desc: "0.5rem gap" },
    { cls: "gap-3", desc: "0.75rem gap" },
    { cls: "gap-4", desc: "1rem gap (default example)" },
    { cls: "gap-6", desc: "1.5rem gap" },
    { cls: "gap-8", desc: "2rem gap" },
    { cls: "gap-x-4", desc: "Horizontal gap only" },
    { cls: "gap-y-4", desc: "Vertical gap only" },
    { cls: "md:gap-6", desc: "Responsive gap at md breakpoint" },
  ];

  // playground state
  const [layout, setLayout] = useState<LayoutType>("flex");
  const [direction, setDirection] = useState<"row" | "col">("row");
  const [gapMode, setGapMode] = useState<GapMode>("gap");
  const [gapSize, setGapSize] = useState("gap-4");
  const [containerWidth, setContainerWidth] = useState("w-full");
  const [items, setItems] = useState(6);

  const computeClass = () => {
    const gapClass =
      gapMode === "gap" ? gapSize : `${gapMode}-${gapSize.replace("gap-", "")}`;
    const dirClass =
      layout === "flex" ? (direction === "row" ? "flex-row" : "flex-col") : "";
    const flowDirForGrid =
      layout === "grid" && direction === "col"
        ? "grid-flow-col auto-cols-auto"
        : "";
    return { gapClass, dirClass, flowDirForGrid };
  };

  const { gapClass, dirClass, flowDirForGrid } = computeClass();

  const playgroundMarkup =
    layout === "flex"
      ? `<div class="flex ${dirClass} ${gapClass} ${containerWidth}">\n  <div class="p-3 rounded bg-slate-700 text-white">Item 1</div>\n  <div class="p-3 rounded bg-slate-700 text-white">Item 2</div>\n  <div class="p-3 rounded bg-slate-700 text-white">Item 3</div>\n  ...\n</div>`
      : `<div class="grid ${flowDirForGrid} ${gapClass} ${containerWidth}">\n  <div class="p-3 rounded bg-slate-700 text-white">Item 1</div>\n  <div class="p-3 rounded bg-slate-700 text-white">Item 2</div>\n  <div class="p-3 rounded bg-slate-700 text-white">Item 3</div>\n  ...\n</div>`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-foreground">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Gap</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              The <strong>gap</strong> utilities control the space between
              children inside a <code>flex</code> or <code>grid</code>{" "}
              container. Unlike margins, <em>gap</em> is symmetric, predictable
              and avoids collapsed margin issues. It also responds nicely with
              layout primitives (grid/flex) and is the preferred way to space
              items in modern layouts.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-200 rounded">
                <div className="font-semibold">Why gap?</div>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>Keeps spacing consistent between children.</li>
                  <li>Works for both grid and flex containers.</li>
                  <li>
                    Prevents accidental margin collapse and one-sided spacing.
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-slate-200 rounded">
                <div className="font-semibold">Browser support notes</div>
                <div className="text-sm text-muted-foreground mt-2">
                  gap in grid has been supported for years; gap for flex is
                  widely supported in modern browsers. If you support very old
                  browsers, test fallback (margins).
                </div>
              </div>

              <div className="p-4 bg-slate-200 rounded">
                <div className="font-semibold">When not to use gap</div>
                <div className="text-sm text-muted-foreground mt-2">
                  If children need different spacing on each side or you need
                  spacing that impacts container edges for layout reasons,
                  margins may still be appropriate.
                </div>
              </div>
            </div>
          </div>

          {/* Utilities */}
          <div className="space-y-6 border-t border-border pt-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold">Gap utilities</h2>
              <p className="text-muted-foreground">
                Click a utility to copy it.
                <span className="block text-xs text-muted-foreground mt-1">
                  Tip: combine responsive prefixes like{" "}
                  <code className="bg-slate-700 px-1 rounded">
                    sm:gap-2 md:gap-6
                  </code>{" "}
                  for fluid spacing.
                </span>
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              {utilities.map((u) => (
                <button
                  key={u.cls}
                  onClick={() => copyToClipboard(u.cls)}
                  className="text-left border border-border rounded-lg p-4 hover:bg-card/50 transition flex flex-col group"
                >
                  <div className="flex items-center justify-between">
                    <code className="text-black text-sm font-mono text-accent font-semibold">
                      {u.cls}
                    </code>
                    <span className="text-xs text-muted-foreground">
                      {copied === u.cls ? "Copied" : "Copy"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{u.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Playground */}
          <div className="space-y-4 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Interactive Playground</h2>
            <p className="text-muted-foreground">
              Toggle layout, direction, gap axis and size. Playground helps you
              see how gap affects layout and wrapping.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Controls */}
              <div className="space-y-3 md:col-span-1">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Layout
                  </label>
                  <div className="flex gap-2">
                    {(["flex", "grid"] as LayoutType[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => setLayout(l)}
                        className={`px-3 py-1 rounded border text-sm ${
                          layout === l
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Direction
                  </label>
                  <div className="flex gap-2">
                    {["row", "col"].map((d) => (
                      <button
                        key={d}
                        onClick={() => setDirection(d as any)}
                        className={`px-3 py-1 rounded border text-sm ${
                          direction === d
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Gap axis
                  </label>
                  <div className="flex gap-2">
                    {["gap", "gap-x", "gap-y"].map((g) => (
                      <button
                        key={g}
                        onClick={() => setGapMode(g as GapMode)}
                        className={`px-3 py-1 rounded border text-sm ${
                          gapMode === g
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Gap size
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {["gap-1", "gap-2", "gap-3", "gap-4", "gap-6", "gap-8"].map(
                      (g) => (
                        <button
                          key={g}
                          onClick={() => setGapSize(g)}
                          className={`px-3 py-1 rounded border text-sm ${
                            gapSize === g
                              ? "border-blue-500 bg-blue-500/10"
                              : "border-border"
                          }`}
                        >
                          {g.replace("gap-", "")}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Container width
                  </label>
                  <div className="flex gap-2">
                    {[
                      { label: "full", cls: "w-full" },
                      { label: "md (640px)", cls: "w-[640px]" },
                      { label: "narrow (420px)", cls: "w-[420px]" },
                    ].map((c) => (
                      <button
                        key={c.cls}
                        onClick={() => setContainerWidth(c.cls)}
                        className={`px-3 py-1 rounded border text-sm ${
                          containerWidth === c.cls
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border"
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Number of items
                  </label>
                  <div className="flex gap-2">
                    {[3, 4, 6, 8].map((n) => (
                      <button
                        key={n}
                        onClick={() => setItems(n)}
                        className={`px-3 py-1 rounded border text-sm ${
                          items === n
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Playground preview */}
              <div className="md:col-span-2 space-y-3">
                <div className="border border-border rounded-lg p-4 bg-card/30">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">Playground</div>
                      <div className="text-xs text-muted-foreground">
                        Live preview — gap class shown below
                      </div>
                    </div>

                    <div className="flex gap-2 items-center">
                      <div className="text-xs text-muted-foreground">
                        Markup
                      </div>
                      <button
                        onClick={() => copyToClipboard(playgroundMarkup)}
                        className="text-xs px-3 py-1 rounded bg-muted/10 hover:bg-muted/20"
                      >
                        Copy markup
                      </button>
                    </div>
                  </div>

                  <div
                    className={`rounded p-4 bg-slate-800 overflow-auto ${containerWidth}`}
                  >
                    <div
                      className={`${
                        layout === "grid" ? "grid" : "flex"
                      } ${flowDirForGrid} ${
                        layout === "flex" ? dirClass : ""
                      } ${
                        gapMode === "gap"
                          ? gapSize
                          : `${gapMode}-${gapSize.replace("gap-", "")}`
                      }`}
                    >
                      {Array.from({ length: items }).map((_, i) => (
                        <div
                          key={i}
                          className="p-3 rounded bg-slate-700 text-white min-w-[120px] text-center"
                        >
                          Item {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-3">
                    <strong>Note:</strong>{" "}
                    <code className="bg-slate-700 px-1 rounded">
                      {gapMode === "gap"
                        ? gapSize
                        : `${gapMode}-${gapSize.replace("gap-", "")}`}
                    </code>{" "}
                    applies uniform spacing between children — it doesn't add
                    margin to the container or affect focus order. For
                    interactive hit targets, pair gap with padding on children.
                  </p>

                  <CodeBlock code={playgroundMarkup} language="jsx" />
                </div>
              </div>
            </div>
          </div>

          {/* Real-world examples */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">
              Real-World Examples — visuals & code
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Horizontal nav spacing */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">
                    Horizontal nav spacing
                  </h3>
                  <button
                    onClick={() => copyToClipboard("flex gap-6 items-center")}
                    className="text-xs px-2 py-1 rounded bg-muted/10"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3">
                  <nav className="flex gap-6 items-center">
                    <div className="font-bold text-white">Logo</div>
                    <div className="flex gap-6">
                      <a className="text-slate-200">Home</a>
                      <a className="text-slate-200">Docs</a>
                      <a className="text-slate-200">Pricing</a>
                    </div>
                    <div className="ml-auto">
                      <button className="px-3 py-1 bg-blue-600 rounded text-white">
                        Sign in
                      </button>
                    </div>
                  </nav>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<nav class="flex gap-6 items-center">\n  <div>Logo</div>\n  <a>Home</a>\n  <a>Docs</a>\n  <a>Pricing</a>\n</nav>`}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Use a larger gap to visually separate primary items — the
                    gap keeps spacing consistent across breakpoints without
                    extra margin rules.
                  </p>
                </div>
              </div>

              {/* Card grid */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">Card grid</h3>
                  <button
                    onClick={() => copyToClipboard("grid grid-cols-3 gap-4")}
                    className="text-xs px-2 py-1 rounded bg-muted/10"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3 overflow-auto">
                  <div className="grid grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-slate-700 rounded p-4 text-slate-200"
                      >
                        <div className="font-semibold mb-2">Card {i + 1}</div>
                        <div className="text-sm text-muted-foreground">
                          Short description here.
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<div class="grid grid-cols-3 gap-4">\n  <div>Card</div>\n  <div>Card</div>\n</div>`}
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    gap controls spacing between cards — use gap-x/gap-y to
                    control one axis only.
                  </p>
                </div>
              </div>

              {/* Pricing cards (responsive gaps) */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">
                    Pricing cards — responsive gap
                  </h3>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        "grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
                      )
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3 overflow-auto">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-slate-700 rounded p-4 text-slate-200"
                      >
                        <div className="font-semibold mb-2">Pro {i + 1}</div>
                        <div className="text-sm text-muted-foreground">
                          Everything you need.
                        </div>
                        <div className="mt-4 font-bold text-white">₹499</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-sm text-muted-foreground">
                    Responsive gap helps scale spacing across breakpoints —
                    combine responsive gap utilities to create comfortable
                    spacing on all screen sizes.
                  </p>
                </div>
              </div>

              {/* Avatar stack (gap with negative margin alternative explanation) */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">
                    Avatar stack (use gap + negative margin)
                  </h3>
                  <button
                    onClick={() =>
                      copyToClipboard("flex items-center -space-x-2")
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3">
                  <div className="flex items-center -space-x-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/40?img=${i + 1}`}
                        className="w-10 h-10 rounded-full border-2 border-slate-800"
                        alt={`avatar-${i}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-sm text-muted-foreground">
                    Avatar stacks are an exception where you intentionally
                    overlap items. gap isn't useful for overlap; negative
                    margins (e.g.{" "}
                    <code className="bg-slate-700 px-1 rounded">
                      -space-x-2
                    </code>
                    ) or absolute positioning are appropriate.
                  </p>
                </div>
              </div>

              {/* Toolbar with gap-x and overflow (full width) */}
              <div className="md:col-span-2 border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">
                    Toolbar (nowrap + gap-x)
                  </h3>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        "flex flex-nowrap gap-x-3 overflow-x-auto"
                      )
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3 overflow-auto">
                  <div className="flex flex-nowrap gap-x-3">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <button
                        key={i}
                        className="px-4 py-2 bg-slate-700 rounded text-slate-200 whitespace-nowrap"
                      >
                        Action {i + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-sm text-muted-foreground">
                    Use gap-x for horizontal spacing in a tight toolbar and pair
                    with overflow-x-auto if content may overflow.
                  </p>
                </div>
              </div>

              {/* Accessibility note (full width) */}
              <div className="md:col-span-2 text-sm text-muted-foreground">
                <strong>Accessibility reminder:</strong> <em>gap</em> only
                affects visual spacing between children — it does not change DOM
                order or keyboard/tab order. Ensure interactive items have
                adequate touch target sizes (padding), clear focus styles, and
                that spacing does not rely on visual-only cues. When in doubt,
                test with keyboard-only navigation and a screen reader.
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold">Quick tips & best practices</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>
                <strong>Prefer gap:</strong> use gap instead of margins on
                children — it keeps spacing predictable and avoids collapsed
                margins.
              </li>
              <li>
                <strong>Axis control:</strong> use{" "}
                <code className="bg-slate-700 px-1 rounded">gap-x-*</code> or{" "}
                <code className="bg-slate-700 px-1 rounded">gap-y-*</code> to
                control one axis only.
              </li>
              <li>
                <strong>Interactive targets:</strong> gap doesn't increase hit
                area — add padding to child elements for larger tappable
                regions.
              </li>
              <li>
                <strong>Responsive spacing:</strong> combine responsive gap
                classes (e.g.,{" "}
                <code className="bg-slate-700 px-1 rounded">md:gap-6</code>) to
                get different spacing at breakpoints.
              </li>
              <li>
                <strong>Overlap use-cases:</strong> if you need overlap
                (avatars, badges), gap isn't the tool — use negative margins or
                absolute positioning.
              </li>
              <li>
                <strong>Performance:</strong> gap is inexpensive and CSS-native;
                prefer it over many margin adjustments when spacing many items
                (easier to maintain).
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
