"use client"

import { useState } from "react"
import { PageTransition } from "@/components/page-transition"
import { useTranslation } from "@/lib/translation-context"
import { ChevronDown, Search, Sparkles, Leaf, Truck, CreditCard, HelpCircle, MessageCircle } from "lucide-react"
import Link from "next/link"

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  icon: React.ElementType
  name: string
  nameZh: string
  faqs: { q: string; qZh: string; a: string; aZh: string }[]
}

const faqCategories: FAQCategory[] = [
  {
    icon: Sparkles,
    name: "Products",
    nameZh: "产品",
    faqs: [
      {
        q: "Are Charm products safe for sensitive skin?",
        qZh: "魅力产品对敏感肌肤安全吗？",
        a: "Yes! All Charm products are dermatologically tested and formulated with gentle, plant-based ingredients. Our personal care line is specifically designed for sensitive skin, free from harsh sulfates, parabens, and artificial fragrances.",
        aZh: "是的！所有魅力产品均经过皮肤病学测试，采用温和的植物成分配制。我们的个人护理系列专为敏感肌肤设计，不含刺激性硫酸盐、防腐剂和人工香料。",
      },
      {
        q: "What makes Charm different from other cleaning brands?",
        qZh: "魅力与其他清洁品牌有何不同？",
        a: "Charm combines premium quality with sustainability. Our products use 100% plant-based active ingredients, come in recyclable packaging, and are never tested on animals. We prove that luxury cleaning doesn't have to compromise on ethics or effectiveness.",
        aZh: "魅力将优质品质与可持续发展相结合。我们的产品使用100%植物活性成分，采用可回收包装，从不进行动物测试。我们证明了奢华清洁不必在道德或效果上妥协。",
      },
      {
        q: "How long do Charm products last?",
        qZh: "魅力产品可以使用多久？",
        a: "Our concentrated formulas are designed for efficiency. A standard bottle of household cleaner lasts 2-3 months with regular use. Personal care products vary by usage, but our shower gels typically last 4-6 weeks.",
        aZh: "我们的浓缩配方设计追求高效。标准瓶装家用清洁剂在正常使用下可持续2-3个月。个人护理产品因使用情况而异，但我们的沐浴露通常可使用4-6周。",
      },
      {
        q: "Do you offer product samples?",
        qZh: "你们提供产品样品吗？",
        a: "Yes! We offer a discovery kit that includes mini sizes of our best-selling products. It's perfect for trying our range before committing to full sizes. Contact us for bulk sample requests for businesses.",
        aZh: "是的！我们提供探索套装，包含我们畅销产品的迷你装。非常适合在购买正装前试用我们的产品系列。企业批量样品需求请联系我们。",
      },
      {
        q: "Are your automotive products safe for all car surfaces?",
        qZh: "你们的汽车产品对所有车辆表面都安全吗？",
        a: "Our automotive line is engineered to be safe on all standard vehicle surfaces including leather, vinyl, plastic, and painted surfaces. Always test on a small area first. For exotic materials, consult our support team.",
        aZh: "我们的汽车产品系列经过精心设计，对所有标准车辆表面都是安全的，包括皮革、乙烯基、塑料和油漆表面。请先在小区域测试。特殊材质请咨询我们的支持团队。",
      },
    ],
  },
  {
    icon: Leaf,
    name: "Sustainability",
    nameZh: "可持续发展",
    faqs: [
      {
        q: "Are your products eco-friendly?",
        qZh: "你们的产品环保吗？",
        a: "Absolutely. Charm products are formulated with biodegradable ingredients, packaged in 100% recyclable materials, and manufactured using renewable energy. We're committed to a zero-waste future.",
        aZh: "当然。魅力产品采用可生物降解成分配制，使用100%可回收材料包装，并使用可再生能源生产。我们致力于零浪费的未来。",
      },
      {
        q: "Do you test on animals?",
        qZh: "你们进行动物测试吗？",
        a: "Never. Charm is proudly cruelty-free and certified by Leaping Bunny. We use advanced laboratory testing methods and human volunteers to ensure product safety.",
        aZh: "从不。魅力自豪地承诺不进行动物实验，并获得Leaping Bunny认证。我们使用先进的实验室测试方法和人体志愿者来确保产品安全。",
      },
      {
        q: "What about your packaging?",
        qZh: "包装怎么样？",
        a: "Our packaging is made from post-consumer recycled materials and is fully recyclable. We're also piloting a refill program in select markets to further reduce packaging waste.",
        aZh: "我们的包装由消费后回收材料制成，完全可回收。我们还在部分市场试点补充装计划，进一步减少包装浪费。",
      },
      {
        q: "Do you have any environmental certifications?",
        qZh: "你们有任何环保认证吗？",
        a: "Yes, we hold multiple certifications including EPA Safer Choice, USDA BioPreferred, and B Corp certification. Our facilities are also ISO 14001 certified for environmental management.",
        aZh: "是的，我们拥有多项认证，包括EPA更安全选择、USDA生物优先和B Corp认证。我们的设施也获得了ISO 14001环境管理认证。",
      },
    ],
  },
  {
    icon: Truck,
    name: "Shipping & Delivery",
    nameZh: "配送",
    faqs: [
      {
        q: "How long does shipping take?",
        qZh: "配送需要多长时间？",
        a: "Standard shipping takes 5-7 business days. Express shipping (2-3 days) is available for an additional fee. International shipping varies by location, typically 7-14 business days.",
        aZh: "标准配送需要5-7个工作日。快递配送（2-3天）需支付额外费用。国际配送因地区而异，通常需要7-14个工作日。",
      },
      {
        q: "Do you ship internationally?",
        qZh: "你们提供国际配送吗？",
        a: "Yes! We ship to over 50 countries including Canada, UK, Australia, China, and throughout Europe and Asia. Customs duties may apply depending on your location.",
        aZh: "是的！我们向50多个国家发货，包括加拿大、英国、澳大利亚、中国以及欧洲和亚洲各地。根据您所在地区，可能需要缴纳关税。",
      },
      {
        q: "Is there free shipping?",
        qZh: "有免费配送吗？",
        a: "Free standard shipping is available on all orders over $50 within the continental US. Subscribe to our newsletter for exclusive free shipping promotions.",
        aZh: "美国本土订单满$50即可享受免费标准配送。订阅我们的通讯，获取独家免费配送优惠。",
      },
      {
        q: "Can I track my order?",
        qZh: "我可以追踪订单吗？",
        a: "Yes, you'll receive a tracking number via email once your order ships. You can track your package in real-time through our website or the carrier's tracking page.",
        aZh: "是的，订单发货后您将通过电子邮件收到物流单号。您可以通过我们的网站或承运商的追踪页面实时追踪包裹。",
      },
    ],
  },
  {
    icon: CreditCard,
    name: "Orders & Returns",
    nameZh: "订单与退货",
    faqs: [
      {
        q: "What is your return policy?",
        qZh: "你们的退货政策是什么？",
        a: "We offer a 30-day satisfaction guarantee. If you're not completely happy with your purchase, return it for a full refund. Defective products are replaced free of charge.",
        aZh: "我们提供30天满意保证。如果您对购买不完全满意，可以退货获得全额退款。缺陷产品免费更换。",
      },
      {
        q: "How do I return a product?",
        qZh: "如何退货？",
        a: "Contact our support team to initiate a return. We'll provide a prepaid shipping label for defective items. For other returns, shipping costs may apply.",
        aZh: "联系我们的支持团队发起退货。我们将为缺陷商品提供预付运费标签。其他退货可能需要支付运费。",
      },
      {
        q: "Can I modify my order after placing it?",
        qZh: "下单后可以修改订单吗？",
        a: "Orders can be modified within 2 hours of placement. After that, our fulfillment process begins. Contact us immediately if you need to make changes.",
        aZh: "下单后2小时内可以修改订单。之后，我们的配送流程将开始。如需更改，请立即联系我们。",
      },
      {
        q: "What payment methods do you accept?",
        qZh: "你们接受哪些付款方式？",
        a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and WeChat Pay for our Chinese customers.",
        aZh: "我们接受所有主要信用卡（Visa、Mastercard、Amex）、PayPal、Apple Pay、Google Pay，以及为中国客户提供的微信支付。",
      },
    ],
  },
  {
    icon: HelpCircle,
    name: "General",
    nameZh: "常规问题",
    faqs: [
      {
        q: "Where is Charm based?",
        qZh: "魅力总部在哪里？",
        a: "Charm is headquartered in San Francisco, California, with manufacturing facilities in the US and distribution centers worldwide to serve our global customer base.",
        aZh: "魅力总部位于加利福尼亚州旧金山，在美国设有生产设施，在全球设有配送中心，为全球客户提供服务。",
      },
      {
        q: "Do you offer wholesale or bulk pricing?",
        qZh: "你们提供批发或大宗定价吗？",
        a: "Yes! We offer competitive wholesale pricing for retailers, hotels, and businesses. Contact our B2B team at wholesale@charmclean.com for pricing and minimum order requirements.",
        aZh: "是的！我们为零售商、酒店和企业提供有竞争力的批发价格。请联系我们的B2B团队 wholesale@charmclean.com 了解价格和最低订单要求。",
      },
      {
        q: "How can I contact customer support?",
        qZh: "如何联系客户支持？",
        a: "Reach us via email at kenyacharm888@gmail.com, WhatsApp at 0721359999, or through WeChat (kzf-5888).",
        aZh: "通过电子邮件 kenyacharm888@gmail.com、WhatsApp 0721359999 或微信（kzf-5888）联系我们。",
      },
      {
        q: "Do you have a loyalty program?",
        qZh: "你们有会员计划吗？",
        a: "Yes! Our Charm Rewards program lets you earn points on every purchase, which can be redeemed for discounts, free products, and exclusive offers.",
        aZh: "是的！我们的魅力奖励计划让您每次购买都能赚取积分，可兑换折扣、免费产品和独家优惠。",
      },
    ],
  },
]

export default function FAQsPage() {
  const { t, language } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  // Filter FAQs based on search
  const filteredCategories = faqCategories.map((category) => ({
    ...category,
    faqs: category.faqs.filter((faq) => {
      const query = searchQuery.toLowerCase()
      const question = language === "en" ? faq.q : faq.qZh
      const answer = language === "en" ? faq.a : faq.aZh
      return question.toLowerCase().includes(query) || answer.toLowerCase().includes(query)
    }),
  })).filter((category) => category.faqs.length > 0)

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#00BFB3]/10 via-background to-background" />
          
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <span className="text-[#00BFB3] text-sm font-semibold uppercase tracking-wider mb-4 block">
              {t("Help Center", "帮助中心")}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              {t("Frequently Asked Questions", "常见问题")}
            </h1>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-pretty mb-8">
              {t(
                "Find answers to common questions about our products, shipping, and more.",
                "查找有关我们产品、配送等常见问题的答案。"
              )}
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("Search FAQs...", "搜索常见问题...")}
                className="w-full pl-12 pr-4 py-4 bg-background/50 border border-border rounded-2xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-[#00BFB3] focus:ring-1 focus:ring-[#00BFB3] transition-colors"
              />
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-16">
                <HelpCircle size={48} className="text-foreground/30 mx-auto mb-4" />
                <p className="text-foreground/60 mb-4">
                  {t("No results found for your search.", "未找到搜索结果。")}
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-[#00BFB3] hover:underline"
                >
                  {t("Clear search", "清除搜索")}
                </button>
              </div>
            ) : (
              <div className="space-y-12">
                {filteredCategories.map((category, catIndex) => (
                  <div key={catIndex}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-[#10069F]/20 flex items-center justify-center">
                        <category.icon size={20} className="text-[#00BFB3]" />
                      </div>
                      <h2 className="text-2xl font-bold text-foreground">
                        {language === "en" ? category.name : category.nameZh}
                      </h2>
                    </div>

                    <div className="space-y-4">
                      {category.faqs.map((faq, faqIndex) => {
                        const itemId = `${catIndex}-${faqIndex}`
                        const isOpen = openItems.has(itemId)
                        const question = language === "en" ? faq.q : faq.qZh
                        const answer = language === "en" ? faq.a : faq.aZh

                        return (
                          <div
                            key={faqIndex}
                            className="glass rounded-2xl overflow-hidden"
                          >
                            <button
                              onClick={() => toggleItem(itemId)}
                              className="w-full flex items-center justify-between p-6 text-left"
                            >
                              <span className="font-semibold text-foreground pr-4">{question}</span>
                              <ChevronDown
                                size={20}
                                className={`text-[#00BFB3] shrink-0 transition-transform duration-300 ${
                                  isOpen ? "rotate-180" : ""
                                }`}
                              />
                            </button>
                            <div
                              className={`overflow-hidden transition-all duration-300 ${
                                isOpen ? "max-h-96" : "max-h-0"
                              }`}
                            >
                              <div className="px-6 pb-6 text-foreground/70">{answer}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Still Need Help */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="glass rounded-3xl p-12">
              <MessageCircle size={48} className="text-[#00BFB3] mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t("Still have questions?", "还有疑问？")}
              </h2>
              <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
                {t(
                  "Can't find what you're looking for? Our support team is here to help via email, WhatsApp, or WeChat.",
                  "找不到您要找的内容？我们的支持团队可通过电子邮件、WhatsApp 或微信为您提供帮助。"
                )}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-[#10069F] text-white rounded-full font-semibold hover:bg-[#00BFB3] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,191,179,0.5)]"
                >
                  {t("Contact Support", "联系支持")}
                </Link>
                <a
                  href="#"
                  className="px-8 py-4 glass rounded-full font-semibold text-foreground hover:text-[#00BFB3] transition-all duration-300"
                >
                  {t("WeChat: kzf-5888", "微信: kzf-5888")}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
