"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { PageTransition } from "@/components/page-transition"
import { useTranslation } from "@/lib/translation-context"
import { Mail, Phone, Send, Check, MessageCircle, Loader2, AlertCircle } from "lucide-react"
import { db, getFirebaseAnalytics } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

const COMPANY_EMAIL = "kenyacharm888@gmail.com"
const WECHAT_ID = "kzf-5888"
const WHATSAPP_NUMBER = "0721359999"
const WHATSAPP_LINK = "https://wa.me/254721359999"

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
      const name = formState.name.trim()
      const email = formState.email.trim()
      const subject = formState.subject.trim()
      const message = formState.message.trim()
      const emailBody = [
        `New Charm website inquiry`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        ``,
        `Message:`,
        message,
      ].join("\n")

      await Promise.all([
        addDoc(collection(db, "contact_messages"), {
          name,
          email,
          subject,
          message,
          recipientEmail: COMPANY_EMAIL,
          createdAt: serverTimestamp(),
          status: "unread",
          source: "contact_page",
        }),
        addDoc(collection(db, "mail"), {
          to: [COMPANY_EMAIL],
          message: {
            subject: `Charm website inquiry: ${subject}`,
            text: emailBody,
          },
          createdAt: serverTimestamp(),
          source: "contact_page",
        }),
      ])

      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setFormState({ name: "", email: "", subject: "", message: "" })
      }, 3000)
    } catch (err) {
      console.error("Error submitting form:", err)
      setError(t(
        "Failed to send message. Please try again or contact us directly via email, WhatsApp, or WeChat.",
        "发送消息失败。请重试或通过电子邮件、WhatsApp 或微信直接联系我们。"
      ))
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: t("Email Us", "发送邮件"),
      details: COMPANY_EMAIL,
      subtext: t("We'll respond as soon as possible", "我们会尽快回复"),
      href: `mailto:${COMPANY_EMAIL}`,
    },
    {
      icon: Phone,
      title: "WhatsApp",
      details: WHATSAPP_NUMBER,
      subtext: t("Message us directly on WhatsApp", "通过 WhatsApp 直接联系我们"),
      href: WHATSAPP_LINK,
    },
    {
      icon: MessageCircle,
      title: t("WeChat", "微信"),
      details: WECHAT_ID,
      subtext: t("Scan QR code or search ID", "扫描二维码或搜索ID"),
      href: "#wechat",
    },
  ]

  const qrCards = [
    {
      id: "wechat",
      title: t("WeChat", "微信"),
      image: "/wechat.jpg",
      alt: "Charm WeChat QR code",
      details: t("WeChat ID:", "微信号："),
      value: WECHAT_ID,
      href: "#wechat",
      description: t(
        "Scan with WeChat for product inquiries and support.",
        "使用微信扫描咨询产品并获取支持。"
      ),
    },
    {
      id: "whatsapp",
      title: "WhatsApp",
      image: "/whatsapp.jpg",
      alt: "Charm WhatsApp QR code",
      details: t("WhatsApp:", "WhatsApp："),
      value: WHATSAPP_NUMBER,
      href: WHATSAPP_LINK,
      description: t(
        "Scan or tap to message us on WhatsApp.",
        "扫描或点击通过 WhatsApp 联系我们。"
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
                      className="group flex items-start gap-4 glass rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,191,179,0.2)]"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#10069F]/20 flex items-center justify-center shrink-0 group-hover:bg-[#00BFB3] transition-colors duration-300">
                        <info.icon
                          size={24}
                          className="text-[#10069F] group-hover:text-white transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                        <p className="text-[#00BFB3] font-medium break-words">{info.details}</p>
                        <p className="text-sm text-foreground/50 mt-1">{info.subtext}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* QR Code Section */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {qrCards.map((card) => (
                    <a
                      key={card.id}
                      id={card.id}
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="glass rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,191,179,0.2)]"
                    >
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <MessageCircle size={20} className="text-[#00BFB3]" />
                        {card.title}
                      </h3>
                      <div className="flex flex-col items-start gap-4">
                        <div className="relative aspect-square w-full max-w-40 rounded-xl bg-white p-2">
                          <Image
                            src={card.image}
                            alt={card.alt}
                            fill
                            sizes="160px"
                            className="object-contain p-2"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-foreground/70 mb-2">{card.description}</p>
                          <p className="text-sm text-foreground/50">
                            {card.details} <span className="text-[#00BFB3] font-mono">{card.value}</span>
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-8">
                  <h3 className="font-semibold text-foreground mb-4">{t("Quick Contacts", "快速联系")}</h3>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { name: t("Email", "电子邮件"), href: `mailto:${COMPANY_EMAIL}` },
                      { name: "WhatsApp", href: WHATSAPP_LINK },
                      { name: t("WeChat", "微信"), href: "#wechat" },
                    ].map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target={social.href.startsWith("http") ? "_blank" : undefined}
                        rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="px-4 py-2 glass rounded-full text-sm text-foreground/70 hover:text-[#00BFB3] hover:border-[#00BFB3]/50 transition-all duration-300"
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="glass rounded-3xl p-5 sm:p-8">
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
