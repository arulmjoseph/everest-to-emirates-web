import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness, Check, ChevronRight, HeartHandshake, Instagram, Mail, Menu, Palette, Sparkles, Users, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { submitInquiry } from '@/lib/inquiries.functions'
import hero from '@/assets/hero-nepal-uae.jpg'
import dance from '@/assets/culture-dance.jpg'
import food from '@/assets/culture-food.jpg'
import community from '@/assets/culture-community.jpg'
import book from '@/assets/32780dc8-9f4f-4b7c-a65b-a59084605c16.jpg.asset.json'
import everestFooterBg from '@/assets/everest-footer-bg.jpg'

export const Route = createFileRoute('/home-2')({
  head: () => ({
    meta: [
      { title: 'Everest to Emirates | Home 2 — Warm Nepalese Heritage Edition' },
      { name: 'description', content: 'A warm, editorial bilateral summit landing page for the Everest to Emirates book launch in Dubai.' },
    ],
  }),
  component: Home2,
})

const nav = [
  ['About', 'about'],
  ['Pillars', 'pillars'],
  ['Book', 'book'],
  ['Sponsors', 'sponsors'],
  ['Gallery', 'gallery'],
  ['Contact', 'join'],
] as const

const goals = [
  { icon: Palette, title: 'Culture', description: 'Celebrate Nepalese heritage, ancient art, and authentic traditions in the UAE.' },
  { icon: HeartHandshake, title: 'Connection', description: 'Deepen bilateral social and community ties between Nepal and the Emirates.' },
  { icon: Sparkles, title: 'Collaboration', description: 'Foster creative partnerships between artists, cultural bodies, and sponsors.' },
  { icon: BriefcaseBusiness, title: 'Business', description: 'Connect entrepreneurs, founders, and investors across South Asia and the Gulf.' },
  { icon: BookOpen, title: 'Stories', description: 'Spotlight community voices, creators, and untold diaspora journeys in print.' },
  { icon: Users, title: 'Community', description: 'Build lasting cross-cultural networks and institutional bridge initiatives.' },
]

const chapters = ['Geography', 'Heritage', 'Culture', 'Fashion', 'Music', 'Dance', 'Food', 'Legends', 'Achievers']

function PrayerFlags() {
  return (
    <div className="inline-flex items-center gap-1.5 my-2">
      <span className="w-3.5 h-1 rounded-sm bg-[#2878B8]"></span>
      <span className="w-3.5 h-1 rounded-sm bg-[#FFFCF5] border border-stone-300"></span>
      <span className="w-3.5 h-1 rounded-sm bg-[#C9363F]"></span>
      <span className="w-3.5 h-1 rounded-sm bg-[#4D8A55]"></span>
      <span className="w-3.5 h-1 rounded-sm bg-[#E9B63D]"></span>
    </div>
  )
}

function Home2() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [participate, setParticipate] = useState<boolean | null>(null)
  const [sponsor, setSponsor] = useState<boolean | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  function goToForm(kind: 'participate' | 'sponsor') {
    if (kind === 'participate') setParticipate(true)
    else setSponsor(true)
    setMenuOpen(false)
    document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()

    if (!trimmedName || trimmedName.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail) || trimmedEmail.length > 255 || participate === null || sponsor === null) {
      setError('Please complete every field with a valid name and email address.')
      return
    }

    setSending(true)
    try {
      await submitInquiry({ data: { name: trimmedName, email: trimmedEmail, participate, sponsor, website } })
      await navigate({ to: '/thank-you' })
    } catch {
      setError('We could not send your inquiry right now. Please try again or email dcom@eim.ae.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div id="top" className="home-2 bg-[#FFF4D8] text-[#162A45] min-h-screen font-sans selection:bg-[#E9A12A] selection:text-[#162A45]">
      
      {/* Transparent Overlay Navigation Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent px-6 sm:px-12 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <a href="#top" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded bg-[#E9A12A] text-[#162A45] flex items-center justify-center font-serif font-bold text-base shadow-md">
              E/E
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold tracking-tight text-lg text-[#FFFCF5] leading-tight group-hover:text-[#E9A12A] transition-colors">
                EVEREST <span className="text-[#E9A12A] font-normal italic">to</span> EMIRATES
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#E9A12A]">
                NEPAL UTSAV · DUBAI 2026
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-[#FFFCF5]/90">
            {nav.map(([label, id]) => (
              <a key={id} href={`#${id}`} className="hover:text-[#E9A12A] transition-colors">
                {label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <a href="/" className="text-xs font-bold text-[#FFFCF5]/80 hover:text-[#E9A12A] hover:underline">
              ← Home 1
            </a>
            <button
              onClick={() => goToForm('sponsor')}
              className="bg-[#E9A12A] hover:bg-[#d89222] text-[#162A45] font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded shadow-md hover:shadow-lg transition-all"
            >
              Become a Sponsor ↗
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#FFFCF5] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {menuOpen && (
          <div className="lg:hidden mt-3 pt-4 pb-6 bg-[#183D73]/95 backdrop-blur-md rounded-xl p-6 border border-[#E9A12A]/30 flex flex-col gap-4 text-[#FFFCF5] shadow-2xl">
            {nav.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-bold hover:text-[#E9A12A]"
              >
                {label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/15">
              <button
                onClick={() => goToForm('sponsor')}
                className="bg-[#E9A12A] text-[#162A45] font-bold text-xs uppercase tracking-wider py-3 rounded text-center"
              >
                Become a Sponsor
              </button>
              <button
                onClick={() => goToForm('participate')}
                className="border border-[#FFFCF5] text-[#FFFCF5] font-bold text-xs uppercase tracking-wider py-3 rounded text-center"
              >
                Participate
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section (Vivid Himalayan Banner with Animated Lungta Flags & Masked Mountain Blend) */}
      <section className="relative min-h-[92vh] flex flex-col justify-center pt-32 pb-28 px-6 sm:px-12 bg-[#183D73] text-[#FFFCF5] overflow-hidden">
        
        {/* Full Color Hero Image Backdrop */}
        <img
          src={hero}
          alt="Himalayan mountains and Dubai skyline at sunset"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />

        {/* Top Header Gradient Blend (Only under top navigation area) */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#183D73]/85 via-[#183D73]/40 to-transparent pointer-events-none z-0" />

        {/* Animated Lungta (Lung Ta) Side Prayer Flags String */}
        <div className="absolute top-28 left-4 lg:left-12 z-20 pointer-events-none hidden md:block">
          <div className="relative flex flex-col items-center gap-3">
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/40 shadow-xs -translate-x-1/2" />
            {[
              { color: '#2878B8', symbol: 'ॐ' },
              { color: '#FFFCF5', symbol: '☸' },
              { color: '#C9363F', symbol: '蓮' },
              { color: '#4D8A55', symbol: '卐' },
              { color: '#E9B63D', symbol: '風' },
              { color: '#2878B8', symbol: 'ॐ' },
              { color: '#FFFCF5', symbol: '☸' },
              { color: '#C9363F', symbol: '蓮' },
            ].map((flag, idx) => (
              <div
                key={idx}
                className={`relative w-9 h-12 rounded-b-xs shadow-lg flex items-center justify-center border-t-2 border-white/70 ${
                  idx % 2 === 0 ? 'lungta-anim-1' : 'lungta-anim-2'
                }`}
                style={{
                  backgroundColor: flag.color,
                  animationDelay: `${idx * 0.35}s`,
                }}
              >
                <span className={`text-[10px] font-bold ${flag.color === '#FFFCF5' ? 'text-slate-800' : 'text-white/90'}`}>
                  {flag.symbol}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center mt-6">
          
          <PrayerFlags />

          <div className="inline-block mt-3 mb-6">
            <span className="font-devanagari text-base font-semibold text-[#E9A12A] block mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              नेपालदेखि एमिरेट्ससम्म
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFFCF5] bg-black/40 backdrop-blur-md px-5 py-1.5 rounded-full border border-white/30 shadow-lg">
              BOOK PUBLISHING & BILATERAL CULTURAL SUMMIT
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-bold uppercase tracking-tight text-[#FFFCF5] leading-[0.92] mb-8 drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
            EVEREST <span className="font-serif italic font-normal text-[#E9A12A]">to</span><br />
            EMIRATES
          </h1>

          {/* Editorial Tagline */}
          <p className="max-w-2xl mx-auto text-[#FFFCF5] text-lg sm:text-xl font-medium leading-relaxed mb-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            From the spirit of the Himalayas to the horizons of the Emirates — A landmark hardcover publication celebrating Nepal’s heritage, culture and community in the UAE.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => goToForm('sponsor')}
              className="w-full sm:w-auto bg-[#E9A12A] hover:bg-[#d89222] text-[#162A45] font-bold text-sm uppercase tracking-wider px-8 py-4 rounded shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Become a Sponsor <ArrowUpRight size={18} />
            </button>
            <a
              href="#book"
              className="w-full sm:w-auto border-2 border-[#FFFCF5] text-[#FFFCF5] hover:bg-[#FFFCF5] hover:text-[#183D73] font-bold text-sm uppercase tracking-wider px-8 py-4 rounded transition-all flex items-center justify-center gap-2 backdrop-blur-xs"
            >
              Explore the Book <ArrowRight size={18} />
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs font-bold uppercase tracking-wider text-[#E9A12A]">
            <span>CULTURE</span>
            <span>•</span>
            <span>CONNECTION</span>
            <span>•</span>
            <span>COLLABORATION</span>
          </div>
        </div>

        {/* Flawless Seamless Bottom Fade to Himalayan Cream Canvas (#FFF4D8) */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#FFF4D8] via-[#FFF4D8]/85 via-[#FFF4D8]/45 to-transparent pointer-events-none z-10" />
      </section>

      {/* Section 01: About / The Backstory */}
      <section id="about" className="py-24 px-6 sm:px-12 border-t border-[#C88B32]/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 relative">
            <div className="rounded-lg overflow-hidden shadow-xl border-4 border-[#FFFCF5]">
              <img src={dance} alt="Nepalese cultural performance" className="w-full h-[460px] object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-4 bg-[#183D73] text-[#FFFCF5] p-6 rounded-lg shadow-lg border border-[#C88B32]/40 max-w-xs">
              <span className="font-devanagari text-[#E9A12A] text-lg font-bold block mb-1">नेपाल उत्सव</span>
              <p className="text-xs leading-relaxed text-[#FFFCF5]/90">
                A bridge connecting 300,000+ Nepalese diaspora members with the UAE’s vibrant cultural and business landscape.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#C9363F]">
              <span>THE PUBLICATION</span>
              <span>·</span>
              <span>01</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#183D73] leading-tight">
              From the Himalayas <br />
              <span className="italic font-normal text-[#C88B32]">to the Emirates.</span>
            </h2>

            <div className="w-16 h-0.5 bg-[#C88B32]" />

            <p className="text-base text-[#162A45] leading-relaxed font-normal">
              <strong>Everest to Emirates</strong> is an exclusive bilateral summit and commemorative book launch designed to honor the deep-rooted cultural ties and economic synergies between Nepal and the United Arab Emirates.
            </p>

            <p className="text-base text-[#162A45]/85 leading-relaxed font-normal">
              Curated as a high-visibility platform for business leaders, cultural ambassadors, artists, and dignitaries, this milestone event showcases authentic Nepalese craftsmanship, fashion, culinary arts, and investment possibilities.
            </p>

            <div className="pt-4">
              <a href="#pillars" className="inline-flex items-center gap-2 text-sm font-bold text-[#C9363F] hover:text-[#183D73] transition-colors">
                Explore our core pillars <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: Reversed Dark Palette Book Spotlight (#183D73) */}
      <section id="book" className="py-24 px-6 sm:px-12 bg-[#183D73] text-[#FFFCF5] relative overflow-hidden">
        
        {/* Subtle Watermark */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 font-serif text-[18rem] font-bold text-white/5 pointer-events-none select-none">
          E/E
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-[#E9A12A]/20 border border-[#E9A12A]/40 text-[#E9A12A] text-xs font-bold uppercase tracking-wider">
              <span>EXCLUSIVE PUBLICATION RELEASE</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl font-bold leading-tight">
              Everest to Emirates <br />
              <span className="font-normal italic text-[#E9A12A]">The Hardcover Edition</span>
            </h2>

            <p className="text-base text-[#FFFCF5]/85 leading-relaxed font-light">
              A masterfully bound 300+ page commemorative hardcover volume spotlighting the history, leaders, fashion, art, gastronomy, and bilateral milestones connecting Nepal and the UAE.
            </p>

            <div className="pt-4 border-t border-white/15">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E9A12A] block mb-4">
                THEMATIC CHAPTER WALKTHROUGH
              </span>
              <div className="grid grid-cols-3 gap-3 text-xs font-semibold">
                {chapters.map((ch, i) => (
                  <div key={ch} className="bg-white/5 border border-white/10 p-2.5 rounded flex items-center gap-2">
                    <span className="text-[#E9A12A] font-bold">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[#FFFCF5]">{ch}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 flex flex-wrap gap-4">
              <button
                onClick={() => goToForm('participate')}
                className="bg-[#E9A12A] hover:bg-[#d89222] text-[#162A45] font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded shadow-md transition-all"
              >
                Reserve a Copy / Attend Launch ↗
              </button>
            </div>
          </div>

          {/* 3D Book Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#E9A12A] to-[#C9363F] rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <img
                src={book.url}
                alt="Everest to Emirates 3D hardcover presentation"
                className="relative z-10 max-h-[520px] rounded-lg shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 03: Program Pillars Grid */}
      <section id="pillars" className="py-24 px-6 sm:px-12 bg-[#F4E2B7]/60">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <PrayerFlags />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9363F] block mb-2">
              PROGRAM OBJECTIVES
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#183D73]">
              Six Pillars of Bilateral Impact
            </h2>
            <div className="w-16 h-0.5 bg-[#C88B32] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {goals.map(({ icon: Icon, title, description }, i) => (
              <div
                key={title}
                className="bg-[#FFFCF5] p-8 rounded-lg border border-[#C88B32]/25 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded bg-[#FFF4D8] border border-[#C88B32]/30 flex items-center justify-center text-[#183D73]">
                    <Icon size={24} />
                  </div>
                  <span className="font-serif text-2xl font-bold text-[#C88B32]/50">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#183D73] mb-3">
                  {title}
                </h3>
                <p className="text-sm text-[#162A45]/80 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 04: Sponsorship & Partnership Packages */}
      <section id="sponsors" className="py-24 px-6 sm:px-12 bg-[#FFF4D8]">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 pb-6 border-b border-[#C88B32]/30">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9363F] block mb-2">
                PARTNERSHIP OPPORTUNITIES
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#183D73]">
                Sponsorship Packages
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#162A45]/80 mt-4 md:mt-0">
              Position your brand in front of dignitaries, founders, media, and 500+ attendees at Dubai's premier Nepalese cultural event.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Title Sponsor */}
            <div className="bg-[#FFFCF5] rounded-xl p-8 border-2 border-[#E9A12A] shadow-md relative flex flex-col justify-between">
              <span className="absolute -top-3 left-6 bg-[#E9A12A] text-[#162A45] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded">
                MOST POPULAR
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C88B32] block mb-2">
                  01 / PRESENTING PARTNER
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#183D73] mb-4">
                  Title Sponsor
                </h3>
                <p className="text-xs text-[#162A45]/80 leading-relaxed mb-6">
                  Exclusive branding on hardcover book cover, VIP stage presentation, 10 VIP gala passes, and full UAE & Nepal PR integration.
                </p>
              </div>
              <button
                onClick={() => goToForm('sponsor')}
                className="w-full bg-[#E9A12A] hover:bg-[#d89222] text-[#162A45] font-bold text-xs uppercase tracking-wider py-3 rounded shadow-xs"
              >
                Inquire Title Tier ↗
              </button>
            </div>

            {/* Cultural Partner */}
            <div className="bg-[#FFFCF5] rounded-xl p-8 border border-[#C88B32]/30 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C88B32] block mb-2">
                  02 / EXPERIENCE PARTNER
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#183D73] mb-4">
                  Cultural Partner
                </h3>
                <p className="text-xs text-[#162A45]/80 leading-relaxed mb-6">
                  Host specific cultural segments (Fashion Show, Gastronomy, Performance), branding in event brochure, and 6 VIP passes.
                </p>
              </div>
              <button
                onClick={() => goToForm('sponsor')}
                className="w-full border-2 border-[#183D73] text-[#183D73] hover:bg-[#183D73] hover:text-[#FFFCF5] font-bold text-xs uppercase tracking-wider py-3 rounded transition-colors"
              >
                Inquire Cultural Tier ↗
              </button>
            </div>

            {/* Associate Sponsor */}
            <div className="bg-[#FFFCF5] rounded-xl p-8 border border-[#C88B32]/30 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C88B32] block mb-2">
                  03 / SUPPORTING PARTNER
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#183D73] mb-4">
                  Associate Sponsor
                </h3>
                <p className="text-xs text-[#162A45]/80 leading-relaxed mb-6">
                  Logo placement in sponsor showcase grid, digital media inclusion, and 3 complimentary invitations.
                </p>
              </div>
              <button
                onClick={() => goToForm('sponsor')}
                className="w-full border-2 border-[#183D73] text-[#183D73] hover:bg-[#183D73] hover:text-[#FFFCF5] font-bold text-xs uppercase tracking-wider py-3 rounded transition-colors"
              >
                Inquire Associate Tier ↗
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 05: Embedded Registration Lead Form */}
      <section id="join" className="py-24 px-6 sm:px-12 bg-[#F4E2B7]/50 border-t border-[#C88B32]/25">
        <div className="max-w-4xl mx-auto bg-[#FFFCF5] rounded-2xl p-8 sm:p-12 border border-[#C88B32]/30 shadow-lg">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <PrayerFlags />
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9363F] block mb-2">
              REGISTRATION & INQUIRIES
            </span>
            <h2 className="font-serif text-4xl font-bold text-[#183D73]">
              Join the Journey
            </h2>
            <p className="text-sm text-[#162A45]/80 mt-2">
              Complete the form below. All lead submissions are delivered directly to <strong>dcom@eim.ae</strong>.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto" noValidate>
            
            <div>
              <label htmlFor="h2-name" className="block text-xs font-bold uppercase tracking-wider text-[#183D73] mb-2">
                Full Name *
              </label>
              <input
                id="h2-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                placeholder="Your Full Name"
                required
                className="w-full bg-[#FFF4D8]/50 border border-[#C88B32]/40 rounded px-4 py-3 text-sm text-[#162A45] focus:outline-none focus:border-[#183D73]"
              />
            </div>

            <div>
              <label htmlFor="h2-email" className="block text-xs font-bold uppercase tracking-wider text-[#183D73] mb-2">
                Email Address *
              </label>
              <input
                id="h2-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={255}
                placeholder="you@example.com"
                required
                className="w-full bg-[#FFF4D8]/50 border border-[#C88B32]/40 rounded px-4 py-3 text-sm text-[#162A45] focus:outline-none focus:border-[#183D73]"
              />
            </div>

            {/* Honeypot field */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#183D73] mb-2">
                  Participate in Event? *
                </label>
                <div className="flex gap-3">
                  {[true, false].map((val) => (
                    <button
                      type="button"
                      key={String(val)}
                      onClick={() => setParticipate(val)}
                      className={`flex-1 py-2.5 rounded text-xs font-bold uppercase border transition-all ${
                        participate === val
                          ? 'bg-[#183D73] text-[#FFFCF5] border-[#183D73]'
                          : 'bg-transparent text-[#162A45] border-[#C88B32]/40 hover:border-[#183D73]'
                      }`}
                    >
                      {val ? 'Yes' : 'No'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#183D73] mb-2">
                  Become a Sponsor / Partner? *
                </label>
                <div className="flex gap-3">
                  {[true, false].map((val) => (
                    <button
                      type="button"
                      key={String(val)}
                      onClick={() => setSponsor(val)}
                      className={`flex-1 py-2.5 rounded text-xs font-bold uppercase border transition-all ${
                        sponsor === val
                          ? 'bg-[#E9A12A] text-[#162A45] border-[#E9A12A]'
                          : 'bg-transparent text-[#162A45] border-[#C88B32]/40 hover:border-[#183D73]'
                      }`}
                    >
                      {val ? 'Yes' : 'No'}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {error && (
              <p className="text-xs text-[#C9363F] font-bold text-center" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-[#E9A12A] hover:bg-[#d89222] text-[#162A45] font-bold text-sm uppercase tracking-wider py-4 rounded shadow-md transition-all flex items-center justify-center gap-2"
            >
              {sending ? 'Submitting...' : 'Submit — Join the Journey ↗'}
            </button>
          </form>
        </div>
      </section>

      {/* Section 06: Footer with Everest Backdrop Overlay */}
      <footer className="relative bg-[#183D73] text-[#FFFCF5] overflow-hidden pt-20 pb-12 px-6 sm:px-12 border-t border-[#C88B32]/40">
        
        {/* Everest Background Overlay */}
        <img
          src={everestFooterBg}
          alt="Mount Everest backdrop"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-20 filter brightness-75 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#183D73]/80 via-[#183D73]/95 to-[#183D73] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-white/15">
            
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-[#E9A12A] text-[#162A45] font-serif font-bold text-sm flex items-center justify-center">
                  E/E
                </div>
                <span className="font-serif font-bold text-lg text-[#FFFCF5]">
                  EVEREST <span className="italic font-normal text-[#E9A12A]">to</span> EMIRATES
                </span>
              </div>
              <p className="text-xs text-[#FFFCF5]/75 leading-relaxed">
                A landmark hardcover book & bilateral summit celebrating Nepalese heritage, art, and enterprise in Dubai.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#E9A12A] mb-4">
                EXPLORE
              </h4>
              <ul className="space-y-2.5 text-xs text-[#FFFCF5]/80">
                <li><a href="#about" className="hover:text-[#E9A12A] transition-colors">About Initiative</a></li>
                <li><a href="#pillars" className="hover:text-[#E9A12A] transition-colors">Program Pillars</a></li>
                <li><a href="#book" className="hover:text-[#E9A12A] transition-colors">Hardcover Book</a></li>
                <li><a href="#sponsors" className="hover:text-[#E9A12A] transition-colors">Sponsorship Tiers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#E9A12A] mb-4">
                NAVIGATE
              </h4>
              <ul className="space-y-2.5 text-xs text-[#FFFCF5]/80">
                <li><a href="/" className="hover:text-[#E9A12A] transition-colors">Home 1 (Dark Editorial)</a></li>
                <li><a href="/home-2" className="hover:text-[#E9A12A] transition-colors">Home 2 (Warm Nepal)</a></li>
                <li><a href="#join" className="hover:text-[#E9A12A] transition-colors">Registration Form</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#E9A12A] mb-4">
                OFFICIAL CONTACT
              </h4>
              <a href="mailto:dcom@eim.ae" className="text-xs font-bold text-[#FFFCF5] hover:text-[#E9A12A] flex items-center gap-2">
                <Mail size={14} className="text-[#E9A12A]" /> dcom@eim.ae
              </a>
              <p className="text-[11px] text-[#FFFCF5]/65 mt-2">
                United Arab Emirates & Nepal
              </p>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FFFCF5]/60 gap-4">
            <span>© {new Date().getFullYear()} Everest to Emirates. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <span>CULTURE · CONNECTION · COLLABORATION</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
