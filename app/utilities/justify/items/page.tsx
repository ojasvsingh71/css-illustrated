import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import UtilityPageTemplate from "../../components/utility-page-template"

const justifyItemsUtilities = {
  title: "Justify Items",
  description: "Control how grid items are aligned along the inline axis.",
  classes: [
    { class: "justify-items-start", description: "Align to start" },
    { class: "justify-items-end", description: "Align to end" },
    { class: "justify-items-center", description: "Center items" },
    { class: "justify-items-stretch", description: "Stretch items" },
  ],
  example: "Grid items align consistently",
  codeSnippet: `<div class="grid grid-cols-3 justify-items-center">
  <div>Centered item</div>
</div>`,
}

export default function JustifyItemsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <UtilityPageTemplate utility={justifyItemsUtilities} />
      </main>
      <Footer />
    </div>
  )
}
