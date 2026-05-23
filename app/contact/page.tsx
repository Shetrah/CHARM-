"use client"

import { useEffect, useState } from "react"
import { PageTransition } from "@/components/page-transition"
import { useTranslation } from "@/lib/translation-context"
import { Mail, Phone, MapPin, Send, Check, MessageCircle, Loader2, AlertCircle } from "lucide-react"
import { db, getFirebaseAnalytics } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export default function ContactPage() {
  const { t } = useTranslation()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void getFirebaseAnalytics()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Submit to Firebase Firestore
      await addDoc(collection(db, "contact_messages"), {
        name: formState.name.trim(),
        email: formState.email.trim(),
        subject: formState.subject.trim(),
        message: formState.message.trim(),
        createdAt: serverTimestamp(),
        status: "unread",
        source: "contact_page",
      })

      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setFormState({ name: "", email: "", subject: "", message: "" })
      }, 3000)
    } catch (err) {
      console.error("Error submitting form:", err)
      setError(t(
        "Failed to send message. Please try again or contact us directly via email or WeChat.",
        "发送消息失败。请重试或通过电子邮件或微信直接联系我们。"
      ))
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: t("Email Us", "发送邮件"),
      details: "hello@charmclean.com",
      subtext: t("We'll respond within 24 hours", "我们将在24小时内回复"),
      href: "mailto:hello@charmclean.com",
    },
    {
      icon: Phone,
      title: t("Call Us", "致电我们"),
      details: "+1 (888) CHARM-99",
      subtext: t("Mon-Fri, 9AM-6PM EST", "周一至周五，上午9点至下午6点"),
      href: "tel:+18882427699",
    },
    {
      icon: MessageCircle,
      title: t("WeChat", "微信"),
      details: "CharmClean_Official",
      subtext: t("Scan QR code or search ID", "扫描二维码或搜索ID"),
      href: "#wechat",
    },
    {
      icon: MapPin,
      title: t("Visit Us", "访问我们"),
      details: "123 Innovation Drive",
      subtext: "San Francisco, CA 94105",
      href: "https://maps.google.com/?q=123+Innovation+Drive+San+Francisco",
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
              {t("Get in Touch", "联系我们")}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              {t("Let's Connect", "让我们联系")}
            </h1>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-pretty">
              {t(
                "Have questions about our products or want to collaborate? We'd love to hear from you.",
                "对我们的产品有疑问或想要合作？我们很乐意收到您的来信。"
              )}
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-8">
                  {t("Contact Information", "联系信息")}
                </h2>

                <div className="space-y-6 mb-12">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.href}
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-start gap-4 glass rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,191,179,0.2)] block"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#10069F]/20 flex items-center justify-center shrink-0 group-hover:bg-[#00BFB3] transition-colors duration-300">
                        <info.icon
                          size={24}
                          className="text-[#10069F] group-hover:text-white transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                        <p className="text-[#00BFB3] font-medium">{info.details}</p>
                        <p className="text-sm text-foreground/50 mt-1">{info.subtext}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* WeChat QR Code Section */}
                <div id="wechat" className="glass rounded-2xl p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <MessageCircle size={20} className="text-[#00BFB3]" />
                    {t("WeChat Official Account", "微信公众号")}
                  </h3>
                  <div className="flex items-center gap-6">
                    <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center p-2">
                      {/* QR Code Placeholder - in production, use actual WeChat QR */}
                      <div className="w-full h-full bg-gradient-to-br from-[#10069F]/10 to-[#00BFB3]/10 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <MessageCircle size={32} className="text-[#00BFB3] mx-auto mb-1" />
                          <span className="text-xs text-foreground/60">QR Code</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/70 mb-2">
                        {t(
                          "Scan with WeChat to follow us and get instant support",
                          "使用微信扫描关注我们并获得即时支持"
                        )}
                      </p>
                      <p className="text-sm text-foreground/50">
                        {t("WeChat ID:", "微信号：")} <span className="text-[#00BFB3] font-mono">CharmClean_Official</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8">
                  <h3 className="font-semibold text-foreground mb-4">{t("Follow Us", "关注我们")}</h3>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { name: "Instagram", href: "#" },
                      { name: "Twitter", href: "#" },
                      { name: "LinkedIn", href: "#" },
                      { name: "YouTube", href: "#" },
                      { name: t("WeChat", "微信"), href: "#wechat" },
                    ].map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        className="px-4 py-2 glass rounded-full text-sm text-foreground/70 hover:text-[#00BFB3] hover:border-[#00BFB3]/50 transition-all duration-300"
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="glass rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  {t("Send a Message", "发送消息")}
                </h2>

                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
                    <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-500">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground/70 mb-2">
                        {t("Your Name", "您的姓名")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-[#00BFB3] focus:ring-1 focus:ring-[#00BFB3] transition-colors disabled:opacity-50"
                        placeholder={t("John Doe", "张三")}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground/70 mb-2">
                        {t("Email Address", "电子邮箱")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-[#00BFB3] focus:ring-1 focus:ring-[#00BFB3] transition-colors disabled:opacity-50"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground/70 mb-2">
                      {t("Subject", "主题")}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-[#00BFB3] focus:ring-1 focus:ring-[#00BFB3] transition-colors disabled:opacity-50"
                      placeholder={t("How can we help?", "我们如何帮助您？")}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground/70 mb-2">
                      {t("Message", "消息")}
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-[#00BFB3] focus:ring-1 focus:ring-[#00BFB3] transition-colors resize-none disabled:opacity-50"
                      placeholder={t("Tell us more about your inquiry...", "请告诉我们更多关于您的询问...")}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                      isSubmitted
                        ? "bg-green-500 text-white"
                        : isSubmitting
                        ? "bg-[#10069F]/70 text-white cursor-not-allowed"
                        : "bg-[#10069F] text-white hover:bg-[#00BFB3] hover:shadow-[0_0_30px_rgba(0,191,179,0.5)]"
                    }`}
                  >
                    {isSubmitted ? (
                      <>
                        <Check size={20} /> {t("Message Sent!", "消息已发送！")}
                      </>
                    ) : isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> {t("Sending...", "发送中...")}
                      </>
                    ) : (
                      <>
                        <Send size={20} /> {t("Send Message", "发送消息")}
                      </>
                    )}
                  </button>
                </form>

                <p className="text-xs text-foreground/40 text-center mt-6">
                  {t(
                    "By submitting this form, you agree to our privacy policy. We'll never share your information.",
                    "提交此表单即表示您同意我们的隐私政策。我们绝不会分享您的信息。"
                  )}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
