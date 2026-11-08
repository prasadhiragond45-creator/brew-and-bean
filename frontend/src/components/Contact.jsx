import { useState } from 'react';
import { MapPin, Clock, Phone, Mail, MessageCircle, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { sendContactInquiry } from '../services/contactService';
import { CAFE_CONFIG } from '../data/cafeConfig';

export default function Contact() {
  const [ref, inView] = useInView(0.1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    guests: '2'
  });
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage(null);
    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        message: `Reservation Inquiry: ${formData.guests} guests requested for date ${formData.date}`
      };
      await sendContactInquiry(payload);
      setStatusMessage({
        type: 'success',
        text: 'Reservation request received! Please note this is an enquiry, not an instant confirmation. Our team will review table availability and contact you shortly.'
      });
      setFormData({ name: '', phone: '', date: '', guests: '2' });
    } catch (err) {
      console.error('Reservation submission error:', err);
      setStatusMessage({
        type: 'error',
        text: 'Request could not be sent online. Please message us directly on WhatsApp to check table availability.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-[#F5F0E8] py-28 overflow-hidden">
      <div
        ref={ref}
        className={`max-w-7xl mx-auto px-6 transition-all duration-1000 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase font-light mb-4">
            Come Visit Us
          </p>
          <h2 className="font-serif text-5xl md:text-6xl text-[#1a1a1a] leading-tight mb-5">
            Find Us
          </h2>
          <p className="text-[#6a5a4a] text-base font-light max-w-md mx-auto">
            We'd love to have you. Drop by for a cup, or send an enquiry to request a table.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info Panels */}
          <div className="space-y-6">
            {/* Address */}
            <div className="bg-[#1a1a1a] rounded-2xl p-7 border border-[#2a2a2a]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin size={18} className="text-[#C9A96E]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#F5F0E8] mb-2">Our Location</h3>
                  <p className="text-[#8C7B6B] text-sm font-light leading-relaxed mb-4">
                    {CAFE_CONFIG.address}
                    <br />
                    <span className="text-[#C9A96E]/60 text-xs">{CAFE_CONFIG.addressNote}</span>
                  </p>
                  <a
                    href={CAFE_CONFIG.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#C9A96E] text-xs tracking-widest uppercase hover:gap-3 transition-all duration-300"
                  >
                    View on Google Maps <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-[#1a1a1a] rounded-2xl p-7 border border-[#2a2a2a]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock size={18} className="text-[#C9A96E]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg text-[#F5F0E8] mb-4">Opening Hours</h3>
                  <div className="space-y-3">
                    {CAFE_CONFIG.hours.map((h) => (
                      <div key={h.day} className="flex items-center justify-between">
                        <span className="text-[#8C7B6B] text-sm font-light">{h.day}</span>
                        <span className="text-[#C9A96E] text-sm font-light">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-[#1a1a1a] rounded-2xl p-7 border border-[#2a2a2a]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#C9A96E]/10 border border-[#C9A96E]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone size={18} className="text-[#C9A96E]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#F5F0E8] mb-3">Get In Touch</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[#8C7B6B] text-sm font-light">
                      <Phone size={13} className="text-[#C9A96E]/60" />
                      <span>{CAFE_CONFIG.phoneDisplay}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#8C7B6B] text-sm font-light">
                      <Mail size={13} className="text-[#C9A96E]/60" />
                      <span>{CAFE_CONFIG.emailDisplay}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side — Map placeholder + WhatsApp CTA */}
          <div className="space-y-6">
            {/* Map placeholder */}
            <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden h-80 relative border border-[#2a2a2a]">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=70&fit=crop"
                alt="Café exterior location placeholder"
                className="w-full h-full object-cover opacity-25"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <MapPin size={32} className="text-[#C9A96E] mb-3" />
                <p className="text-[#F5F0E8] font-serif text-xl mb-1">Koramangala, Bengaluru</p>
                <p className="text-[#8C7B6B] text-xs mb-5">Demo location map · Embed Google Maps iframe here before launch</p>
                <a
                  href={CAFE_CONFIG.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#C9A96E] text-[#C9A96E] text-xs tracking-widest uppercase hover:bg-[#C9A96E] hover:text-[#1a1a1a] transition-all duration-300 rounded-sm"
                >
                  Get Directions <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={CAFE_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 bg-[#1a1a1a] rounded-2xl p-7 hover:bg-[#242424] transition-all duration-300 border border-[#2a2a2a] hover:border-[#C9A96E]/30"
            >
              <div className="w-14 h-14 rounded-full bg-green-800/30 border border-green-700/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <MessageCircle size={24} className="text-green-400" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-[#F5F0E8] mb-1">Chat on WhatsApp</h3>
                <p className="text-[#6a5a4a] text-sm font-light">
                  Direct table enquiries and questions — quick responses during café hours.
                </p>
                <p className="text-green-400/80 text-xs mt-1 tracking-widest uppercase">
                  {CAFE_CONFIG.phone} · Placeholder
                </p>
              </div>
            </a>

            {/* Reservation Form */}
            <div className="bg-[#1a1a1a] rounded-2xl p-7 border border-[#2a2a2a]">
              <h3 className="font-serif text-xl text-[#F5F0E8] mb-2">Request Table Booking</h3>
              <p className="text-[#8C7B6B] text-xs font-light mb-6">
                Submit an enquiry. Note: Bookings are subject to table availability and confirmation.
              </p>

              {statusMessage && (
                <div
                  className={`mb-5 p-4 rounded-lg flex items-start gap-3 text-sm font-light leading-relaxed ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-950/60 border border-emerald-600/40 text-emerald-200'
                      : 'bg-red-950/60 border border-red-600/40 text-red-200'
                  }`}
                >
                  {statusMessage.type === 'success' ? (
                    <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-[#242424] border border-[#2a2a2a] rounded-lg px-4 py-3 text-[#F5F0E8] text-sm font-light placeholder-[#4a4a4a] focus:outline-none focus:border-[#C9A96E]/60 transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-[#242424] border border-[#2a2a2a] rounded-lg px-4 py-3 text-[#F5F0E8] text-sm font-light placeholder-[#4a4a4a] focus:outline-none focus:border-[#C9A96E]/60 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="bg-[#242424] border border-[#2a2a2a] rounded-lg px-4 py-3 text-[#8C7B6B] text-sm font-light focus:outline-none focus:border-[#C9A96E]/60 transition-colors"
                  />
                  <select
                    required
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="bg-[#242424] border border-[#2a2a2a] rounded-lg px-4 py-3 text-[#8C7B6B] text-sm font-light focus:outline-none focus:border-[#C9A96E]/60 transition-colors"
                  >
                    <option value="">Guests</option>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                    <option value="7+">7+ Guests</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-[#C9A96E] text-[#1a1a1a] text-sm tracking-widest uppercase font-medium rounded-lg hover:bg-[#b8945a] transition-all duration-300 hover:shadow-lg hover:shadow-[#C9A96E]/20 disabled:opacity-50"
                >
                  {submitting ? 'Submitting Enquiry...' : 'Submit Table Enquiry'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
