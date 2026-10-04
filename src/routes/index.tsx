import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect, type FormEvent } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness, Check, ChevronRight, HeartHandshake, Instagram, Mail, Menu, Music2, Palette, Sparkles, Users, Utensils, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { submitInquiry } from '@/lib/inquiries.functions'
import hero from '@/assets/hero-nepal-uae.jpg'
import heroVideo from '@/assets/hero-banner.mp4'
import dance from '@/assets/culture-dance.jpg'
import food from '@/assets/culture-food.jpg'
import community from '@/assets/culture-community.jpg'
import bookImg from '@/assets/book_mockup.jpg'
import logo from '@/assets/f27e6341-6a40-4b4b-beff-539c4d6e9e3e.jpg.asset.json'
import logoImg from '@/assets/logo.png'
import invitation from '@/assets/7d3fde24-0142-4953-b342-ff17323c109b.jpg.asset.json'
import everestFooterBg from '@/assets/everest-footer-bg.jpg'

const nav = [ ['About', 'about'], ['Objectives', 'objectives'], ['Activities', 'activities'], ['Book', 'book'], ['Gallery', 'gallery'], ['Sponsors', 'sponsors'] ] as const
const goals = [
  { icon: Palette, title: 'Culture', description: 'Celebrate the beauty and richness of Nepalese heritage.' },
  { icon: HeartHandshake, title: 'Connection', description: 'Bring Nepal and the UAE closer through shared experiences.' },
  { icon: Sparkles, title: 'Collaboration', description: 'Open doors to meaningful creative partnerships.' },
  { icon: BriefcaseBusiness, title: 'Business', description: 'Connect entrepreneurs and ideas across borders.' },
  { icon: BookOpen, title: 'Stories', description: 'Give voices, journeys and untold stories a place to shine.' },
  { icon: Users, title: 'Community', description: 'Build lasting relationships beyond the celebration.' },
]
const activities = [
  { title: 'Cultural program', category: 'PERFORMANCE', image: dance, alt: 'Nepalese dancers performing in traditional dress', span: 'activity-large' },
  { title: 'Fashion show', category: 'STYLE', image: invitation.url, alt: 'Nepal Utsav cultural invitation artwork', span: '' },
  { title: 'Nepali food', category: 'FLAVOUR', image: food, alt: 'Traditional Nepali food and momo', span: '' },
  { title: 'Book launch', category: 'STORIES', image: bookImg, alt: 'Everest to Emirates book cover', span: '' },
  { title: 'Networking', category: 'PEOPLE', image: community, alt: 'Nepalese and Emirati guests connecting', span: '' },
  { title: 'A memorable evening', category: 'CELEBRATION', image: hero, alt: 'Nepal and Dubai at sunset', span: 'activity-large' },
]
const audiences = [
  { title: 'Entrepreneurs & business', text: 'Business owners, founders and changemakers.' },
  { title: 'Media & writers', text: 'Journalists, authors and storytellers.' },
  { title: 'Artists & creators', text: 'Performers, designers and creative voices.' },
  { title: 'Organizations & leaders', text: 'Brands, community groups and cultural leaders.' },
]

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Everest to Emirates | Nepal Utsav' },
    { name: 'description', content: 'A celebration of Nepal’s heritage, culture and community in the UAE. Explore Nepal Utsav and the Everest to Emirates book launch.' },
    { property: 'og:title', content: 'Everest to Emirates | Nepal Utsav' },
    { property: 'og:description', content: 'A cultural journey connecting Nepal and the UAE through stories, people and possibility.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Home,
})

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center" aria-label="Everest to Emirates home">
      <img src={logoImg} alt="Everest to Emirates Logo" className="h-12 sm:h-16 md:h-18 lg:h-20 w-auto max-w-[260px] sm:max-w-[400px] md:max-w-[480px] object-contain drop-shadow-sm" />
    </a>
  )
}
function SectionIntro({ title, children }: { title: string, children?: React.ReactNode }) {
  return <div className="section-intro"><h2 className="font-display">{title}</h2>{children && <p className="section-description">{children}</p>}</div>
}
function Home() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [participate, setParticipate] = useState<boolean | null>(null)
  const [sponsor, setSponsor] = useState<boolean | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.site-header')
      if (window.scrollY > 40) {
        header?.classList.add('header-scrolled')
      } else {
        header?.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  function goToForm(kind: 'participate' | 'sponsor') {
    if (kind === 'participate') setParticipate(true)
    else setSponsor(true)
    setMenuOpen(false)
    document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const trimmedName = name.trim(), trimmedEmail = email.trim()
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
    } finally { setSending(false) }
  }
  return <div id="top" className="site-wrap">
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">{nav.map(([label,id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
        <div className="header-actions"><Button variant="outline" className="header-sponsor" onClick={() => goToForm('sponsor')}>Become a sponsor</Button><Button onClick={() => goToForm('participate')}>Participate <ArrowUpRight /></Button></div>
        <Button variant="ghost" size="icon" className="mobile-menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </div>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{nav.map(([label,id]) => <a href={`#${id}`} onClick={() => setMenuOpen(false)} key={id}>{label}<ChevronRight size={16}/></a>)}<Button onClick={() => goToForm('participate')}>Participate</Button><Button variant="outline" onClick={() => goToForm('sponsor')}>Become a sponsor</Button></nav>}
    </header>

    <main>
      <section className="hero" aria-labelledby="hero-title">
        <video autoPlay loop muted playsInline poster={hero} className="hero-image">
          <source src={heroVideo} type="video/mp4" />
          <img className="hero-image" src={hero} alt="Himalayan mountains and Nepalese temples meeting the Dubai skyline at sunset" width={1920} height={1152} />
        </video>
        <div className="hero-shade" />
        <div className="hero-content content-width">
          <h1 id="hero-title" className="font-display">Everest <span>to</span><br />Emirates</h1>
          <p className="hero-pretitle">A journey from the Himalayas to the horizons of opportunity</p>
          <p className="hero-tagline">Culture <i /> Connection <i /> Collaboration</p>
          <div className="hero-actions"><Button onClick={() => goToForm('participate')}>Be part of the journey <ArrowUpRight /></Button><Button variant="outline" className="hero-outline" onClick={() => goToForm('sponsor')}>Become a sponsor <ArrowRight /></Button></div>
        </div>
        <div className="hero-bottom content-width"><a href="#about" aria-label="Scroll to about"><ArrowDown size={18} /> SCROLL TO EXPLORE</a></div>
      </section>

      <section id="about" className="about-section section-pad"><div className="content-width about-grid"><div className="about-images"><img src={dance} alt="Traditional Nepalese cultural dancers" loading="lazy" width={1104} height={1312}/><div className="about-image-badge"><span>नेपाल</span><small>A CULTURE THAT CONNECTS</small></div></div><div className="about-copy"><SectionIntro title="Two places. One shared journey."><strong>Everest to Emirates</strong> is a celebration of Nepal’s heritage, culture and community in the UAE — a meeting place for the people, stories and ideas that connect us.</SectionIntro><p>From the spirit of the Himalayas to the energy of the Emirates, Nepal Utsav creates a space to experience traditions, discover new possibilities and build relationships that last beyond a single evening.</p><a className="text-link" href="#objectives">Explore our purpose <ArrowUpRight size={17}/></a></div></div></section>

      <section id="objectives" className="objectives-section section-pad"><div className="content-width"><SectionIntro title="What brings us together.">Six ideas at the heart of this cultural journey.</SectionIntro><div className="goals-grid">{goals.map(({icon: Icon,title,description}) => <div className="goal" key={title}><Icon size={27} strokeWidth={1.5}/><h3 className="font-display">{title}</h3><p>{description}</p></div>)}</div></div></section>

      <section id="activities" className="activities-section section-pad"><div className="content-width"><div className="section-heading-row"><SectionIntro title="A celebration to remember.">An evening of culture, creativity and meaningful connections.</SectionIntro></div><div className="activities-grid">{activities.map(item => <article className={`activity ${item.span}`} key={item.title}><img src={item.image} alt={item.alt} loading="lazy" /><div className="activity-shade"/><div className="activity-content"><span>{item.category}</span><h3 className="font-display">{item.title}</h3></div></article>)}</div></div></section>

      <section id="book" className="book-section section-pad"><div className="content-width book-grid"><div className="flex items-center justify-center p-0 bg-transparent border-none"><img src={bookImg} alt="Three-dimensional cover of Everest to Emirates book" loading="lazy" className="max-h-[560px] w-auto object-contain filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)]" /></div><div className="book-copy"><SectionIntro title="Everest to Emirates.">A journey through Nepal’s heritage, culture and community in the UAE.</SectionIntro><p>More than a book, it is a collection of places, people and perspectives — from the heart of Nepal to the possibilities of the Emirates.</p><Button onClick={() => goToForm('participate')} className="mt-6">Discover the book <ArrowUpRight /></Button></div></div></section>

      <section className="participants-section section-pad"><div className="content-width"><SectionIntro title="There’s a place for you here.">A gathering of curious minds, creative voices and communities building what comes next.</SectionIntro><div className="audience-grid">{audiences.map(item => <div className="audience" key={item.title}><h3 className="font-display">{item.title}</h3><p>{item.text}</p><ArrowUpRight size={19}/></div>)}</div></div></section>

      <section id="sponsors" className="sponsor-section section-pad"><div className="content-width"><div className="sponsor-heading"><SectionIntro title="Make a difference together.">Join us in creating an unforgettable platform for culture, community and collaboration.</SectionIntro><Button onClick={() => goToForm('sponsor')}>Become a partner <ArrowUpRight /></Button></div><div className="package-grid"><div><span>SPONSOR</span><h3 className="font-display">Champion the vision.</h3><p>Support the program and connect your brand to a meaningful cultural celebration.</p></div><div><span>PARTNER</span><h3 className="font-display">Create together.</h3><p>Collaborate on the experiences, activities and stories that bring the event to life.</p></div><div><span>ASSOCIATE</span><h3 className="font-display">Join the journey.</h3><p>Stand with the initiative and help strengthen the Nepal–UAE community.</p></div></div></div></section>

      <section className="partners-section"><div className="content-width partners-inner"><div><h2 className="font-display">Your name could be here.</h2></div><p>We’re bringing together organizations who believe in the power of cultural exchange. Interested in partnering with us?</p><Button variant="outline" onClick={() => goToForm('sponsor')}>Let’s talk partnership <ArrowUpRight /></Button></div></section>

      <section id="gallery" className="gallery-section section-pad"><div className="content-width"><SectionIntro title="A world worth sharing.">A glimpse of the places, flavours and people behind the journey.</SectionIntro><div className="gallery-grid"><div className="gallery-main"><img src={hero} alt="The Himalayas and Dubai skyline" loading="lazy" width={1920} height={1152}/><span>BETWEEN TWO WORLDS</span></div><div><img src={dance} alt="Nepalese dancers in traditional red costumes" loading="lazy" width={1104} height={1312}/><span>CULTURE IN MOTION</span></div><div><img src={food} alt="Nepali food including momo dumplings" loading="lazy" width={1104} height={1312}/><span>A TASTE OF NEPAL</span></div><div><img src={community} alt="Nepalese and Emirati community members meeting" loading="lazy" width={1104} height={1312}/><span>PEOPLE & POSSIBILITY</span></div></div></div></section>

      <section className="social-section section-pad"><div className="content-width"><div className="social-head"><div><h2 className="font-display">The story continues.</h2></div><span className="social-icon"><Instagram size={25}/></span></div><div className="social-grid"><img src={dance} alt="Traditional dance from Nepal" loading="lazy"/><img src={food} alt="Nepali cuisine" loading="lazy"/><img src={bookImg} alt="Everest to Emirates book" loading="lazy"/><img src={community} alt="Community gathering" loading="lazy"/></div><p className="social-caption">Instagram updates coming soon.</p></div></section>

    </main>
    <footer id="join" className="relative py-24 px-6 sm:px-12 bg-[#070B12] overflow-hidden text-white border-t border-white/10">
      {/* Shared Full-Depth Himalayan & Dubai Sunset Background Image Backdrop */}
      <div className="absolute inset-0 z-0">
        <img src={hero} alt="Everest to Emirates Himalayan & Dubai Sunset Backdrop" className="w-full h-full object-cover object-center opacity-40 filter brightness-75 contrast-110 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B12]/80 via-transparent to-[#070B12]/95 pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section 1: Registration Form */}
        <div className="join-grid grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24">
          <div className="join-copy pt-4">
            <h2 className="font-display text-4xl sm:text-6xl text-white mb-6">Be part of something meaningful.</h2>
            <p className="text-slate-300 text-base font-light leading-relaxed mb-8">Whether you’d like to participate or support the celebration, we’d love to hear from you.</p>
            <div className="join-detail flex flex-col gap-2 text-xs font-normal text-[#e5cb8a]">
              <span>NEPAL &bull; UAE</span>
              <span>CULTURE &bull; CONNECTION &bull; COLLABORATION</span>
            </div>
          </div>
          
          <form className="join-form p-8 sm:p-10 bg-[#0F1622]/85 backdrop-blur-xl border-none rounded-2xl shadow-2xl" onSubmit={handleSubmit} noValidate>
            <h3 className="font-display text-2xl text-white mb-2">Let’s connect.</h3>
            <p className="text-xs text-slate-300 font-light mb-6">Tell us a little about yourself.</p>
            <label htmlFor="inquiry-name" className="block text-xs text-[#e5cb8a] font-normal mb-2">Full name *</label>
            <input id="inquiry-name" autoComplete="name" value={name} onChange={e=>setName(e.target.value)} maxLength={100} placeholder="Your name" required className="w-full bg-[#070B12]/90 border-none rounded-xl px-4 py-3 text-sm text-white mb-4 focus:ring-1 focus:ring-[#e5cb8a]/30" />
            <label htmlFor="inquiry-email" className="block text-xs text-[#e5cb8a] font-normal mb-2">Email address *</label>
            <input id="inquiry-email" autoComplete="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} maxLength={255} placeholder="you@example.com" required className="w-full bg-[#070B12]/90 border-none rounded-xl px-4 py-3 text-sm text-white mb-4 focus:ring-1 focus:ring-[#e5cb8a]/30" />
            <div className="honeypot" aria-hidden="true"><label htmlFor="inquiry-website">Website</label><input id="inquiry-website" tabIndex={-1} autoComplete="off" value={website} onChange={e=>setWebsite(e.target.value)} /></div>
            <fieldset className="mb-4"><legend className="text-xs text-slate-300 mb-2">Would you like to participate?</legend><div className="choice-row">{[true,false].map(value=><label key={String(value)} className={`cursor-pointer px-4 py-2.5 rounded-xl text-xs transition-colors ${participate === value ? 'bg-[#e5cb8a] text-[#070B12]' : 'bg-[#070B12]/90 text-slate-300'}`}><input type="radio" name="participate" checked={participate===value} onChange={()=>setParticipate(value)} required className="hidden" />{value ? 'Yes' : 'No'} {participate===value && <Check size={14} className="inline ml-1"/>}</label>)}</div></fieldset>
            <fieldset className="mb-6"><legend className="text-xs text-slate-300 mb-2">Interested in sponsoring?</legend><div className="choice-row">{[true,false].map(value=><label key={String(value)} className={`cursor-pointer px-4 py-2.5 rounded-xl text-xs transition-colors ${sponsor === value ? 'bg-[#e5cb8a] text-[#070B12]' : 'bg-[#070B12]/90 text-slate-300'}`}><input type="radio" name="sponsor" checked={sponsor===value} onChange={()=>setSponsor(value)} required className="hidden" />{value ? 'Yes' : 'No'} {sponsor===value && <Check size={14} className="inline ml-1"/>}</label>)}</div></fieldset>
            {error && <p className="form-error text-xs text-red-400 mb-4" role="alert">{error}</p>}
            <Button type="submit" disabled={sending} className="form-submit w-full py-3.5 rounded-xl bg-[#e5cb8a] text-[#070B12] font-normal text-sm hover:bg-white transition-colors">{sending ? 'Sending...' : 'Submit inquiry'} <ArrowUpRight className="w-4 h-4 ml-1" /></Button>
          </form>
        </div>

        {/* Section 2: Footer Links & Copyright */}
        <div className="pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
            <div>
              <span className="font-display text-3xl text-white tracking-tight block mb-2 font-normal">Everest to Emirates 2026</span>
              <p className="text-xs text-slate-300 font-light max-w-md">Bilateral cultural, economic, and literary summit connecting Nepal and the United Arab Emirates.</p>
            </div>
            
            <div className="flex flex-wrap gap-8 text-xs font-normal text-[#e5cb8a]">
              <a href="#about" className="hover:text-white transition-colors">Purpose</a>
              <a href="#objectives" className="hover:text-white transition-colors">Objectives</a>
              <a href="#activities" className="hover:text-white transition-colors">Schedule</a>
              <a href="#book" className="hover:text-white transition-colors">Book</a>
              <a href="#join" className="hover:text-white transition-colors">Register</a>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
            <p>© {new Date().getFullYear()} Everest to Emirates. Contact: <a href="mailto:dcom@eim.ae" className="text-[#e5cb8a] underline hover:text-white">dcom@eim.ae</a></p>
            <a href="#top" className="hover:text-white flex items-center gap-1 transition-colors">
              <span>Back to top</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
}
