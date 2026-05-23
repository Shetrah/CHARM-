"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "zh"

interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (en: string, zh: string) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("charm-language") as Language
    if (saved && (saved === "en" || saved === "zh")) {
      setLanguage(saved)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("charm-language", lang)
  }

  const t = (en: string, zh: string) => (language === "en" ? en : zh)

  return (
    <TranslationContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}

// Common translations
export const translations = {
  nav: {
    home: { en: "Home", zh: "首页" },
    products: { en: "Products", zh: "产品" },
    about: { en: "About", zh: "关于我们" },
    sustainability: { en: "Sustainability", zh: "可持续发展" },
    contact: { en: "Contact", zh: "联系我们" },
  },
  hero: {
    title1: { en: "Experience the Future of", zh: "体验未来" },
    title2: { en: "Premium Cleaning", zh: "优质清洁" },
    tagline: {
      en: "Where luxury meets sustainability. Discover cleaning products that transform your home while caring for our planet.",
      zh: "奢华与可持续的完美结合。探索改变您家居的清洁产品，同时呵护我们的地球。",
    },
    infiniteCharm: { en: "Infinite Charm", zh: "魅力无限" },
    exploreProducts: { en: "Explore Products", zh: "探索产品" },
    ourStory: { en: "Our Story", zh: "我们的故事" },
  },
  stats: {
    natural: { en: "Natural Ingredients", zh: "天然成分" },
    customers: { en: "Happy Customers", zh: "满意客户" },
    chemicals: { en: "Harmful Chemicals", zh: "有害化学物" },
    eco: { en: "Eco-Friendly", zh: "环保友好" },
  },
  products: {
    collection: { en: "Our Collection", zh: "我们的系列" },
    title: { en: "Premium Cleaning Solutions", zh: "优质清洁解决方案" },
    subtitle: {
      en: "Discover our range of luxurious, eco-conscious cleaning products designed for the modern home.",
      zh: "探索我们为现代家居设计的奢华环保清洁产品系列。",
    },
    viewAll: { en: "View All Products", zh: "查看所有产品" },
    viewDetails: { en: "View Details", zh: "查看详情" },
    variants: { en: "Available Variants", zh: "可选款式" },
    backToProducts: { en: "Back to Products", zh: "返回产品" },
  },
  chatbot: {
    title: { en: "Charm Assistant", zh: "魅力助手" },
    placeholder: { en: "Ask me anything about Charm products...", zh: "询问任何关于魅力产品的问题..." },
    greeting: {
      en: "Hello! I'm your Charm assistant. How can I help you today? Ask me about our products, ingredients, or sustainability practices!",
      zh: "您好！我是您的魅力助手。今天我能为您做什么？向我询问我们的产品、成分或可持续发展实践！",
    },
  },
  footer: {
    tagline: {
      en: "Premium cleaning solutions that bring infinite charm to your home while caring for our planet.",
      zh: "优质清洁解决方案，为您的家带来无限魅力，同时呵护我们的地球。",
    },
    motto: { en: "Infinite Charm. Infinite Care.", zh: "魅力无限，关爱无限。" },
    newsletter: { en: "Join Our Newsletter", zh: "订阅我们的通讯" },
    newsletterDesc: { en: "Get exclusive offers, eco-tips, and product updates.", zh: "获取独家优惠、环保贴士和产品更新。" },
    subscribe: { en: "Subscribe", zh: "订阅" },
    emailPlaceholder: { en: "Enter your email", zh: "输入您的邮箱" },
    rights: { en: "All rights reserved.", zh: "版权所有。" },
  },
}
