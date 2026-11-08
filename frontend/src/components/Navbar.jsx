import { useState, useEffect } from 'react';
import { Menu, X, Coffee } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Signature', href: '#signature' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#1a1a1a]/95 backdrop-blur-md shadow-2xl py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav('#home')}
          className="flex items-center gap-2 group"
        >
          <div className="w-8 h-8 rounded-full bg-[#C9A96E] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Coffee size={16} className="text-[#1a1a1a]" />
          </div>
          <span className="font-serif text-xl text-[#F5F0E8] tracking-widest uppercase">
            Brew <span className="text-[#C9A96E]">&</span> Bean
          </span>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNav(link.href)}
                className="text-[#D4C9B0] hover:text-[#C9A96E] text-sm tracking-widest uppercase font-light transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C9A96E] group-hover:w-full transition-all duration-300" />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => handleNav('#contact')}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-[#C9A96E] text-[#C9A96E] text-sm tracking-widest uppercase font-light hover:bg-[#C9A96E] hover:text-[#1a1a1a] transition-all duration-300 rounded-sm"
        >
          Reserve a Table
        </button>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[#F5F0E8] hover:text-[#C9A96E] transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#1a1a1a]/98 backdrop-blur-md px-6 py-6 flex flex-col gap-5 border-t border-[#C9A96E]/20">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-[#D4C9B0] hover:text-[#C9A96E] text-sm tracking-widest uppercase font-light text-left transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#contact')}
            className="mt-2 px-5 py-3 border border-[#C9A96E] text-[#C9A96E] text-sm tracking-widest uppercase font-light hover:bg-[#C9A96E] hover:text-[#1a1a1a] transition-all duration-300 rounded-sm text-center"
          >
            Reserve a Table
          </button>
        </div>
      </div>
    </nav>
  );
}

