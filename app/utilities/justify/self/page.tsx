"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeBlock from "../../components/code-block";

export default function JustifySelfPage() {
  const justifySelfClasses = [
    "justify-self-auto",
    "justify-self-start",
    "justify-self-end",
    "justify-self-center",
    "justify-self-stretch",
  ];

  const [activeClass, setActiveClass] = useState(justifySelfClasses[0]);
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
    "justify-self-auto": "Default alignment; the item inherits alignment from the container.",
    "justify-self-start": "Aligns the item to the start of its grid cell (left in LTR).",
    "justify-self-end": "Aligns the item to the end of its grid cell (right in LTR).",
    "justify-self-center": "Centers the item horizontally within its grid cell.",
    "justify-self-stretch": "Stretches the item to fill the width of its grid cell.",
  };

  const additionalContext: Record<string, string> = {
    "justify-self-auto": "Useful when you want the item to follow the container's default layout behavior.",
    "justify-self-start": "Good for left-aligning specific elements independently of others.",
    "justify-self-end": "Good for right-aligning specific elements, such as buttons or icons.",
    "justify-self-center": "Ideal for centering content like images, cards, or icons inside their cell.",
    "justify-self-stretch": "Useful for making form fields or cards span the full cell width.",
  };

  const examplesData: Record<string, { title: string; note: string; code: string }[]> = {
    "justify-self-auto": [
      {
        title: "Default Grid Items",
        note: "Items follow the container’s alignment rules.",
        code: `<div class="grid grid-cols-3 gap-4">
  <div class="justify-self-auto bg-blue-500 p-4">Item 1</div>
  <div class="justify-self-auto bg-blue-500 p-4">Item 2</div>
  <div class="justify-self-auto bg-blue-500 p-4">Item 3</div>
</div>`,
      },
      {
        title: "Content Cards Default",
        note: "Cards inherit container alignment.",
        code: `<div class="grid grid-cols-2 gap-4">
  <div class="justify-self-auto bg-gray-200 p-4">Card A</div>
  <div class="justify-self-auto bg-gray-200 p-4">Card B</div>
</div>`,
      },
      {
        title: "Image Gallery",
        note: "Images take container default alignment.",
        code: `<div class="grid grid-cols-4 gap-2">
  <img class="justify-self-auto" src="img1.jpg" alt="img1"/>
  <img class="justify-self-auto" src="img2.jpg" alt="img2"/>
</div>`,
      },
      {
        title: "Buttons List",
        note: "Buttons inherit container alignment.",
        code: `<div class="grid grid-cols-3 gap-2">
  <button class="justify-self-auto">Button 1</button>
  <button class="justify-self-auto">Button 2</button>
</div>`,
      },
      {
        title: "Form Fields",
        note: "Input fields aligned by default.",
        code: `<form class="grid grid-cols-2 gap-2">
  <input type="text" class="justify-self-auto" placeholder="Name"/>
  <input type="email" class="justify-self-auto" placeholder="Email"/>
</form>`,
      },
    ],
    "justify-self-start": [
      {
        title: "Left-aligned Grid Item",
        note: "Item aligned to start of cell.",
        code: `<div class="grid grid-cols-3 gap-4">
  <div class="justify-self-start bg-blue-500 p-4">Item 1</div>
</div>`,
      },
      {
        title: "Left-aligned Cards",
        note: "Cards aligned left regardless of container.",
        code: `<div class="grid grid-cols-2 gap-4">
  <div class="justify-self-start bg-gray-200 p-4">Card 1</div>
  <div class="justify-self-start bg-gray-200 p-4">Card 2</div>
</div>`,
      },
      {
        title: "Form Labels",
        note: "Labels left-aligned independently.",
        code: `<form class="grid grid-cols-2 gap-2">
  <label class="justify-self-start">Email</label>
  <input type="email"/>
</form>`,
      },
      {
        title: "Sidebar Menu",
        note: "Menu items start-aligned.",
        code: `<ul class="grid grid-cols-1 gap-2">
  <li class="justify-self-start">Home</li>
  <li class="justify-self-start">About</li>
</ul>`,
      },
      {
        title: "Action Buttons",
        note: "Buttons aligned left for consistent UX.",
        code: `<div class="grid grid-cols-3 gap-2">
  <button class="justify-self-start">Save</button>
  <button class="justify-self-start">Cancel</button>
</div>`,
      },
    ],
    "justify-self-end": [
      {
        title: "Right-aligned Grid Item",
        note: "Item aligned to end of cell.",
        code: `<div class="grid grid-cols-3 gap-4">
  <div class="justify-self-end bg-blue-500 p-4">Item 1</div>
</div>`,
      },
      {
        title: "Right-aligned Cards",
        note: "Cards aligned right.",
        code: `<div class="grid grid-cols-2 gap-4">
  <div class="justify-self-end bg-gray-200 p-4">Card 1</div>
  <div class="justify-self-end bg-gray-200 p-4">Card 2</div>
</div>`,
      },
      {
        title: "Form Inputs Right",
        note: "Input aligned to end of its cell.",
        code: `<form class="grid grid-cols-2 gap-2">
  <input type="text" class="justify-self-end" placeholder="Name"/>
</form>`,
      },
      {
        title: "Footer Links",
        note: "Links aligned to the right.",
        code: `<div class="grid grid-cols-3 gap-2">
  <a href="#" class="justify-self-end">Privacy</a>
</div>`,
      },
      {
        title: "Toolbar Icons",
        note: "Icons aligned to right edge.",
        code: `<div class="grid grid-cols-4 gap-2">
  <button class="justify-self-end">🔍</button>
  <button class="justify-self-end">⚙️</button>
</div>`,
      },
    ],
    "justify-self-center": [
      {
        title: "Centered Grid Item",
        note: "Item centered horizontally in cell.",
        code: `<div class="grid grid-cols-3 gap-4">
  <div class="justify-self-center bg-blue-500 p-4">Item 1</div>
</div>`,
      },
      {
        title: "Centered Cards",
        note: "Cards centered in grid cells.",
        code: `<div class="grid grid-cols-2 gap-4">
  <div class="justify-self-center bg-gray-200 p-4">Card 1</div>
  <div class="justify-self-center bg-gray-200 p-4">Card 2</div>
</div>`,
      },
      {
        title: "Centered Images",
        note: "Images centered inside cells.",
        code: `<div class="grid grid-cols-4 gap-2">
  <img class="justify-self-center" src="img1.jpg" alt="img1"/>
</div>`,
      },
      {
        title: "Profile Badges",
        note: "Centered badges in grid layout.",
        code: `<div class="grid grid-cols-3 gap-2">
  <div class="justify-self-center p-2 bg-yellow-200 rounded">Badge 1</div>
</div>`,
      },
      {
        title: "Action Buttons Centered",
        note: "Buttons horizontally centered.",
        code: `<div class="grid grid-cols-3 gap-2">
  <button class="justify-self-center">Submit</button>
</div>`,
      },
    ],
    "justify-self-stretch": [
      {
        title: "Stretched Grid Item",
        note: "Item fills the width of its cell.",
        code: `<div class="grid grid-cols-3 gap-4">
  <div class="justify-self-stretch bg-blue-500 p-4">Item 1</div>
</div>`,
      },
      {
        title: "Stretched Form Input",
        note: "Input fills the cell width.",
        code: `<form class="grid grid-cols-2 gap-2">
  <input type="text" class="justify-self-stretch" placeholder="Name"/>
</form>`,
      },
      {
        title: "Stretched Cards",
        note: "Cards occupy full width of grid cells.",
        code: `<div class="grid grid-cols-2 gap-4">
  <div class="justify-self-stretch bg-gray-200 p-4">Card 1</div>
  <div class="justify-self-stretch bg-gray-200 p-4">Card 2</div>
</div>`,
      },
      {
        title: "Stretch Buttons",
        note: "Buttons take full width of their column.",
        code: `<div class="grid grid-cols-3 gap-2">
  <button class="justify-self-stretch">Save</button>
</div>`,
      },
      {
        title: "Stretch Images",
        note: "Images expand to fill cell width.",
        code: `<div class="grid grid-cols-2 gap-2">
  <img class="justify-self-stretch" src="img1.jpg" alt="img1"/>
</div>`,
      },
    ],
  };

  const benefits: Record<string, string[]> = {
    "justify-self-auto": ["Follows container defaults.", "Simple for consistent layouts."],
    "justify-self-start": ["Left-align items individually.", "Great for forms and menus."],
    "justify-self-end": ["Right-align specific items.", "Good for footers, toolbars."],
    "justify-self-center": ["Centers content in its cell.", "Balances layout visually."],
    "justify-self-stretch": ["Items fill full width.", "Creates uniform cell sizing."],
  };

  const commonUseCases: Record<string, string[]> = {
    "justify-self-auto": ["Default grid layouts", "Cards", "Galleries"],
    "justify-self-start": ["Forms", "Sidebar menus", "Navigation items"],
    "justify-self-end": ["Footers", "Right-aligned controls", "Toolbars"],
    "justify-self-center": ["Images", "Cards", "Profile badges", "Icons"],
    "justify-self-stretch": ["Form inputs", "Buttons", "Cards", "Full-width elements"],
  };

  const renderDiagram = (cls: string) => {
    const containerClasses = `grid grid-cols-3 h-32 border border-border rounded-lg p-4 gap-4 bg-slate-900 text-white items-center`;
    const blockBaseClass = "h-16 flex items-center justify-center font-semibold rounded";

    const getBlockClass = (index: number) => {
      const color = index === 0 ? "bg-blue-500" : "bg-blue-400";
      const width =
        cls === "justify-self-stretch" && index === 0
          ? "w-full"
          : "w-16";
      const justifySelfClass = index === 0 ? cls : "justify-self-auto";
      return `${blockBaseClass} ${color} ${width} ${justifySelfClass}`;
    };

    return (
      <div className="border border-border rounded-lg p-6 bg-slate-900 text-white text-center">
        <p className="font-semibold">Visual representation of <code>{cls}</code></p>
        <div className={`mt-4 ${containerClasses}`}>
          <div className={getBlockClass(0)}>1</div>
          <div className={getBlockClass(1)}>2</div>
          <div className={getBlockClass(2)}>3</div>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Blue item uses <code>{cls}</code>; lighter items use <code>auto</code> for comparison.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 max-w-5xl px-8 py-12 space-y-12 text-left">
        <h1 className="text-2xl font-semibold text-foreground mb-4">Tailwind Justify Self Utilities</h1>

        {/* Buttons */}
        <div className="flex gap-4 mb-6 flex-wrap">
          {justifySelfClasses.map((cls) => (
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

        {/* Additional Context */}
        <div className="text-sm text-muted-foreground mt-2">
          {additionalContext[activeClass]}
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
