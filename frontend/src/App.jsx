import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Signature from './components/Signature';
import Food from './components/Food';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-[#F5F0E8] min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Signature />
      <Food />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
