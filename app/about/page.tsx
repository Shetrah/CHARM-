"use client"

import React from "react"
  import Image from "next/image"
  import { PageTransition } from "@/components/page-transition"
  import { useTranslation } from "@/lib/translation-context"
  import { Award, Users, Globe, Sparkles } from "lucide-react"

export default function AboutPage() {
  const { t } = useTranslation()

  const milestones = [
    {
      year: "2015",
      title: t("Founded", "成立"),
      description: t("Born from a vision to revolutionize cleaning", "源于革新清洁的愿景"),
    },
    {
      year: "2017",
      title: t("First Product", "首款产品"),
      description: t("Launched our signature detergent line", "推出标志性洗涤产品线"),
    },
    {
      year: "2019",
      title: t("Global Expansion", "全球扩展"),
      description: t("Expanded to 50+ countries worldwide", "扩展至全球50多个国家"),
    },
    {
      year: "2021",
      title: t("Carbon Neutral", "碳中和"),
      description: t("Achieved full carbon neutrality", "实现完全碳中和"),
    },
    {
      year: "2023",
      title: t("Innovation Award", "创新奖"),
      description: t("Won Global Sustainability Award", "获得全球可持续发展奖"),
    },
    {
      year: "2025",
      title: t("50M Customers", "5000万客户"),
      description: t("Reached 50 million happy homes", "服务5000万幸福家庭"),
    },
  ]

  const values = [
    {
      icon: Sparkles,
      title: t("Innovation", "创新"),
      description: t("Constantly pushing boundaries in cleaning technology.", "不断突破清洁技术的边界。"),
    },
    {
      icon: Globe,
      title: t("Sustainability", "可持续发展"),
      description: t("Every decision considers our environmental impact.", "每项决策都考虑环境影响。"),
    },
    {
      icon: Users,
      title: t("Community", "社区"),
      description: t("Building connections with our customers worldwide.", "与全球客户建立联系。"),
    },
    {
      icon: Award,
      title: t("Excellence", "卓越"),
      description: t("Uncompromising quality in every product we create.", "每款产品都保持卓越品质。"),
    },
  ]

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#10069F]/10 via-background to-background" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <span className="text-[#00BFB3] text-sm font-semibold uppercase tracking-wider mb-4 block">
              {t("Our Story", "我们的故事")}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              {t("The Charm Journey", "魅力之旅")}
            </h1>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-pretty">
              {t(
                "From a small startup to a global leader in premium eco-cleaning, our journey has been defined by innovation, sustainability, and an unwavering commitment to excellence.",
                "从一个小型初创企业到全球高端环保清洁领导者，我们的旅程由创新、可持续发展和对卓越的坚定承诺所定义。"
              )}
            </p>
          </div>
        </section>

        {/* Video & Story */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Video */}
              <div className="rounded-3xl overflow-hidden glass">
                <div className="aspect-video relative">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                  >
                    <source
                      src="/products/video-2.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Story */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  {t("Crafting the Future of", "打造未来的")}{" "}
                  <span className="text-[#00BFB3]">{t("Clean", "清洁")}</span>
                </h2>
                <div className="space-y-4 text-foreground/70 leading-relaxed">
                  <p>
                    {t(
                      "Charm (魅力) was born from a simple yet powerful idea: cleaning products should be as kind to our planet as they are effective in our homes.",
                      "魅力源于一个简单却强大的理念：清洁产品应该既对地球友好，又在家中有效。"
                    )}
                  </p>
                  <p>
                    {t(
                      "Our founders, inspired by traditional Asian cleaning wisdom and modern biotechnology, set out to create a new category of premium cleaning products that deliver exceptional results without compromising environmental values.",
                      "我们的创始人受到传统亚洲清洁智慧和现代生物技术的启发，着手创造一类新的高端清洁产品，在不妥协环保价值的前提下提供卓越效果。"
                    )}
                  </p>
                  <p>
                    {t(
                      "Today, Charm products grace millions of homes worldwide, each bottle representing our commitment to",
                      "如今，魅力产品遍布全球数百万家庭，每一瓶都代表着我们对"
                    )}{" "}
                    <span className="text-[#00BFB3] font-medium">
                      {t("infinite charm", "无限魅力")}
                    </span>{" "}
                    {t(
                      "— the perfect harmony of luxury, effectiveness, and sustainability.",
                      "的承诺——奢华、有效和可持续的完美和谐。"
                    )}
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div className="glass rounded-2xl p-6">
                    <div className="text-3xl font-bold text-[#00BFB3] mb-1">50+</div>
                    <div className="text-sm text-foreground/60">{t("Countries Served", "服务国家")}</div>
                  </div>
                  <div className="glass rounded-2xl p-6">
                    <div className="text-3xl font-bold text-[#00BFB3] mb-1">200+</div>
                    <div className="text-sm text-foreground/60">{t("Team Members", "团队成员")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-2xl font-bold text-foreground text-center mb-12">
              {t("Our Core Values", "我们的核心价值观")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group glass rounded-3xl p-8 text-center transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,191,179,0.3)]"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#10069F]/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-[#00BFB3] transition-colors duration-300">
                    <value.icon
                      size={32}
                      className="text-[#10069F] group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-foreground/60 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-2xl font-bold text-foreground text-center mb-12">
              {t("Our Journey", "我们的历程")}
            </h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#10069F] to-[#00BFB3] hidden md:block" />

              <div className="space-y-8 md:space-y-0">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`relative md:flex items-center ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Content */}
                    <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <div className="glass rounded-2xl p-6 inline-block">
                        <span className="text-[#00BFB3] font-bold text-lg">{milestone.year}</span>
                        <h3 className="text-xl font-semibold text-foreground mt-1">{milestone.title}</h3>
                        <p className="text-foreground/60 text-sm mt-2">{milestone.description}</p>
                      </div>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#00BFB3] hidden md:block shadow-[0_0_20px_rgba(0,191,179,0.5)]" />

                    {/* Spacer */}
                    <div className="md:w-1/2" />
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
                {t("Our Story", "我们的故事")}
              </h2>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden glass">
              <video
                className="w-full h-full object-cover"
                controls
                playsInline
              >
                <source src="/products/video-2.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
