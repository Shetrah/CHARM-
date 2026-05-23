"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import Image from "next/image"
import { useTranslation, translations } from "@/lib/translation-context"
import { products, categories } from "@/lib/products-data"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

// Build knowledge base from product data
function buildKnowledgeBase() {
  const productInfo = products.map((p) => ({
    name: p.name,
    nameZh: p.nameZh,
    category: p.category,
    description: p.description,
    descriptionZh: p.descriptionZh,
    variants: p.variants.map((v) => ({
      name: v.name,
      nameZh: v.nameZh,
      scent: v.scent,
      description: v.description,
    })),
  }))

  const categoryInfo = categories.map((c) => ({
    name: c.name,
    nameZh: c.nameZh,
    description: c.description,
    descriptionZh: c.descriptionZh,
  }))

  return { products: productInfo, categories: categoryInfo }
}

// Simple AI response generator based on knowledge base
function generateResponse(query: string, language: "en" | "zh"): string {
  const kb = buildKnowledgeBase()
  const q = query.toLowerCase()

  // Check for greetings
  if (q.match(/\b(hi|hello|hey|你好|您好)\b/i)) {
    return language === "en"
      ? "Hello! Welcome to Charm. I can help you learn about our premium cleaning products, including shower gels, shampoos, handwash, laundry detergent, dishwashing liquid, and automotive care products. What would you like to know?"
      : "您好！欢迎来到魅力。我可以帮助您了解我们的优质清洁产品，包括沐浴露、洗发水、洗手液、洗衣液、洗洁精和汽车护理产品。您想了解什么？"
  }

  // Check for product categories
  if (q.match(/\b(personal care|shower|shampoo|handwash|body|个人护理|沐浴|洗发|洗手)\b/i)) {
    const personalProducts = kb.products.filter((p) => p.category === "personal-care")
    const names = personalProducts.map((p) => (language === "en" ? p.name : p.nameZh)).join(", ")
    return language === "en"
      ? `Our Personal Care collection includes: ${names}. Each product comes in multiple luxurious scents. Our shower gels feature Pheromone, Silent Aroma, Heartbeat Whisper, and Milan Fogland variants. Would you like details about any specific product?`
      : `我们的个人护理系列包括：${names}。每款产品都有多种奢华香型。我们的沐浴露有费洛蒙、静谧芬芳、心跳私语和米兰雾境等款式。您想了解哪款产品的详情？`
  }

  if (q.match(/\b(household|laundry|dish|cleaning|家居|洗衣|洗碗|清洁)\b/i)) {
    const householdProducts = kb.products.filter((p) => p.category === "household")
    const names = householdProducts.map((p) => (language === "en" ? p.name : p.nameZh)).join(", ")
    return language === "en"
      ? `Our Household cleaning range includes: ${names}. Our laundry detergent comes in Original Fresh and Rose Fragrance. Our dishwashing liquid is available in Lemon and Ginger fragrances. All products are eco-friendly and gentle on hands!`
      : `我们的家居清洁系列包括：${names}。我们的洗衣液有原香清新和玫瑰芬芳两款。我们的洗洁精有柠檬和生姜香型。所有产品都环保且温和护手！`
  }

  if (q.match(/\b(car|automotive|tire|windshield|interior|汽车|轮胎|挡风|内饰)\b/i)) {
    const autoProducts = kb.products.filter((p) => p.category === "automotive")
    const names = autoProducts.map((p) => (language === "en" ? p.name : p.nameZh)).join(", ")
    return language === "en"
      ? `Our Automotive Care line includes: ${names}. The Interior Cleaner works on leather, fabric, and all surfaces. Our Tire Wax comes in High Gloss and Natural Matte finishes. The Windshield Washer Fluid is available in Summer, Winter, and All-Season formulas!`
      : `我们的汽车护理系列包括：${names}。内饰清洁剂适用于皮革、织物和所有表面。我们的轮胎蜡有高光亮泽和自然哑光两种效果。挡风玻璃清洗液有夏季、冬季和四季通用配方！`
  }

  // Check for specific products
  for (const product of kb.products) {
    if (q.includes(product.name.toLowerCase()) || q.includes(product.nameZh)) {
      const variantNames = product.variants.map((v) => (language === "en" ? `${v.name} (${v.scent})` : `${v.nameZh}`)).join(", ")
      return language === "en"
        ? `${product.name}: ${product.description} Available variants: ${variantNames}. Would you like more details about any specific variant?`
        : `${product.nameZh}：${product.descriptionZh} 可选款式：${variantNames}。您想了解哪款的更多详情？`
    }
  }

  // Check for sustainability/eco questions
  if (q.match(/\b(eco|green|sustainable|environment|natural|环保|绿色|可持续|天然)\b/i)) {
    return language === "en"
      ? "Charm is committed to sustainability! All our products feature: 99% natural ingredients, recyclable packaging, plant-based formulas, water-efficient production, cruelty-free testing, and carbon-neutral shipping. We believe in cleaning that cares for both your home and our planet."
      : "魅力致力于可持续发展！我们所有产品都具有：99%天然成分、可回收包装、植物配方、节水生产、无动物测试和碳中和运输。我们相信清洁既能呵护您的家，也能呵护我们的地球。"
  }

  // Check for scent/fragrance questions
  if (q.match(/\b(scent|fragrance|smell|aroma|香味|香氛|气味|芳香)\b/i)) {
    return language === "en"
      ? "Our products feature unique fragrances: Pheromone (seductive), Silent Aroma (calming), Heartbeat Whisper (romantic), Milan Fogland (sophisticated), Amber Bomb (warm), Neon Dream (energizing), Ylang-Ylang (exotic), Rose (classic), Azure Breeze (oceanic), and Peninsula Dew (natural). Which scent profile interests you?"
      : "我们的产品具有独特香氛：费洛蒙（诱惑）、静谧芬芳（宁静）、心跳私语（浪漫）、米兰雾境（精致）、琥珀炸弹（温暖）、霓虹之梦（活力）、依兰依兰（异域）、玫瑰（经典）、碧蓝微风（海洋）和半岛晨露（自然）。您对哪种香调感兴趣？"
  }

  // Default response
  return language === "en"
    ? "I can help you with information about Charm's Personal Care (shower gels, shampoos, handwash), Household (laundry detergent, dishwashing liquid), and Automotive (interior cleaner, tire wax, windshield washer) products. What would you like to know?"
    : "我可以帮助您了解魅力的个人护理（沐浴露、洗发水、洗手液）、家居清洁（洗衣液、洗洁精）和汽车护理（内饰清洁剂、轮胎蜡、挡风玻璃清洗液）产品。您想了解什么？"
}

export function AIChatbot() {
  const { language, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "greeting",
          role: "assistant",
          content: t(translations.chatbot.greeting.en, translations.chatbot.greeting.zh),
        },
      ])
    }
  }, [isOpen, messages.length, t])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate thinking delay
    setTimeout(() => {
      const response = generateResponse(input, language)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 800)
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-[#10069F] text-white rounded-full shadow-lg hover:bg-[#00BFB3] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,191,179,0.5)] ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="glass-dark rounded-2xl overflow-hidden shadow-2xl border border-[#00BFB3]/20">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50 bg-[#10069F]/50">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="Charm"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {t(translations.chatbot.title.en, translations.chatbot.title.zh)}
                </h3>
                <span className="text-xs text-[#00BFB3]">Online</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X size={20} className="text-foreground" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "user" ? "bg-[#10069F]" : "bg-[#00BFB3]"
                  }`}
                >
                  {message.role === "user" ? (
                    <User size={16} className="text-white" />
                  ) : (
                    <Bot size={16} className="text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-[#10069F] text-white rounded-br-none"
                      : "bg-white/10 text-foreground rounded-bl-none"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-[#00BFB3] flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-white/10 text-foreground p-3 rounded-2xl rounded-bl-none">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[#00BFB3] rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-[#00BFB3] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <span className="w-2 h-2 bg-[#00BFB3] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-border/50">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t(translations.chatbot.placeholder.en, translations.chatbot.placeholder.zh)}
                className="flex-1 px-4 py-3 bg-white/10 border border-border/50 rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-[#00BFB3] focus:ring-1 focus:ring-[#00BFB3] text-sm"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-3 bg-[#10069F] text-white rounded-xl hover:bg-[#00BFB3] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
