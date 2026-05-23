"use client"

import React from "react"
  import Image from "next/image"
  import { PageTransition } from "@/components/page-transition"
  import { useTranslation } from "@/lib/translation-context"
  import { Leaf, Recycle, Droplets, Wind, TreeDeciduous, Heart } from "lucide-react"

export default function SustainabilityPage() {
  const { t } = useTranslation()

  const features = [
    {
      icon: Leaf,
      title: t("Plant-Based Formula", "植物配方"),
      description: t(
        "99% natural ingredients derived from sustainable plant sources.",
        "99%天然成分来自可持续植物来源。"
      ),
    },
    {
      icon: Recycle,
      title: t("100% Recyclable", "100%可回收"),
      description: t(
        "All packaging is made from recycled materials and fully recyclable.",
        "所有包装均由回收材料制成，可完全回收。"
      ),
    },
    {
      icon: Droplets,
      title: t("Water Conservation", "节水"),
      description: t(
        "Concentrated formulas that use 50% less water in production.",
        "浓缩配方，生产用水减少50%。"
      ),
    },
    {
      icon: Wind,
      title: t("Carbon Neutral", "碳中和"),
      description: t(
        "We offset 100% of our carbon footprint through verified programs.",
        "我们通过认证项目抵消100%的碳足迹。"
      ),
    },
    {
      icon: TreeDeciduous,
      title: t("Reforestation", "植树造林"),
      description: t(
        "One tree planted for every product sold worldwide.",
        "每售出一件产品就种植一棵树。"
      ),
    },
    {
      icon: Heart,
      title: t("Cruelty Free", "无动物测试"),
      description: t(
        "Never tested on animals. Certified by leading organizations.",
        "从不进行动物测试。获得领先机构认证。"
      ),
    },
  ]

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/sustainability-bg.jpg"
              alt=""
              fill
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-[#00BFB3]/10 to-background" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <span className="text-[#00BFB3] text-sm font-semibold uppercase tracking-wider mb-4 block">
              {t("Our Commitment", "我们的承诺")}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              {t("Sustainability at Heart", "以可持续发展为核心")}
            </h1>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-pretty">
              {t(
                "We believe in cleaning that cares — for your home and our planet. Every product is designed with environmental responsibility in mind.",
                "我们相信清洁既能呵护您的家，也能呵护我们的地球。每款产品的设计都考虑到环境责任。"
              )}
            </p>
          </div>
        </section>



        {/* Features Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group glass rounded-3xl p-8 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,191,179,0.3)] hover:border-[#00BFB3]/50"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#00BFB3]/20 flex items-center justify-center mb-6 group-hover:bg-[#00BFB3] transition-colors duration-300">
                    <feature.icon
                      size={28}
                      className="text-[#00BFB3] group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-[#00BFB3] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/60 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="glass rounded-3xl p-8 md:p-12">
              <h2 className="text-2xl font-bold text-foreground text-center mb-12">
                {t("Our Environmental Impact", "我们的环境影响")}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { value: "100", label: t("Trees Planted", "已种植树木") },
                  { value: "500K", label: t("Tons CO₂ Offset", "吨碳排放抵消") },
                  { value: "95%", label: t("Recycled Packaging", "回收包装") },
                  { value: "0", label: t("Microplastics", "微塑料") },
                ].map((stat, index) => (
                  <div key={index}>
                    <div className="text-3xl md:text-4xl font-bold text-[#00BFB3] mb-2">{stat.value}</div>
                    <div className="text-sm text-foreground/60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Video Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {t("Our Commitment in Action", "我们的承诺在行动")}
              </h2>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden glass">
              <video
                className="w-full h-full object-cover"
                controls
                playsInline
              >
                <source src="/products/video-1.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
