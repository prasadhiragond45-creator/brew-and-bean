import { useInView } from '../hooks/useInView';

const FALLBACK_COFFEE = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&q=80&fit=crop';

const drinks = [
  {
    name: 'The Golden Hour',
    desc: 'Ristretto, saffron-infused oat milk, edible gold, vanilla bean — a sunset in a cup.',
    img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=700&q=85&fit=crop',
    price: '₹420',
    badge: "Chef's Favourite",
  },
  {
    name: 'Midnight Brew',
    desc: 'Activated charcoal cold brew, coconut cream, black sesame, served over obsidian ice.',
    img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=700&q=85&fit=crop',
    price: '₹390',
    badge: 'Most Instagrammed',
  },
  {
    name: 'Rose Cardamom Latte',
    desc: 'Single-origin espresso, house-made rose syrup, green cardamom, topped with dried petals.',
    img: 'https://images.unsplash.com/photo-1551499779-ee50f1aa4d25?w=700&q=85&fit=crop',
    price: '₹360',
    badge: 'Seasonal',
  },
  {
    name: 'The Velvet',
    desc: 'Double espresso, 72% dark chocolate, bourbon vanilla cream, dusted with cocoa.',
    img: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=700&q=85&fit=crop',
    price: '₹400',
    badge: null,
  },
  {
    name: 'Honeycomb Oat',
    desc: 'Cold brew, honeycomb syrup, oat milk, sea salt flakes — naturally sweet and bold.',
    img: 'https://images.unsplash.com/photo-1527156231393-7023794f363c?w=700&q=85&fit=crop',
    price: '₹370',
    badge: 'New',
  },
  {
    name: 'Matcha Cloud',
    desc: 'Ceremonial-grade matcha, whipped coconut cream, toasted rice, served over crushed ice.',
    img: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=700&q=85&fit=crop',
    price: '₹380',
    badge: null,
  },
];

const badgeStyle = {
  "Chef's Favourite": 'bg-[#C9A96E] text-[#1a1a1a]',
  'Most Instagrammed': 'bg-purple-900 text-purple-200',
  Seasonal: 'bg-rose-900 text-rose-200',
  New: 'bg-emerald-800 text-emerald-200',
};

export default function Signature() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="signature" className="bg-[#F5F0E8] py-28 overflow-hidden">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase font-light mb-4">
            Crafted Exclusively
          </p>
          <h2 className="font-serif text-5xl md:text-6xl text-[#1a1a1a] leading-tight mb-5">
            Signature Drinks
          </h2>
          <p className="text-[#6a5a4a] text-base font-light max-w-md mx-auto">
            Original creations by our head barista — unavailable anywhere else.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {drinks.map((d, i) => (
            <div
              key={d.name}
              className="group bg-[#1a1a1a] rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-black/40"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden bg-[#242424]">
                <img
                  src={d.img}
                  alt={d.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => {
                    if (e.currentTarget.src !== FALLBACK_COFFEE) {
                      e.currentTarget.src = FALLBACK_COFFEE;
                    }
                  }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/20 to-transparent" />

                {/* Badge */}
                {d.badge && (
                  <span
                    className={`absolute top-4 left-4 text-[10px] tracking-widest uppercase px-3 py-1 rounded-full font-medium ${
                      badgeStyle[d.badge] ?? 'bg-[#C9A96E] text-[#1a1a1a]'
                    }`}
                  >
                    {d.badge}
                  </span>
                )}

                {/* Price floating on image */}
                <span className="absolute bottom-4 right-4 font-serif text-2xl text-[#C9A96E] drop-shadow-lg">
                  {d.price}
                </span>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-serif text-xl text-[#F5F0E8] mb-2 group-hover:text-[#C9A96E] transition-colors duration-300">
                  {d.name}
                </h3>
                <p className="text-[#6a5a4a] text-sm font-light leading-relaxed mb-5">
                  {d.desc}
                </p>
                <div className="border-t border-[#2a2a2a] pt-4">
                  <button className="w-full text-xs tracking-widest uppercase text-[#C9A96E] border border-[#C9A96E]/30 py-2.5 rounded-sm hover:bg-[#C9A96E] hover:text-[#1a1a1a] transition-all duration-300 font-medium">
                    Add to Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
