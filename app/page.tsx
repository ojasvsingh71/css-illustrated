"use client"

import { useState, useRef } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Link from "next/link"
import CodeBlock from "@/app/utilities/components/code-block"

export default function Home() {
  const [copied, setCopied] = useState<string | null>(null)
  const [demoIndex, setDemoIndex] = useState(0)
  const categoriesRef = useRef<HTMLDivElement>(null)

  const categories = [
    { title: "Layout", desc: "Columns, Display, Floats, Grid", href: "/utilities/columns", demoClass: "grid-cols-3" },
    { title: "Spacing", desc: "Padding, Margin, Gap", href: "/utilities/spacing/padding", demoClass: "p-4" },
    { title: "Sizing", desc: "Width, Height, Min/Max", href: "/utilities/sizing/width", demoClass: "w-1/3" },
    { title: "Flexbox", desc: "Basis, Direction, Wrap, Grow, Order", href: "/utilities/flex", demoClass: "flex-1" },
    { title: "Grid", desc: "Auto Flow, Rows, Columns", href: "/utilities/grid/auto-flow", demoClass: "grid-cols-3" },
    { title: "Alignment", desc: "Justify, Align, Place", href: "/utilities/justify/content", demoClass: "justify-center" },
    { title: "Backgrounds", desc: "Colors, Gradients, Position", href: "/utilities/background/position", demoClass: "bg-gradient-to-r" },
    { title: "Borders", desc: "Radius, Width, Color, Style", href: "/utilities/border/radius", demoClass: "rounded-lg" },
    { title: "Effects", desc: "Shadow, Ring, Outline", href: "/utilities/ring/width", demoClass: "shadow-lg" },
    { title: "Transforms", desc: "Scale, Rotate, Translate, Skew", href: "/utilities/transform/scale", demoClass: "scale-110" },
    { title: "Interactivity", desc: "Cursor, Pointer, Scroll", href: "/utilities/interactivity/cursor", demoClass: "cursor-pointer" },
    { title: "Accessibility", desc: "Screen Readers", href: "/utilities/accessibility/screen-readers", demoClass: "sr-only" },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 2000)
  }

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const nextDemo = () => setDemoIndex((prev) => (prev + 1) % categories.length)
  const prevDemo = () => setDemoIndex((prev) => (prev - 1 + categories.length) % categories.length)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-16 md:py-24 max-w-7xl mx-auto">
          <div className="space-y-6 mb-16">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance">
                Master Tailwind CSS Utilities
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance">
                Complete guide to every Tailwind CSS utility. Learn spacing, sizing, colors, transforms, and more with
                interactive examples.
              </p>
            </div>

            <div className="flex gap-4 flex-wrap">
              <Link
                href="/utilities"
                className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition"
              >
                Start Learning
              </Link>
              <button
                onClick={scrollToCategories}
                className="px-6 py-3 border border-border rounded-lg font-semibold hover:bg-card transition"
              >
                Explore Categories
              </button>
            </div>
          </div>

          {/* Categories Grid */}
          <div ref={categoriesRef} id="categories" className="space-y-12">
            <h2 className="text-3xl font-bold text-foreground">Utility Categories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <Link
                  key={cat.title}
                  href={cat.href}
                  className="p-4 border border-border rounded-lg hover:bg-card/50 transition group"
                >
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{cat.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Sample Demos Section */}
          <div className="space-y-12 mt-12">
            <h2 className="text-3xl font-bold text-foreground">Sample Demos</h2>
            <p className="text-muted-foreground">See a demo of each utility. Click a demo to copy the class.</p>

            <div className="relative">
              <div className="border border-border rounded-lg p-6 bg-card/30 relative cursor-pointer"
                   onClick={() => copyToClipboard(categories[demoIndex].demoClass)}>
                <h3 className="font-semibold text-foreground mb-4">{categories[demoIndex].title} Demo</h3>

                <div className="flex gap-4 h-32 bg-slate-800 rounded p-4">
                  {/* Demo content based on category */}
                  {categories[demoIndex].title === "Flexbox" && (
                    <>
                      <div className="flex-1 bg-blue-500 rounded p-4 flex items-center justify-center text-white font-semibold">Item 1</div>
                      <div className="flex-1 bg-blue-400 rounded p-4 flex items-center justify-center text-white font-semibold">Item 2</div>
                      <div className="flex-1 bg-blue-300 rounded p-4 flex items-center justify-center text-white font-semibold">Item 3</div>
                    </>
                  )}
                  {categories[demoIndex].title === "Grid" && (
                    <>
                      <div className="bg-green-500 rounded flex items-center justify-center text-white font-semibold">1</div>
                      <div className="bg-green-400 rounded flex items-center justify-center text-white font-semibold">2</div>
                      <div className="bg-green-300 rounded flex items-center justify-center text-white font-semibold">3</div>
                    </>
                  )}
                  {categories[demoIndex].title === "Spacing" && (
                    <>
                      <div className="bg-pink-500 p-2 flex-1 flex items-center justify-center text-white font-semibold">Item 1</div>
                      <div className="bg-pink-400 p-4 flex-1 flex items-center justify-center text-white font-semibold">Item 2</div>
                      <div className="bg-pink-300 p-6 flex-1 flex items-center justify-center text-white font-semibold">Item 3</div>
                    </>
                  )}
                  {categories[demoIndex].title !== "Flexbox" &&
                   categories[demoIndex].title !== "Grid" &&
                   categories[demoIndex].title !== "Spacing" && (
                    <div className="bg-gray-500 flex-1 flex items-center justify-center text-white font-semibold">Demo</div>
                  )}
                </div>

                <CodeBlock
                  code={`<div class="${categories[demoIndex].demoClass}">...</div>`}
                  language="jsx"
                />
                {copied === categories[demoIndex].demoClass && (
                  <span className="absolute top-2 right-2 text-xs text-green-500 font-semibold">Copied!</span>
                )}
              </div>

              {/* Navigation buttons */}
              <button
                className="absolute top-1/2 -left-6 transform -translate-y-1/2 px-2 py-1 bg-accent text-accent-foreground rounded"
                onClick={prevDemo}
              >
                &lt;
              </button>
              <button
                className="absolute top-1/2 -right-6 transform -translate-y-1/2 px-2 py-1 bg-accent text-accent-foreground rounded"
                onClick={nextDemo}
              >
                &gt;
              </button>
            </div>

            <button
              onClick={scrollToCategories}
              className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition"
            >
              Explore More Utilities
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
