import React, { useState, useEffect } from 'react';

/**
 * PROJECT CONFIGURATION
 * Centralizing these values makes it easy to go live.
 */
const CONFIG = {
  bookingUrl: "https://phorest.com/book/salons/salonpaloma",
  yelpUrl: "https://www.yelp.com/biz/salon-paloma-san-carlos",
  instagramUrl: "https://www.instagram.com/thesalonpaloma/",
  phoneNumber: "6502327108",
  displayPhone: "650.232.7108",
  address: "538 El Camino Real, Suite A, San Carlos, CA 94070"
};

const ASSETS = {
  logoGold: "thumbnail_Paloma_Logo+2+-+3.webp",
  logoWhite: "Paloma_Logo_white.webp",
  heroLady: "SalonPaloma_hero_bg_04.webp",
  interiorReception: "IMG_5785.webp",
  marbleTexture: "rawpixel-557126-unsplash.webp",
  team: [
    { id: 1, name: "Paloma", role: "Founder & Lead Stylist", bio: "Defining the San Carlos aesthetic through precision and bespoke color." },
    { id: 2, name: "[Name]", role: "Senior Stylist", bio: "Specializing in architectural silhouettes and lived-in layers." },
    { id: 3, name: "[Name]", role: "Color Artist", bio: "Master of light-reflective gloss and corrective rituals." },
    { id: 4, name: "[Name]", role: "Stylist", bio: "Editorial finishing and luxury extension artistry." },
  ],
  serviceMenu: [
    {
      category: "Hair",
      items: ["Haircuts", "Blow-drys", "Updo’s", "Weddings & Special Occasions"]
    },
    {
      category: "Color",
      items: ["Base color", "Highlights / Balayage", "Gloss", "Color Correction", "Creative Color"]
    },
    {
      category: "Treatments",
      items: ["Conditioning Treatment", "Keratin Straightening"]
    },
    {
      category: "Extensions",
      items: ["Individual", "Tape In", "Hand-tied"]
    }
  ],
  testimonials: [
    {
      name: "Jeeyna W.",
      location: "Belmont, CA",
      date: "Feb 26, 2026",
      text: "I love my new hair! Paloma is incredible—She listens to exactly what you want and takes extra care in delivering a beautiful result. Highly recommend! The stylists are so nice. The salon itself is aesthetically pleasing, clean, and just overall gorgeous inside."
    },
    {
      name: "Kimberly L.",
      location: "Redwood City, CA",
      date: "Mar 21, 2026",
      text: "Paloma was great! I was there for 3 hours and she did a trial hair color like sample of what she could do which was subtle but a nice change. She worked some cutting magic and blow dried my hair in 20 min which was the fastest I've ever seen."
    },
    {
      name: "Alexandra G.",
      location: "San Mateo, CA",
      date: "Mar 4, 2026",
      text: "A friend of mine referred me to Salon Paloma and I am so happy she did! I am a first time mom who was in need of some self care. I booked a haircut with Paloma—who is super sweet and friendly. The vibe of the salon is amazing from the aesthetic to the drink menu."
    }
  ]
};

const Icons = {
  Menu: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>,
  X: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>,
  ArrowRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>,
  Instagram: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>,
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"></path></svg>,
  Yelp: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M19.7 13c0 .8-.5 1.5-1.2 1.8-.8.3-1.8.2-2.5-.2-.5-.3-.9-.7-1.1-1.2-.2-.5-.3-1-.2-1.5.1-.8.7-1.5 1.5-1.7.8-.2 1.7 0 2.3.6.4.4.7.9.7 1.4zm-7.6-3.8c.8 0 1.5.5 1.8 1.2.3.8.2 1.8-.2 2.5-.3.5-.7.9-1.2 1.1-.5.2-1 .3-1.5.2-.8-.1-1.5-.7-1.7-1.5-.2-.8 0-1.7.6-2.3.4-.4.9-.7 1.4-.7zm-4.3 8c.3.5.7.9 1.2 1.1.5.2 1 .3 1.5.2.8-.1 1.5-.7 1.7-1.5.2-.8 0-1.7-.6-2.3-.4-.4-.9-.7-1.4-.7-.8 0-1.5.5-1.8 1.2-.3.8-.2 1.8.2 2.5.2.2.3.4.5.5zm11.1-8.5c-.8.1-1.5.7-1.7 1.5-.2.8 0 1.7.6 2.3.4.4.9.7 1.4.7.8 0 1.5-.5 1.8-1.2.3-.8.2-1.8-.2-2.5-.3-.5-.7-.9-1.2-1.1-.3-.1-.5-.1-.7.3zM10.1 5.3c-.8.1-1.5.7-1.7 1.5-.2.8 0 1.7.6 2.3.4.4.9.7 1.4.7.8 0 1.5-.5 1.8-1.2.3-.8.2-1.8-.2-2.5-.3-.5-.7-.9-1.2-1.1-.3-.1-.5-.1-.7.3zM10.1 5.3c-.8.1-1.5.7-1.7 1.5-.2.8 0 1.7.6 2.3.4.4.9.7 1.4.7.8 0 1.5-.5 1.8-1.2.3-.8.2-1.8-.2-2.5-.3-.5-.7-.9-1.2-1.1-.3-.1-.5-.1-.7.3z" /></svg>
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SEO Schema updated with correct hours
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "name": "Salon Paloma",
    "image": ASSETS.interiorReception,
    "@id": "https://thesalonpaloma.com",
    "url": "https://thesalonpaloma.com",
    "telephone": CONFIG.phoneNumber,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "538 El Camino Real, Suite A",
      "addressLocality": "San Carlos",
      "addressRegion": "CA",
      "postalCode": "94070",
      "addressCountry": "US"
    },
    "openingHoursSpecification": [
      { 
        "@type": "OpeningHoursSpecification", 
        "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday"], 
        "opens": "10:00", 
        "closes": "17:00" 
      },
      { 
        "@type": "OpeningHoursSpecification", 
        "dayOfWeek": "Saturday", 
        "opens": "09:00", 
        "closes": "17:00" 
      }
    ]
  };

  const navLinks = [
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Services', href: '#services' },
    { name: 'Experience', href: '#experience' },
    { name: 'The Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAF9F6] font-sans antialiased overflow-x-hidden relative">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      
      {/* GRAIN OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* NAVIGATION */}
      <nav className={`fixed w-full z-[100] transition-all duration-700 ${
        scrolled ? 'bg-black/90 backdrop-blur-md py-3 shadow-2xl' : 'bg-transparent py-8'
      }`}>
        <div className="max-w-[1800px] mx-auto px-8 flex justify-between items-center">
          <button 
            onClick={scrollToTop}
            className="w-28 md:w-36 flex items-center cursor-pointer transition-opacity hover:opacity-80 focus:outline-none"
          >
            <img 
              src={ASSETS.logoWhite} 
              alt="Salon Paloma" 
              className="w-full h-full object-contain transition-all duration-500" 
            />
          </button>
          
          <div className="hidden md:flex space-x-12 text-[9px] tracking-[0.6em] uppercase font-bold text-white/40">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="hover:text-white transition-all duration-500">
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-8">
            {/* SOCIAL LINKS IN HEADER */}
            <div className="hidden lg:flex items-center gap-6 text-white/30">
              <a 
                href={CONFIG.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Icons.Instagram />
              </a>
              <a 
                href={CONFIG.yelpUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
                aria-label="Yelp"
              >
                <Icons.Yelp />
              </a>
            </div>

            <a href={CONFIG.bookingUrl} target="_blank" rel="noopener noreferrer" className="hidden lg:block bg-white text-black px-8 py-3.5 text-[9px] tracking-[0.3em] uppercase font-black hover:bg-stone-300 transition-all active:scale-95">
              Book Now
            </a>
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(true)}>
              <Icons.Menu />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[110] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center space-y-10 animate-fade-in">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 text-white"><Icons.X /></button>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-3xl font-serif italic text-white" 
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="flex gap-8 pt-6">
            <a href={CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors"><Icons.Instagram /></a>
            <a href={CONFIG.yelpUrl} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors"><Icons.Yelp /></a>
          </div>
          <a href={CONFIG.bookingUrl} target="_blank" rel="noopener noreferrer" className="bg-white text-black px-12 py-5 text-xs font-black uppercase tracking-widest mt-10">Book Online</a>
        </div>
      )}

      {/* HERO SECTION */}
      <header className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={ASSETS.heroLady} 
            className="w-full h-full object-cover brightness-[0.75] scale-105 animate-slow-zoom object-[75%_center]"
            alt="Editorial Hair Artistry"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/10 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-[1800px] mx-auto px-8 grid lg:grid-cols-12 h-full items-center">
          <div className="lg:col-span-5 flex flex-col justify-center items-start pt-16">
            <div className="bg-white/[0.01] backdrop-blur-[2px] border-l border-white/10 p-8 md:p-12 relative group">
              <div className="absolute -top-10 -left-2 text-[100px] font-serif italic text-white/[0.02] select-none pointer-events-none tracking-tighter">
                Paloma
              </div>
              <div className="mb-6">
                <span className="inline-block text-[9px] uppercase tracking-[1.2em] text-stone-500 font-bold">
                  SAN CARLOS • CALIFORNIA
                </span>
              </div>
              <h1 className="text-5xl md:text-[80px] leading-[0.9] font-serif italic mb-8 text-white">
                Elevated <br /> 
                <span className="text-stone-600 transition-colors group-hover:text-stone-400">Artistry.</span>
              </h1>
              <p className="max-w-sm text-stone-400 text-base font-light leading-relaxed mb-10 border-l border-stone-800/50 pl-6">
                Manhattan precision meets San Carlos intimacy. A sanctuary for those who view hair as a living canvas.
              </p>
              <a href={CONFIG.bookingUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-6 text-[9px] tracking-[0.6em] uppercase font-black text-white hover:text-stone-400 transition-all">
                Reserve Experience 
                <div className="w-12 h-[1px] bg-white/20 transition-all group-hover:w-20 group-hover:bg-white"></div>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* PHILOSOPHY */}
      <section id="philosophy" className="py-52 bg-[#0A0A0A] px-8 relative overflow-hidden">
        <div className="absolute -top-20 right-0 text-[18vw] font-serif italic text-white/[0.01] select-none pointer-events-none uppercase">
          Sanctuary
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-6 relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 border-t border-l border-white/5 -z-10"></div>
            <div className="overflow-hidden shadow-2xl">
               <img 
                src={ASSETS.interiorReception} 
                alt="Salon Paloma Interior" 
                className="w-full aspect-[4/5] object-cover brightness-[0.9] hover:brightness-100 transition-all duration-1000 grayscale-[0.1] hover:grayscale-0"
                loading="lazy"
              />
            </div>
          </div>
          <div className="lg:col-span-6 space-y-14">
            <div className="space-y-4">
              <h2 className="text-stone-600 text-[9px] tracking-[0.8em] uppercase font-black">Boutique Philosophy</h2>
              <h3 className="text-5xl md:text-6xl font-serif italic leading-tight text-white">The Unified Collective.</h3>
            </div>
            
            <div className="relative pl-10 border-l border-stone-900">
               <span className="absolute left-0 top-0 text-6xl font-serif text-stone-800 leading-none">“</span>
               <p className="text-stone-400 font-light text-xl leading-relaxed italic">
                 Consistency is the truest mark of luxury. At Salon Paloma, we cultivate a signature standard of excellence.
               </p>
            </div>

            <p className="text-stone-500 font-light text-base leading-relaxed max-w-md">
              Every stylist is meticulously trained in the Paloma Standard, ensuring your experience is intentional and unparalleled from chair to reveal.
            </p>
            
            <button className="flex items-center gap-6 group text-white">
              <span className="text-[9px] tracking-[0.4em] uppercase font-black group-hover:tracking-[0.5em] transition-all">Our Story</span>
              <Icons.ArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-52 bg-[#0F0F0F] px-8 relative border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.25] pointer-events-none transition-opacity duration-1000">
          <img src={ASSETS.marbleTexture} className="w-full h-full object-cover" alt="" loading="lazy" />
        </div>
        
        <div className="max-w-[1800px] mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-8">
            <div className="relative">
              <h2 className="text-stone-600 text-[9px] tracking-[0.8em] uppercase font-black mb-4 relative z-10">The Rituals</h2>
              <h3 className="text-6xl md:text-[8.5rem] font-serif italic text-white relative z-10">Curated.</h3>
            </div>
            <p className="text-stone-400 italic font-light text-xl lg:w-1/4 text-right pr-6 border-r border-stone-800">
              Architecture for the head. <br /> Light as sculpture.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-px bg-white/5 border border-white/5 shadow-2xl">
            {ASSETS.serviceMenu.map((category, i) => (
              <div key={i} className="group relative bg-[#0F0F0F]/95 p-12 md:p-16 hover:bg-white/[0.04] transition-all duration-700 cursor-default min-h-[500px] flex flex-col items-center text-center">
                <h4 className="text-3xl font-serif italic mb-10 text-white transition-transform duration-700 uppercase tracking-widest underline underline-offset-[12px] decoration-white/20 group-hover:decoration-white">
                  {category.category}
                </h4>
                <ul className="space-y-4 mb-12">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="text-stone-500 font-light text-base leading-relaxed hover:text-white transition-colors duration-300">
                      {item}
                    </li>
                  ))}
                </ul>
                <a 
                  href={CONFIG.bookingUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-auto pt-8 flex items-center text-[8px] tracking-[0.4em] uppercase font-bold text-stone-700 group-hover:text-white transition-all focus:outline-none"
                >
                  Consultation <Icons.ChevronRight />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE / TESTIMONIALS */}
      <section id="experience" className="py-52 bg-[#0A0A0A] px-8 relative overflow-hidden">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-32">
            <div>
              <h2 className="text-stone-600 text-[9px] tracking-[0.8em] uppercase font-black mb-4">The Experience</h2>
              <h3 className="text-6xl md:text-8xl font-serif italic text-white leading-tight">Voices of the Sanctuary.</h3>
            </div>
            <a 
              href={CONFIG.yelpUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-12 md:mt-0 flex items-center gap-6 group text-white border border-white/10 px-10 py-6 hover:bg-white hover:text-black transition-all duration-500"
            >
              <Icons.Yelp />
              <span className="text-[9px] tracking-[0.4em] uppercase font-black">View All on Yelp</span>
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {ASSETS.testimonials.map((review, i) => (
              <div key={i} className="relative group bg-white/[0.02] p-12 border border-white/5 flex flex-col justify-between hover:bg-white/[0.04] transition-all duration-700">
                <div className="absolute top-8 left-8 text-6xl font-serif text-white/5 select-none pointer-events-none">“</div>
                <div className="relative z-10">
                  <p className="text-stone-400 font-light text-lg leading-relaxed italic mb-12">
                    {review.text}
                  </p>
                  <div className="space-y-1">
                    <p className="text-white text-lg font-serif italic">{review.name}</p>
                    <p className="text-stone-600 text-[9px] tracking-[0.2em] uppercase font-bold">{review.location} • {review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-52 bg-[#0F0F0F] px-8 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-28">
            <h2 className="text-stone-600 text-[9px] tracking-[0.8em] uppercase font-black mb-4">The Collective</h2>
            <h3 className="text-6xl font-serif italic text-white">The Makers.</h3>
          </div>
          
          <div className="grid md:grid-cols-4 gap-12">
            {ASSETS.team.map((member) => (
              <div key={member.id} className="group cursor-default">
                <div className="relative aspect-[3/4] mb-8 overflow-hidden bg-stone-900/50 border border-white/5 transition-all duration-700">
                  <div className="absolute inset-0 flex items-center justify-center opacity-5 font-serif italic text-white text-4xl">
                    P
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>
                <h4 className="text-2xl font-serif italic mb-1 text-white">{member.name}</h4>
                <p className="text-[8px] tracking-[0.3em] uppercase font-black text-stone-600 mb-4">{member.role}</p>
                <p className="text-stone-500 font-light text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-2 group-hover:translate-y-0">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="group relative py-72 px-8 bg-black flex items-center justify-center text-center overflow-hidden">
        <img 
          src={ASSETS.interiorReception} 
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-[0.2] transition-all duration-[1500ms] ease-in-out group-hover:grayscale-0 group-hover:opacity-[0.6] group-hover:scale-110" 
          alt="Reception Area" 
          loading="lazy"
        />
        
        <div className="relative z-10 max-w-5xl">
          <h2 className="text-6xl md:text-[100px] font-serif italic mb-16 text-white leading-tight drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">Find Your <br /> Sanctuary.</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <a href={`tel:${CONFIG.phoneNumber}`} className="px-14 py-6 border border-white/10 backdrop-blur-md bg-black/40 text-white uppercase tracking-[0.5em] text-[9px] font-black hover:bg-white hover:text-black transition-all duration-700">
              {CONFIG.displayPhone}
            </a>
            <a href={CONFIG.bookingUrl} target="_blank" rel="noopener noreferrer" className="bg-white text-black px-16 py-6 uppercase tracking-[0.5em] text-[9px] font-black shadow-2xl hover:scale-105 transition-all duration-700 inline-block">
              Book Appointment
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black pt-32 pb-16 px-8 border-t border-white/5 text-stone-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-24 relative z-10">
          {/* Column 1: Brand & Contact */}
          <div className="space-y-12">
            <div className="text-white text-3xl font-serif italic uppercase tracking-[0.1em]">Salon Paloma</div>
            <div className="space-y-6 text-sm font-light leading-relaxed">
              <p className="text-stone-400">{CONFIG.address}</p>
              <p className="text-white font-bold">{CONFIG.displayPhone}</p>
            </div>
            <div className="flex gap-8 items-center text-[8px] tracking-[0.4em] uppercase font-black text-stone-900">
               <div className="w-10 h-px bg-stone-900"></div>
               <span>Est. 2019</span>
            </div>
          </div>
          
          {/* Column 2: Hours */}
          <div className="space-y-10">
             <h4 className="text-white text-[9px] tracking-[0.6em] uppercase font-black drop-shadow-md border-b border-white/5 pb-4">Studio Hours</h4>
             <ul className="space-y-4 text-sm font-light text-stone-700">
               {[
                 { day: "Monday", status: "Closed", type: "closed" },
                 { day: "Tuesday", status: "10:00 AM — 5:00 PM", type: "open" },
                 { day: "Wednesday", status: "10:00 AM — 5:00 PM", type: "open" },
                 { day: "Thursday", status: "10:00 AM — 5:00 PM", type: "open" },
                 { day: "Friday", status: "10:00 AM — 5:00 PM", type: "open" },
                 { day: "Saturday", status: "9:00 AM — 5:00 PM", type: "open" },
                 { day: "Sunday", status: "Closed", type: "closed" }
               ].map((item, idx) => (
                 <li key={idx} className="flex justify-between border-b border-stone-900/30 pb-2">
                   <span className="text-stone-500 uppercase text-[10px] tracking-widest">{item.day}</span>
                   {item.type === 'closed' ? (
                     <span className="text-red-950 font-black uppercase text-[9px] tracking-widest">{item.status}</span>
                   ) : (
                     <span className="text-white/80 font-medium">{item.status}</span>
                   )}
                 </li>
               ))}
             </ul>
          </div>

          {/* Column 3: Location & Connect */}
          <div className="space-y-10">
            <h4 className="text-white text-[9px] tracking-[0.6em] uppercase font-black border-b border-white/5 pb-4 text-right lg:text-left">Digital Sanctuary</h4>
            <div className="flex flex-col lg:flex-row gap-12 items-start">
               <div className="w-full aspect-square max-w-[280px] bg-stone-900/50 overflow-hidden border border-white/5 relative group">
                <iframe
                  title="Salon Paloma Location"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(CONFIG.address)}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  className="grayscale opacity-40 transition-all duration-[1500ms] ease-in-out group-hover:grayscale-0 group-hover:opacity-100"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
              <div className="flex lg:flex-col gap-8">
                 <a href={CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-stone-600 hover:text-white transition-colors">
                   <Icons.Instagram />
                 </a>
                 <a href={CONFIG.yelpUrl} target="_blank" rel="noopener noreferrer" className="text-stone-600 hover:text-white transition-colors">
                   <Icons.Yelp />
                 </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Footer Copyright Area */}
        <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[8px] uppercase tracking-[0.4em] text-stone-900 font-black gap-4">
          <p>© 2026 Salon Paloma • All Rights Reserved.</p>
          <div className="flex gap-12">
            <p>San Carlos • California</p>
            <p>Built with Artistry</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes slow-zoom { from { transform: scale(1); } to { transform: scale(1.1); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-slow-zoom { animation: slow-zoom 45s linear infinite alternate; }
        .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 0px; background: transparent; }
        body { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;