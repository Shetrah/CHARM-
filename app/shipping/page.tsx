"use client"

import { PageTransition } from "@/components/page-transition"
import { useTranslation } from "@/lib/translation-context"
import { Truck, Globe, Clock, Shield, Package, MapPin, RefreshCw, CheckCircle } from "lucide-react"

export default function ShippingPage() {
  const { t } = useTranslation()

  const shippingMethods = [
    {
      icon: Truck,
      name: t("Standard Shipping", "标准配送"),
      time: t("5-7 Business Days", "5-7个工作日"),
      price: t("Free on orders over $50", "订单满$50免运费"),
      description: t(
        "Reliable ground shipping for domestic orders. Track your package every step of the way.",
        "国内订单可靠的陆运服务。全程跟踪您的包裹。"
      ),
    },
    {
      icon: Clock,
      name: t("Express Shipping", "快递配送"),
      time: t("2-3 Business Days", "2-3个工作日"),
      price: t("$9.99", "¥65"),
      description: t(
        "Need it faster? Our express option ensures quick delivery to your doorstep.",
        "需要更快？我们的快递选项确保快速送达您家门口。"
      ),
    },
    {
      icon: Globe,
      name: t("International Shipping", "国际配送"),
      time: t("7-14 Business Days", "7-14个工作日"),
      price: t("Varies by location", "价格因地区而异"),
      description: t(
        "We ship to over 50 countries worldwide. Customs fees may apply.",
        "我们向全球50多个国家发货。可能需要缴纳关税。"
      ),
    },
  ]

  const policies = [
    {
      icon: Package,
      title: t("Order Processing", "订单处理"),
      items: [
        t("Orders placed before 2PM EST ship same day", "东部时间下午2点前的订单当天发货"),
        t("Weekend orders ship Monday", "周末订单周一发货"),
        t("You'll receive tracking info via email", "您将通过电子邮件收到物流信息"),
        t("Bulk orders may require additional processing time", "大批量订单可能需要额外处理时间"),
      ],
    },
    {
      icon: MapPin,
      title: t("Delivery Areas", "配送区域"),
      items: [
        t("All 50 US states including Alaska and Hawaii", "美国所有50个州，包括阿拉斯加和夏威夷"),
        t("Canada - All provinces and territories", "加拿大 - 所有省份和地区"),
        t("China - Major cities and regions", "中国 - 主要城市和地区"),
        t("Europe, Asia-Pacific, and more", "欧洲、亚太地区等"),
      ],
    },
    {
      icon: Shield,
      title: t("Shipping Protection", "运输保障"),
      items: [
        t("All packages are fully insured", "所有包裹均有全额保险"),
        t("Eco-friendly packaging materials", "环保包装材料"),
        t("Fragile items receive extra protection", "易碎物品会得到额外保护"),
        t("Signature required for high-value orders", "高价值订单需要签名"),
      ],
    },
    {
      icon: RefreshCw,
      title: t("Returns & Exchanges", "退换货"),
      items: [
        t("30-day hassle-free returns", "30天无忧退货"),
        t("Free return shipping on defective items", "缺陷商品免费退货运费"),
        t("Exchanges processed within 48 hours", "换货48小时内处理"),
        t("Full refund to original payment method", "全额退款至原付款方式"),
      ],
    },
  ]

  const faqs = [
    {
      q: t("How do I track my order?", "如何追踪我的订单？"),
      a: t(
        "Once your order ships, you'll receive an email with your tracking number. Click the link or enter the number on our carrier's website to see real-time updates.",
        "订单发货后，您将收到一封包含物流单号的电子邮件。点击链接或在承运商网站上输入单号即可查看实时更新。"
      ),
    },
    {
      q: t("Do you offer same-day delivery?", "你们提供当日送达服务吗？"),
      a: t(
        "Same-day delivery is available in select metropolitan areas for orders placed before 10AM local time. Additional fees apply.",
        "部分大都市区域提供当日送达服务，需在当地时间上午10点前下单。需支付额外费用。"
      ),
    },
    {
      q: t("What if my package is damaged?", "如果包裹损坏怎么办？"),
      a: t(
        "Contact us within 48 hours of delivery with photos of the damage. We'll send a replacement immediately at no extra cost.",
        "请在收货后48小时内联系我们并提供损坏照片。我们将立即免费寄送替换商品。"
      ),
    },
    {
      q: t("Can I change my shipping address?", "可以更改收货地址吗？"),
      a: t(
        "Address changes can be made within 2 hours of placing your order. Contact our support team immediately for assistance.",
        "下单后2小时内可以更改地址。请立即联系我们的支持团队获取帮助。"
      ),
    },
  ]

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#00BFB3]/10 via-background to-background" />
          
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <span className="text-[#00BFB3] text-sm font-semibold uppercase tracking-wider mb-4 block">
              {t("Shipping & Delivery", "配送服务")}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              {t("Fast, Reliable Delivery", "快速可靠的配送")}
            </h1>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-pretty">
              {t(
                "We're committed to getting your Charm products to you quickly and safely, no matter where you are.",
                "无论您身在何处，我们都致力于快速安全地将魅力产品送达您手中。"
              )}
            </p>
          </div>
        </section>

        {/* Shipping Methods */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              {t("Shipping Options", "配送选项")}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {shippingMethods.map((method, index) => (
                <div
                  key={index}
                  className="glass rounded-3xl p-8 text-center transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,191,179,0.2)] hover:-translate-y-2"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#10069F]/20 flex items-center justify-center mx-auto mb-6">
                    <method.icon size={32} className="text-[#00BFB3]" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{method.name}</h3>
                  <p className="text-[#00BFB3] font-semibold mb-1">{method.time}</p>
                  <p className="text-sm text-foreground/50 mb-4">{method.price}</p>
                  <p className="text-foreground/70 text-sm">{method.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Policies Grid */}
        <section className="py-16 bg-[#10069F]/5">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              {t("Shipping Policies", "配送政策")}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {policies.map((policy, index) => (
                <div key={index} className="glass rounded-3xl p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#00BFB3]/20 flex items-center justify-center">
                      <policy.icon size={24} className="text-[#00BFB3]" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{policy.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {policy.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-[#00BFB3] shrink-0 mt-0.5" />
                        <span className="text-foreground/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Shipping FAQs */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">
              {t("Shipping FAQs", "配送常见问题")}
            </h2>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="glass rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">{faq.q}</h3>
                  <p className="text-foreground/70">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="glass rounded-3xl p-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t("Still Have Questions?", "还有疑问？")}
              </h2>
              <p className="text-foreground/60 mb-8">
                {t(
                  "Our customer support team is here to help with any shipping inquiries.",
                  "我们的客户支持团队随时为您解答任何配送问题。"
                )}
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#10069F] text-white rounded-full font-semibold hover:bg-[#00BFB3] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,191,179,0.5)]"
              >
                {t("Contact Support", "联系支持")}
              </a>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
