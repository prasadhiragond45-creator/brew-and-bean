import { useInView } from '../hooks/useInView';

const values = [
  {
    title: 'Single-Origin Beans',
    desc: 'Sourced directly from family-run farms in Ethiopia, Colombia, and Guatemala.',
  },
  {
    title: 'Artisan Roasting',
    desc: 'Small-batch roasted in-house every week to ensure peak freshness and flavour.',
  },
  {
    title: 'Expert Baristas',
    desc: 'Our team trains rigorously, attending global championships and workshops.',
  },
];

export default function About() {
  const [ref, inView] = useInView(0.15);

  return (
    <section id="about" className="bg-[#F5F0E8] py-28 overflow-hidden">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=85&fit=crop"
                alt="Barista crafting coffee"
                className="w-full h-[520px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-8 -right-8 bg-[#1a1a1a] rounded-2xl p-6 shadow-2xl max-w-[200px]">
              <div className="font-serif text-4xl text-[#C9A96E] mb-1">8+</div>
              <div className="text-[#8C7B6B] text-xs tracking-widest uppercase">Years of Craft</div>
              <div className="mt-3 w-8 h-px bg-[#C9A96E]" />
            </div>
            {/* Second image small */}
            <div className="absolute -top-6 -left-6 w-36 h-36 rounded-xl overflow-hidden border-4 border-[#F5F0E8] shadow-xl hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=300&q=80&fit=crop"
                alt="Coffee beans"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase font-light mb-4">
              Our Story
            </p>
            <h2 className="font-serif text-5xl md:text-6xl text-[#1a1a1a] leading-tight mb-6">
              Passion Poured
              <br />
              <span className="italic text-[#4a3728]">Into Every Cup</span>
            </h2>
            <p className="text-[#5a4a3a] text-lg font-light leading-relaxed mb-5">
              Brew &amp; Bean was born in 2018 from a simple obsession: to serve
              the most honest, beautiful cup of coffee in the city. We believe
              coffee is a craft — from seed to cup — and every step deserves
              respect.
            </p>
            <p className="text-[#6a5a4a] text-base font-light leading-relaxed mb-10">
              Nestled in the heart of the city, our café is a sanctuary for
              coffee lovers, remote workers, and dreamers alike. We partnered
              with sustainable farms and trained our baristas to bring you
              an experience that goes far beyond caffeine.
            </p>

            {/* Values */}
            <div className="space-y-5">
              {values.map((v, i) => (
                <div
                  key={v.title}
                  className="flex gap-4 items-start p-4 rounded-xl bg-white/60 hover:bg-white transition-colors duration-300"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="mt-1 w-2 h-2 rounded-full bg-[#C9A96E] flex-shrink-0" />
                  <div>
                    <h4 className="font-serif text-lg text-[#1a1a1a] mb-1">{v.title}</h4>
                    <p className="text-[#6a5a4a] text-sm font-light leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

