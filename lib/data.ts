import {
  Code2,
  Wrench,
  Target,
  Palette,
  Headset,
  type LucideIcon,
} from 'lucide-react'

export type CategorySlug =
  | 'software'
  | 'tools'
  | 'leads'
  | 'digital-assets'
  | 'services'

export interface Category {
  slug: CategorySlug
  name: string
  tagline: string
  description: string
  icon: LucideIcon
  cover: string
}

export interface Merchant {
  id: string
  handle: string
  name: string
  bio: string
  location: string
  joined: string
  trustScore: number // 0 - 100
  trustLevel: 'Fledgling' | 'Verified' | 'Trusted' | 'Elite' | 'Symbiote'
  totalServices: number
  totalEarnings: number
  totalSales: number
  rating: number
  reviews: number
  responseTime: string
  badges: string[]
  skills: string[]
}

export interface Review {
  id: string
  author: string
  rating: number
  date: string
  body: string
}

export interface Product {
  id: string
  slug: string
  title: string
  category: CategorySlug
  price: number
  oldPrice?: number
  merchantId: string
  cover: string
  short: string
  description: string
  rating: number
  sales: number
  reviews: Review[]
  tags: string[]
  deliveryType: 'Instant download' | 'License key' | 'Data export' | 'Delivered by merchant'
  features: string[]
  featured?: boolean
}

export const categories: Category[] = [
  {
    slug: 'software',
    name: 'Software',
    tagline: 'Apps, SaaS & scripts',
    description:
      'Production-ready applications, SaaS licenses, and automation scripts built by independent developers.',
    icon: Code2,
    cover: '/covers/software.png',
  },
  {
    slug: 'tools',
    name: 'Tools',
    tagline: 'Utilities & plugins',
    description:
      'Plugins, extensions, and power tools that supercharge your workflow.',
    icon: Wrench,
    cover: '/covers/tools.png',
  },
  {
    slug: 'leads',
    name: 'Leads',
    tagline: 'Verified contact data',
    description:
      'Curated, verified lead lists and contact databases segmented by industry and intent.',
    icon: Target,
    cover: '/covers/leads.png',
  },
  {
    slug: 'digital-assets',
    name: 'Digital Assets',
    tagline: 'Templates & kits',
    description:
      'UI kits, templates, graphics, and ready-to-ship creative assets.',
    icon: Palette,
    cover: '/covers/digital-assets.png',
  },
  {
    slug: 'services',
    name: 'Services',
    tagline: 'Done-for-you gigs',
    description:
      'Hire vetted experts for done-for-you work, from development to growth.',
    icon: Headset,
    cover: '/covers/services.png',
  },
]

export const merchants: Merchant[] = [
  {
    id: 'm1',
    handle: 'brockbuilds',
    name: 'Eddie Brock',
    bio: 'Full-stack engineer shipping battle-tested SaaS boilerplates and automation scripts. If it runs in production, I have probably broken and fixed it.',
    location: 'San Francisco, US',
    joined: '2021',
    trustScore: 98,
    trustLevel: 'Symbiote',
    totalServices: 214,
    totalEarnings: 486200,
    totalSales: 3120,
    rating: 4.9,
    reviews: 1284,
    responseTime: 'under 1 hour',
    badges: ['Top Seller', 'ID Verified', 'Fast Responder'],
    skills: ['Next.js', 'Stripe', 'Postgres', 'Automation'],
  },
  {
    id: 'm2',
    handle: 'venom_ops',
    name: 'Anne Weying',
    bio: 'Growth operator turning cold data into warm pipelines. I sell only leads I would call myself.',
    location: 'Austin, US',
    joined: '2022',
    trustScore: 91,
    trustLevel: 'Elite',
    totalServices: 96,
    totalEarnings: 172400,
    totalSales: 1440,
    rating: 4.8,
    reviews: 512,
    responseTime: 'under 3 hours',
    badges: ['ID Verified', 'Data Certified'],
    skills: ['Lead Gen', 'Enrichment', 'CRM', 'Outbound'],
  },
  {
    id: 'm3',
    handle: 'kasady.design',
    name: 'Cletus Kasady',
    bio: 'Product designer crafting aggressive, high-contrast UI kits and brand systems for startups that want to stand out.',
    location: 'Remote',
    joined: '2020',
    trustScore: 88,
    trustLevel: 'Trusted',
    totalServices: 340,
    totalEarnings: 298000,
    totalSales: 2210,
    rating: 4.7,
    reviews: 903,
    responseTime: 'under 6 hours',
    badges: ['Top Rated', 'Portfolio Verified'],
    skills: ['UI Design', 'Branding', 'Figma', 'Webflow'],
  },
  {
    id: 'm4',
    handle: 'drake.tools',
    name: 'Carlton Drake',
    bio: 'I build small, sharp developer tools and CLI utilities. Minimal, fast, no bloat.',
    location: 'Berlin, DE',
    joined: '2023',
    trustScore: 79,
    trustLevel: 'Verified',
    totalServices: 41,
    totalEarnings: 54300,
    totalSales: 610,
    rating: 4.6,
    reviews: 188,
    responseTime: 'under 12 hours',
    badges: ['ID Verified'],
    skills: ['CLI', 'DevTools', 'Rust', 'Go'],
  },
  {
    id: 'm5',
    handle: 'flash.thompson',
    name: 'Flash Thompson',
    bio: 'Freelance automation consultant. I wire up your stack so the boring work runs itself.',
    location: 'Toronto, CA',
    joined: '2024',
    trustScore: 64,
    trustLevel: 'Verified',
    totalServices: 18,
    totalEarnings: 12800,
    totalSales: 142,
    rating: 4.4,
    reviews: 47,
    responseTime: 'under 24 hours',
    badges: ['New & Rising'],
    skills: ['Zapier', 'Make', 'APIs', 'No-Code'],
  },
]

const sampleReviews = (seed: string): Review[] => [
  {
    id: `${seed}-r1`,
    author: 'Peter P.',
    rating: 5,
    date: '2 weeks ago',
    body: 'Exactly as described and set up in minutes. Worth every dollar.',
  },
  {
    id: `${seed}-r2`,
    author: 'Gwen S.',
    rating: 5,
    date: '1 month ago',
    body: 'Seller was responsive and the quality is genuinely production-grade.',
  },
  {
    id: `${seed}-r3`,
    author: 'Miles M.',
    rating: 4,
    date: '2 months ago',
    body: 'Great value. Docs could be a little clearer but support answered fast.',
  },
]

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'symbiote-saas-starter',
    title: 'Symbiote SaaS Starter Kit',
    category: 'software',
    price: 149,
    oldPrice: 249,
    merchantId: 'm1',
    cover: '/covers/software.png',
    short: 'Next.js + Stripe + Postgres boilerplate with auth, billing, and dashboard.',
    description:
      'A complete, production-ready SaaS foundation. Ships with authentication, subscription billing, a polished dashboard, team management, and transactional email. Save weeks of setup and launch your product faster.',
    rating: 4.9,
    sales: 1820,
    reviews: sampleReviews('p1'),
    tags: ['Next.js', 'Stripe', 'Auth', 'Postgres'],
    deliveryType: 'Instant download',
    features: [
      'Full source code (MIT for your projects)',
      'Auth, billing & team management',
      'Dark-mode dashboard UI',
      'Lifetime updates',
    ],
    featured: true,
  },
  {
    id: 'p2',
    slug: 'venom-cli-toolbelt',
    title: 'Venom CLI Toolbelt',
    category: 'tools',
    price: 39,
    merchantId: 'm4',
    cover: '/covers/tools.png',
    short: '30+ blazing-fast command-line utilities for developers.',
    description:
      'A curated set of over 30 command-line utilities that automate the boring parts of your day — file ops, git workflows, JSON wrangling, and more. Single binary, zero dependencies.',
    rating: 4.6,
    sales: 540,
    reviews: sampleReviews('p2'),
    tags: ['CLI', 'DevTools', 'Productivity'],
    deliveryType: 'License key',
    features: ['Single portable binary', 'Cross-platform', '30+ commands', 'Free minor updates'],
    featured: true,
  },
  {
    id: 'p3',
    slug: 'saas-decision-makers-leads',
    title: 'SaaS Decision-Makers Lead Pack (5k)',
    category: 'leads',
    price: 199,
    oldPrice: 299,
    merchantId: 'm2',
    cover: '/covers/leads.png',
    short: '5,000 verified B2B contacts of SaaS founders and VPs.',
    description:
      '5,000 hand-verified B2B contacts of SaaS founders, VPs, and heads of growth. Includes name, role, company, verified email, LinkedIn, and company size. Refreshed monthly, 95%+ deliverability.',
    rating: 4.8,
    sales: 320,
    reviews: sampleReviews('p3'),
    tags: ['B2B', 'SaaS', 'Verified', 'CSV'],
    deliveryType: 'Data export',
    features: ['5,000 verified contacts', '95%+ deliverability', 'CSV + Google Sheet', 'GDPR-compliant sourcing'],
    featured: true,
  },
  {
    id: 'p4',
    slug: 'carnage-ui-kit',
    title: 'Carnage UI Kit — 240 Components',
    category: 'digital-assets',
    price: 59,
    merchantId: 'm3',
    cover: '/covers/digital-assets.png',
    short: 'High-contrast dark UI kit with 240 components for Figma & React.',
    description:
      'A bold, high-contrast design system with 240 components, 40 page templates, and full Figma + React (Tailwind) parity. Perfect for products that want an edgy, premium look.',
    rating: 4.7,
    sales: 970,
    reviews: sampleReviews('p4'),
    tags: ['Figma', 'React', 'Tailwind', 'UI Kit'],
    deliveryType: 'Instant download',
    features: ['240 components', '40 page templates', 'Figma + React source', 'Dark & light themes'],
    featured: true,
  },
  {
    id: 'p5',
    slug: 'automation-setup-service',
    title: 'Done-For-You Automation Setup',
    category: 'services',
    price: 450,
    merchantId: 'm5',
    cover: '/covers/services.png',
    short: 'I connect your stack and automate up to 5 workflows.',
    description:
      'Hand me your tools and your pain points. I will design and build up to 5 automated workflows connecting your CRM, email, spreadsheets, and apps — fully documented and handed over with a walkthrough call.',
    rating: 4.5,
    sales: 88,
    reviews: sampleReviews('p5'),
    tags: ['Automation', 'Zapier', 'Consulting'],
    deliveryType: 'Delivered by merchant',
    features: ['Up to 5 workflows', 'Discovery + build', 'Docs & handover call', '7-day support'],
  },
  {
    id: 'p6',
    slug: 'ai-support-agent',
    title: 'AI Support Agent (Self-Hosted)',
    category: 'software',
    price: 89,
    merchantId: 'm1',
    cover: '/covers/software.png',
    short: 'Drop-in AI customer support agent you can host yourself.',
    description:
      'A self-hostable AI support agent that ingests your docs and answers customer questions across chat and email. Bring your own model key and deploy in minutes.',
    rating: 4.7,
    sales: 430,
    reviews: sampleReviews('p6'),
    tags: ['AI', 'Support', 'Self-hosted'],
    deliveryType: 'Instant download',
    features: ['Docs ingestion', 'Chat + email', 'BYO model key', 'Docker deploy'],
  },
  {
    id: 'p7',
    slug: 'ecommerce-scraper-pro',
    title: 'E-commerce Scraper Pro',
    category: 'tools',
    price: 69,
    merchantId: 'm4',
    cover: '/covers/tools.png',
    short: 'Extract product data from major storefronts at scale.',
    description:
      'A resilient scraping tool for monitoring prices and extracting product catalogs from major storefronts. Rotating proxies supported, exports to CSV and JSON.',
    rating: 4.4,
    sales: 260,
    reviews: sampleReviews('p7'),
    tags: ['Scraping', 'E-commerce', 'Data'],
    deliveryType: 'License key',
    features: ['Proxy rotation', 'CSV / JSON export', 'Scheduler', 'Priority support'],
  },
  {
    id: 'p8',
    slug: 'local-business-leads',
    title: 'Local Business Leads (10k, US)',
    category: 'leads',
    price: 129,
    merchantId: 'm2',
    cover: '/covers/leads.png',
    short: '10,000 US local business contacts with phone & email.',
    description:
      '10,000 verified US local business contacts across trades and services. Includes business name, owner, phone, email, and category. Ideal for agencies and outbound teams.',
    rating: 4.6,
    sales: 190,
    reviews: sampleReviews('p8'),
    tags: ['Local', 'US', 'Phone', 'Email'],
    deliveryType: 'Data export',
    features: ['10,000 contacts', 'Phone + email', 'Category tags', 'CSV export'],
  },
  {
    id: 'p9',
    slug: 'brand-identity-package',
    title: 'Startup Brand Identity Package',
    category: 'services',
    price: 780,
    merchantId: 'm3',
    cover: '/covers/services.png',
    short: 'Logo, palette, typography, and a mini brand guide.',
    description:
      'A complete starter brand identity: primary + secondary logos, color palette, typography system, and a concise brand guide delivered as source files. Two revision rounds included.',
    rating: 4.8,
    sales: 140,
    reviews: sampleReviews('p9'),
    tags: ['Branding', 'Logo', 'Identity'],
    deliveryType: 'Delivered by merchant',
    features: ['Logo suite', 'Color + type system', 'Brand guide PDF', '2 revision rounds'],
  },
  {
    id: 'p10',
    slug: 'notion-founders-os',
    title: "Founder's OS — Notion Template",
    category: 'digital-assets',
    price: 29,
    merchantId: 'm3',
    cover: '/covers/digital-assets.png',
    short: 'An all-in-one Notion workspace to run your startup.',
    description:
      'A meticulously organized Notion workspace covering goals, roadmap, CRM, hiring, and finances. Duplicate it in one click and start running your company today.',
    rating: 4.7,
    sales: 1120,
    reviews: sampleReviews('p10'),
    tags: ['Notion', 'Template', 'Productivity'],
    deliveryType: 'Instant download',
    features: ['One-click duplicate', 'CRM + roadmap', 'Finance tracker', 'Lifetime access'],
  },
]

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug)
}

export function getMerchant(id: string) {
  return merchants.find((m) => m.id === id)
}

export function getMerchantByHandle(handle: string) {
  return merchants.find((m) => m.handle === handle)
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(slug: string) {
  return products.filter((p) => p.category === slug)
}

export function getProductsByMerchant(id: string) {
  return products.filter((p) => p.merchantId === id)
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured)
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

export const trustLevelColor: Record<Merchant['trustLevel'], string> = {
  Fledgling: 'bg-muted text-muted-foreground',
  Verified: 'bg-secondary text-secondary-foreground',
  Trusted: 'bg-accent text-accent-foreground',
  Elite: 'bg-primary/20 text-primary',
  Symbiote: 'bg-primary text-primary-foreground',
}
