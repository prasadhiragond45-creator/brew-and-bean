import { useInView } from '../hooks/useInView';

const FALLBACK_FOOD = 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=80&fit=crop';

const foodItems = [
  {
    category: 'Pastries',
    items: [
      {
        name: 'Almond Croissant',
        desc: 'Buttery, flaky, filled with frangipane',
        price: '₹180',
        img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=80&fit=crop',
      },
      {
        name: 'Pain au Chocolat',
        desc: 'Valrhona dark chocolate, hand-laminated',
        price: '₹190',
        img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80&fit=crop',
      },
      {
        name: 'Cardamom Morning Bun',
        desc: 'Sugar-dusted, spiced orange zest',
        price: '₹160',
        img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80&fit=crop',
      },
      {
        name: 'Kouign-Amann',
        desc: 'Caramelised Breton butter cake',
        price: '₹200',
        img: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=500&q=80&fit=crop',
      },
    ],
  },
  {
    category: 'Desserts',
    items: [
      {
        name: 'Espresso Tiramisu',
        desc: 'House espresso, Mascarpone, cocoa',
        price: '₹320',
        img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=80&fit=crop',
      },
      {
        name: 'Dark Chocolate Tart',
        desc: '72% Valrhona ganache, salted caramel',
        price: '₹340',
        img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=80&fit=crop',
      },
      {
        name: 'Matcha Opera Cake',
        desc: 'Green tea sponge, white chocolate mousse',
        price: '₹360',
        img: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=500&q=80&fit=crop',
      },
      {
        name: 'Crème Brûlée',
        desc: 'Vanilla bean, perfectly torched',
        price: '₹300',
        img: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=500&q=80&fit=crop',
      },
    ],
  },
  {
    category: 'Light Bites',
    items: [
      {
        name: 'Avocado Toast',
        desc: 'Sourdough, smashed avo, chilli flakes, lemon',
        price: '₹290',
        img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&q=80&fit=crop',
      },
      {
        name: 'Shakshuka',
        desc: 'Spiced tomato, poached eggs, feta, pita',
        price: '₹340',
        img: 'https://images.unsplash.com/photo-1575853121743-60c24f0a7502?w=500&q=80&fit=crop',
      },
      {
        name: 'Overnight Oats',
        desc: 'Chia, berries, honey, almond milk',
        price: '₹260',
        img: 'https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=500&q=80&fit=crop',
      },
      {
        name: 'Cheese & Charcuterie',
        desc: 'Artisan board with seasonal accompaniments',
        price: '₹480',
        img: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=500&q=80&fit=crop',
      },
    ],
  },
];

export default function Food() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="food" className="bg-[#1a1a1a] py-28 overflow-hidden">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase font-light mb-4">
            Culinary Craft
          </p>
          <h2 className="font-serif text-5xl md:text-6xl text-[#F5F0E8] leading-tight mb-5">
            Food &amp; Desserts
          </h2>
          <p className="text-[#8C7B6B] text-base font-light max-w-md mx-auto">
            Freshly prepared each morning by our in-house pastry chef.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-20">
          {foodItems.map((section) => (
            <div key={section.category}>
              {/* Category Label */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-[#C9A96E]" />
                <h3 className="font-serif text-2xl text-[#C9A96E]">{section.category}</h3>
                <div className="flex-1 h-px bg-[#2a2a2a]" />
              </div>

              {/* Items Grid — with images */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="group bg-[#242424] border border-[#2a2a2a] rounded-2xl overflow-hidden hover:border-[#C9A96E]/30 hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-44 overflow-hidden bg-[#1e1e1e]">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          if (e.currentTarget.src !== FALLBACK_FOOD) {
                            e.currentTarget.src = FALLBACK_FOOD;
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#242424] via-transparent to-transparent" />
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h4 className="font-serif text-lg text-[#F5F0E8] mb-2 group-hover:text-[#C9A96E] transition-colors duration-300">
                        {item.name}
                      </h4>
                      <p className="text-[#6a5a4a] text-sm font-light leading-relaxed mb-4">
                        {item.desc}
                      </p>
                      <span className="font-serif text-xl text-[#C9A96E]">{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center text-[#4a3a2a] text-xs tracking-widest uppercase mt-14">
          All dishes contain allergen information available on request · Vegan &amp; GF options available
        </p>
      </div>
    </section>
  );
}
