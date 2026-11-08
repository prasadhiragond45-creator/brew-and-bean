/**
 * CAFE CONFIGURATION & PLACEHOLDER DETAILS
 *
 * NOTE FOR PRODUCTION:
 * All details below are fictional placeholder values for demonstration purposes.
 * Replace with your real business information before going live.
 */

export const CAFE_CONFIG = {
  // Brand Name
  brandName: 'Brew & Bean Café',
  tagline: 'Artisan Coffee House',

  // Contact Placeholders [REPLACE BEFORE LAUNCH]
  phone: '+91 98765 43210',
  phoneDisplay: '+91 98765 43210 (Demo Placeholder)',
  email: 'hello@brewandbean.in',
  emailDisplay: 'hello@brewandbean.in (Demo Placeholder)',

  // WhatsApp Reservation
  whatsappNumber: '919876543210',
  whatsappMessage: 'Hello Brew & Bean, I would like to inquire about a table reservation.',
  get whatsappLink() {
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(this.whatsappMessage)}`;
  },

  // Location Placeholders [REPLACE BEFORE LAUNCH]
  address: '12 Artisan Lane, Koramangala, Bengaluru, Karnataka 560034',
  addressNote: '(Demo placeholder location)',
  mapsUrl: 'https://maps.google.com/?q=Koramangala+Bengaluru',

  // Operating Hours
  hours: [
    { day: 'Monday – Friday', time: '7:00 AM – 10:00 PM' },
    { day: 'Saturday', time: '8:00 AM – 11:00 PM' },
    { day: 'Sunday', time: '9:00 AM – 9:00 PM' },
    { day: 'Public Holidays', time: '10:00 AM – 8:00 PM' },
  ],

  // Social Media Links (Placeholders)
  socials: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
  },

  // Fictional Showcase Stats (Placeholders)
  stats: [
    { value: '15+', label: 'Origins' },
    { value: '50K+', label: 'Happy Guests' },
    { value: '8', label: 'Years Crafting' },
  ],

  // Demo content watermark text
  demoDisclaimer: 'Demo content — fictional showcase for presentation purposes only.',
};

