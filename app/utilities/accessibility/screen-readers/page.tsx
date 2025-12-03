"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "@/app/utilities/components/code-block";

export default function ScreenReadersPage() {
  const [activeType, setActiveType] = useState<"sr-only" | "not-sr-only">("sr-only");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const types = ["sr-only", "not-sr-only"] as const;

  const examplesData = {
    "sr-only": [
      {
        title: "Visually Hidden Label",
        note: "Use sr-only to hide a label visually but keep it readable for screen readers.",
        code: `<label class="sr-only" for="email">Email address</label>
<input id="email" type="email" placeholder="Enter your email" />`,
      },
      {
        title: "Screen Reader Only Text for Buttons",
        note: "Provide extra description for icons for screen readers.",
        code: `<button class="p-2 bg-blue-600 text-white rounded">
  <svg class="w-5 h-5"><!-- icon --></svg>
  <span class="sr-only">Submit Form</span>
</button>`,
      },
      {
        title: "Live Region for Dynamic Updates",
        note: "Announce dynamic content changes via aria-live and sr-only.",
        code: `<div role="status" aria-live="polite" class="sr-only">
  Form submitted successfully
</div>`,
      },
      {
        title: "Skip Link for Keyboard Users",
        note: "Provide a way to jump to main content for non-visual users.",
        code: `<a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>
<main id="main-content"> ... </main>`,
      },
      {
        title: "Hidden Instructions",
        note: "Provide guidance for screen reader users without affecting layout.",
        code: `<p class="sr-only">Use arrow keys to navigate the gallery</p>`,
      },
    ],
    "not-sr-only": [
      {
        title: "Visible Label Example",
        note: "Label is visible on the page for all users.",
        code: `<label for="email">Email address</label>
<input id="email" type="email" placeholder="Enter your email" />`,
      },
      {
        title: "Button with Text",
        note: "Button shows text for both visual users and screen readers.",
        code: `<button class="p-2 bg-blue-600 text-white rounded">Submit Form</button>`,
      },
      {
        title: "Visible Notifications",
        note: "Alerts that appear visually and for screen readers.",
        code: `<div role="alert" class="bg-green-100 text-green-800 p-2 rounded">
Form submitted successfully
</div>`,
      },
      {
        title: "Inline Instructions",
        note: "Instructions visible directly to all users.",
        code: `<p>Use arrow keys to navigate the gallery</p>`,
      },
      {
        title: "Navigation Links",
        note: "All navigation links visible for everyone.",
        code: `<nav>
  <a href="#home">Home</a>
  <a href="#about">About</a>
  <a href="#contact">Contact</a>
</nav>`,
      },
    ],
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

  const diagrams = {
    "sr-only": (
      <div className="border border-border rounded-lg p-6 bg-slate-900 text-white text-center">
        <p className="font-semibold">This content is visually hidden but accessible to screen readers</p>
        <div className="mt-4 flex justify-center items-center h-32">
          <div className="sr-only bg-blue-500 w-32 h-16 flex items-center justify-center">
            Screen Reader Only Block
          </div>
        </div>
      </div>
    ),
    "not-sr-only": (
      <div className="border border-border rounded-lg p-6 bg-slate-900 text-white text-center">
        <p className="font-semibold">This content is visible to all users</p>
        <div className="mt-4 flex justify-center items-center h-32">
          <div className="bg-blue-500 w-32 h-16 flex items-center justify-center text-white font-semibold">
            Visible Block
          </div>
        </div>
      </div>
    ),
  };

  const commonUseCases = {
    "sr-only": [
      "Use sr-only for labels, instructions, and dynamic updates",
      "Keep content accessible without affecting visual layout",
      "Combine with focus:not-sr-only for skip links",
    ],
    "not-sr-only": [
      "Use visible content for all users",
      "Display alerts, instructions, navigation links",
      "Combine with sr-only when needed for accessibility",
    ],
  };

  const benefits = {
    "sr-only": [
      "Helps comply with accessibility standards (WCAG)",
      "Improves UX for visually impaired users",
      "Maintains semantic HTML structure",
    ],
    "not-sr-only": [
      "Visible to all users",
      "Ensures clarity for non-visual users as well",
      "Works with sr-only for enhanced accessibility",
    ],
  };

  const commonMistakes = {
    "sr-only": [
      "Hiding content that should be visible",
      "Forgetting focus:not-sr-only on skip links",
      "Overusing sr-only unnecessarily",
    ],
    "not-sr-only": [
      "Making content visible but forgetting accessibility labels",
      "Not combining with sr-only for hidden instructions",
    ],
  };

  return (

    <div className="min-h-screen flex flex-col bg-background">
       <Navbar />

      <main className="flex-1 max-w-5xl px-8 py-12 space-y-12 text-left">


        {/* Quick Comparison Table */}
                <b><h1 className="text-2xl font-semibold text-foreground mb-4" > Accessibility: Screen Reader</h1></b>

        <section className="mb-6 border border-border rounded-lg p-4 bg-card/30">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Quick Comparison: sr-only vs not-sr-only</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-card/50">
                  <th className="border px-4 py-2">Feature</th>
                  <th className="border px-4 py-2">sr-only</th>
                  <th className="border px-4 py-2">not-sr-only</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">Visibility</td>
                  <td className="border px-4 py-2">Hidden visually, readable by screen readers</td>
                  <td className="border px-4 py-2">Visible to all users</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Use Cases</td>
                  <td className="border px-4 py-2">Hidden labels, instructions, live updates</td>
                  <td className="border px-4 py-2">Alerts, navigation, visible content</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">Accessibility</td>
                  <td className="border px-4 py-2">Improves screen reader UX</td>
                  <td className="border px-4 py-2">Works for all users</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Type Selector */}
        <div className="flex gap-4 mb-6">
          {types.map((type) => (
            <button
              key={type}
              className={`px-4 py-2 rounded font-medium ${
                activeType === type
                  ? "bg-blue-600 text-white shadow"
                  : "bg-card/20 text-foreground hover:bg-card/30"
              }`}
              onClick={() => setActiveType(type)}
            >
              {type === "sr-only" ? "sr-only" : "not sr-only"}
            </button>
          ))}
        </div>

        {/* Selected Type Content */}
        <div className="space-y-6">
          {/* Diagram */}
          {diagrams[activeType]}

          {/* Explanation */}
          <div className="text-sm text-muted-foreground">
            {activeType === "sr-only"
              ? "The sr-only class hides content visually but keeps it accessible to screen readers. Use it for hidden labels, instructions, or live updates."
              : "Visible content (not sr-only) is readable by everyone. Use for labels, instructions, notifications, and navigation links."}
          </div>

          {/* Benefits Section */}
          <section className="space-y-2 border border-border rounded-lg p-4 bg-card/30">
            <h2 className="text-2xl font-semibold text-foreground">Benefits</h2>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              {benefits[activeType].map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Real World Examples */}
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Real World Examples</h2>
            {examplesData[activeType].map((ex, idx) => (
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
              {commonMistakes[activeType].map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Common Use Cases */}
          <section className="space-y-2 border border-border rounded-lg p-4 bg-card/30">
            <h2 className="text-2xl font-semibold text-foreground">Common Use Cases</h2>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              {commonUseCases[activeType].map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
