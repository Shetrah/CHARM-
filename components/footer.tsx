"use client"

import Image from "next/image"
import Link from "next/link"
import { useTranslation, translations } from "@/lib/translation-context"

const footerLinks = {
  en: {
    Products: [
      { label: "Personal Care", href: "/products/personal-care" },
      { label: "Household", href: "/products/household" },
      { label: "Automotive", href: "/products/automotive" },
    ],
    Company: [
      { label: "About Us", href: "/about" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Careers", href: "/contact" },
    ],
    Support: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/faqs" },
      { label: "Shipping Policy", href: "/shipping" },
    ],
  },
  zh: {
    产品: [
      { label: "个人护理", href: "/products/personal-care" },
      { label: "家居清洁", href: "/products/household" },
      { label: "汽车护理", href: "/products/automotive" },
    ],
    公司: [
      { label: "关于我们", href: "/about" },
      { label: "可持续发展", href: "/sustainability" },
      { label: "招贤纳士", href: "/contact" },
    ],
    支持: [
      { label: "联系我们", href: "/contact" },
      { label: "常见问题", href: "/faqs" },
      { label: "配送政策", href: "/shipping" },
    ],
  },
}

export function Footer() {
  const { language, t } = useTranslation()
  const links = language === "en" ? footerLinks.en : footerLinks.zh

  return (
    <footer className="relative overflow-hidden border-t border-border/50">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-[#10069F]/10" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt="Charm Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-foreground">
                Charm <span className="text-[#00BFB3]">魅力</span>
              </span>
            </Link>
            <p className="text-foreground/60 text-sm leading-relaxed mb-6 max-w-xs">
              {t(translations.footer.tagline.en, translations.footer.tagline.zh)}
            </p>
            <p className="text-[#00BFB3] text-sm font-medium">
              {t(translations.footer.motto.en, translations.footer.motto.zh)}
            </p>
          </div>

          {/* Links Columns */}
          {Object.entries(links).map(([title, linkList]) => (
            <div key={title}>
              <h4 className="font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-3">
                {linkList.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/60 hover:text-[#00BFB3] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground/50">
            © {new Date().getFullYear()} Charm (魅力). {t(translations.footer.rights.en, translations.footer.rights.zh)}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-sm text-foreground/50">Designed & Published by: NexxaCrafts</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
