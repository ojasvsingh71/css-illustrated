"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CodeBlock from "@/app/utilities/components/code-block"

export default function FlexSizingPage() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-foreground">Flex Sizing</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Control how flex items grow, shrink, and set their base size within a flex container.
            </p>
          </div>

          {/* Shorthand Utilities Section */}
          <div className="space-y-6 border-t border-border pt-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Flex Shorthand</h2>
              <p className="text-muted-foreground">Quick utility classes that set grow, shrink, and basis together.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { class: "flex-1", desc: "flex: 1 1 0% — Grows equally, shrinks equally" },
                { class: "flex-auto", desc: "flex: 1 1 auto — Grows and shrinks based on content" },
                { class: "flex-initial", desc: "flex: 0 1 auto — No growth, can shrink" },
                { class: "flex-none", desc: "flex: 0 0 auto — No growth, no shrink (fixed size)" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="border border-border rounded-lg p-4 hover:bg-card/50 transition cursor-pointer group"
                  onClick={() => copyToClipboard(item.class)}
                >
                  <code className="text-black text-sm font-mono text-accent font-semibold">{item.class}</code>
                  <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
                  <span className="text-xs text-muted-foreground mt-3 opacity-0 group-hover:opacity-100 transition">
                    Click to copy
                  </span>
                </div>
              ))}
            </div>

            {/* Shorthand Example */}
            <div className="border border-border rounded-lg p-6 bg-card/30">
              <h3 className="font-semibold text-foreground mb-4">Shorthand Demo</h3>
              <div className="space-y-6">
                {/* flex-1 demo */}
                <div className="space-y-2">
                  <p className="text-black text-sm font-mono text-accent">flex-1 (grows equally)</p>
                  <div className="flex gap-4 h-32 bg-slate-800 rounded p-4">
                    <div className="flex-1 bg-blue-500 rounded p-4 flex items-center justify-center text-white font-semibold">
                      Item 1
                    </div>
                    <div className="flex-1 bg-blue-400 rounded p-4 flex items-center justify-center text-white font-semibold">
                      Item 2
                    </div>
                    <div className="flex-1 bg-blue-300 rounded p-4 flex items-center justify-center text-white font-semibold">
                      Item 3
                    </div>
                  </div>
                </div>

                {/* flex-auto demo */}
                <div className="space-y-2">
                  <p className="text-black text-sm font-mono text-accent">flex-auto (grows based on content)</p>
                  <div className="flex gap-4 h-32 bg-slate-800 rounded p-4">
                    <div className="flex-auto bg-green-500 rounded p-4 flex items-center justify-center text-white font-semibold">
                      Short
                    </div>
                    <div className="flex-auto bg-green-400 rounded p-4 flex items-center justify-center text-white font-semibold">
                      Medium Content
                    </div>
                    <div className="flex-auto bg-green-300 rounded p-4 flex items-center justify-center text-white font-semibold">
                      Much Longer Content Here
                    </div>
                  </div>
                </div>

                {/* flex-initial demo */}
                <div className="space-y-2">
                  <p className="text-black text-sm font-mono text-accent">flex-initial (no growth, can shrink)</p>
                  <div className="flex gap-4 h-32 bg-slate-800 rounded p-4">
                    <div className="flex-initial bg-yellow-500 rounded p-4 flex items-center justify-center text-white font-semibold w-32">
                      Fixed Size
                    </div>
                    <div className="flex-1 bg-yellow-400 rounded p-4 flex items-center justify-center text-white font-semibold">
                      Grows to fill
                    </div>
                  </div>
                </div>

                {/* flex-none demo */}
                <div className="space-y-2">
                  <p className="text-black text-sm font-mono text-accent">flex-none (no growth, no shrink)</p>
                  <div className="flex gap-4 h-32 bg-slate-800 rounded p-4">
                    <div className="flex-none bg-red-500 rounded p-4 flex items-center justify-center text-white font-semibold w-24">
                      Fixed
                    </div>
                    <div className="flex-none bg-red-400 rounded p-4 flex items-center justify-center text-white font-semibold w-24">
                      Fixed
                    </div>
                    <div className="flex-1 bg-red-300 rounded p-4 flex items-center justify-center text-white font-semibold">
                      Grows
                    </div>
                  </div>
                </div>
              </div>
              <CodeBlock
                code={`<!-- flex-1: All items grow equally -->
<div class="flex gap-4 h-32">
  <div class="flex-1 bg-blue-500 rounded p-4">Item 1</div>
  <div class="flex-1 bg-blue-400 rounded p-4">Item 2</div>
  <div class="flex-1 bg-blue-300 rounded p-4">Item 3</div>
</div>

<!-- flex-initial: No growth -->
<div class="flex gap-4 h-32">
  <div class="flex-initial bg-green-500 rounded p-4">Fixed</div>
  <div class="flex-1 bg-green-400 rounded p-4">Grows</div>
</div>`}
                language="jsx"
              />
            </div>
          </div>

          {/* Flex Grow Section */}
          <div className="space-y-6 border-t border-border pt-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Flex Grow</h2>
              <p className="text-muted-foreground">Control how flex items expand to fill available space.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { class: "flex-grow-0", desc: "flex-grow: 0 — No growth" },
                { class: "flex-grow", desc: "flex-grow: 1 — Grow proportionally" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="border border-border rounded-lg p-4 hover:bg-card/50 transition cursor-pointer group"
                  onClick={() => copyToClipboard(item.class)}
                >
                  <code className="text-black text-sm font-mono text-accent font-semibold">{item.class}</code>
                  <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="border border-border rounded-lg p-6 bg-card/30">
              <h3 className="font-semibold text-foreground mb-4">Grow Demo</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-black text-sm font-mono text-accent">flex-grow-0 + flex-grow comparison</p>
                  <div className="flex gap-4 h-24 bg-slate-800 rounded p-4">
                    <div className="flex-grow-0 w-24 bg-purple-600 rounded p-4 flex items-center justify-center text-white font-semibold text-sm">
                      Fixed 6rem
                    </div>
                    <div className="flex-grow bg-purple-400 rounded p-4 flex items-center justify-center text-white font-semibold text-sm">
                      Grows
                    </div>
                    <div className="flex-grow bg-purple-300 rounded p-4 flex items-center justify-center text-white font-semibold text-sm">
                      Grows
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-black text-sm font-mono text-accent">All items with flex-grow (equal distribution)</p>
                  <div className="flex gap-4 h-24 bg-slate-800 rounded p-4">
                    <div className="flex-grow bg-indigo-500 rounded p-4 flex items-center justify-center text-white font-semibold text-sm">
                      Grows 1
                    </div>
                    <div className="flex-grow bg-indigo-400 rounded p-4 flex items-center justify-center text-white font-semibold text-sm">
                      Grows 1
                    </div>
                    <div className="flex-grow bg-indigo-300 rounded p-4 flex items-center justify-center text-white font-semibold text-sm">
                      Grows 1
                    </div>
                  </div>
                </div>
              </div>
              <CodeBlock
                code={`<div class="flex gap-4 h-24">
  <div class="flex-grow-0 w-24 bg-purple-500 rounded p-4">Fixed</div>
  <div class="flex-grow bg-purple-400 rounded p-4">Grows</div>
  <div class="flex-grow bg-purple-300 rounded p-4">Grows</div>
</div>`}
                language="jsx"
              />
            </div>
          </div>

          {/* Flex Shrink Section */}
          <div className="space-y-6 border-t border-border pt-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Flex Shrink</h2>
              <p className="text-muted-foreground">Control how flex items compress when space is limited.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { class: "flex-shrink-0", desc: "flex-shrink: 0 — No shrinking (maintains size)" },
                { class: "flex-shrink", desc: "flex-shrink: 1 — Shrink proportionally" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="border border-border rounded-lg p-4 hover:bg-card/50 transition cursor-pointer group"
                  onClick={() => copyToClipboard(item.class)}
                >
                  <code className="text-black text-sm font-mono text-accent font-semibold">{item.class}</code>
                  <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="border border-border rounded-lg p-6 bg-card/30">
              <h3 className="font-semibold text-foreground mb-4">Shrink Demo (Container is constrained)</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-black text-sm font-mono text-accent">Mixed shrink behavior</p>
                  <div className="flex gap-4 w-96 overflow-x-auto bg-slate-800 rounded p-4">
                    <div className="flex-shrink-0 w-32 bg-orange-600 rounded p-4 flex items-center justify-center text-white font-semibold text-sm whitespace-nowrap">
                      No Shrink (fixed 8rem)
                    </div>
                    <div className="flex-shrink w-32 bg-orange-400 rounded p-4 flex items-center justify-center text-white font-semibold text-sm whitespace-nowrap">
                      Shrinks
                    </div>
                    <div className="flex-shrink w-32 bg-orange-300 rounded p-4 flex items-center justify-center text-white font-semibold text-sm whitespace-nowrap">
                      Shrinks
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Resize your browser to see shrinking in action</p>
                </div>
              </div>
              <CodeBlock
                code={`<!-- Container is constrained - items must shrink -->
<div class="flex gap-4 w-96 overflow-x-auto">
  <div class="flex-shrink-0 w-32 bg-orange-500 rounded p-4 whitespace-nowrap">No Shrink (fixed 32)</div>
  <div class="flex-shrink w-32 bg-orange-400 rounded p-4 whitespace-nowrap">Shrinks</div>
  <div class="flex-shrink w-32 bg-orange-300 rounded p-4 whitespace-nowrap">Shrinks</div>
</div>`}
                language="jsx"
              />
            </div>
          </div>

          {/* Flex Basis Section */}
          <div className="space-y-6 border-t border-border pt-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Flex Basis</h2>
              <p className="text-muted-foreground">
                Set the default size of a flex item before growth/shrink calculations.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                { class: "basis-0", desc: "flex-basis: 0" },
                { class: "basis-auto", desc: "flex-basis: auto" },
                { class: "basis-1/4", desc: "flex-basis: 25%" },
                { class: "basis-1/3", desc: "flex-basis: 33.333%" },
                { class: "basis-1/2", desc: "flex-basis: 50%" },
                { class: "basis-full", desc: "flex-basis: 100%" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="border border-border rounded-lg p-4 hover:bg-card/50 transition cursor-pointer group"
                  onClick={() => copyToClipboard(item.class)}
                >
                  <code className="text-black text-sm font-mono text-accent font-semibold">{item.class}</code>
                  <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="border border-border rounded-lg p-6 bg-card/30">
              <h3 className="font-semibold text-foreground mb-4">Basis Demo</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-black text-sm font-mono text-accent">basis sizing without growth</p>
                  <div className="flex gap-4 h-32 bg-slate-800 rounded p-4">
                    <div className="basis-1/4 bg-red-600 rounded p-4 flex items-center justify-center text-white font-semibold text-sm">
                      basis-1/4
                    </div>
                    <div className="basis-1/2 bg-red-400 rounded p-4 flex items-center justify-center text-white font-semibold text-sm">
                      basis-1/2
                    </div>
                    <div className="basis-1/4 bg-red-300 rounded p-4 flex items-center justify-center text-white font-semibold text-sm">
                      basis-1/4
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-black text-sm font-mono text-accent">basis as starting point with flex-grow</p>
                  <div className="flex gap-4 h-32 bg-slate-800 rounded p-4">
                    <div className="basis-1/3 flex-grow bg-pink-600 rounded p-4 flex items-center justify-center text-white font-semibold text-sm">
                      1/3 + grow
                    </div>
                    <div className="basis-1/3 flex-grow bg-pink-400 rounded p-4 flex items-center justify-center text-white font-semibold text-sm">
                      1/3 + grow
                    </div>
                    <div className="basis-1/3 flex-grow bg-pink-300 rounded p-4 flex items-center justify-center text-white font-semibold text-sm">
                      1/3 + grow
                    </div>
                  </div>
                </div>
              </div>
              <CodeBlock
                code={`<!-- Items start at different basis sizes, then flex -->
<div class="flex gap-4 h-32">
  <div class="basis-1/4 bg-red-500 rounded p-4">25%</div>
  <div class="basis-1/2 bg-red-400 rounded p-4">50%</div>
  <div class="basis-1/4 bg-red-300 rounded p-4">25%</div>
</div>

<!-- With growth - basis is starting point -->
<div class="flex gap-4 h-32">
  <div class="basis-1/3 flex-grow bg-pink-500 rounded p-4">1/3 + grow</div>
  <div class="basis-1/3 flex-grow bg-pink-400 rounded p-4">1/3 + grow</div>
  <div class="basis-1/3 flex-grow bg-pink-300 rounded p-4">1/3 + grow</div>
</div>`}
                language="jsx"
              />
            </div>
          </div>

          {/* Real-World Examples */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold text-foreground">Real-World Examples</h2>

            {/* Horizontal Nav */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">Navigation with Spacing</h3>
              <CodeBlock
                code={`<nav class="flex items-center justify-between gap-4 p-4 bg-slate-800">
  <div class="font-bold text-white">Logo</div>
  <div class="flex gap-6 flex-1 justify-center">
    <a href="#" class="text-white hover:text-blue-400">Home</a>
    <a href="#" class="text-white hover:text-blue-400">About</a>
    <a href="#" class="text-white hover:text-blue-400">Contact</a>
  </div>
  <button class="px-4 py-2 bg-blue-600 text-white rounded">Sign In</button>
</nav>`}
                language="jsx"
              />
            </div>

            {/* Responsive Cards */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">Responsive Columns with Grow/Shrink</h3>
              <CodeBlock
                code={`<div class="flex gap-4 flex-wrap">
  <div class="flex-1 basis-64 bg-slate-700 rounded p-6 min-h-40">
    <h3 class="font-bold text-white mb-2">Card 1</h3>
    <p class="text-slate-300">Grows on large screens, wraps on small</p>
  </div>
  <div class="flex-1 basis-64 bg-slate-700 rounded p-6 min-h-40">
    <h3 class="font-bold text-white mb-2">Card 2</h3>
    <p class="text-slate-300">Responsive flex basis</p>
  </div>
  <div class="flex-1 basis-64 bg-slate-700 rounded p-6 min-h-40">
    <h3 class="font-bold text-white mb-2">Card 3</h3>
    <p class="text-slate-300">Maintains aspect</p>
  </div>
</div>`}
                language="jsx"
              />
            </div>

            {/* Form Layout */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">Form with Fixed and Flexible Inputs</h3>
              <CodeBlock
                code={`<form class="flex gap-4 items-end">
  <div class="flex-1">
    <label class="block text-sm font-medium text-white mb-2">Email</label>
    <input type="email" class="w-full px-3 py-2 bg-slate-700 rounded border border-slate-600" />
  </div>
  <button class="flex-shrink-0 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    Submit
  </button>
</form>`}
                language="jsx"
              />
            </div>

            {/* Sidebar Layout */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">Sidebar + Main Content</h3>
              <CodeBlock
                code={`<div class="flex gap-6 min-h-screen">
  <aside class="flex-shrink-0 w-64 bg-slate-800 p-6">
    <h3 class="font-bold text-white mb-4">Sidebar</h3>
    <!-- Fixed width sidebar -->
  </aside>
  <main class="flex-1 p-6 bg-slate-900">
    <!-- Main content grows to fill space -->
  </main>
</div>`}
                language="jsx"
              />
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-foreground">Tips & Common Patterns</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="flex gap-2">
                <span className="text-blue-400">•</span>
                <span>
                  Use <code className="bg-slate-700 px-1 rounded">flex-1</code> to create equal-width columns that adapt
                  to container
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">•</span>
                <span>
                  Combine <code className="bg-slate-700 px-1 rounded">basis-{"{size}"}</code> with{" "}
                  <code className="bg-slate-700 px-1 rounded">flex-grow</code> for responsive grids
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">•</span>
                <span>
                  Use <code className="bg-slate-700 px-1 rounded">flex-shrink-0</code> to prevent items from shrinking
                  below their size
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">•</span>
                <span>
                  Use <code className="bg-slate-700 px-1 rounded">flex-none</code> for fixed-size sidebars or buttons in
                  flex containers
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
