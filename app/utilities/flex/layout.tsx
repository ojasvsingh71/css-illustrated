import type React from "react"
import Link from "next/link"

export default function FlexLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h2 className="text-lg font-semibold text-foreground mb-3">Flex Utilities</h2>
          <div className="flex gap-2 flex-wrap">
            <Link
              href="/utilities/flex"
              className="px-3 py-1 text-sm border border-border rounded hover:bg-card transition"
            >
              Overview
            </Link>
            <Link
              href="/utilities/flex/direction"
              className="px-3 py-1 text-sm border border-border rounded hover:bg-card transition"
            >
              Direction
            </Link>
            <Link
              href="/utilities/flex/basis"
              className="px-3 py-1 text-sm border border-border rounded hover:bg-card transition"
            >
              Basis
            </Link>
            <Link
              href="/utilities/flex/grow"
              className="px-3 py-1 text-sm border border-border rounded hover:bg-card transition"
            >
              Grow
            </Link>
            <Link
              href="/utilities/flex/wrap"
              className="px-3 py-1 text-sm border border-border rounded hover:bg-card transition"
            >
              Wrap
            </Link>
            <Link
              href="/utilities/flex/sizing"
              className="px-3 py-1 text-sm border border-border rounded hover:bg-card transition"
            >
              Sizing
            </Link>
            <Link
              href="/utilities/flex/order"
              className="px-3 py-1 text-sm border border-border rounded hover:bg-card transition"
            >
              Order
            </Link>
          </div>
        </div>
      </div>
      <main className="flex-1">{children}</main>
    </div>
  )
}
