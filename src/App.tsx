import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Training from './components/Training';
import Footer from './components/Footer';
import Clients from './components/Clients';
import Statistics from './components/Statistics';
import Testimonials from './components/Testimonials';
import AboutSection from './components/AboutSection';
import ContactForm from './components/ContactForm';
import Features from './components/Features';
import StatsSection from './components/StatsSection';
import BackToTop from './components/BackToTop';
import LoadingScreen from './components/LoadingScreen';
import FAQ from './components/FAQ';
import SectionDivider from './components/SectionDivider';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Intersection Observer for reveal animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all reveal elements
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    revealElements.forEach(el => observer.observe(el));

    // Parallax scroll effect
    const handleScroll = () => {
      setScrollY(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="app">
      <LoadingScreen />

      {/* Dynamic Background Elements with Parallax */}
      <div style={{
        position: 'fixed',
        top: '10%',
        left: '-5%',
        width: '40vw',
        height: '40vw',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
        zIndex: -1,
        pointerEvents: 'none',
        transform: `translateY(${scrollY * 0.3}px)`
      }} className="animate-float"></div>
      <div style={{
        position: 'fixed',
        bottom: '10%',
        right: '-5%',
        width: '35vw',
        height: '35vw',
        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, transparent 70%)',
        zIndex: -1,
        pointerEvents: 'none',
        animationDelay: '-3s',
        transform: `translateY(${scrollY * -0.2}px)`
      }} className="animate-float"></div>

      <Navbar />

      <main>
        <Hero />
        <Clients />

        <SectionDivider variant="wave" color="var(--bg-color)" />

        <Features />
        <StatsSection />

        <SectionDivider variant="curve" flip color="var(--bg-elevated)" />

        <AboutSection />

        <Statistics />
        <Services />
        <Training />
        <Testimonials />

        <SectionDivider variant="wave" color="var(--bg-color)" />

        {/* FAQ Section */}
        <FAQ />

        {/* Contact Section */}
        <section id="contact" style={{ padding: '10rem 2rem', background: 'var(--bg-color)' }}>
          <div className="container">
            <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '5rem', alignItems: 'start' }}>

              {/* Contact Info Panel */}
              <div style={{ padding: '2rem 0' }}>
                <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem', lineHeight: 1.1 }}>
                  Let's <span className="text-gradient">Get In Touch</span>
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '3rem', maxWidth: '500px' }}>
                  Have a question about our cloud portal or marketplace? Want to start your training journey? We're here to help you accelerate your digital transformation.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div className="glass" style={{ width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📍</div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Our Office</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>123 Tech Avenue, Innovation City, 560001</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div className="glass" style={{ width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📧</div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Email Us</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>contact@hexalabs.com</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div className="glass" style={{ width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>📞</div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>Call Us</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>+1 (555) 000-TECH</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form Panel */}
              <div className="glass" style={{ padding: '4rem 3rem', borderRadius: '40px', background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(99, 102, 241, 0.05) 100%)' }}>
                <ContactForm />
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
