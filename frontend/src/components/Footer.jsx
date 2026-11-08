import { Coffee, Share2, Rss, AtSign } from 'lucide-react';
import { CAFE_CONFIG } from '../data/cafeConfig';

export default function Footer() {
  const handleNav = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0d0d0d] border-t border-[#1e1e1e] py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top */}
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-full bg-[#C9A96E] flex items-center justify-center">
                <Coffee size={16} className="text-[#1a1a1a]" />
              </div>
              <span className="font-serif text-2xl text-[#F5F0E8] tracking-widest uppercase">
                Brew <span className="text-[#C9A96E]">&</span> Bean
              </span>
            </div>
            <p className="text-[#6a5a4a] text-sm font-light leading-relaxed max-w-sm mb-6">
              An artisan coffee house dedicated to the craft of exceptional coffee.
              We believe every cup tells a story — come write yours with us.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Share2, href: CAFE_CONFIG.socials.instagram, label: 'Instagram' },
                { Icon: Rss, href: CAFE_CONFIG.socials.facebook, label: 'Facebook' },
                { Icon: AtSign, href: CAFE_CONFIG.socials.twitter, label: 'Twitter' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-[#2a2a2a] flex items-center justify-center text-[#6a5a4a] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-[#F5F0E8] text-base mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                ['Home', '#home'],
                ['About', '#about'],
                ['Menu', '#menu'],
                ['Signature Drinks', '#signature'],
                ['Gallery', '#gallery'],
                ['Contact', '#contact'],
              ].map(([label, href]) => (
                <li key={href}>
                  <button
                    onClick={() => handleNav(href)}
                    className="text-[#6a5a4a] text-sm font-light hover:text-[#C9A96E] transition-colors duration-300"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-[#F5F0E8] text-base mb-5">Contact</h4>
            <div className="space-y-3 text-sm font-light text-[#6a5a4a]">
              <p>12 Artisan Lane</p>
              <p>Koramangala, Bengaluru</p>
              <p>Karnataka 560034</p>
              <p className="text-[#4a3a2a] text-xs">{CAFE_CONFIG.addressNote}</p>
              <div className="pt-2">
                <p>{CAFE_CONFIG.phone}</p>
                <p className="text-[#4a3a2a] text-xs">(Placeholder number)</p>
              </div>
              <p>{CAFE_CONFIG.email}</p>
              <p className="text-[#4a3a2a] text-xs">(Placeholder email)</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1e1e1e] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#3a3028] text-xs font-light">
            © 2026 Brew &amp; Bean Café. All rights reserved. · Fictional showcase — not a real commercial entity.
          </p>
          <p className="text-[#3a3028] text-xs font-light">
            Crafted with passion &amp; ☕
          </p>
        </div>
      </div>
    </footer>
  );
}
