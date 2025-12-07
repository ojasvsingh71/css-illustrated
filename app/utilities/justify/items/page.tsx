"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "../../components/code-block";

export default function JustifyItemsPage() {
  const justifyItemsClasses = [
    "justify-items-start",
    "justify-items-center",
    "justify-items-end",
    "justify-items-stretch",
  ];

  const [activeClass, setActiveClass] = useState(justifyItemsClasses[0]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const CopyableCode = ({ code, index }: { code: string; index: number }) => (
    <div
      className="relative border border-border rounded-lg p-4 hover:bg-card/50 cursor-pointer group transition"
      onClick={() => copyToClipboard(code, index)}
    >
      {copiedIndex === index && (
        <div className="absolute top-2 left-2 px-2 py-0.5 text-xs text-white bg-green-600 rounded">
          Copied!
        </div>
      )}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 text-xs text-gray-700 bg-white rounded opacity-0 group-hover:opacity-100 transition">
        Click to copy
      </div>
      <CodeBlock code={code} language="html" />
    </div>
  );

  const explanations: Record<string, string> = {
    "justify-items-start": "Aligns grid items to the start of the inline axis. Useful when you want items to start from the left of each grid cell.",
    "justify-items-center": "Centers grid items horizontally within each cell.",
    "justify-items-end": "Aligns grid items to the end of the inline axis within each cell.",
    "justify-items-stretch": "Stretches grid items to fill the full width of their cell.",
  };

  const examplesData: Record<string, { title: string; note: string; code: string }[]> = {
    "justify-items-start": [
      {
        title: "Start-aligned Grid",
        note: "All items start at the left of each grid cell.",
        code: `<div class="grid grid-cols-3 justify-items-start gap-4">
  <div class="bg-blue-500 p-4">1</div>
  <div class="bg-blue-500 p-4">2</div>
  <div class="bg-blue-500 p-4">3</div>
</div>`,
      },
      {
        title: "Form Items Left-aligned",
        note: "Input fields align to the start.",
        code: `<form class="grid grid-cols-2 justify-items-start gap-2">
  <label>Email</label>
  <input type="email" />
</form>`,
      },
    ],
    "justify-items-center": [
      {
        title: "Centered Grid Items",
        note: "Items are centered in each grid cell.",
        code: `<div class="grid grid-cols-3 justify-items-center gap-4">
  <div class="bg-blue-500 p-4">1</div>
  <div class="bg-blue-500 p-4">2</div>
  <div class="bg-blue-500 p-4">3</div>
</div>`,
      },
      {
        title: "Center Cards",
        note: "Card elements centered within grid cells.",
        code: `<div class="grid grid-cols-2 justify-items-center gap-4">
  <div class="p-4 bg-gray-200">Card 1</div>
  <div class="p-4 bg-gray-200">Card 2</div>
</div>`,
      },
    ],
    "justify-items-end": [
      {
        title: "End-aligned Grid",
        note: "Items align to the end of each grid cell.",
        code: `<div class="grid grid-cols-3 justify-items-end gap-4">
  <div class="bg-blue-500 p-4">1</div>
  <div class="bg-blue-500 p-4">2</div>
  <div class="bg-blue-500 p-4">3</div>
</div>`,
      },
      {
        title: "Form Items Right-aligned",
        note: "Input fields align to the end of the grid cells.",
        code: `<form class="grid grid-cols-2 justify-items-end gap-2">
  <label>Email</label>
  <input type="email" />
</form>`,
      },
    ],
    "justify-items-stretch": [
      {
        title: "Stretched Grid Items",
        note: "Items fill the width of each grid cell.",
        code: `<div class="grid grid-cols-3 justify-items-stretch gap-4">
  <div class="bg-blue-500 p-4">1</div>
  <div class="bg-blue-500 p-4">2</div>
  <div class="bg-blue-500 p-4">3</div>
</div>`,
      },
      {
        title: "Stretch Cards",
        note: "Cards stretch to fill cell width.",
        code: `<div class="grid grid-cols-2 justify-items-stretch gap-4">
  <div class="p-4 bg-gray-200">Card 1</div>
  <div class="p-4 bg-gray-200">Card 2</div>
</div>`,
      },
    ],
  };

  const benefits: Record<string, string[]> = {
    "justify-items-start": ["Aligns items predictably to the start.", "Helps create consistent layouts."],
    "justify-items-center": ["Centers items for balanced appearance.", "Useful for symmetrical designs."],
    "justify-items-end": ["Aligns items to end for visual emphasis.", "Good for right-aligned content."],
    "justify-items-stretch": ["Fills available space in each cell.", "Creates uniform width for grid items."],
  };

  const commonUseCases: Record<string, string[]> = {
    "justify-items-start": ["Forms", "Navigation grids", "Cards"],
    "justify-items-center": ["Image galleries", "Cards", "Buttons"],
    "justify-items-end": ["Footers", "Toolbars", "Right-aligned controls"],
    "justify-items-stretch": ["Forms", "Cards", "Buttons filling cell width"],
  };

  const commonMistakes: Record<string, string[]> = {
    "justify-items-start": ["Not using `grid` on container.", "Using `flex` instead of `grid`."],
    "justify-items-center": ["Forgetting `grid` context.", "Combining with `text-center` incorrectly."],
    "justify-items-end": ["Using flex properties accidentally.", "Overriding with margin utilities."],
    "justify-items-stretch": ["Adding fixed width may prevent stretching.", "Not setting `grid` on container."],
  };

  const renderDiagram = (cls: string) => {
    const justify = cls.replace("justify-items-", "");
    const containerClasses = `grid grid-cols-3 h-32 border border-border rounded-lg p-4 gap-2 bg-slate-900 text-white justify-items-${justify} items-center border-white`;

    // For stretch, make the blocks fill the cell width
    const blockClass = cls === "justify-items-stretch"
      ? "bg-blue-500 h-16 w-full flex items-center justify-center font-semibold"
      : "bg-blue-500 w-16 h-16 flex items-center justify-center font-semibold";

    return (
      <div className="border border-border rounded-lg p-6 bg-slate-900 text-white text-center">
        <p className="font-semibold">Visual representation of <code>{cls}</code></p>
        <div className={`mt-4 ${containerClasses}`}>
          <div className={blockClass}>1</div>
          <div className={blockClass}>2</div>
          <div className={blockClass}>3</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 max-w-5xl px-8 py-12 space-y-12 text-left">
        <h1 className="text-2xl font-semibold text-foreground mb-4">Tailwind Justify Items Utilities</h1>

        {/* Buttons */}
        <div className="flex gap-4 mb-6 flex-wrap">
          {justifyItemsClasses.map((cls) => (
            <button
              key={cls}
              className={`px-4 py-2 rounded font-medium ${
                activeClass === cls
                  ? "bg-blue-600 text-white shadow"
                  : "bg-card/20 text-foreground hover:bg-card/30"
              }`}
              onClick={() => setActiveClass(cls)}
            >
              {cls}
            </button>
          ))}
        </div>

        {/* Diagram */}
        {renderDiagram(activeClass)}

        {/* Explanation */}
        <div className="text-sm text-muted-foreground">
          {explanations[activeClass]}
        </div>

        {/* Benefits */}
        <section className="space-y-2 border border-border rounded-lg p-4 bg-card/30">
          <h2 className="text-2xl font-semibold text-foreground">Benefits</h2>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            {benefits[activeClass].map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Real-World Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">Real-World Examples</h2>
          {examplesData[activeClass].map((ex, idx) => (
            <div key={idx} className="space-y-2 border border-border rounded-lg p-4 bg-card/20">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <h3 className="text-lg font-semibold text-foreground">{ex.title}</h3>
                <p className="text-sm text-muted-foreground">{ex.note}</p>
              </div>
              <CopyableCode code={ex.code} index={idx} />
            </div>
          ))}
        </section>

        {/* Common Mistakes */}
        <section className="space-y-2 border border-border rounded-lg p-4 bg-card/30">
          <h2 className="text-2xl font-semibold text-foreground">Common Mistakes</h2>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            {commonMistakes[activeClass].map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Common Use Cases */}
        <section className="space-y-2 border border-border rounded-lg p-4 bg-card/30">
          <h2 className="text-2xl font-semibold text-foreground">Common Use Cases</h2>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            {commonUseCases[activeClass].map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
