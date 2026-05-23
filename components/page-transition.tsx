"use client"

import { ReactNode } from "react"

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {children}
    </div>
  )
}
