import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { categories, menuItems as defaultMenuItems, tagColors, FALLBACK_COFFEE } from '../data/menuData';
import { getMenu } from '../services/menuService';

export default function Menu() {
  const [active, setActive] = useState('All');
  const [items, setItems] = useState(defaultMenuItems);
  const [ref, inView] = useInView(0.1);

  // Attempt to load from backend API if available, otherwise seamlessly uses local data
  useEffect(() => {
    let isMounted = true;
    async function loadMenu() {
      try {
        const data = await getMenu();
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
      } catch {
        // Keeps default menuItems fallback smoothly
      }
    }
    loadMenu();
    return () => { isMounted = false; };
  }, []);

  const filtered =
    active === 'All' ? items : items.filter((m) => m.category === active);

  return (
    <section id="menu" className="bg-[#121212] py-28 overflow-hidden">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase font-light mb-4">
            Our Offerings
          </p>
          <h2 className="font-serif text-5xl md:text-6xl text-[#F5F0E8] leading-tight mb-5">
            The Menu
          </h2>
          <p className="text-[#8C7B6B] text-base font-light max-w-lg mx-auto">
            Carefully curated beverages crafted from the world's finest beans
            and botanicals.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2.5 text-xs tracking-widest uppercase rounded-full border transition-all duration-300 font-light ${
                active === cat
                  ? 'bg-[#C9A96E] border-[#C9A96E] text-[#1a1a1a] font-medium'
                  : 'border-[#3a3a3a] text-[#8C7B6B] hover:border-[#C9A96E] hover:text-[#C9A96E]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid — with images */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((item, i) => (
            <div
              key={item.name}
              className="group bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl overflow-hidden hover:border-[#C9A96E]/40 hover:bg-[#242424] transition-all duration-400 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {/* Card image */}
              <div className="relative h-44 overflow-hidden bg-[#242424]">
                <img
                  src={item.img || item.image_url || FALLBACK_COFFEE}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => {
                    if (e.currentTarget.src !== FALLBACK_COFFEE) {
                      e.currentTarget.src = FALLBACK_COFFEE;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] via-transparent to-transparent" />
                {item.tag && (
                  <span
                    className={`absolute top-3 right-3 text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full font-medium ${tagColors[item.tag] || 'bg-[#C9A96E] text-[#1a1a1a]'}`}
                  >
                    {item.tag}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-serif text-lg text-[#F5F0E8] leading-snug mb-2">
                  {item.name}
                </h3>
                <p className="text-[#6a5a4a] text-sm font-light leading-relaxed mb-4">
                  {item.desc || item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl text-[#C9A96E]">{item.price}</span>
                  <span className="text-[#3a3a3a] text-xs tracking-widest uppercase group-hover:text-[#C9A96E]/60 transition-colors">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
