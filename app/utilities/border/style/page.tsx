"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "@/app/utilities/components/code-block";

type BorderWidth = "border" | "border-2" | "border-4" | "border-0";
type BorderRadius =
  | "rounded-none"
  | "rounded"
  | "rounded-md"
  | "rounded-lg"
  | "rounded-full";

type BorderStyleClass =
  | "border-solid"
  | "border-dashed"
  | "border-dotted"
  | "border-double"
  | "border-none";

export default function BorderStylePage() {
  const [copied, setCopied] = useState<string | null>(null);

  // Playground state
  const [style, setStyle] = useState<BorderStyleClass>("border-solid");
  const [width, setWidth] = useState<BorderWidth>("border");
  const [radius, setRadius] = useState<BorderRadius>("rounded-md");
  const [showShadow, setShowShadow] = useState(true);
  const [color, setColor] = useState("#2563eb");

  const styleUtilities: { cls: BorderStyleClass; desc: string }[] = [
    { cls: "border-solid", desc: "Continuous stroke (default)" },
    { cls: "border-dashed", desc: "Dashed — good for placeholders" },
    { cls: "border-dotted", desc: "Dotted — subtle decorative" },
    { cls: "border-double", desc: "Double line — high emphasis" },
    { cls: "border-none", desc: "No visible border" },
  ];

  const borderWidths: BorderWidth[] = [
    "border",
    "border-2",
    "border-4",
    "border-0",
  ];
  const borderRadii: BorderRadius[] = [
    "rounded-none",
    "rounded",
    "rounded-md",
    "rounded-lg",
    "rounded-full",
  ];

  const styleMap: Record<BorderStyleClass, string> = {
    "border-solid": "solid",
    "border-dashed": "dashed",
    "border-dotted": "dotted",
    "border-double": "double",
    "border-none": "none",
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      setTimeout(() => setCopied(null), 1400);
    } catch {
      setCopied(null);
    }
  };

  const playgroundMarkup = `<div class="${width} ${style} ${radius} p-4" style="border-color: ${color};">\n  Preview content\n</div>`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-foreground">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Border Style</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore how different border styles affect rhythm and emphasis —
              dashed placeholders, dotted badges, double frames for emphasis,
              and when to hide borders entirely.
            </p>
          </div>

          {/* Utilities */}
          <section className="space-y-6 border-t border-border pt-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Border style utilities</h2>
              <p className="text-muted-foreground">Click a class to copy it.</p>
            </div>

            <div className="grid md:grid-cols-5 gap-4">
              {styleUtilities.map((u) => (
                <button
                  key={u.cls}
                  onClick={() => copyToClipboard(u.cls)}
                  className="text-left border border-border rounded-lg p-4 hover:bg-card/50 transition flex flex-col group cursor-pointer"
                  aria-label={`Copy ${u.cls}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-14 h-6 rounded-sm flex items-center justify-center ${u.cls}`}
                        style={{
                          background: "transparent",
                          borderColor: color,
                          borderWidth: 2,
                        }}
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
              Toggle style, width, radius and color.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Controls */}
              <div className="space-y-3 md:col-span-1">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Style
                  </label>
                  <div className="flex gap-2">
                    {styleUtilities.map((s) => (
                      <button
                        key={s.cls}
                        onClick={() => setStyle(s.cls)}
                        className={`px-3 py-1 rounded border text-sm ${
                          style === s.cls
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-border"
                        }`}
                      >
                        {s.cls.replace("border-", "")}
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
                          : w === "border-4"
                          ? "4px"
                          : "0"}
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
                    Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-10 h-8 p-1 rounded border-border"
                    />
                    <div className="text-sm text-muted-foreground">{color}</div>
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
                        copyToClipboard(`${width} ${style} ${radius}`)
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
                      className={`mb-4 ${width} ${style} ${radius} p-6 ${
                        showShadow ? "shadow-md" : ""
                      } bg-slate-700 text-slate-100`}
                      style={{
                        borderColor: color,
                        borderStyle: styleMap[style],
                      }}
                    >
                      <strong className="block">Border preview</strong>
                      <span className="text-sm">
                        {style.replace("border-", "")} — {width}
                      </span>
                    </div>

                    <div className="flex gap-3 flex-wrap items-center">
                      <div
                        className={`${radius} w-16 h-16 ${width} ${style} bg-slate-700 flex items-center justify-center text-white`}
                        style={{
                          borderColor: color,
                          borderStyle: styleMap[style],
                        }}
                      >
                        AV
                      </div>

                      <button
                        className={`${radius} ${width} ${style} px-4 py-2 bg-blue-600 text-white`}
                        style={{
                          borderColor: color,
                          borderStyle: styleMap[style],
                        }}
                      >
                        Primary
                      </button>

                      <div
                        className={`px-3 py-1 ${width} ${style} ${radius} bg-slate-700 text-sm`}
                        style={{
                          borderColor: color,
                          borderStyle: styleMap[style],
                        }}
                      >
                        Badge
                      </div>

                      <div className="flex items-center gap-2 ml-2">
                        <div
                          className="w-10 h-10 rounded-sm"
                          style={{
                            border: `4px ${styleMap[style]} ${color}`,
                            background: "#111827",
                          }}
                          aria-hidden
                        />
                        <div className="text-sm text-muted-foreground">
                          <div>{style}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-3">
                    Tip: use dashed/dotted for placeholders and low-importance
                    boundaries. Use double and thicker widths for feature cards
                    or visual emphasis. If you need focus affordance, prefer
                    ring utilities to avoid layout shift.
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
              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">
                    Dashed file placeholder
                  </h3>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<div class="border-dashed rounded-md p-4">...</div>`
                      )
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3">
                  <div
                    className="rounded-md p-4"
                    style={{ border: `2px dashed rgba(99,102,241,0.9)` }}
                  >
                    <div className="font-semibold text-slate-100">Upload</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Drop files here
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<div class="border-dashed rounded-md p-4">...</div>`}
                  />
                </div>
              </article>

              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">
                    Double-framed feature
                  </h3>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<div class="border-double border-4 rounded-lg">...</div>`
                      )
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3">
                  <div
                    className="rounded-lg p-4"
                    style={{ border: `4px double #a855f7` }}
                  >
                    <div className="font-semibold text-slate-100">Premium</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Double border for emphasis
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<div class="border-double border-4 rounded-lg">...</div>`}
                  />
                </div>
              </article>

              <article className="md:col-span-2 border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">
                    Borderless input / clean UI
                  </h3>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<input class="border-none focus:ring-2 focus:ring-blue-600" />`
                      )
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3">
                  <input
                    className="w-full px-3 py-2 rounded bg-slate-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Search or command..."
                  />
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<input class="border-none focus:ring-2 focus:ring-blue-600" />`}
                  />
                </div>
              </article>

              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">
                    Validation input (dashed)
                  </h3>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<input class="border-dashed border-2 rounded-md" />`
                      )
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3">
                  <label className="block text-sm text-slate-200 mb-2">
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 rounded bg-slate-700 text-white"
                    placeholder="you@example.com"
                    style={{ border: `2px dashed rgba(239,68,68,0.9)` }}
                  />
                  <div className="text-xs text-rose-400 mt-2">
                    Please enter a valid email
                  </div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<input class="border-dashed border-2 rounded-md" />`}
                  />
                </div>
              </article>

              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">
                    Inset dotted divider
                  </h3>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<div style={{borderTop: '1px dotted rgba(148,163,184,0.5)'}}>...</div>`
                      )
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3">
                  <div className="text-white rounded-md p-3 bg-slate-700">
                    <div className="pb-3">Item A</div>
                    <div
                      className="py-3"
                      style={{ borderTop: `1px dotted rgba(148,163,184,0.5)` }}
                    >
                      Item B
                    </div>
                    <div className="pt-3">Item C</div>
                  </div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<div style={{borderTop: '1px dotted rgba(148,163,184,0.5)'}}>...</div>`}
                  />
                </div>
              </article>

              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">
                    Stepper with dotted connectors
                  </h3>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<div style={{borderTop: '2px dotted rgba(148,163,184,0.6)'}}/>`
                      )
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-700 text-white"
                      style={{ border: `2px solid rgba(99,102,241,0.9)` }}
                    >
                      1
                    </div>
                    <div
                      style={{
                        width: 60,
                        borderTop: `2px dotted rgba(148,163,184,0.6)`,
                      }}
                      aria-hidden
                    />
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-700 text-white"
                      style={{ border: `2px solid rgba(148,163,184,0.6)` }}
                    >
                      2
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Progress stepper uses dotted connectors for a lighter feel.
                  </div>
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<div style={{borderTop: '2px dotted rgba(148,163,184,0.6)'}}/>`}
                  />
                </div>
              </article>

              <article className="border border-border rounded-lg p-4 bg-card/20">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">
                    Resizable panel handle (dashed)
                  </h3>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `<div style={{borderLeft: '2px dashed rgba(148,163,184,0.5)'}}/>`
                      )
                    }
                    className="text-xs px-2 py-1 rounded bg-muted/10 cursor-pointer"
                  >
                    Copy
                  </button>
                </div>

                <div className="bg-slate-800 rounded p-3 flex items-center gap-4">
                  <div className="flex-1 text-slate-200">Content area</div>
                  <div
                    className="w-6 h-8 rounded-sm"
                    style={{ borderLeft: `2px dashed rgba(148,163,184,0.5)` }}
                    aria-hidden
                  />
                </div>

                <div className="mt-3">
                  <CodeBlock
                    language="jsx"
                    code={`<div style={{borderLeft: '2px dashed rgba(148,163,184,0.5)'}}/>`}
                  />
                </div>
              </article>

              <div className="md:col-span-2 text-sm text-muted-foreground">
                <strong>Accessibility & UX notes:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>
                    Don't rely on style alone — combine with labels and icons.
                  </li>
                  <li>
                    Thin dotted or dashed borders may need higher contrast on
                    dark backgrounds.
                  </li>
                  <li>
                    For keyboard focus, prefer ring/outline utilities so layout
                    doesn't shift.
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
                <strong>Use dashed/dotted</strong> for placeholders and optional
                elements.
              </li>
              <li>
                <strong>Reserve double</strong> for high emphasis (but use
                sparingly).
              </li>
              <li>
                <strong>Hide borders</strong> when you prefer minimal, clean
                surfaces — provide an alternative focus indicator.
              </li>
              <li>
                <strong>Combine</strong> style + width + color for clear visual
                language (e.g., subtle dotted neutral for badges; solid colored
                for status).
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
