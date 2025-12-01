"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "@/app/utilities/components/code-block";

export default function FlexDirectionPage() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const utilities = [
    { className: "flex-row", desc: "Row direction (left to right)" },
    { className: "flex-col", desc: "Column direction (top to bottom)" },
    { className: "flex-row-reverse", desc: "Row reverse (right to left)" },
    { className: "flex-col-reverse", desc: "Column reverse (bottom to top)" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {/* apply default readable text color to all content here */}
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-foreground">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-foreground">
              Flex Direction
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Control the direction flex items are laid out.
            </p>
          </div>

          {/* Utilities Grid */}
          <div className="space-y-6 border-t border-border pt-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                Flex Direction Utilities
              </h2>
              <p className="text-muted-foreground">
                Quick utility classes for controlling layout flow.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {utilities.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-border rounded-lg p-4 hover:bg-card/50 transition cursor-pointer group"
                  onClick={() => copyToClipboard(item.className)}
                >
                  <code className="text-black text-sm font-mono text-accent font-semibold">
                    {item.className}
                  </code>
                  <p className="text-sm text-muted-foreground mt-2">
                    {item.desc}
                  </p>
                  <span className="text-xs text-muted-foreground mt-3 opacity-0 group-hover:opacity-100 transition">
                    Click to copy
                  </span>
                </div>
              ))}
            </div>

            {/* Demo Section */}
            <div className="border border-border rounded-lg p-6 bg-card/30">
              <h3 className="font-semibold text-foreground mb-4">
                Direction Demos
              </h3>
              <div className="space-y-6">
                {/* flex-row */}
                <div className="space-y-2">
                  <p className="text-black text-sm font-mono text-accent">
                    flex-row (horizontal)
                  </p>
                  <div className="flex gap-4 h-32 bg-slate-800 rounded p-4 items-center">
                    <div className="flex-row flex gap-4 w-full">
                      <div className="px-4 py-2 bg-blue-500 rounded text-white font-semibold flex items-center justify-center">
                        Item 1
                      </div>
                      <div className="px-4 py-2 bg-blue-400 rounded text-white font-semibold flex items-center justify-center">
                        Item 2
                      </div>
                      <div className="px-4 py-2 bg-blue-300 rounded text-white font-semibold flex items-center justify-center">
                        Item 3
                      </div>
                    </div>
                  </div>
                </div>

                {/* flex-col */}
                <div className="space-y-2">
                  <p className="text-black text-sm font-mono text-accent">
                    flex-col (vertical)
                  </p>
                  <div
                    className="flex gap-4 bg-slate-800 rounded p-4"
                    style={{ height: 200 }}
                  >
                    <div className="flex-col flex gap-3 w-full items-center justify-center">
                      <div className="px-4 py-2 bg-green-500 rounded text-white font-semibold w-40 text-center">
                        Item 1
                      </div>
                      <div className="px-4 py-2 bg-green-400 rounded text-white font-semibold w-40 text-center">
                        Item 2
                      </div>
                      <div className="px-4 py-2 bg-green-300 rounded text-white font-semibold w-40 text-center">
                        Item 3
                      </div>
                    </div>
                  </div>
                </div>

                {/* flex-row-reverse */}
                <div className="space-y-2">
                  <p className="text-black text-sm font-mono text-accent">
                    flex-row-reverse (horizontal, reversed)
                  </p>
                  <div className="flex gap-4 h-32 bg-slate-800 rounded p-4 items-center">
                    <div className="flex-row-reverse flex gap-4 w-full">
                      <div className="px-4 py-2 bg-purple-300 rounded text-white font-semibold flex items-center justify-center">
                        Item 1
                      </div>
                      <div className="px-4 py-2 bg-purple-400 rounded text-white font-semibold flex items-center justify-center">
                        Item 2
                      </div>
                      <div className="px-4 py-2 bg-purple-500 rounded text-white font-semibold flex items-center justify-center">
                        Item 3
                      </div>
                    </div>
                  </div>
                </div>

                {/* flex-col-reverse */}
                <div className="space-y-2">
                  <p className="text-black text-sm font-mono text-accent">
                    flex-col-reverse (vertical, reversed)
                  </p>
                  <div
                    className="flex gap-4 bg-slate-800 rounded p-4"
                    style={{ height: 200 }}
                  >
                    <div className="flex-col-reverse flex gap-3 w-full items-center justify-center">
                      <div className="px-4 py-2 bg-rose-300 rounded text-white font-semibold w-40 text-center">
                        Item 1
                      </div>
                      <div className="px-4 py-2 bg-rose-400 rounded text-white font-semibold w-40 text-center">
                        Item 2
                      </div>
                      <div className="px-4 py-2 bg-rose-500 rounded text-white font-semibold w-40 text-center">
                        Item 3
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <CodeBlock
                code={`<!-- Row (default) -->
<div class="flex flex-row gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Column -->
<div class="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>`}
                language="jsx"
              />
            </div>
          </div>

          {/* Real-World Examples */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold text-foreground">
              Real-World Examples
            </h2>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">
                Responsive Nav (row on desktop, column on mobile)
              </h3>
              <CodeBlock
                code={`<nav class="flex md:flex-row flex-col items-center gap-4 p-4 bg-slate-800">
  <div class="font-bold text-white">Logo</div>
  <div class="flex gap-4 flex-1 justify-center">
    <a href="#" class="text-white">Home</a>
    <a href="#" class="text-white">About</a>
    <a href="#" class="text-white">Contact</a>
  </div>
  <button class="px-4 py-2 bg-blue-600 text-white rounded">Sign In</button>
</nav>`}
                language="jsx"
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">
                Stacked Sidebar (column)
              </h3>
              <CodeBlock
                code={`<div class="flex">
  <aside class="flex flex-col w-56 p-4 bg-slate-800">
    <a class="py-2">Link 1</a>
    <a class="py-2">Link 2</a>
    <a class="py-2">Link 3</a>
  </aside>
  <main class="flex-1 p-6">Main content</main>
</div>`}
                language="jsx"
              />
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-foreground">Tips & Patterns</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="flex gap-2">
                <span className="text-blue-400">•</span>
                <span>
                  Use{" "}
                  <code className="bg-slate-700 px-1 rounded">flex-col</code>{" "}
                  for stacked, vertical UIs (forms, sidebars).
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">•</span>
                <span>
                  Combine responsive variants like{" "}
                  <code className="bg-slate-700 px-1 rounded">md:flex-row</code>{" "}
                  with{" "}
                  <code className="bg-slate-700 px-1 rounded">flex-col</code>{" "}
                  for mobile-first layouts.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">•</span>
                <span>
                  Use{" "}
                  <code className="bg-slate-700 px-1 rounded">*-reverse</code>{" "}
                  utilities to reverse visual order while keeping DOM order for
                  accessibility where needed.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
