"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "@/app/utilities/components/code-block";

type BorderColor =
  | "border-red-500"
  | "border-blue-600"
  | "border-green-500"
  | "border-yellow-400"
  | "border-purple-500"
  | "border-gray-300"
  | "border-border"
  | "border-transparent";

type BorderWidth = "border" | "border-2" | "border-4";
type BorderRadius =
  | "rounded-none"
  | "rounded"
  | "rounded-md"
  | "rounded-lg"
  | "rounded-full";
type BorderStyle = "border-solid" | "border-dashed" | "border-dotted";

export default function BorderColorPage() {
  const [copied, setCopied] = useState<string | null>(null);

  // Playground state
  const [color, setColor] = useState<BorderColor>("border-blue-600");
  const [width, setWidth] = useState<BorderWidth>("border");
  const [radius, setRadius] = useState<BorderRadius>("rounded-md");
  const [style, setStyle] = useState<BorderStyle>("border-solid");
  const [showShadow, setShowShadow] = useState(true);

  const utilities: { cls: BorderColor; desc: string }[] = [
    { cls: "border-red-500", desc: "Error / destructive" },
    { cls: "border-blue-600", desc: "Primary / action" },
    { cls: "border-green-500", desc: "Success / positive" },
    { cls: "border-yellow-400", desc: "Warning / attention" },
    { cls: "border-purple-500", desc: "Accent / brand" },
    { cls: "border-gray-300", desc: "Neutral / subtle" },
    { cls: "border-border", desc: "Design token (default)" },
    { cls: "border-transparent", desc: "Invisible frame / layout" },
  ];

  const borderWidths: BorderWidth[] = ["border", "border-2", "border-4"];
  const borderRadii: BorderRadius[] = [
    "rounded-none",
    "rounded",
    "rounded-md",
    "rounded-lg",
    "rounded-full",
  ];
  const borderStyles: BorderStyle[] = [
    "border-solid",
    "border-dashed",
    "border-dotted",
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

  // Map Tailwind border color classes to concrete CSS colors (fallbacks).
  // Use CSS variable for "border-border" so it respects your theme token if present.
  const colorMap: Record<BorderColor, string> = {
    "border-red-500": "#ef4444",
    "border-blue-600": "#2563eb",
    "border-green-500": "#22c55e",
    "border-yellow-400": "#f59e0b",
    "border-purple-500": "#a855f7",
    "border-gray-300": "#d1d5db",
    "border-border": "var(--border, #9ca3af)", // fallback if no CSS var
    "border-transparent": "transparent",
  };

  // Derive CSS border-style (strip "border-" prefix)
  const styleMap: Record<BorderStyle, string> = {
    "border-solid": "solid",
    "border-dashed": "dashed",
    "border-dotted": "dotted",
  };

  const playgroundMarkup = `<div class="${width} ${color} ${style} ${radius} p-4 ${
    showShadow ? "shadow-md" : ""
  }">
  Preview content
</div>`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-foreground">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Border Color</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Choose border colors for states, accents, focus rings and product
              frames. Use colored borders to convey status, highlight products,
              or create subtle separators.
            </p>
          </div>

          {/* Utilities */}
          <section className="space-y-6 border-t border-border pt-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Border color utilities</h2>
              <p className="text-muted-foreground">Click a class to copy it.</p>
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
                      {/* small swatch so user sees the color quickly */}
                      <span
                        className="w-4 h-4 rounded-sm inline-block"
                        style={{ background: colorMap[u.cls] }}
                        aria-hidden
                      />
                      <code className="text-black text-sm font-mono text-accent font-semibold">
                        {u.cls}
                      </code>
                    </div>

                    <span className="text-xs text-muted-foreground">
                      {copied === u.cls ? "Copied" : "Copy"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{u.desc}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Playground */}
          <section className="space-y-4 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">Interactive playground</h2>
            <p className="text-muted-foreground">
              Toggle color, width, radius and style — buttons only for quick
              experimentation.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Controls */}
              <div className="space-y-3 md:col-span-1">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Color
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {utilities.map((u) => (
                      <button
                        key={u.cls}
                        onClick={() => setColor(u.cls)}
                        className={`px-3 py-1 rounded border text-sm flex items-center gap-2 ${
                          color === u.cls
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border"
                        }`}
                      >
                        <span
                          className="w-3 h-3 inline-block rounded-sm"
                          style={{ background: colorMap[u.cls] }}
                          aria-hidden
                        />
                        <span>{u.cls.replace("border-", "")}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Width
                  </label>
                  <div className="flex gap-2">
                    {borderWidths.map((w) => (
                      <button
                        key={w}
                        onClick={() => setWidth(w)}
                        className={`px-3 py-1 rounded border text-sm ${
                          width === w
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border"
                        }`}
                      >
                        {w === "border"
                          ? "1px"
                          : w === "border-2"
                          ? "2px"
                          : "4px"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Radius
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {borderRadii.map((r) => (
                      <button
                        key={r}
                        onClick={() => setRadius(r)}
                        className={`px-3 py-1 rounded border text-sm ${
                          radius === r
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border"
                        }`}
                      >
                        {r.replace("rounded-", "") || "none"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Style
                  </label>
                  <div className="flex gap-2">
                    {borderStyles.map((s) => (
                      <button
                        key={s}
                        onClick={() => setStyle(s)}
                        className={`px-3 py-1 rounded border text-sm ${
                          style === s
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border"
                        }`}
                      >
                        {s.replace("border-", "")}
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
                      onClick={() => setShowShadow((v) => !v)}
                      className={`px-3 py-1 rounded border text-sm ${
                        showShadow
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-border"
                      }`}
                    >
                      Shadow
                    </button>
                    <button
                      onClick={() =>
                        copyToClipboard(`${width} ${color} ${style} ${radius}`)
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
                    {/* main preview block: we keep Tailwind width/style classes AND apply inline color/style to force visibility */}
                    <div
                      className={`mb-4 ${width} ${style} ${radius} p-6 ${
                        showShadow ? "shadow-md" : ""
                      } bg-slate-700 text-slate-100`}
                      style={{
                        borderColor: colorMap[color],
                        borderStyle: styleMap[style],
                      }}
                    >
                      <strong className="block">Border preview</strong>
                      <span className="text-sm">
                        {color.replace("border-", "")} — {width}
                      </span>
                    </div>

                    {/* small examples using both Tailwind classes and inline color to ensure visibility */}
                    <div className="flex gap-3 flex-wrap items-center">
                      <div
                        className={`${radius} w-16 h-16 ${width} ${style} bg-slate-700 flex items-center justify-center text-white`}
                        style={{
                          borderColor: colorMap[color],
                          borderStyle: styleMap[style],
                        }}
                      >
                        AV
                      </div>

                      <button
                        className={`${radius} ${width} ${style} px-4 py-2 bg-blue-600 text-white`}
                        style={{
                          borderColor: colorMap[color],
                          borderStyle: styleMap[style],
                        }}
                      >
                        Primary
                      </button>

                      <div
                        className={`px-3 py-1 ${width} ${style} ${radius} bg-slate-700 text-sm`}
                        style={{
                          borderColor: colorMap[color],
                          borderStyle: styleMap[style],
                        }}
                      >
                        Badge
                      </div>

                      {/* visible swatch (thick border) so color is unmistakable */}
                      <div className="flex items-center gap-2 ml-2">
                        <div
                          className="w-10 h-10 rounded-sm border-4"
                          style={{
                            borderColor: colorMap[color],
                            background: "#111827",
                          }}
                          aria-hidden
                        />
                        <div className="text-sm text-muted-foreground">
                          <div>{color}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-3">
                    Tip: combine a visible color + width. If you want the border
                    to never shift layout at focus, use ring/outline utilities
                    for focus state instead.
                  </p>

                  <CodeBlock code={playgroundMarkup} language="jsx" />
                </div>
              </div>
            </div>
          </section>

          {/* Real world examples */}
          <section className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold">
              Real-World Examples — visuals & code
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Featured product tile (fixed) */}
              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">
                    Featured product tile
                  </h3>
                  <button
                    onClick={() =>
                      copyToClipboard("border-4 border-purple-500 rounded-lg")
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3">
                  <div
                    className="border-4 rounded-lg p-4 bg-slate-700"
                    style={{ borderColor: "#a855f7" }}
                  >
                    <div className="font-semibold text-slate-100">
                      Limited edition
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Use a bold frame to highlight a product.
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<div class="border-4 border-purple-500 rounded-lg p-4">Featured</div>`}
                  />
                </div>
              </article>

              {/* Avatar with colored ring (fixed) */}
              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">Avatar with ring</h3>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        "border-2 border-green-500 rounded-full ring ring-green-300"
                      )
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3 flex items-center gap-4">
                  <div className="relative">
                    <div
                      className="w-14 h-14 rounded-full bg-slate-700 flex items-center justify-center text-white"
                      style={{ border: "2px solid #22c55e" }}
                    >
                      AL
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full ring-2 ring-background" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-200">
                      Alex Park
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Designer
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<div class="rounded-full border-2 border-green-500">Avatar</div>`}
                  />
                </div>
              </article>

              {/* Input focus visual (kept, clarifed) */}
              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">Input focus accent</h3>
                  <button
                    onClick={() =>
                      copyToClipboard("focus:border-2 focus:border-blue-600")
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3">
                  <label className="block text-sm text-slate-200 mb-2">
                    Search
                  </label>
                  <input
                    className="w-full px-3 py-2 rounded border border-border bg-slate-700 text-white focus:outline-none focus:border-2 focus:border-blue-600"
                    placeholder="Search..."
                  />
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<input class="focus:border-2 focus:border-blue-600" />`}
                  />
                </div>
              </article>

              {/* Table with colored dividers (kept) */}
              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">
                    Table with colored dividers
                  </h3>
                  <button
                    onClick={() => copyToClipboard("divide-y divide-gray-500")}
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3">
                  <div
                    className="divide-y"
                    style={{ borderColor: "rgba(148,163,184,0.6)" }}
                  >
                    <div className="py-3 text-slate-200">Row 1</div>
                    <div className="py-3 text-slate-200">Row 2</div>
                    <div className="py-3 text-slate-200">Row 3</div>
                  </div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<div class="divide-y divide-gray-500">...</div>`}
                  />
                </div>
              </article>

              {/* Pricing row with highlight (kept) */}
              <article className="md:col-span-2 border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">
                    Pricing row — highlighted plan
                  </h3>
                  <button
                    onClick={() =>
                      copyToClipboard("border-2 border-blue-600 rounded-md")
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-slate-700 rounded-md text-slate-200">
                    Basic
                  </div>
                  <div
                    className="p-3 rounded-md bg-slate-700 text-slate-100"
                    style={{ border: "2px solid #2563eb" }}
                  >
                    Pro — highlighted
                  </div>
                  <div className="p-3 bg-slate-700 rounded-md text-slate-200">
                    Enterprise
                  </div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<div class="border-2 border-blue-600 rounded-md">Highlighted plan</div>`}
                  />
                </div>
              </article>

              {/* New: Notification banner with colored left border */}
              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">
                    Notification banner (left accent)
                  </h3>
                  <button
                    onClick={() =>
                      copyToClipboard("border-l-4 border-blue-600 pl-3")
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3">
                  <div
                    className="bg-slate-700 p-3 rounded-md flex gap-3 items-start"
                    style={{ borderLeft: "4px solid #2563eb" }}
                  >
                    <div className="text-white text-foreground font-semibold">Update</div>
                    <div className="text-sm text-muted-foreground">
                      New features are available — check the changelog.
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<div class="border-l-4 border-blue-600 pl-3">...</div>`}
                  />
                </div>
              </article>

              {/* New: Product carousel tile (small frames) */}
              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">
                    Product carousel (framed tiles)
                  </h3>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        "grid grid-flow-col auto-cols-fr gap-4 border"
                      )
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3 overflow-x-auto">
                  <div className="flex gap-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="min-w-[180px] p-3 rounded bg-slate-700"
                        style={{ border: "1px solid rgba(148,163,184,0.2)" }}
                      >
                        <div className="font-semibold text-slate-100">
                          Product {i + 1}
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">
                          Short description
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<div class="grid grid-flow-col auto-cols-fr gap-4">...</div>`}
                  />
                </div>
              </article>

              {/* New: Billing card with left accent and subtle shadow */}
              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">
                    Billing card — accent border
                  </h3>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        "border-l-4 border-green-500 pl-4 rounded-md"
                      )
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3">
                  <div
                    className="rounded-md p-4 bg-slate-700 shadow-sm"
                    style={{ borderLeft: "4px solid #22c55e" }}
                  >
                    <div className="font-semibold text-slate-100">
                      Payment successful
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Your invoice has been paid.
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<div class="rounded-md p-4" style="border-left: 4px solid #22c55e">...</div>`}
                  />
                </div>
              </article>

              {/* Accessibility note */}
              <div className="md:col-span-2 text-sm text-muted-foreground">
                <strong>Accessibility & UX notes:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>
                    Do not rely on border color alone to convey state — combine
                    with icons or text for users with color-vision deficiencies.
                  </li>
                  <li>
                    Prefer outline/ring utilities for focus indication so layout
                    doesn't shift when border width changes on focus.
                  </li>
                  <li>
                    Ensure contrast between border color and background is
                    sufficient (especially for thin borders).
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
                <strong>Subtle separators:</strong> use neutral borders (e.g.,{" "}
                <code className="bg-slate-700 px-1 rounded">
                  border-gray-300
                </code>
                ) for dividers, and bold colored borders for emphasis.
              </li>
              <li>
                <strong>Focus vs state:</strong> prefer{" "}
                <code className="bg-slate-700 px-1 rounded">ring</code> or{" "}
                <code className="bg-slate-700 px-1 rounded">outline</code> for
                focus to avoid layout shift when border width changes.
              </li>
              <li>
                <strong>Combine with radius:</strong> a colored thin border with
                a small radius looks modern and crisp; use{" "}
                <code className="bg-slate-700 px-1 rounded">rounded-md</code> or{" "}
                <code className="bg-slate-700 px-1 rounded">rounded-lg</code>.
              </li>
              <li>
                <strong>Visual hierarchy:</strong> use border width + color to
                create a hierarchy — thin neutral borders for structure, thicker
                colored borders for featured items.
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
