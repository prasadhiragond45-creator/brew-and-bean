import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { CAFE_CONFIG } from '../data/cafeConfig';

export default function Hero() {
  const overlayRef = useRef(null);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=85&fit=crop"
          alt="Coffee shop atmosphere"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/80 via-[#1a1a1a]/60 to-[#0d0d0d]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-fade-in">
        {/* Eyebrow */}
        <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase font-light mb-6 opacity-0 animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          Est. 2018 &nbsp;·&nbsp; Artisan Coffee House
        </p>

        {/* Main Heading */}
        <h1
          className="font-serif text-6xl md:text-8xl lg:text-9xl text-[#F5F0E8] leading-tight mb-6 opacity-0 animate-slide-up"
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
        >
          Brew &amp;
          <br />
          <span className="text-[#C9A96E] italic">Bean</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-[#D4C9B0] text-lg md:text-xl font-light max-w-xl mx-auto mb-10 leading-relaxed opacity-0 animate-slide-up"
          style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
        >
          Where every cup is a story — crafted with passion, precision, and
          the finest single-origin beans from around the world.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-slide-up"
          style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
        >
          <button
            onClick={() => document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-[#C9A96E] text-[#1a1a1a] text-sm tracking-widest uppercase font-medium hover:bg-[#b8945a] transition-all duration-300 rounded-sm shadow-lg hover:shadow-[#C9A96E]/30 hover:shadow-xl hover:-translate-y-0.5"
          >
            Explore Our Menu
          </button>
          <button
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border border-[#F5F0E8]/40 text-[#F5F0E8] text-sm tracking-widest uppercase font-light hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300 rounded-sm"
          >
            Our Story
          </button>
        </div>

        {/* Stats */}
        <div
          className="mt-20 grid grid-cols-3 gap-6 max-w-md mx-auto opacity-0 animate-slide-up"
          style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
        >
          {CAFE_CONFIG.stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-serif text-3xl text-[#C9A96E]">{s.value}</div>
              <div className="text-[#8C7B6B] text-xs tracking-widest uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Cue */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#C9A96E] animate-bounce opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}

