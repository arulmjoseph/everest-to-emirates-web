import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness, Check, ChevronRight, HeartHandshake, Instagram, Mail, Menu, Music2, Palette, Sparkles, Users, Utensils, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { submitInquiry } from '@/lib/inquiries.functions'
import hero from '@/assets/hero-nepal-uae.jpg'
import dance from '@/assets/culture-dance.jpg'
import food from '@/assets/culture-food.jpg'
import community from '@/assets/culture-community.jpg'
import book from '@/assets/32780dc8-9f4f-4b7c-a65b-a59084605c16.jpg.asset.json'
import logo from '@/assets/f27e6341-6a40-4b4b-beff-539c4d6e9e3e.jpg.asset.json'
import invitation from '@/assets/7d3fde24-0142-4953-b342-ff17323c109b.jpg.asset.json'

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
  { title: 'Cultural program', category: '01 / PERFORMANCE', image: dance, alt: 'Nepalese dancers performing in traditional dress', span: 'activity-large' },
  { title: 'Fashion show', category: '02 / STYLE', image: invitation.url, alt: 'Nepal Utsav cultural invitation artwork', span: '' },
  { title: 'Nepali food', category: '03 / FLAVOUR', image: food, alt: 'Traditional Nepali food and momo', span: '' },
  { title: 'Book launch', category: '04 / STORIES', image: book.url, alt: 'Everest to Emirates book cover', span: '' },
  { title: 'Networking', category: '05 / PEOPLE', image: community, alt: 'Nepalese and Emirati guests connecting', span: '' },
  { title: 'A memorable evening', category: '06 / CELEBRATION', image: hero, alt: 'Nepal and Dubai at sunset', span: 'activity-large' },
]
const chapters = ['Geography','Heritage','Culture','Fashion','Music','Dance','Food','Legends','Achievers']
const audiences = [
  { number: '01', title: 'Entrepreneurs & business', text: 'Business owners, founders and changemakers.' },
  { number: '02', title: 'Media & writers', text: 'Journalists, authors and storytellers.' },
  { number: '03', title: 'Artists & creators', text: 'Performers, designers and creative voices.' },
  { number: '04', title: 'Organizations & leaders', text: 'Brands, community groups and cultural leaders.' },
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
  return <a href="#top" className={`brand ${light ? 'brand-light' : ''}`} aria-label="Everest to Emirates home">
    <span className="brand-mark">E<span className="brand-mark-line">/</span>E</span>
    <span className="brand-copy"><strong>EVEREST <em>to</em> EMIRATES</strong><small>NEPAL UTSAV · UAE</small></span>
  </a>
}
function SectionIntro({ number, label, title, children }: { number: string, label: string, title: string, children?: React.ReactNode }) {
  return <div className="section-intro"><p className="eyebrow"><span>{number}</span> &nbsp; / &nbsp; {label}</p><h2 className="font-display">{title}</h2>{children && <p className="section-description">{children}</p>}</div>
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
        <img className="hero-image" src={hero} alt="Himalayan mountains and Nepalese temples meeting the Dubai skyline at sunset" width={1920} height={1152} />
        <div className="hero-shade" />
        <div className="hero-content content-width"><div className="hero-topline"><span className="hero-rule" /> A NEPAL × UAE CULTURAL CELEBRATION</div>
          <p className="hero-pretitle">A journey from the Himalayas to the horizons of opportunity</p>
          <h1 id="hero-title" className="font-display">Everest <span>to</span><br />Emirates</h1>
          <p className="hero-tagline">Culture <i /> Connection <i /> Collaboration</p>
          <div className="hero-actions"><Button onClick={() => goToForm('participate')}>Be part of the journey <ArrowUpRight /></Button><Button variant="outline" className="hero-outline" onClick={() => goToForm('sponsor')}>Become a sponsor <ArrowRight /></Button></div>
        </div>
        <div className="hero-bottom content-width"><a href="#about" aria-label="Scroll to about"><ArrowDown size={18} /> SCROLL TO EXPLORE</a><span>NEPAL UTSAV / UAE</span></div>
      </section>

      <section id="about" className="about-section section-pad"><div className="content-width about-grid"><div className="about-images"><img src={dance} alt="Traditional Nepalese cultural dancers" loading="lazy" width={1104} height={1312}/><div className="about-image-badge"><span>नेपाल</span><small>A CULTURE THAT CONNECTS</small></div></div><div className="about-copy"><SectionIntro number="01" label="OUR STORY" title="Two places. One shared journey."><strong>Everest to Emirates</strong> is a celebration of Nepal’s heritage, culture and community in the UAE — a meeting place for the people, stories and ideas that connect us.</SectionIntro><p>From the spirit of the Himalayas to the energy of the Emirates, Nepal Utsav creates a space to experience traditions, discover new possibilities and build relationships that last beyond a single evening.</p><a className="text-link" href="#objectives">Explore our purpose <ArrowUpRight size={17}/></a></div></div></section>

      <section id="objectives" className="objectives-section section-pad"><div className="content-width"><SectionIntro number="02" label="OUR PURPOSE" title="What brings us together.">Six ideas at the heart of this cultural journey.</SectionIntro><div className="goals-grid">{goals.map(({icon: Icon,title,description},i) => <div className="goal" key={title}><span className="goal-number">0{i+1}</span><Icon size={27} strokeWidth={1.5}/><h3 className="font-display">{title}</h3><p>{description}</p></div>)}</div></div></section>

      <section id="activities" className="activities-section section-pad"><div className="content-width"><div className="section-heading-row"><SectionIntro number="03" label="THE EXPERIENCE" title="A celebration to remember.">An evening of culture, creativity and meaningful connections.</SectionIntro><span className="section-aside">SIX WAYS TO EXPERIENCE NEPAL UTSAV</span></div><div className="activities-grid">{activities.map(item => <article className={`activity ${item.span}`} key={item.title}><img src={item.image} alt={item.alt} loading="lazy" /><div className="activity-shade"/><div className="activity-content"><span>{item.category}</span><h3 className="font-display">{item.title}</h3></div></article>)}</div></div></section>

      <section id="book" className="book-section section-pad"><div className="content-width book-grid"><div className="book-visual"><span className="book-watermark font-display">E / E</span><img src={book.url} alt="Three-dimensional cover of Everest to Emirates book" loading="lazy" width={633} height={842} /></div><div className="book-copy"><SectionIntro number="04" label="THE BOOK" title="Everest to Emirates.">A journey through Nepal’s heritage, culture and community in the UAE.</SectionIntro><p>More than a book, it is a collection of places, people and perspectives — from the heart of Nepal to the possibilities of the Emirates.</p><div className="chapter-label">EXPLORE THE CHAPTERS</div><div className="chapter-list">{chapters.map((chapter,i)=><span key={chapter}><b>{String(i+1).padStart(2,'0')}</b>{chapter}</span>)}</div><Button onClick={() => goToForm('participate')}>Discover the book <ArrowUpRight /></Button></div></div></section>

      <section className="participants-section section-pad"><div className="content-width"><SectionIntro number="05" label="THE PEOPLE" title="There’s a place for you here.">A gathering of curious minds, creative voices and communities building what comes next.</SectionIntro><div className="audience-grid">{audiences.map(item => <div className="audience" key={item.number}><span>{item.number} /</span><h3 className="font-display">{item.title}</h3><p>{item.text}</p><ArrowUpRight size={19}/></div>)}</div></div></section>

      <section id="sponsors" className="sponsor-section section-pad"><div className="content-width"><div className="sponsor-heading"><SectionIntro number="06" label="PARTNERSHIPS" title="Make a difference together.">Join us in creating an unforgettable platform for culture, community and collaboration.</SectionIntro><Button onClick={() => goToForm('sponsor')}>Become a partner <ArrowUpRight /></Button></div><div className="package-grid"><div><span>01 / SPONSOR</span><h3 className="font-display">Champion the vision.</h3><p>Support the program and connect your brand to a meaningful cultural celebration.</p></div><div><span>02 / PARTNER</span><h3 className="font-display">Create together.</h3><p>Collaborate on the experiences, activities and stories that bring the event to life.</p></div><div><span>03 / ASSOCIATE</span><h3 className="font-display">Join the journey.</h3><p>Stand with the initiative and help strengthen the Nepal–UAE community.</p></div></div></div></section>

      <section className="partners-section"><div className="content-width partners-inner"><div><p className="eyebrow">OUR PARTNERS</p><h2 className="font-display">Your name could be here.</h2></div><p>We’re bringing together organizations who believe in the power of cultural exchange. Interested in partnering with us?</p><Button variant="outline" onClick={() => goToForm('sponsor')}>Let’s talk partnership <ArrowUpRight /></Button></div></section>

      <section id="gallery" className="gallery-section section-pad"><div className="content-width"><SectionIntro number="07" label="THE GALLERY" title="A world worth sharing.">A glimpse of the places, flavours and people behind the journey.</SectionIntro><div className="gallery-grid"><div className="gallery-main"><img src={hero} alt="The Himalayas and Dubai skyline" loading="lazy" width={1920} height={1152}/><span>01 / BETWEEN TWO WORLDS</span></div><div><img src={dance} alt="Nepalese dancers in traditional red costumes" loading="lazy" width={1104} height={1312}/><span>02 / CULTURE IN MOTION</span></div><div><img src={food} alt="Nepali food including momo dumplings" loading="lazy" width={1104} height={1312}/><span>03 / A TASTE OF NEPAL</span></div><div><img src={community} alt="Nepalese and Emirati community members meeting" loading="lazy" width={1104} height={1312}/><span>04 / PEOPLE & POSSIBILITY</span></div></div></div></section>

      <section className="social-section section-pad"><div className="content-width"><div className="social-head"><div><p className="eyebrow">FOLLOW THE JOURNEY</p><h2 className="font-display">The story continues.</h2></div><span className="social-icon"><Instagram size={25}/></span></div><div className="social-grid"><img src={dance} alt="Traditional dance from Nepal" loading="lazy"/><img src={food} alt="Nepali cuisine" loading="lazy"/><img src={book.url} alt="Everest to Emirates book" loading="lazy"/><img src={community} alt="Community gathering" loading="lazy"/></div><p className="social-caption">Instagram updates coming soon.</p></div></section>

      <section id="join" className="join-section section-pad"><div className="content-width join-grid"><div className="join-copy"><p className="eyebrow">08 &nbsp; / &nbsp; JOIN THE JOURNEY</p><h2 className="font-display">Be part of something meaningful.</h2><p>Whether you’d like to participate or support the celebration, we’d love to hear from you.</p><div className="join-detail"><span>NEPAL <i /> UAE</span><span>CULTURE <i /> CONNECTION <i /> COLLABORATION</span></div></div><form className="join-form" onSubmit={handleSubmit} noValidate><h3 className="font-display">Let’s connect.</h3><p>Tell us a little about yourself.</p><label htmlFor="inquiry-name">Full name</label><input id="inquiry-name" autoComplete="name" value={name} onChange={e=>setName(e.target.value)} maxLength={100} placeholder="Your name" required /><label htmlFor="inquiry-email">Email address</label><input id="inquiry-email" autoComplete="email" type="email" value={email} onChange={e=>setEmail(e.target.value)} maxLength={255} placeholder="you@example.com" required /><div className="honeypot" aria-hidden="true"><label htmlFor="inquiry-website">Website</label><input id="inquiry-website" tabIndex={-1} autoComplete="off" value={website} onChange={e=>setWebsite(e.target.value)} /></div><fieldset><legend>Would you like to participate?</legend><div className="choice-row">{[true,false].map(value=><label key={String(value)} className={participate === value ? 'selected' : ''}><input type="radio" name="participate" checked={participate===value} onChange={()=>setParticipate(value)} required />{value ? 'Yes' : 'No'} {participate===value && <Check size={15}/>}</label>)}</div></fieldset><fieldset><legend>Interested in sponsoring?</legend><div className="choice-row">{[true,false].map(value=><label key={String(value)} className={sponsor === value ? 'selected' : ''}><input type="radio" name="sponsor" checked={sponsor===value} onChange={()=>setSponsor(value)} required />{value ? 'Yes' : 'No'} {sponsor===value && <Check size={15}/>}</label>)}</div></fieldset>{error && <p className="form-error" role="alert">{error}</p>}<Button type="submit" disabled={sending} className="form-submit">{sending ? 'Sending...' : 'Submit inquiry'} <ArrowUpRight /></Button></form></div></section>

      <section className="closing-section"><img src={hero} alt="Nepal and Dubai at sunset" loading="lazy" width={1920} height={1152}/><div className="closing-shade"/><div className="content-width closing-content"><p className="eyebrow">THE JOURNEY STARTS HERE</p><h2 className="font-display">Let’s bring Nepal<br /><em>& the UAE together.</em></h2><p>Be part of a cultural journey connecting people, stories, businesses and communities.</p><div><Button onClick={() => goToForm('participate')}>Participate <ArrowUpRight /></Button><Button variant="outline" onClick={() => goToForm('sponsor')}>Sponsor / Partner <ArrowRight /></Button></div></div></section>
    </main>
    <footer className="footer"><div className="content-width"><div className="footer-top"><div><Brand light/><p>A journey through Nepal’s heritage, culture and community in the UAE.</p></div><div><h4>EXPLORE</h4><a href="#about">About</a><a href="#activities">Activities</a><a href="#gallery">Gallery</a><a href="#sponsors">Partners</a></div><div><h4>GET INVOLVED</h4><a href="#join" onClick={()=>setParticipate(true)}>Participate</a><a href="#join" onClick={()=>setSponsor(true)}>Become a sponsor</a><a href="#book">The book</a></div><div><h4>CONTACT</h4><a href="mailto:dcom@eim.ae"><Mail size={16}/> dcom@eim.ae</a><span>United Arab Emirates</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Everest to Emirates. All rights reserved.</span><span>NEPAL × UAE</span></div></div></footer>
  </div>
}
