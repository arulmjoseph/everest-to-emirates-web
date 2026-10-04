import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import logoImg from '@/assets/logo.png'

export const Route = createFileRoute('/thank-you')({
  head: () => ({ meta: [
    { title: 'Thank You | Everest to Emirates' },
    { name: 'description', content: 'Thank you for your interest in Everest to Emirates, a celebration of Nepal and the UAE.' },
    { property: 'og:title', content: 'Thank You | Everest to Emirates' },
    { property: 'og:description', content: 'Thank you for your interest in Everest to Emirates, a celebration of Nepal and the UAE.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: ThankYou,
})

function ThankYou() {
  return <main className="min-h-screen bg-background text-foreground flex flex-col">
    <header className="mx-auto w-full max-w-7xl px-6 py-6"><Link to="/"><img src={logoImg} alt="Everest to Emirates" className="h-16 w-auto object-contain" /></Link></header>
    <section className="flex flex-1 flex-col items-center justify-center px-6 pb-24 text-center">
      <span className="mb-8 grid size-16 place-items-center rounded-full bg-accent text-primary"><Check size={28} /></span>
      <p className="eyebrow">EVEREST TO EMIRATES</p>
      <h1 className="mt-5 max-w-2xl font-display text-5xl leading-tight md:text-7xl">Thank you for joining the journey.</h1>
      <p className="mt-6 max-w-lg text-lg text-muted-foreground">Your interest has been received. We look forward to bringing Nepal and the UAE together with you.</p>
      <Button asChild className="mt-10 h-12 px-7"><Link to="/"><ArrowLeft size={16} /> Back to the celebration</Link></Button>
    </section>
  </main>
}
