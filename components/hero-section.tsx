"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { useTranslation, translations } from "@/lib/translation-context"

export function HeroSection() {
  const { t } = useTranslation()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay was prevented
      })
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-bg.jpg"
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-blue-ink-flowing-and-mixing-in-water-17862-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Fallback image while video loads */}
        {!isVideoLoaded && (
          <Image
            src="/hero-bg.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10069F]/30 to-[#00BFB3]/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        {/* Floating Logo */}
        <div className="animate-float mb-8">
          <div className="relative w-40 h-40 mx-auto">
            <Image
              src="/logo.png"
              alt="Charm Logo"
              fill
              className="object-contain drop-shadow-[0_0_30px_rgba(0,191,179,0.5)]"
              priority
            />
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
          {t(translations.hero.title1.en, translations.hero.title1.zh)}
          <span className="block mt-2 bg-gradient-to-r from-[#10069F] via-[#00BFB3] to-[#FF6B6B] bg-clip-text text-transparent">
            {t(translations.hero.title2.en, translations.hero.title2.zh)}
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-8 text-pretty leading-relaxed">
          {t(translations.hero.tagline.en, translations.hero.tagline.zh)}{" "}
          <span className="text-[#00BFB3]">{t(translations.hero.infiniteCharm.en, translations.hero.infiniteCharm.zh)}</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/products"
            className="px-8 py-4 bg-[#10069F] text-white font-semibold rounded-full hover:bg-[#00BFB3] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,191,179,0.5)] transform hover:scale-105"
          >
            {t(translations.hero.exploreProducts.en, translations.hero.exploreProducts.zh)}
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 glass text-foreground font-semibold rounded-full hover:bg-[#00BFB3]/20 transition-all duration-300 hover:border-[#00BFB3]"
          >
            {t(translations.hero.ourStory.en, translations.hero.ourStory.zh)}
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "99%", label: t(translations.stats.natural.en, translations.stats.natural.zh) },
            { value: "50M+", label: t(translations.stats.customers.en, translations.stats.customers.zh) },
            { value: "0", label: t(translations.stats.chemicals.en, translations.stats.chemicals.zh) },
            { value: "100%", label: t(translations.stats.eco.en, translations.stats.eco.zh) },
          ].map((stat, index) => (
            <div key={index} className="glass rounded-2xl p-6 animate-glow" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="text-3xl md:text-4xl font-bold text-[#00BFB3] mb-2">{stat.value}</div>
              <div className="text-sm text-foreground/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <Link href="/products" aria-label="Scroll to products">
          <ChevronDown size={32} className="text-[#00BFB3]" />
        </Link>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {[
          { left: 5, top: 10, delay: 0, duration: 5 },
          { left: 15, top: 80, delay: 1.2, duration: 6 },
          { left: 25, top: 30, delay: 2.5, duration: 4.5 },
          { left: 35, top: 60, delay: 0.8, duration: 7 },
          { left: 45, top: 20, delay: 3, duration: 5.5 },
          { left: 55, top: 90, delay: 1.5, duration: 6.5 },
          { left: 65, top: 45, delay: 4, duration: 4 },
          { left: 75, top: 70, delay: 2, duration: 7.5 },
          { left: 85, top: 15, delay: 0.5, duration: 5 },
          { left: 95, top: 55, delay: 3.5, duration: 6 },
          { left: 10, top: 40, delay: 1, duration: 4.5 },
          { left: 20, top: 75, delay: 2.8, duration: 5.5 },
          { left: 30, top: 5, delay: 0.3, duration: 6 },
          { left: 40, top: 85, delay: 4.5, duration: 7 },
          { left: 50, top: 50, delay: 1.8, duration: 4 },
          { left: 60, top: 25, delay: 3.2, duration: 5 },
          { left: 70, top: 65, delay: 0.7, duration: 6.5 },
          { left: 80, top: 35, delay: 2.2, duration: 7.5 },
          { left: 90, top: 95, delay: 4.2, duration: 5.5 },
          { left: 8, top: 58, delay: 1.6, duration: 6 },
        ].map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#00BFB3]/30 animate-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>
    </section>
  )
}
