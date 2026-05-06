import React, { useState, useEffect } from 'react';

/**
 * PROJECT CONFIGURATION
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
    { category: "Hair", items: ["Haircuts", "Blow-drys", "Updo’s", "Weddings & Special Occasions"] },
    { category: "Color", items: ["Base color", "Highlights / Balayage", "Gloss", "Color Correction", "Creative Color"] },
    { category: "Treatments", items: ["Conditioning Treatment", "Keratin Straightening"] },
    { category: "Extensions", items: ["Individual", "Tape In", "Hand-tied"] }
  ],
  testimonials: [
    { name: "Jeeyna W.", location: "Belmont", date: "Feb 26", text: "I love my new hair! Paloma is incredible—She listens to exactly what you want and takes extra care in delivering a beautiful result." },
    { name: "Kimberly L.", location: "Redwood City", date: "Mar 21", text: "Paloma was great! She worked some cutting magic and blow dried my hair in 20 min which was the fastest I've ever seen." },
    { name: "Alexandra G.", location: "San Mateo", date: "Mar 4", text: "A first time mom in need of self care. My hair feels healthy, moisturized and shiny. The vibe of the salon is amazing." }
  ]
};

const Icons = {
  Menu: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>,
  X: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>,
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"></path></svg>,
  ArrowRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>,
  Instagram: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>,
  Yelp: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19.7 13c0 .8-.5 1.5-1.2 1.8-.8.3-1.8.2-2.5-.2-.5-.3-.9-.7-1.1-1.2-.2-.5-.3-1-.2-1.5.1-.8.7-1.5 1.5-1.7.8-.2 1.7 0 2.3.6.4.4.7.9.7 1.4zm-7.6-3.8c.8 0 1.5.5 1.8 1.2.3.8.2 1.8-.2 2.5-.3.5-.7.9-1.2 1.1-.5.2-1 .3-1.5.2-.8-.1-1.5-.7-1.7-1.5-.2-.8 0-1.7.6-2.3.4-.4.9-.7 1.4-.7zm-4.3 8c.3.5.7.9 1.2 1.1.5.2 1 .3 1.5.2-.8-.1-1.5-.7-1.7-1.5-.2-.8 0-1.7-.6-2.3-.4-.4-.9-.7-1.4-.7zm11.1-8.5c-.8.1-1.5.7-1.7 1.5-.2.8 0 1.7.6 2.3.4.4.9.7 1.4.7.8 0 1.5-.5 1.8-1.2.3-.8.2-1.8-.2-2.5-.3-.5-.7-.9-1.2-1.1-.3-.1-.5-.1-.7.3z" /></svg>,
  Star: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
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

  const navLinks = [
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Services', href: '#services' },
    { name: 'Experience', href: '#experience' },
    { name: 'The Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  const StarRating = () => (
    <div className="flex gap-1 text-stone-300 mb-4">
      <Icons.Star /><Icons.Star /><Icons.Star /><Icons.Star /><Icons.Star />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAF9F6] font-sans antialiased overflow-x-hidden relative">
      
      {/* NAVIGATION */}
      <nav className={`fixed w-full z-[999] transition-all duration-500 ${
        scrolled ? 'bg-black/95 backdrop-blur-md py-2 shadow-2xl' : 'bg-black/80 lg:bg-transparent py-4'
      }`}>
        <div className="max-w-[1800px] mx-auto px-6 flex justify-between items-center">
          <button onClick={scrollToTop} className="w-20 md:w-32">
            <img src={ASSETS.logoWhite} alt="Salon Paloma" className="w-full h-auto object-contain" />
          </button>
          
          <div className="hidden lg:flex space-x-12 text-[9px] tracking-[0.6em] uppercase font-bold text-white/40">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="hover:text-white transition-all">{link.name}</a>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden lg:flex items-center gap-6 text-white/30">
              <a href={CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram"><Icons.Instagram /></a>
              <a href={CONFIG.yelpUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Yelp"><Icons.Yelp /></a>
            </div>

            <a href={CONFIG.bookingUrl} target="_blank" className="bg-white text-black px-7 py-3.5 md:px-8 md:py-2.5 text-[10px] md:text-[9px] tracking-[0.3em] uppercase font-black hover:bg-stone-300 transition-all active:scale-95">
              Book
            </a>
            <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(true)}><Icons.Menu /></button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[1000] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center space-y-10">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-white"><Icons.X /></button>
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-3xl font-serif italic text-white" onClick={() => setIsMenuOpen(false)}>{link.name}</a>
          ))}
          <div className="flex gap-8 pt-4">
            <a href={CONFIG.instagramUrl} target="_blank" className="text-white/40"><Icons.Instagram /></a>
            <a href={CONFIG.yelpUrl} target="_blank" className="text-white/40"><Icons.Yelp /></a>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <header className="relative w-full flex flex-col lg:block lg:h-[100svh] min-h-[500px] bg-black overflow-hidden pt-[72px] lg:pt-0">
        <div className="w-full h-[75vh] sm:h-[85vh] lg:absolute lg:inset-0 z-0">
          <img 
            src={ASSETS.heroLady} 
            className="w-full h-full object-cover object-[center_35%]"
            alt="Salon Paloma Hair Artistry"
          />
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
        </div>

        <div className="relative lg:absolute lg:inset-0 z-10 w-full max-w-[1800px] mx-auto px-6 md:px-12 flex items-center h-auto lg:h-full py-12 lg:py-0 bg-[#0A0A0A] lg:bg-transparent">
          <div className="max-w-xl border-l border-stone-800 lg:border-white/10 pl-6 md:pl-12">
            <h1 className="text-4xl sm:text-6xl lg:text-[80px] leading-[0.9] font-serif italic mb-6 text-white">
              Elevated <br /> 
              <span className="text-stone-500">Artistry.</span>
            </h1>
            <p className="max-w-sm text-stone-400 text-sm md:text-base font-light leading-relaxed mb-10">
              Manhattan precision meets San Carlos intimacy. A sanctuary for those who view hair as a living canvas.
            </p>
            <a href={CONFIG.bookingUrl} target="_blank" className="group inline-flex items-center gap-6 text-[10px] md:text-[11px] tracking-[0.5em] uppercase font-black text-white hover:text-stone-400 transition-all border-b border-white/10 pb-2 hover:border-white">
              Reserve Experience 
              <Icons.ArrowRight />
            </a>
          </div>
        </div>
      </header>

      {/* PHILOSOPHY */}
      <section id="philosophy" className="py-16 md:py-28 bg-[#0A0A0A] px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="shadow-2xl overflow-hidden">
            <img src={ASSETS.interiorReception} alt="Interior" className="w-full aspect-[4/5] object-cover transition-transform duration-1000 hover:scale-105" />
          </div>
          <div className="space-y-10">
            <h3 className="text-3xl md:text-5xl font-serif italic text-white leading-tight">The Unified Collective.</h3>
            <p className="text-stone-400 font-light text-lg border-l border-stone-800 pl-8 italic">Consistency is the truest mark of luxury.</p>
            <p className="text-stone-500 font-light leading-relaxed">
              At Salon Paloma, we cultivate a signature standard of excellence. Every stylist is meticulously trained in the Paloma Standard, ensuring your experience is intentional and unparalleled from chair to reveal.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-16 md:py-28 bg-[#0F0F0F] px-6 relative border-y border-white/5">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <img src={ASSETS.marbleTexture} className="w-full h-full object-cover" alt="" />
        </div>
        <div className="max-w-[1800px] mx-auto relative z-10">
          <h3 className="text-4xl md:text-6xl font-serif italic text-white mb-16 text-center lg:text-left">Curated.</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 shadow-2xl">
            {ASSETS.serviceMenu.map((cat, i) => (
              <div key={i} className="p-12 bg-[#0F0F0F] flex flex-col items-center text-center group hover:bg-white/[0.02] transition-all">
                <h4 className="text-xl font-serif italic mb-8 text-white uppercase tracking-widest underline underline-offset-[12px] decoration-white/10">{cat.category}</h4>
                <ul className="space-y-4 mb-10 text-stone-500 font-light">
                  {cat.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
                <a href={CONFIG.bookingUrl} target="_blank" className="mt-auto flex items-center text-[8px] tracking-widest uppercase font-bold text-stone-600 group-hover:text-white transition-all">
                  Consultation <Icons.ChevronRight />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE - STARS AND YELP LINK ADDED */}
      <section id="experience" className="py-16 md:py-28 bg-[#0A0A0A] px-6">
        <div className="max-w-[1800px] mx-auto">
          <h3 className="text-4xl md:text-6xl font-serif italic text-white mb-16 text-center">Voices.</h3>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {ASSETS.testimonials.map((review, i) => (
              <div key={i} className="bg-white/[0.02] p-8 md:p-12 border border-white/5 hover:bg-white/[0.04] transition-all duration-700">
                <StarRating />
                <p className="text-stone-400 font-light text-base md:text-lg leading-relaxed italic mb-10">"{review.text}"</p>
                <div>
                  <p className="text-white text-lg font-serif italic">{review.name}</p>
                  <p className="text-stone-600 text-[9px] tracking-[0.2em] uppercase font-bold">{review.location} • {review.date}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <a href={CONFIG.yelpUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase font-bold text-stone-500 hover:text-white transition-all group">
              <Icons.Yelp />
              View all reviews on Yelp
              <div className="w-8 h-[1px] bg-stone-800 transition-all group-hover:w-12 group-hover:bg-white"></div>
            </a>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-16 md:py-28 bg-[#0F0F0F] px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl md:text-4xl font-serif italic text-white text-center mb-16">The Collective.</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {ASSETS.team.map((member) => (
              <div key={member.id} className="group">
                <div className="aspect-[3/4] mb-6 bg-stone-900 border border-white/5 overflow-hidden flex items-center justify-center relative">
                   <span className="text-white/5 text-6xl italic font-serif group-hover:scale-110 transition-transform duration-700">P</span>
                </div>
                <h4 className="text-xl md:text-2xl font-serif italic text-white">{member.name}</h4>
                <p className="text-[8px] tracking-[0.3em] uppercase font-black text-stone-600 mb-4">{member.role}</p>
                <p className="text-stone-500 text-xs font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="group contact-reveal relative py-32 md:py-48 px-6 bg-black flex items-center justify-center text-center overflow-hidden">
        <img 
          src={ASSETS.interiorReception} 
          className="contact-bg-img absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms]" 
          alt="Reception" 
        />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-7xl font-serif italic mb-12 text-white drop-shadow-2xl">Find Sanctuary.</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a href={`tel:${CONFIG.phoneNumber}`} className="px-10 py-5 border border-white/10 backdrop-blur-md bg-black/40 text-white uppercase tracking-[0.5em] text-[9px] font-black">{CONFIG.displayPhone}</a>
            <a href={CONFIG.bookingUrl} target="_blank" rel="noopener noreferrer" className="bg-white text-black px-12 py-5 uppercase tracking-[0.5em] text-[9px] font-black hover:bg-stone-200 transition-all active:scale-95">Book Online</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black pt-32 pb-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-16">
          <div className="space-y-8">
            <h4 className="text-[9px] tracking-[0.5em] uppercase font-bold text-white/40 border-b border-white/5 pb-4">Find Us</h4>
            <div className="w-full aspect-video bg-stone-900 overflow-hidden border border-white/5">
               <iframe
                  title="Map" src={`https://www.google.com/maps?q=${encodeURIComponent(CONFIG.address)}&output=embed`}
                  width="100%" height="100%" style={{ border: 0 }}
                ></iframe>
            </div>
          </div>
          
          <div className="space-y-8">
            <h4 className="text-[9px] tracking-[0.5em] uppercase font-bold text-white/40 border-b border-white/5 pb-4">Studio Hours</h4>
            <ul className="space-y-4 text-[11px] md:text-sm font-light text-stone-500 uppercase tracking-wider">
               {[
                 { d: "Monday", h: "Closed", c: true },
                 { d: "Tuesday", h: "10:00 AM — 5:00 PM" },
                 { d: "Wednesday", h: "10:00 AM — 5:00 PM" },
                 { d: "Thursday", h: "10:00 AM — 5:00 PM" },
                 { d: "Friday", h: "10:00 AM — 5:00 PM" },
                 { d: "Saturday", h: "9:00 AM — 5:00 PM" },
                 { d: "Sunday", h: "Closed", c: true }
               ].map((item, idx) => (
                 <li key={idx} className="flex justify-between border-b border-stone-900/30 pb-2">
                   <span>{item.d}</span>
                   <span className={item.c ? "text-red-950 font-black" : "text-white"}>{item.h}</span>
                 </li>
               ))}
             </ul>
          </div>

          <div className="space-y-8">
            <div className="text-white text-3xl font-serif italic uppercase tracking-wider">Salon Paloma</div>
            <p className="text-stone-400 text-sm leading-relaxed">{CONFIG.address}</p>
            <p className="text-white font-bold">{CONFIG.displayPhone}</p>
            <div className="flex gap-6 text-stone-600">
              <a href={CONFIG.instagramUrl} target="_blank" className="hover:text-white transition-colors"><Icons.Instagram /></a>
              <a href={CONFIG.yelpUrl} target="_blank" className="hover:text-white transition-colors"><Icons.Yelp /></a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between text-[8px] tracking-[0.3em] uppercase font-bold text-stone-800">
           <p>© 2024 Salon Paloma. All Rights Reserved.</p>
           <p>San Carlos, California</p>
        </div>
      </footer>

      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 0px; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.4s ease-out forwards; }
        
        .contact-bg-img { filter: grayscale(1); opacity: 0.35; transform: scale(1); }
        .contact-reveal:hover .contact-bg-img { filter: grayscale(0); opacity: 0.6; transform: scale(1.05); }
      `}</style>
    </div>
  );
};

export default App;