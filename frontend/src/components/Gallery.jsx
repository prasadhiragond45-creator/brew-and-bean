import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const FALLBACK_PHOTO = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=85&fit=crop';

const photos = [
  // Row 1 — big hero + 2 small
  {
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=85&fit=crop',
    alt: 'Cosy café interior with warm lighting',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=700&q=85&fit=crop',
    alt: 'Classic iced cold brew in tall glass',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1527156231393-7023794f363c?w=700&q=85&fit=crop',
    alt: 'Iced coffee with milk cascade',
    span: '',
  },
  // Row 2 small + wide
  {
    src: 'https://images.unsplash.com/photo-1587080413959-06b859fb107d?w=700&q=85&fit=crop',
    alt: 'Nitro cold brew with creamy foam',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=900&q=85&fit=crop',
    alt: 'Iced vanilla latte with ice cubes',
    span: 'col-span-2',
  },
  // Iced coffee closeups
  {
    src: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=700&q=85&fit=crop',
    alt: 'Iced brown sugar oat latte',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=700&q=85&fit=crop',
    alt: 'Cold brew tonic with citrus',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&q=85&fit=crop',
    alt: 'Latte art close-up',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1551499779-ee50f1aa4d25?w=700&q=85&fit=crop',
    alt: 'Rose cardamom latte',
    span: '',
  },
  // Barista + process
  {
    src: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=900&q=85&fit=crop',
    alt: 'Barista crafting espresso',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=700&q=85&fit=crop',
    alt: 'Single-origin coffee beans',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=700&q=85&fit=crop',
    alt: 'Dark velvet mocha',
    span: '',
  },
  // Pour over process
  {
    src: 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=700&q=85&fit=crop',
    alt: 'V60 pour over brewing',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=700&q=85&fit=crop',
    alt: 'Siphon brew in action',
    span: '',
  },
  // Food & desserts
  {
    src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=900&q=85&fit=crop',
    alt: 'Fresh almond croissants',
    span: 'col-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=700&q=85&fit=crop',
    alt: 'Espresso tiramisu dessert',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=700&q=85&fit=crop',
    alt: 'Dark chocolate tart with caramel',
    span: '',
  },
  // Café mood
  {
    src: 'https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=900&q=85&fit=crop',
    alt: 'Café seating — natural light',
    span: 'col-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=700&q=85&fit=crop',
    alt: 'Ceremonial matcha latte',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=700&q=85&fit=crop',
    alt: 'Golden turmeric latte',
    span: '',
  },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [ref, inView] = useInView(0.1);

  const filterGroups = {
    All: photos,
    'Iced Coffee': photos.slice(1, 8),
    'Hot Drinks': photos.slice(8, 14),
    'Food': photos.slice(14, 18),
    'Café': [photos[0], photos[17], photos[18]],
  };

  const displayPhotos = filterGroups[activeFilter] || photos;

  return (
    <section id="gallery" className="bg-[#F5F0E8] py-28 overflow-hidden">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase font-light mb-4">
            Visual Journey
          </p>
          <h2 className="font-serif text-5xl md:text-6xl text-[#1a1a1a] leading-tight mb-5">
            Gallery
          </h2>
          <p className="text-[#6a5a4a] text-base font-light max-w-md mx-auto">
            Moments, craft, and atmosphere — captured from behind the bar.
          </p>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Object.keys(filterGroups).map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 text-xs tracking-widest uppercase rounded-full border transition-all duration-300 font-light ${
                activeFilter === f
                  ? 'bg-[#1a1a1a] border-[#1a1a1a] text-[#C9A96E] font-medium'
                  : 'border-[#c0b09a] text-[#8C7B6B] hover:border-[#1a1a1a] hover:text-[#1a1a1a]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {displayPhotos.map((photo, i) => (
            <div
              key={photo.src + i}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-[#242424] ${
                activeFilter === 'All' ? photo.span : ''
              }`}
              onClick={() => setLightbox(photo)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                onError={(e) => {
                  if (e.currentTarget.src !== FALLBACK_PHOTO) {
                    e.currentTarget.src = FALLBACK_PHOTO;
                  }
                }}
              />
              <div className="absolute inset-0 bg-[#1a1a1a]/0 group-hover:bg-[#1a1a1a]/50 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                  <ZoomIn className="text-[#C9A96E]" size={32} />
                  <span className="text-[#F5F0E8] text-xs tracking-widest uppercase font-light">
                    View
                  </span>
                </div>
              </div>
              {/* Caption tag */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-[#F5F0E8] text-xs font-light tracking-wide">{photo.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Count */}
        <p className="text-center text-[#b0a090] text-xs tracking-widest uppercase mt-8">
          {displayPhotos.length} photos · Click to enlarge
        </p>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-[#F5F0E8]/70 hover:text-[#C9A96E] transition-colors z-10"
            onClick={() => setLightbox(null)}
          >
            <X size={32} />
          </button>
          <div className="flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src
                .replace('w=700', 'w=1400')
                .replace('w=900', 'w=1600')
                .replace('q=85', 'q=90')}
              alt={lightbox.alt}
              className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl"
              onError={(e) => {
                if (e.currentTarget.src !== FALLBACK_PHOTO) {
                  e.currentTarget.src = FALLBACK_PHOTO;
                }
              }}
            />
            <p className="text-[#8C7B6B] text-sm tracking-wider font-light">{lightbox.alt}</p>
          </div>
        </div>
      )}
    </section>
  );
}
