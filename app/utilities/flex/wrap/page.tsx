"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "@/app/utilities/components/code-block";

type WrapMode = "flex-wrap" | "flex-wrap-reverse" | "flex-nowrap";

export default function FlexWrapPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied(null);
    }
  };

  const utilities: { className: WrapMode; desc: string }[] = [
    { className: "flex-wrap", desc: "Wrap to multiple lines" },
    { className: "flex-wrap-reverse", desc: "Wrap in reverse" },
    { className: "flex-nowrap", desc: "Keep items on a single line" },
  ];

  // Playground controls
  const [wrapMode, setWrapMode] = useState<WrapMode>("flex-wrap");
  const [gapSize, setGapSize] = useState("gap-4");
  const [alignItems, setAlignItems] = useState("items-start");
  const [justify, setJustify] = useState("justify-start");
  const [containerWidth, setContainerWidth] = useState("w-full");

  const playgroundMarkup = `<div class="flex ${wrapMode} ${gapSize} ${alignItems} ${justify} ${containerWidth}">
  <div class="p-3 rounded bg-slate-700 text-white">Item 1</div>
  <div class="p-3 rounded bg-slate-700 text-white">Item 2</div>
  <div class="p-3 rounded bg-slate-700 text-white">Item 3</div>
  <div class="p-3 rounded bg-slate-700 text-white">Item 4</div>
  <div class="p-3 rounded bg-slate-700 text-white">Item 5</div>
</div>`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-foreground">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Flex Wrap</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Control whether flex items wrap to multiple lines — useful for
              galleries, tags, toolbars and responsive card layouts.
            </p>
          </div>

          {/* Utilities Grid */}
          <div className="space-y-6 border-t border-border pt-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Flex Wrap Utilities</h2>
              <p className="text-muted-foreground">
                Click a utility to copy it.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {utilities.map((u) => (
                <button
                  key={u.className}
                  onClick={() => copyToClipboard(u.className)}
                  className="text-left border border-border rounded-lg p-4 hover:bg-card/50 transition flex flex-col group cursor-pointer"
                  aria-label={`Copy ${u.className}`}
                >
                  <div className="flex items-center justify-between">
                    <code className="text-black text-sm font-mono text-accent font-semibold">
                      {u.className}
                    </code>
                    <span className="text-xs text-muted-foreground">
                      {copied === u.className ? "Copied" : "Copy"}
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
              Experiment with wrapping, alignment, gap and container width to
              see how wrapping behavior changes.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Controls */}
              <div className="space-y-3 md:col-span-1">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Wrap mode
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {(
                      [
                        "flex-wrap",
                        "flex-wrap-reverse",
                        "flex-nowrap",
                      ] as WrapMode[]
                    ).map((m) => (
                      <button
                        key={m}
                        onClick={() => setWrapMode(m)}
                        className={`px-3 py-1 rounded border text-sm ${
                          wrapMode === m
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border"
                        }`}
                      >
                        {m.replace("flex-", "")}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Gap
                  </label>
                  <div className="flex gap-2">
                    {["gap-2", "gap-4", "gap-6"].map((g) => (
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
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Align items (cross-axis)
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { label: "start", cls: "items-start" },
                      { label: "center", cls: "items-center" },
                      { label: "end", cls: "items-end" },
                      { label: "stretch", cls: "items-stretch" },
                    ].map((a) => (
                      <button
                        key={a.cls}
                        onClick={() => setAlignItems(a.cls)}
                        className={`px-3 py-1 rounded border text-sm ${
                          alignItems === a.cls
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border"
                        }`}
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Justify (main-axis)
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { label: "start", cls: "justify-start" },
                      { label: "center", cls: "justify-center" },
                      { label: "end", cls: "justify-end" },
                      { label: "between", cls: "justify-between" },
                    ].map((j) => (
                      <button
                        key={j.cls}
                        onClick={() => setJustify(j.cls)}
                        className={`px-3 py-1 rounded border text-sm ${
                          justify === j.cls
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border"
                        }`}
                      >
                        {j.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Container width (to force wrapping)
                  </label>
                  <div className="flex gap-2">
                    {[
                      { label: "full", cls: "w-full" },
                      { label: "md", cls: "w-[640px]" },
                      { label: "narrow", cls: "w-[420px]" },
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
              </div>

              {/* Playground demo */}
              <div className="md:col-span-2 space-y-3">
                <div className="border border-border rounded-lg p-4 bg-card/30">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">Playground</div>
                      <div className="text-xs text-muted-foreground">
                        Live preview of selected wrap + alignment
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

                  <div
                    className={`rounded p-4 bg-slate-800 overflow-hidden ${containerWidth}`}
                    aria-live="polite"
                  >
                    <div
                      className={`flex ${wrapMode} ${gapSize} ${alignItems} ${justify}`}
                    >
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className="p-3 rounded bg-slate-700 text-white min-w-[140px] text-center"
                        >
                          Item {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-3">
                    <strong>Note:</strong>{" "}
                    <code className="bg-slate-700 px-1 rounded">
                      flex-nowrap
                    </code>{" "}
                    prevents wrapping and will cause overflow; pair it with{" "}
                    <code className="bg-slate-700 px-1 rounded">
                      overflow-x-auto
                    </code>{" "}
                    if you want a horizontal scroller.
                  </p>

                  <div className="mt-3 max-w-full overflow-auto rounded">
                    <CodeBlock code={playgroundMarkup} language="jsx" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Demos with explanations */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Wrap Demos (annotated)</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Wrapping tag cloud */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-2 flex items-baseline justify-between">
                  <code className="text-black text-sm font-mono text-accent font-semibold">
                    flex-row flex-wrap
                  </code>
                  <button
                    onClick={() => copyToClipboard("flex-row flex-wrap")}
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="flex flex-row flex-wrap gap-2 bg-slate-800 rounded p-3">
                  {[
                    "JavaScript",
                    "React",
                    "Tailwind",
                    "Node",
                    "CSS",
                    "HTML",
                    "TypeScript",
                  ].map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 bg-slate-700 text-white rounded text-sm whitespace-nowrap"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mt-3">
                  Use wrapping for tag clouds, filter chips, or lists of badges
                  that should flow on multiple lines when space is limited.
                </p>
              </div>

              {/* Horizontal toolbar with nowrap */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-2 flex items-baseline justify-between">
                  <code className="text-black text-sm font-mono text-accent font-semibold">
                    flex-nowrap
                  </code>
                  <button
                    onClick={() => copyToClipboard("flex-nowrap")}
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="overflow-x-auto bg-slate-800 rounded p-3">
                  <div className="flex flex-nowrap gap-3">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <button
                        key={i}
                        className="px-4 py-2 bg-slate-700 text-white rounded whitespace-nowrap"
                      >
                        Action {i + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-3">
                  Use{" "}
                  <code className="bg-slate-700 px-1 rounded">flex-nowrap</code>{" "}
                  when items must stay on a single row. Pair with{" "}
                  <code className="bg-slate-700 px-1 rounded">
                    overflow-x-auto
                  </code>{" "}
                  to allow scrolling.
                </p>
              </div>

              {/* Photo gallery */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-2 flex items-baseline justify-between">
                  <code className="text-black text-sm font-mono text-accent font-semibold">
                    flex-row flex-wrap gap-3
                  </code>
                  <button
                    onClick={() => copyToClipboard("flex-row flex-wrap gap-3")}
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3 overflow-auto">
                  <div className="flex flex-row flex-wrap gap-3">
                    <div className="w-36 h-24 bg-slate-700 rounded flex-shrink-0" />
                    <div className="w-36 h-24 bg-slate-700 rounded flex-shrink-0" />
                    <div className="w-36 h-24 bg-slate-700 rounded flex-shrink-0" />
                    <div className="w-36 h-24 bg-slate-700 rounded flex-shrink-0" />
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-3">
                  Galleries use wrapping to fill rows; fix item sizes or use{" "}
                  <code className="bg-slate-700 px-1 rounded">basis-</code>{" "}
                  utilities for consistent grids.
                </p>
              </div>

              {/* Product grid (wrap) */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-2 flex items-baseline justify-between">
                  <code className="text-black text-sm font-mono text-accent font-semibold">
                    flex-row flex-wrap
                  </code>
                  <button
                    onClick={() => copyToClipboard("flex-row flex-wrap")}
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3 overflow-auto">
                  <div className="flex flex-row flex-wrap gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-56 bg-slate-700 rounded p-3 flex-shrink-0"
                      >
                        <div className="h-28 bg-slate-600 rounded mb-3" />
                        <div className="font-semibold">Product {i + 1}</div>
                        <div className="text-sm text-muted-foreground">
                          Short description
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-3">
                  Use wrapping for responsive product grids. Pair with{" "}
                  <code className="bg-slate-700 px-1 rounded">basis-</code>{" "}
                  utilities to control widths at different breakpoints.
                </p>
              </div>
            </div>
          </div>

          {/* More real-world examples — expanded */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">
              More real-world examples — explained
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* 1. Filter bar with active chips + overflow */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="md:w-64 w-full flex-shrink-0 bg-slate-800 rounded p-3 overflow-auto">
                    <div className="flex gap-2 items-center flex-wrap">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                        All
                      </button>
                      <span className="px-3 py-1 bg-slate-700 text-white rounded text-sm">
                        Open
                      </span>
                      <span className="px-3 py-1 bg-slate-700 text-white rounded text-sm">
                        Closed
                      </span>
                      <span className="px-3 py-1 bg-slate-700 text-white rounded text-sm">
                        Pending
                      </span>
                      <button className="px-2 py-1 bg-slate-700 text-white rounded text-sm">
                        + More
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold">
                        Filter bar with chips
                      </h3>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `<div class="flex gap-2 flex-wrap">...</div>`
                          )
                        }
                        className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                      >
                        Copy
                      </button>
                    </div>

                    <div className="mt-2">
                      <CodeBlock
                        code={`<div class="flex gap-2 flex-wrap">
  <button class="px-3 py-1 bg-blue-600 text-white rounded">All</button>
  <span class="px-3 py-1 bg-slate-700 text-white rounded">Open</span>
  <span class="px-3 py-1 bg-slate-700 text-white rounded">Closed</span>
</div>`}
                        language="jsx"
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        Use wrapping chips for filter bars so many filters won't
                        break layout — keep a compact "More" control for
                        overflow.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Breadcrumbs (wrap-friendly with truncation) */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="md:w-64 w-full flex-shrink-0 bg-slate-800 rounded p-3">
                    <nav aria-label="Breadcrumb">
                      <ol className="flex gap-2 flex-wrap items-center text-slate-200 text-sm">
                        <li className="truncate max-w-[120px]">Home</li>
                        <li>/</li>
                        <li className="truncate max-w-[120px]">
                          Category with long name
                        </li>
                        <li>/</li>
                        <li className="truncate max-w-[120px]">Subcategory</li>
                      </ol>
                    </nav>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold">
                        Breadcrumbs (wrap + truncate)
                      </h3>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `<ol class="flex gap-2 flex-wrap">...</ol>`
                          )
                        }
                        className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                      >
                        Copy
                      </button>
                    </div>

                    <div className="mt-2">
                      <CodeBlock
                        code={`<nav aria-label="Breadcrumb">
  <ol class="flex gap-2 flex-wrap items-center text-sm">
    <li>Home</li><li>/</li><li>Products</li><li>/</li><li>Cool sneakers</li>
  </ol>
</nav>`}
                        language="jsx"
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        Combine `flex-wrap` with truncation (`max-w` +
                        `truncate`) so breadcrumbs wrap on small screens but
                        remain readable.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Horizontal action toolbar that becomes multi-row on small screens */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="md:w-64 w-full flex-shrink-0 bg-slate-800 rounded p-3">
                    <div className="flex gap-2 flex-wrap">
                      <button className="px-3 py-1 bg-slate-700 text-white rounded text-sm">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-slate-700 text-white rounded text-sm">
                        Duplicate
                      </button>
                      <button className="px-3 py-1 bg-slate-700 text-white rounded text-sm">
                        Move
                      </button>
                      <button className="px-3 py-1 bg-slate-700 text-white rounded text-sm">
                        Share
                      </button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded text-sm">
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold">
                        Responsive action toolbar
                      </h3>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `<div class="flex gap-2 flex-wrap">...</div>`
                          )
                        }
                        className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                      >
                        Copy
                      </button>
                    </div>

                    <div className="mt-2">
                      <CodeBlock
                        code={`<div class="flex gap-2 flex-wrap">
  <button>Edit</button>
  <button>Duplicate</button>
  <button>Delete</button>
</div>`}
                        language="jsx"
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        Toolbars that wrap avoid overflow on narrow screens —
                        consider keeping primary actions visually distinct and
                        pinned (e.g., using `flex-shrink-0`).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Multi-row nav with search + compact collapse */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="md:w-64 w-full flex-shrink-0 bg-slate-800 rounded p-3">
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 items-center">
                        <input
                          className="flex-1 px-1 py-1 rounded bg-slate-700 text-white text-sm"
                          placeholder="Search"
                        />
                        <button className="px-1  py-1 bg-blue-600 text-white rounded text-sm">
                          Go
                        </button>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <a className="text-slate-200 text-sm">Overview</a>
                        <a className="text-slate-200 text-sm">Reports</a>
                        <a className="text-slate-200 text-sm">Settings</a>
                        <a className="text-slate-200 text-sm">Users</a>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold">Nav with search</h3>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `<div class="flex flex-wrap gap-2">nav + search</div>`
                          )
                        }
                        className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer cursor-pointer"
                      >
                        Copy
                      </button>
                    </div>

                    <div className="mt-2">
                      <CodeBlock
                        code={`<div class="flex flex-col md:flex-row gap-2">
  <input class="flex-1" />
  <nav class="flex gap-2 flex-wrap">...</nav>
</div>`}
                        language="jsx"
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        Combine a small search input with a wrapping nav for
                        dashboards — the nav wraps under the search on narrow
                        screens.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Responsive pricing cards grid (wrap to multiple rows) */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="md:w-64 w-full flex-shrink-0 bg-slate-800 rounded p-3 overflow-auto">
                    <div className="flex gap-3 flex-wrap">
                      <div className="text-white w-40 p-3 bg-slate-700 rounded text-center">
                        Basic
                      </div>
                      <div className="text-white w-40 p-3 bg-slate-700 rounded text-center">
                        Pro
                      </div>
                      <div className="text-white w-40 p-3 bg-slate-700 rounded text-center">
                        Enterprise
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold">
                        Pricing cards (wrap)
                      </h3>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `<div class="flex flex-wrap gap-4">pricing cards</div>`
                          )
                        }
                        className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                      >
                        Copy
                      </button>
                    </div>

                    <div className="mt-2">
                      <CodeBlock
                        code={`<div class="flex flex-row flex-wrap gap-4">
  <div class="w-64">Card 1</div>
  <div class="w-64">Card 2</div>
  <div class="w-64">Card 3</div>
</div>`}
                        language="jsx"
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        Use wrapping with fixed card widths (or `basis-`) so
                        pricing tiers reflow into multiple rows on smaller
                        viewports.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. Calendar week strips (wrapping days) */}
              <div className="border border-border rounded-lg p-4 bg-card/20">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  <div className="md:w-64 w-full flex-shrink-0 bg-slate-800 rounded p-3 overflow-auto">
                    <div className="flex gap-2 flex-wrap">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (d) => (
                          <div
                            key={d}
                            className="w-12 h-10 bg-slate-700 rounded flex items-center justify-center text-sm text-white"
                          >
                            {d}
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold">
                        Calendar week strips
                      </h3>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `<div class="flex flex-row flex-wrap gap-2">days</div>`
                          )
                        }
                        className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                      >
                        Copy
                      </button>
                    </div>

                    <div className="mt-2">
                      <CodeBlock
                        code={`<div class="flex flex-row flex-wrap gap-2">
  <div class="w-12">Mon</div>
  <div class="w-12">Tue</div>
  ...
</div>`}
                        language="jsx"
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        Week/day strips that wrap let calendar views collapse
                        into multiple rows on narrow screens while preserving
                        the day order.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accessibility reminder (full width) */}
              <div className="md:col-span-2 text-sm text-muted-foreground">
                <strong>Accessibility reminder:</strong> When items wrap, visual
                focus order remains DOM order. If wrapping changes how users
                expect to navigate, ensure tab order and ARIA attributes reflect
                the expected experience.
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
