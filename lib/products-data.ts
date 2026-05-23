export interface ProductVariant {
  id: string
  name: string
  nameZh: string
  scent: string
  scentZh: string
  description: string
  descriptionZh: string
  image: string
  video?: string
}

export interface Product {
  id: string
  slug: string
  name: string
  nameZh: string
  category: string
  categoryZh: string
  description: string
  descriptionZh: string
  image: string
  badge?: string
  badgeZh?: string
  video?: string
  variants: ProductVariant[]
}

export interface Category {
  id: string
  slug: string
  name: string
  nameZh: string
  description: string
  descriptionZh: string
  icon: string
  image: string
}

export const categories: Category[] = [
  {
    id: "personal-care",
    slug: "personal-care",
    name: "Personal Care",
    nameZh: "个人护理",
    description: "Luxurious body care products for your daily routine",
    descriptionZh: "为您的日常护理提供奢华的身体护理产品",
    icon: "sparkles",
    image: "/products/hand-wash.jpg",
  },
  {
    id: "household",
    slug: "household",
    name: "Household",
    nameZh: "家居清洁",
    description: "Premium cleaning solutions for a spotless home",
    descriptionZh: "为一尘不染的家提供优质清洁解决方案",
    icon: "home",
    image: "/products/laundry-detergent.jpg",
  },
  {
    id: "automotive",
    slug: "automotive",
    name: "Automotive",
    nameZh: "汽车护理",
    description: "Professional car care products for a showroom finish",
    descriptionZh: "专业汽车护理产品，呈现展厅级光泽",
    icon: "car",
    image: "/products/interior-cleaner.jpg",
  },
]

export const products: Product[] = [
  // Personal Care - Shower Gels
  {
    id: "shower-gel",
    slug: "shower-gel",
    name: "Charm Shower Gel",
    nameZh: "魅力沐浴露",
    category: "personal-care",
    categoryZh: "个人护理",
    description: "Indulge in a luxurious bathing experience with our premium shower gels, crafted with natural ingredients for silky smooth skin.",
    descriptionZh: "享受我们优质沐浴露带来的奢华沐浴体验，采用天然成分，令肌肤丝滑柔嫩。",
    image: "/products/image-shower-gel.jpg",
    badge: "Best Seller",
    badgeZh: "畅销产品",
    variants: [
      {
        id: "shower-gel-pheromone",
        name: "Pheromone",
        nameZh: "费洛蒙",
        scent: "Seductive & Mysterious",
        scentZh: "诱惑神秘",
        description: "An alluring fragrance that captivates the senses with its seductive blend of musk and exotic florals.",
        descriptionZh: "迷人的香氛，融合麝香与异域花香，令人沉醉。",
        image: "/products/shower-gel-pheromone.jpg",
      },
      {
        id: "shower-gel-silent-aroma",
        name: "Silent Aroma",
        nameZh: "静谧芬芳",
        scent: "Calm & Soothing",
        scentZh: "宁静舒缓",
        description: "A gentle, calming fragrance perfect for relaxation and unwinding after a long day.",
        descriptionZh: "温和宁静的香氛，适合在漫长一天后放松身心。",
        image: "/products/shower-gel-silet-aroma.jpg",
      },
      {
        id: "shower-gel-heartbeat-whisper",
        name: "Heartbeat Whisper",
        nameZh: "心跳私语",
        scent: "Romantic & Delicate",
        scentZh: "浪漫细腻",
        description: "A romantic blend of soft florals and warm undertones that whispers elegance.",
        descriptionZh: "浪漫的柔和花香与温暖底调的融合，低语般优雅。",
        image: "/products/shower-gel-heartbeat-whisper.jpg",
      },
      {
        id: "shower-gel-milan-fogland",
        name: "Milan Fogland",
        nameZh: "米兰雾境",
        scent: "Sophisticated & Fresh",
        scentZh: "精致清新",
        description: "Inspired by misty Italian mornings, this sophisticated scent blends citrus with woody notes.",
        descriptionZh: "灵感源自意大利薄雾清晨，精致香氛融合柑橘与木质调。",
        image: "/products/image-shower-gel.jpg",
      },
    ],
  },
  // Personal Care - Shampoos
  {
    id: "shampoo",
    slug: "shampoo",
    name: "Charm Shampoo",
    nameZh: "魅力洗发水",
    category: "personal-care",
    categoryZh: "个人护理",
    description: "Transform your hair care routine with our nourishing shampoos that cleanse, strengthen, and add brilliant shine.",
    descriptionZh: "用我们滋养洗发水改变您的护发习惯，洁净、强韧、增添光泽。",
    image: "/products/image-shampoo.jpg",
    video: "/products/video-shampoo.mp4",
    badge: "New",
    badgeZh: "新品",
    variants: [
      {
        id: "shampoo-amber-bomb",
        name: "Amber Bomb",
        nameZh: "琥珀炸弹",
        scent: "Warm & Luxurious",
        scentZh: "温暖奢华",
        description: "Rich amber notes combined with vanilla and sandalwood for ultimate hair indulgence.",
        descriptionZh: "浓郁琥珀与香草、檀香融合，极致护发享受。",
        image: "/products/shampoo-amber-bomb.jpg",
      },
      {
        id: "shampoo-silent-aroma",
        name: "Silent Aroma",
        nameZh: "静谧芬芳",
        scent: "Peaceful & Light",
        scentZh: "平和轻盈",
        description: "A light, peaceful fragrance that leaves your hair smelling fresh all day.",
        descriptionZh: "轻盈平和的香氛，让您的秀发整天清新怡人。",
        image: "/products/shampoo-silent-aroma.jpg",
      },
      {
        id: "shampoo-neon-dream",
        name: "Neon Dream",
        nameZh: "霓虹之梦",
        scent: "Vibrant & Energizing",
        scentZh: "活力充沛",
        description: "An energizing burst of citrus and tropical fruits for a refreshing start to your day.",
        descriptionZh: "柑橘与热带水果的活力迸发，让您精神焕发地开启新的一天。",
        image: "/products/shampoo-neon-dream.jpg",
      },
    ],
  },
  // Personal Care - Handwash
  {
    id: "handwash",
    slug: "handwash",
    name: "Charm Handwash",
    nameZh: "魅力洗手液",
    category: "personal-care",
    categoryZh: "个人护理",
    description: "Gentle yet effective handwash formulas that cleanse while moisturizing, leaving hands soft and beautifully scented.",
    descriptionZh: "温和有效的洗手液配方，清洁同时保湿，令双手柔软芬芳。",
    image: "/products/image-handwash.jpg",
    variants: [
      {
        id: "handwash-ylang-ylang",
        name: "Ylang-Ylang",
        nameZh: "依兰依兰",
        scent: "Exotic & Floral",
        scentZh: "异域花香",
        description: "The exotic sweetness of ylang-ylang flowers for a touch of tropical luxury.",
        descriptionZh: "依兰花的异域甜香，带来一丝热带奢华。",
        image: "/products/hand-wash-ylangylang.jpg",
      },
      {
        id: "handwash-rose-scent",
        name: "Rose Scent",
        nameZh: "玫瑰香氛",
        scent: "Classic & Elegant",
        scentZh: "经典优雅",
        description: "Timeless rose fragrance that brings elegance to your daily hand washing routine.",
        descriptionZh: "永恒玫瑰香氛，为您的日常洗手增添优雅。",
        image: "/products/hand-wash-Rose.jpg",
      },
      {
        id: "handwash-azure-breeze",
        name: "Azure Breeze",
        nameZh: "碧蓝微风",
        scent: "Fresh & Oceanic",
        scentZh: "清新海洋",
        description: "Refreshing ocean-inspired scent that evokes the feeling of a coastal breeze.",
        descriptionZh: "清新海洋灵感香氛，唤起海岸微风的感觉。",
        image: "/products/hand-wash-Azure.jpg",
      },
      {
        id: "handwash-peninsula-dew",
        name: "Peninsula Dew",
        nameZh: "半岛晨露",
        scent: "Crisp & Natural",
        scentZh: "清脆自然",
        description: "The fresh scent of morning dew on lush green landscapes for a nature-inspired experience.",
        descriptionZh: "葱郁绿野上晨露的清新香气，带来亲近自然的体验。",
        image: "/products/hand-wash-penisula.jpg",
      },
    ],
  },
  // Household - Laundry Detergent
  {
    id: "laundry-detergent",
    slug: "laundry-detergent",
    name: "Charm Laundry Detergent",
    nameZh: "魅力洗衣液",
    category: "household",
    categoryZh: "家居清洁",
    description: "Powerful cleaning with a gentle touch. Our advanced formula removes tough stains while being kind to fabrics and the environment.",
    descriptionZh: "强效清洁，温和呵护。先进配方去除顽固污渍，同时呵护面料和环境。",
    image: "/products/image-laundry.jpg",
    badge: "Eco Choice",
    badgeZh: "环保之选",
    variants: [
      {
        id: "laundry-original",
        name: "Original Fresh",
        nameZh: "原香清新",
        scent: "Clean & Fresh",
        scentZh: "洁净清新",
        description: "Our signature fresh scent that leaves clothes smelling clean and invigorating.",
        descriptionZh: "我们标志性的清新香氛，让衣物散发洁净活力的气息。",
        image: "/products/image-laundry-2.jpg",
      },
      {
        id: "laundry-rose-fragrance",
        name: "Rose Fragrance",
        nameZh: "玫瑰芬芳",
        scent: "Romantic & Lasting",
        scentZh: "浪漫持久",
        description: "Long-lasting rose fragrance that keeps your clothes smelling beautiful for days.",
        descriptionZh: "持久玫瑰香氛，让您的衣物数日芬芳美丽。",
        image: "/products/laundry-detergent-rose.jpg",
      },
    ],
  },
  // Household - Dishwashing Liquid
  {
    id: "dishwashing-liquid",
    slug: "dishwashing-liquid",
    name: "Charm Dishwashing Liquid",
    nameZh: "魅力洗洁精",
    category: "household",
    categoryZh: "家居清洁",
    description: "Cut through grease effortlessly with our concentrated formula. Tough on grime, gentle on hands.",
    descriptionZh: "我们的浓缩配方轻松去除油脂。强效去污，温和护手。",
    image: "/products/image-dishwash.jpg",
    variants: [
      {
        id: "dish-lemon",
        name: "Lemon Fragrance",
        nameZh: "柠檬香型",
        scent: "Citrus & Refreshing",
        scentZh: "柑橘清新",
        description: "Zesty lemon scent that leaves dishes sparkling clean with a fresh citrus aroma.",
        descriptionZh: "活力柠檬香氛，让餐具闪亮洁净，散发清新柑橘香气。",
        image: "/products/dish-soap-lemon.jpg",
      },
      {
        id: "dish-ginger",
        name: "Ginger Fragrance",
        nameZh: "生姜香型",
        scent: "Warm & Spicy",
        scentZh: "温暖辛香",
        description: "Warm ginger scent with natural antibacterial properties for a deeper clean.",
        descriptionZh: "温暖生姜香氛，具有天然抗菌特性，更深层清洁。",
        image: "/products/dish-soap-ginger.jpg",
      },
    ],
  },
  // Automotive
  {
    id: "interior-cleaner",
    slug: "interior-cleaner",
    name: "Automotive Interior Cleaning Agent",
    nameZh: "汽车内饰清洁剂",
    category: "automotive",
    categoryZh: "汽车护理",
    description: "Professional-grade interior cleaner that safely removes dirt, stains, and odors from all car surfaces including leather, fabric, and plastic.",
    descriptionZh: "专业级内饰清洁剂，安全去除所有汽车表面的污垢、污渍和异味，包括皮革、织物和塑料。",
    image: "/products/automotive-interior-cleaner.jpg",
    badge: "Pro Grade",
    badgeZh: "专业级",
    variants: [
      {
        id: "interior-cleaner-pro",
        name: "Professional Formula",
        nameZh: "专业配方",
        scent: "Neutral & Clean",
        scentZh: "中性洁净",
        description: "Specially formulated for all car interior surfaces including leather, fabric, and plastic.",
        descriptionZh: "专为所有汽车内饰表面配制，包括皮革、织物和塑料。",
        image: "/products/interior-cleaner.jpg",
      },
    ],
  },
  {
    id: "tire-wax",
    slug: "tire-wax",
    name: "Tire Wax",
    nameZh: "轮胎蜡",
    category: "automotive",
    categoryZh: "汽车护理",
    description: "Premium tire dressing that delivers a deep, rich shine while protecting against UV damage and cracking.",
    descriptionZh: "优质轮胎养护剂，带来深邃亮泽光泽，同时防止紫外线损伤和开裂。",
    image: "/products/tire-wax.jpg",
    variants: [
      {
        id: "tire-wax-premium",
        name: "Premium Shine",
        nameZh: "高级光泽",
        scent: "Professional Finish",
        scentZh: "专业效果",
        description: "Maximum shine formula that delivers professional results and UV protection.",
        descriptionZh: "极致光泽配方，提供专业效果和紫外线保护。",
        image: "/products/tire-wax.jpg",
      },
    ],
  },
  {
    id: "windshield-washer",
    slug: "windshield-washer",
    name: "Car Windshield Washer Fluid",
    nameZh: "汽车挡风玻璃清洗液",
    category: "automotive",
    categoryZh: "汽车护理",
    description: "Crystal-clear visibility in all weather conditions. Our advanced formula removes bugs, grime, and road film instantly.",
    descriptionZh: "全天候晶莹剔透的视野。我们的先进配方即刻去除虫渍、污垢和路面油膜。",
    image: "/products/windshield-washer.jpg",
    variants: [
      {
        id: "washer-all-purpose",
        name: "All-Weather Formula",
        nameZh: "全天候配方",
        scent: "Crystal Clean",
        scentZh: "晶莹洁净",
        description: "Advanced all-weather formula that removes bugs, grime, and road film in any season.",
        descriptionZh: "先进的全天候配方，在任何季节都能去除虫渍、污垢和路面油膜。",
        image: "/products/windshield-washer.jpg",
      },
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}
