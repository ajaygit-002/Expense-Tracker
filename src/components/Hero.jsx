import { useEffect, useRef } from 'react';
import { useExpense } from '../context/ExpenseContext';
import gsap from 'gsap';
import './Hero.css';

const Hero = () => {
  const { statistics } = useExpense();
  const heroRef = useRef(null);

  useEffect(() => {
    const elements = heroRef.current.querySelectorAll('.hero-animate');
    
    gsap.fromTo(
      elements,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      }
    );
  }, []);

  return (
    <section ref={heroRef} className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title hero-animate">
            Master Your <span className="gradient-text">Finances</span>
          </h1>
          <p className="hero-subtitle hero-animate">
            Track expenses, manage budgets, and achieve your financial goals with ease
          </p>
        </div>
        
        <div className="hero-image hero-animate">
          <img 
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80" 
            alt="Financial planning"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
