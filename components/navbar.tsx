"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { LanguageToggle } from "./language-toggle"
import { useTranslation, translations } from "@/lib/translation-context"

export function Navbar() {
  const { t } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: t(translations.nav.home.en, translations.nav.home.zh), href: "/" },
    { name: t(translations.nav.products.en, translations.nav.products.zh), href: "/products" },
    { name: t(translations.nav.about.en, translations.nav.about.zh), href: "/about" },
    { name: t(translations.nav.sustainability.en, translations.nav.sustainability.zh), href: "/sustainability" },
    { name: t(translations.nav.contact.en, translations.nav.contact.zh), href: "/contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b border-[#00BFB3]/20 bg-[#05040F]/95 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-500 ${
        isScrolled
          ? "py-3"
          : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/logo.png"
              alt="Charm Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-bold text-foreground hidden sm:block">
            Charm <span className="text-[#00BFB3]">魅力</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`relative text-sm font-medium transition-colors duration-300 ${
                isActive(item.href)
                  ? "text-[#00BFB3]"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {item.name}
              {isActive(item.href) && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00BFB3] rounded-full animate-pulse-glow" />
              )}
            </Link>
          ))}
        </div>

        {/* Right Side - Language Toggle & CTA */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageToggle />
          <Link
            href="/contact"
            className="px-6 py-2.5 bg-[#10069F] text-white text-sm font-medium rounded-full hover:bg-[#00BFB3] transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,191,179,0.5)]"
          >
            {t("Get Started", "立即开始")}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <LanguageToggle />
          <button
            className="text-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-dark mt-4 mx-6 rounded-2xl p-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg font-medium transition-colors duration-300 ${
                  isActive(item.href)
                    ? "text-[#00BFB3]"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
