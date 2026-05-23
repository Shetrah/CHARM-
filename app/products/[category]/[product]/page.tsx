"use client"

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { use, useState } from "react"
import { PageTransition } from "@/components/page-transition"
import { useTranslation } from "@/lib/translation-context"
import { getProductBySlug, getCategoryBySlug, products } from "@/lib/products-data"
import { ArrowLeft, ArrowRight, Check, Leaf, Droplets, Shield } from "lucide-react"

export default function ProductPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>
}) {
  const { category: categorySlug, product: productSlug } = use(params)
  const { language, t } = useTranslation()
  const [selectedVariant, setSelectedVariant] = useState(0)

  const product = getProductBySlug(productSlug)
  const category = getCategoryBySlug(categorySlug)

  if (!product || !category) {
    notFound()
  }

  const currentVariant = product.variants[selectedVariant]

  // Get related products from same category
  const relatedProducts = products
    .filter((p) => p.category === categorySlug && p.id !== product.id)
    .slice(0, 3)

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-6 pt-8">
          <nav className="flex items-center gap-2 text-sm text-foreground/60">
            <Link href="/products" className="hover:text-[#00BFB3] transition-colors">
              {t("Products", "产品")}
            </Link>
            <span>/</span>
            <Link
              href={`/products/${categorySlug}`}
              className="hover:text-[#00BFB3] transition-colors"
            >
              {language === "en" ? category.name : category.nameZh}
            </Link>
            <span>/</span>
            <span className="text-foreground">
              {language === "en" ? product.name : product.nameZh}
            </span>
          </nav>
        </div>

        {/* Product Hero */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Product Image */}
              <div className="relative">
                <div className="relative aspect-square rounded-3xl overflow-hidden glass">
                  <Image
                    src={currentVariant.image}
                    alt={language === "en" ? currentVariant.name : currentVariant.nameZh}
                    fill
                    className="object-cover"
                    priority
                  />
                  {product.badge && (
                    <div className="absolute top-6 left-6 px-4 py-2 bg-[#FF6B6B] text-white text-sm font-semibold rounded-full">
                      {language === "en" ? product.badge : product.badgeZh}
                    </div>
                  )}
                </div>
                
                {/* Variant Thumbnails */}
                <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(index)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-300 ${
                        selectedVariant === index
                          ? "ring-2 ring-[#00BFB3] ring-offset-2 ring-offset-background"
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={variant.image}
                        alt={language === "en" ? variant.name : variant.nameZh}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div>
                <span className="text-[#00BFB3] text-sm font-semibold uppercase tracking-wider">
                  {language === "en" ? category.name : category.nameZh}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
                  {language === "en" ? product.name : product.nameZh}
                </h1>
                <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
                  {language === "en" ? product.description : product.descriptionZh}
                </p>

                {/* Selected Variant Details */}
                <div className="glass rounded-2xl p-6 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      {language === "en" ? currentVariant.name : currentVariant.nameZh}
                    </h3>
                    <span className="px-3 py-1 bg-[#00BFB3]/20 text-[#00BFB3] text-sm rounded-full">
                      {language === "en" ? currentVariant.scent : currentVariant.scentZh}
                    </span>
                  </div>
                  <p className="text-foreground/60">
                    {language === "en" ? currentVariant.description : currentVariant.descriptionZh}
                  </p>
                </div>

                {/* Variant Selector */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                    {t("Available Variants", "可选款式")} ({product.variants.length})
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant, index) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(index)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                          selectedVariant === index
                            ? "bg-[#10069F] text-white shadow-[0_0_20px_rgba(16,6,159,0.5)]"
                            : "glass text-foreground/70 hover:text-foreground hover:bg-[#00BFB3]/10"
                        }`}
                      >
                        {selectedVariant === index && <Check size={16} />}
                        {language === "en" ? variant.name : variant.nameZh}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: <Leaf size={20} />, label: t("Natural Ingredients", "天然成分") },
                    { icon: <Droplets size={20} />, label: t("Gentle Formula", "温和配方") },
                    { icon: <Shield size={20} />, label: t("Eco-Friendly", "环保友好") },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="glass rounded-xl p-4 text-center"
                    >
                      <div className="text-[#00BFB3] mb-2 flex justify-center">{feature.icon}</div>
                      <span className="text-xs text-foreground/60">{feature.label}</span>
                    </div>
                  ))}
                </div>

                {/* Contact CTA */}
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="w-full block text-center px-8 py-4 bg-[#10069F] text-white font-semibold rounded-full hover:bg-[#00BFB3] transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,191,179,0.5)]"
                  >
                    {t("Contact Us for Orders", "联系我们订购")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Video */}
        {product.video && (
          <section className="py-16">
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {t("See It in Action", "观看产品展示")}
                </h2>
                <p className="text-foreground/60">
                  {t(
                    "Experience the premium quality of our products",
                    "体验我们产品的优质品质"
                  )}
                </p>
              </div>
              <div className="relative aspect-video rounded-3xl overflow-hidden glass group">
                <video
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                >
                  <source src={product.video} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16 border-t border-border/50">
            <div className="mx-auto max-w-7xl px-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-foreground">
                  {t("Related Products", "相关产品")}
                </h2>
                <Link
                  href={`/products/${categorySlug}`}
                  className="flex items-center gap-2 text-[#00BFB3] hover:gap-4 transition-all"
                >
                  {t("View All", "查看全部")} <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.category}/${relatedProduct.slug}`}
                    className="group glass rounded-2xl overflow-hidden hover:shadow-[0_0_30px_rgba(0,191,179,0.2)] transition-all duration-300"
                  >
                    <div className="relative h-48">
                      <Image
                        src={relatedProduct.image}
                        alt={language === "en" ? relatedProduct.name : relatedProduct.nameZh}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-foreground group-hover:text-[#00BFB3] transition-colors">
                        {language === "en" ? relatedProduct.name : relatedProduct.nameZh}
                      </h3>
                      <p className="text-sm text-foreground/60 mt-1">
                        {relatedProduct.variants.length} {t("variants", "款式")}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back Navigation */}
        <section className="py-8">
          <div className="mx-auto max-w-7xl px-6">
            <Link
              href={`/products/${categorySlug}`}
              className="inline-flex items-center gap-2 text-foreground/60 hover:text-[#00BFB3] transition-colors"
            >
              <ArrowLeft size={20} />
              {t("Back to", "返回")} {language === "en" ? category.name : category.nameZh}
            </Link>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
