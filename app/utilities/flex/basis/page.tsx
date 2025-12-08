"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CodeBlock from "@/app/utilities/components/code-block"

// Animated flex item component
function FlexItem({
  color,
  label,
  basis,
  grow = 0,
  shrink = 1,
}: {
  color: string
  label: string
  basis: string
  grow?: number
  shrink?: number
}) {
  return (
    <div
      className="rounded p-4 text-white font-semibold flex items-center justify-center transition-all duration-1000"
      style={{
        flexBasis: basis,
        flexGrow: grow,
        flexShrink: shrink,
        backgroundColor: color,
      }}
    >
      {label}
    </div>
  )
}

export default function FlexBasisPage() {
  const [demo1Basis, setDemo1Basis] = useState(true)

  // NEW: Demo 2 + Demo 3 animated state
  const [demo2Cycle, setDemo2Cycle] = useState(0)
  const [demo3Cycle, setDemo3Cycle] = useState(0)

  useEffect(() => {
    // Demo 1 animation
    const interval1 = setInterval(() => setDemo1Basis((prev) => !prev), 2500)

    // Demo 2 animation (cycle through 3 patterns)
    const interval2 = setInterval(() => {
      setDemo2Cycle((n) => (n + 1) % 3)
    }, 2200)

    // Demo 3 animation (basis pulses)
    const interval3 = setInterval(() => {
      setDemo3Cycle((n) => (n + 1) % 2)
    }, 2000)

    return () => {
      clearInterval(interval1)
      clearInterval(interval2)
      clearInterval(interval3)
    }
  }, [])

  const flexBasisClasses = [
    { class: "basis-0", desc: "flex-basis: 0 — starts from zero and grows/shrinks based on flex rules" },
    { class: "basis-auto", desc: "flex-basis: auto — item size depends on content" },
    { class: "basis-1/4", desc: "flex-basis: 25% of container width" },
    { class: "basis-1/3", desc: "flex-basis: 33.33% of container width" },
    { class: "basis-1/2", desc: "flex-basis: 50% of container width" },
    { class: "basis-full", desc: "flex-basis: 100% — takes full container width" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* Section 1: Description */}
          <div className="space-y-4 text-center">
            <h1 className="text-5xl font-bold text-foreground">Flex Basis</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Flex-basis sets the <span className="font-semibold">initial main size</span> of a flex item before it grows
              or shrinks. Think of it as the “starting width” of a flex item. When combined with{" "}
              <code className="bg-slate-700 px-1 rounded">flex-grow</code> and{" "}
              <code className="bg-slate-700 px-1 rounded">flex-shrink</code>, you get powerful responsive layouts.
            </p>
          </div>

          {/* Section 2: Grid of Classes */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold text-foreground">Flex-Basis Utility Classes</h2>
            <p className="text-muted-foreground">Click to copy a class to use in your layout.</p>
            <div className="grid md:grid-cols-3 gap-4">
              {flexBasisClasses.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-border rounded-lg p-4 hover:bg-card/50 transition cursor-pointer group"
                  onClick={() => navigator.clipboard.writeText(item.class)}
                >
                  <code className="text-black text-sm font-mono text-accent font-semibold">{item.class}</code>
                  <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
                  <span className="text-xs text-muted-foreground mt-3 opacity-0 group-hover:opacity-100 transition">
                    Click to copy
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Animated Demonstrations */}
          <div className="space-y-6 border-t border-border pt-8">
            <h2 className="text-3xl font-bold text-foreground">Animated Demonstrations</h2>

            {/* Demo 1 */}
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">
                <strong>Demo 1:</strong> Two items switch between <em>25%</em> and <em>50%</em> basis values. This shows how{" "}
                <code className="bg-slate-700 px-1 rounded">flex-basis</code> controls starting width dynamically.
              </p>

              <div className="flex gap-4 h-32 bg-slate-800 rounded p-4 overflow-hidden">
                <FlexItem color="#f56565" label="25% → 50%" basis={demo1Basis ? "25%" : "50%"} grow={1} />
                <FlexItem color="#ed8936" label="50% → 25%" basis={demo1Basis ? "50%" : "25%"} grow={1} />
                <FlexItem color="#48bb78" label="Fixed 25%" basis="25%" grow={1} />
              </div>
            </div>

            {/* Demo 2 (Full animation fix) */}
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">
                <strong>Demo 2:</strong> Items animate through multiple basis values while using{" "}
                <code className="bg-slate-700 px-1 rounded">flex-grow</code> to fill remaining space dynamically.
              </p>

              <div className="flex gap-4 h-32 bg-slate-800 rounded p-4 transition-all duration-1000">
                <FlexItem
                  color="#63b3ed"
                  label="33% + grow"
                  basis={["30%", "25%", "35%"][demo2Cycle]}
                  grow={1}
                />
                <FlexItem
                  color="#4299e1"
                  label="33% + grow"
                  basis={["30%", "30%", "25%"][demo2Cycle]}
                  grow={1}
                />
                <FlexItem
                  color="#3182ce"
                  label="33% + grow"
                  basis={["30%", "45%", "40%"][demo2Cycle]}
                  grow={1}
                />
              </div>
            </div>

            {/* Demo 3 (Animated shrink demo) */}
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">
                <strong>Demo 3:</strong> Basis values pulse between two sizes to demonstrate how{" "}
                <code className="bg-slate-700 px-1 rounded">flex-shrink</code> affects overflow behavior.
              </p>

              <div className="flex gap-4 w-96 overflow-x-auto bg-slate-800 rounded p-4 transition-all duration-1000">
                <FlexItem
                  color="#f6ad55"
                  label="No shrink"
                  basis={demo3Cycle ? "180px" : "130px"}
                  shrink={0}
                />
                <FlexItem color="#ed64a6" label="Shrinks" basis={demo3Cycle ? "180px" : "130px"} shrink={1} />
                <FlexItem color="#805ad5" label="Shrinks" basis={demo3Cycle ? "180px" : "130px"} shrink={1} />
              </div>
              <p className="text-xs text-muted-foreground">Resize or wait for animation to observe shrinking.</p>
            </div>
          </div>

          

                   {/* Section 4: Detailed Real-World Examples */}
          <div className="space-y-12 border-t border-border pt-8">
            <h2 className="text-3xl font-bold text-foreground">Detailed Real-World Examples</h2>

            {/* Example 1: Responsive Card Grid */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Responsive Card Grid</h3>
              <div className="flex gap-4 flex-wrap">
                <FlexItem color="#4299e1" label="Card 1" basis="180px" grow={1} />
                <FlexItem color="#63b3ed" label="Card 2" basis="220px" grow={1} />
                <FlexItem color="#90cdf4" label="Card 3" basis="200px" grow={1} />
                <FlexItem color="#bee3f8" label="Card 4" basis="160px" grow={1} />
              </div>
              <p className="text-muted-foreground text-sm">
                Each card has a starting width (basis) and grows equally to fill remaining space.
              </p>
              <CodeBlock
                code={`<div class="flex gap-4 flex-wrap">
  <div class="flex-1 basis-44 bg-blue-600 rounded p-4">Card 1</div>
  <div class="flex-1 basis-56 bg-blue-500 rounded p-4">Card 2</div>
  <div class="flex-1 basis-50 bg-blue-400 rounded p-4">Card 3</div>
  <div class="flex-1 basis-40 bg-blue-300 rounded p-4">Card 4</div>
</div>`}
                language="jsx"
              />
            </div>

            {/* Example 2: Navigation */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Navigation Bar</h3>
              <div className="flex gap-4 items-center bg-slate-800 p-4 rounded">
                <FlexItem color="#f6ad55" label="Logo" basis="80px" />
                <FlexItem color="#68d391" label="Search" basis="200px" grow={1} />
                <FlexItem color="#63b3ed" label="Sign In" basis="100px" />
              </div>
              <p className="text-muted-foreground text-sm">
                Search input grows to fill available space; logo and button remain fixed.
              </p>
              <CodeBlock
                code={`<nav class="flex items-center gap-4 p-4 bg-slate-800 rounded">
  <div class="basis-20 bg-yellow-400 rounded">Logo</div>
  <input class="basis-48 flex-grow px-3 py-2 rounded" placeholder="Search..." />
  <button class="basis-24 px-4 py-2 bg-blue-600 text-white rounded">Sign In</button>
</nav>`}
                language="jsx"
              />
            </div>

            {/* Example 3: Form Layout */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Form with Flexible Input</h3>
              <div className="flex gap-4 items-end">
                <FlexItem color="#ed64a6" label="Email Input" basis="180px" grow={1} />
                <FlexItem color="#805ad5" label="Submit" basis="100px" />
              </div>
              <p className="text-muted-foreground text-sm">
                Input field flexes to fill space, button remains fixed.
              </p>
              <CodeBlock
                code={`<form class="flex gap-4 items-end">
  <input class="basis-44 flex-grow px-3 py-2 rounded border" placeholder="Email" />
  <button class="basis-24 px-6 py-2 bg-purple-600 text-white rounded">Submit</button>
</form>`}
                language="jsx"
              />
            </div>

            {/* Example 4: Sidebar + Main Content */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Sidebar + Main Content</h3>
              <div className="flex gap-6 min-h-[200px]">
                <FlexItem color="#f56565" label="Sidebar" basis="200px" />
                <FlexItem color="#48bb78" label="Main Content" basis="0" grow={1} />
              </div>
              <p className="text-muted-foreground text-sm">
                Sidebar stays fixed; main content grows dynamically to fill remaining space.
              </p>
              <CodeBlock
                code={`<div class="flex gap-6 min-h-screen">
  <aside class="flex-none w-48 bg-red-500 p-6">Sidebar</aside>
  <main class="flex-1 bg-green-500 p-6">Main Content</main>
</div>`}
                language="jsx"
              />
            </div>
          </div>
          {/* Section 5: Tips (unchanged UI) */}
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
