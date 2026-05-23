"use client"

import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"
import { PageTransition } from "@/components/page-transition"
import { useTranslation, translations } from "@/lib/translation-context"
import { categories, products } from "@/lib/products-data"
import { Sparkles, Home, Car, ArrowRight, Pause, Play } from "lucide-react"

const categoryIcons: Record<string, React.ReactNode> = {
  "personal-care": <Sparkles size={24} />,
  household: <Home size={24} />,
  automotive: <Car size={24} />,
}

function ProductVideoCard({ title, video }: { title: string; video: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlayback = async () => {
    const videoElement = videoRef.current

    if (!videoElement) {
      return
    }

    if (videoElement.paused) {
      try {
        await videoElement.play()
      } catch {
        setIsPlaying(false)
      }
    } else {
      videoElement.pause()
    }
  }

  return (
    <div className="group relative aspect-video rounded-2xl overflow-hidden glass">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        controls
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-6">
        <button
          type="button"
          onClick={togglePlayback}
          className="pointer-events-auto inline-flex items-center gap-2 text-lg font-semibold text-foreground transition-colors hover:text-[#00BFB3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00BFB3] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={`${isPlaying ? "Pause" : "Play"} ${title} video`}
        >
          {isPlaying ? (
            <Pause size={16} className="text-[#00BFB3]" />
          ) : (
            <Play size={16} className="text-[#00BFB3]" />
          )}
          {title}
        </button>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  const { language, t } = useTranslation()

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#10069F]/10 via-background to-background" />
          
          <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
            <span className="text-[#00BFB3] text-sm font-semibold uppercase tracking-wider mb-4 block">
              {t(translations.products.collection.en, translations.products.collection.zh)}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              {t(translations.products.title.en, translations.products.title.zh)}
            </h1>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-pretty">
              {t(translations.products.subtitle.en, translations.products.subtitle.zh)}
            </p>
          </div>
        </section>

        {/* Video Showcase Section */}
        <section className="py-16 relative">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("See Our Products in Action", "观看我们的产品展示")}
              </h2>
              <p className="text-foreground/60 max-w-xl mx-auto">
                {t(
                  "Watch how Charm products transform your cleaning experience",
                  "观看魅力产品如何改变您的清洁体验"
                )}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: language === "en" ? "Handwash" : "个人护理系列",
                  video: "/products/video-handwash.mp4",
                },
                {
                  title: language === "en" ? "Shampoo" : "香皂家居清洁系列",
                  video: "/products/video-shampoo.mp4",
                },
                {
                  title: language === "en" ? "Shower Gel" : "汽车护理系列",
                  video: "/products/video-shower.mp4",
                },
              ].map((item) => (
                <ProductVideoCard
                  key={item.video}
                  title={item.title}
                  video={item.video}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              {t("Browse by Category", "按类别浏览")}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products/${category.slug}`}
                  className="group relative overflow-hidden rounded-3xl glass hover:shadow-[0_0_40px_rgba(0,191,179,0.3)] transition-all duration-500"
                >
                  <div className="relative h-64">
                    <Image
                      src={category.image}
                      alt={language === "en" ? category.name : category.nameZh}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-[#00BFB3]/20 rounded-lg text-[#00BFB3]">
                        {categoryIcons[category.id]}
                      </div>
                      <span className="text-xs text-[#00BFB3] uppercase tracking-wider">
                        {products.filter((p) => p.category === category.slug).length} {t("Products", "产品")}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-[#00BFB3] transition-colors">
                      {language === "en" ? category.name : category.nameZh}
                    </h3>
                    <p className="text-foreground/60 text-sm mb-4">
                      {language === "en" ? category.description : category.descriptionZh}
                    </p>
                    <span className="flex items-center gap-2 text-[#00BFB3] text-sm font-medium group-hover:gap-4 transition-all">
                      {t("Explore", "探索")} <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Products Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              {t("All Products", "所有产品")}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.category}/${product.slug}`}
                  className="group relative glass rounded-3xl overflow-hidden hover:shadow-[0_0_40px_rgba(0,191,179,0.3)] transition-all duration-500"
                >
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-[#FF6B6B] text-white text-xs font-semibold rounded-full">
                      {language === "en" ? product.badge : product.badgeZh}
                    </div>
                  )}
                  
                  <div className="relative h-56">
                    <Image
                      src={product.image}
                      alt={language === "en" ? product.name : product.nameZh}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  </div>
                  
                  <div className="p-6">
                    <span className="text-xs text-[#00BFB3] uppercase tracking-wider">
                      {language === "en" ? product.categoryZh : product.category.replace("-", " ")}
                    </span>
                    <h3 className="text-xl font-semibold text-foreground mt-2 mb-2 group-hover:text-[#00BFB3] transition-colors">
                      {language === "en" ? product.name : product.nameZh}
                    </h3>
                    <p className="text-sm text-foreground/60 mb-4 line-clamp-2">
                      {language === "en" ? product.description : product.descriptionZh}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground/50">
                        {product.variants.length} {t("variants", "款式")}
                      </span>
                      <span className="flex items-center gap-2 text-[#00BFB3] text-sm font-medium group-hover:gap-4 transition-all">
                        {t(translations.products.viewDetails.en, translations.products.viewDetails.zh)} <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
