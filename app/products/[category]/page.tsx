"use client"

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { use } from "react"
import { PageTransition } from "@/components/page-transition"
import { useTranslation } from "@/lib/translation-context"
import { categories, getProductsByCategory, getCategoryBySlug } from "@/lib/products-data"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = use(params)
  const { language, t } = useTranslation()
  
  const category = getCategoryBySlug(categorySlug)
  const categoryProducts = getProductsByCategory(categorySlug)
  
  if (!category) {
    notFound()
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        {/* Back Button */}
        <div className="mx-auto max-w-7xl px-6 pt-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-foreground/60 hover:text-[#00BFB3] transition-colors"
          >
            <ArrowLeft size={20} />
            {t("Back to Products", "返回产品")}
          </Link>
        </div>

        {/* Category Hero */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="relative overflow-hidden rounded-3xl glass">
              <div className="relative h-64 md:h-80">
                <Image
                  src={category.image}
                  alt={language === "en" ? category.name : category.nameZh}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
              </div>
              <div className="absolute inset-0 flex items-center">
                <div className="p-8 md:p-12 max-w-xl">
                  <span className="text-[#00BFB3] text-sm font-semibold uppercase tracking-wider mb-4 block">
                    {categoryProducts.length} {t("Products", "产品")}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                    {language === "en" ? category.name : category.nameZh}
                  </h1>
                  <p className="text-lg text-foreground/70">
                    {language === "en" ? category.description : category.descriptionZh}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProducts.map((product) => (
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
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-[#00BFB3] transition-colors">
                      {language === "en" ? product.name : product.nameZh}
                    </h3>
                    <p className="text-sm text-foreground/60 mb-4 line-clamp-2">
                      {language === "en" ? product.description : product.descriptionZh}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground/50">
                        {product.variants.length} {t("variants available", "款式可选")}
                      </span>
                      <span className="flex items-center gap-2 text-[#00BFB3] text-sm font-medium group-hover:gap-4 transition-all">
                        {t("View", "查看")} <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Other Categories */}
        <section className="py-16 border-t border-border/50">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-2xl font-bold text-foreground mb-8">
              {t("Explore Other Categories", "探索其他类别")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {categories
                .filter((c) => c.slug !== categorySlug)
                .map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products/${cat.slug}`}
                    className="group flex items-center gap-6 glass rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(0,191,179,0.2)] transition-all duration-300"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={cat.image}
                        alt={language === "en" ? cat.name : cat.nameZh}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-[#00BFB3] transition-colors">
                        {language === "en" ? cat.name : cat.nameZh}
                      </h3>
                      <p className="text-sm text-foreground/60 line-clamp-1">
                        {language === "en" ? cat.description : cat.descriptionZh}
                      </p>
                    </div>
                    <ArrowRight size={20} className="text-[#00BFB3] group-hover:translate-x-2 transition-transform" />
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
