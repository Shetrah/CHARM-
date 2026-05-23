"use client"

import { useTranslation } from "@/lib/translation-context"
import { Globe } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage } = useTranslation()

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "zh" : "en")}
      className="flex items-center gap-2 px-4 py-2 glass rounded-full hover:bg-[#00BFB3]/20 transition-all duration-300"
      aria-label="Toggle language"
    >
      <Globe size={18} className="text-[#00BFB3]" />
      <span className="text-sm font-medium text-foreground">
        {language === "en" ? "中文" : "EN"}
      </span>
    </button>
  )
}
