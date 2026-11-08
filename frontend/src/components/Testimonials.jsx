import { Star, Quote } from 'lucide-react';
import { useInView } from '../hooks/useInView';

// DEMO CONTENT — fictional reviews for presentation purposes only
const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Food Blogger · @sipwithpriya',
    avatar: 'https://i.pravatar.cc/80?img=47',
    rating: 5,
    text:
      'Brew & Bean is simply the finest coffee experience I\'ve had in the city. The Golden Hour is transcendent — I dream about it on Monday mornings.',
  },
  {
    name: 'Arjun Mehta',
    role: 'Architect',
    avatar: 'https://i.pravatar.cc/80?img=12',
    rating: 5,
    text:
      'The space is stunning, the coffee impeccable. I\'ve discovered my go-to work spot. The V60 Pour Over alone is worth the visit.',
  },
  {
    name: 'Leila Nair',
    role: 'UX Designer',
    avatar: 'https://i.pravatar.cc/80?img=32',
    rating: 5,
    text:
      'From the ambiance to the almond croissant — every detail is deliberate. This is what a real craft coffee house looks like.',
  },
  {
    name: 'Rohan Das',
    role: 'Photographer',
    avatar: 'https://i.pravatar.cc/80?img=65',
    rating: 5,
    text:
      'I photographed the Nitro Cold Brew and it\'s the most beautiful thing I\'ve captured all year. Also the most delicious.',
  },
  {
    name: 'Ananya Krishnan',
    role: 'Writer',
    avatar: 'https://i.pravatar.cc/80?img=56',
    rating: 5,
    text:
      'Quiet mornings here with a Kashmiri Kahwa and my notebook have produced some of my best writing. This café has a soul.',
  },
  {
    name: 'Vikram Bose',
    role: 'Entrepreneur',
    avatar: 'https://i.pravatar.cc/80?img=68',
    rating: 5,
    text:
      'Held a client breakfast here — everyone was impressed. The Dark Chocolate Tart was the star of the meeting.',
  },
];

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} className="fill-[#C9A96E] text-[#C9A96E]" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="testimonials" className="bg-[#121212] py-28 overflow-hidden">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase font-light mb-4">
            ⭐ Demo Reviews — Fictional Content for Presentation
          </p>
          <h2 className="font-serif text-5xl md:text-6xl text-[#F5F0E8] leading-tight mb-5">
            What Guests Say
          </h2>
          <p className="text-[#8C7B6B] text-base font-light max-w-md mx-auto">
            Stories from the people who make our café feel like home.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="group bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl p-7 hover:border-[#C9A96E]/30 hover:bg-[#242424] transition-all duration-400"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <Quote className="text-[#C9A96E]/30 mb-4" size={28} />
              <p className="text-[#C4B9A8] text-base font-light leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-[#2a2a2a]">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#C9A96E]/30"
                />
                <div className="flex-1">
                  <div className="font-serif text-[#F5F0E8] text-base">{t.name}</div>
                  <div className="text-[#6a5a4a] text-xs font-light">{t.role}</div>
                </div>
                <Stars count={t.rating} />
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-[#3a3028] text-xs tracking-widest uppercase mt-10">
          All reviews above are fictional demo content for presentation purposes only.
        </p>
      </div>
    </section>
  );
}

