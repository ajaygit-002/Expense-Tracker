import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '../context/ThemeContext';

export const LandingPage = ({ onStart }) => {
  const { isDark, toggleTheme } = useTheme();
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const featuresRef = useRef([]);
  const buttonRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    // Timeline for sequential animations
    const tl = gsap.timeline();

    // Animate title with split text effect
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      0
    )
      // Animate subtitle
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        0.2
      )
      // Animate description
      .fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        0.4
      )
      // Animate feature cards
      .fromTo(
        featuresRef.current,
        { opacity: 0, y: 40, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out'
        },
        0.6
      )
      // Animate stats
      .fromTo(
        statsRef.current,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out'
        },
        1.2
      )
      // Animate button
      .fromTo(
        buttonRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        1.6
      );

    // Add floating animation to container
    gsap.to(containerRef.current, {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Add hover animations
    featuresRef.current.forEach((element) => {
      if (element) {
        element.addEventListener('mouseenter', () => {
          gsap.to(element, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        element.addEventListener('mouseleave', () => {
          gsap.to(element, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      }
    });

    // Button hover animation
    if (buttonRef.current) {
      buttonRef.current.addEventListener('mouseenter', () => {
        gsap.to(buttonRef.current, {
          scale: 1.08,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      buttonRef.current.addEventListener('mouseleave', () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    }
  }, []);

  const features = [
    {
      icon: '📊',
      title: 'Dashboard',
      description: 'Track income, expenses, and balance at a glance'
    },
    {
      icon: '📝',
      title: 'Transactions',
      description: 'Manage all your transactions with ease'
    },
    {
      icon: '📈',
      title: 'Analytics',
      description: 'Visualize your spending patterns'
    },
    {
      icon: '🌓',
      title: 'Dark Mode',
      description: 'Work comfortably day or night'
    }
  ];

  const stats = [
    { number: '100%', label: 'Responsive' },
    { number: '60fps', label: 'Animations' },
    { number: '0', label: 'Cloud Needed' },
    { number: '∞', label: 'Transactions' }
  ];

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDark
          ? 'bg-linear-to-br from-slate-900 via-purple-900 to-slate-900'
          : 'bg-linear-to-br from-blue-50 via-purple-50 to-indigo-100'
      }`}
    >
      {/* Header with Theme Toggle */}
      <header
        className={`flex justify-between items-center px-6 md:px-12 py-6 transition-all duration-300 ${
          isDark ? 'bg-slate-900/50' : 'bg-white/30'
        }`}
      >
        <h1
          className={`text-3xl md:text-4xl font-bold ${
            isDark ? 'text-white' : 'text-gray-800'
          }`}
        >
          💰 Expense Tracker
        </h1>
        <button
          onClick={toggleTheme}
          className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
            isDark
              ? 'bg-yellow-400 text-slate-900 shadow-lg shadow-yellow-400/50'
              : 'bg-slate-800 text-yellow-300 shadow-lg shadow-slate-800/50'
          }`}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </header>

      {/* Main Content */}
      <main
        ref={containerRef}
        className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20"
      >
        {/* Hero Section */}
        <section className="text-center mb-16 md:mb-20">
          <h2
            ref={titleRef}
            className={`text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r ${
              isDark
                ? 'from-purple-400 to-indigo-400'
                : 'from-blue-600 to-purple-600'
            }`}
          >
            Smart Money Management
          </h2>
          <p
            ref={subtitleRef}
            className={`text-xl md:text-2xl mb-6 font-semibold ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            Take control of your finances with ease
          </p>
          <p
            ref={descRef}
            className={`text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            An elegant, fully responsive expense tracker with dark mode support,
            smooth animations, and comprehensive analytics. All data is stored
            locally on your device - no cloud needed.
          </p>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 md:mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) featuresRef.current[index] = el;
              }}
              className={`p-6 md:p-8 rounded-2xl transition-all duration-300 border cursor-pointer ${
                isDark
                  ? 'bg-slate-800/50 border-purple-500/30 hover:bg-slate-800'
                  : 'bg-white/40 border-blue-200/50 hover:bg-white/60'
              }`}
            >
              <div className="text-4xl md:text-5xl mb-4">{feature.icon}</div>
              <h3
                className={`text-xl md:text-2xl font-bold mb-3 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}
              >
                {feature.title}
              </h3>
              <p
                className={`text-base md:text-lg ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </section>

        {/* Stats Section */}
        <section className="mb-16 md:mb-20">
          <h3
            className={`text-2xl md:text-3xl font-bold text-center mb-12 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}
          >
            Why Choose Expense Tracker?
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) statsRef.current[index] = el;
                }}
                className={`p-6 md:p-8 rounded-xl text-center border ${
                  isDark
                    ? 'bg-linear-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/30'
                    : 'bg-linear-to-br from-blue-100/40 to-purple-100/40 border-blue-300/40'
                }`}
              >
                <div
                  className={`text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-linear-to-r ${
                    isDark
                      ? 'from-purple-400 to-indigo-400'
                      : 'from-blue-600 to-purple-600'
                  }`}
                >
                  {stat.number}
                </div>
                <p
                  className={`text-sm md:text-base font-semibold ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features List */}
        <section className="mb-16 md:mb-20">
          <h3
            className={`text-2xl md:text-3xl font-bold text-center mb-12 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}
          >
            Packed with Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              '✨ Smooth GSAP Animations',
              '🎨 Light & Dark Themes',
              '📱 Fully Responsive Design',
              '💾 Local Data Storage',
              '🔍 Advanced Search & Filter',
              '📊 Beautiful Analytics',
              '⚡ Lightning Fast',
              '🔒 Private & Secure'
            ].map((feature, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ${
                  isDark
                    ? 'hover:bg-slate-800/50'
                    : 'hover:bg-white/40'
                }`}
              >
                <span className="text-2xl">{feature.split(' ')[0]}</span>
                <span
                  className={`text-lg font-semibold ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {feature.substring(2)}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h3
            className={`text-2xl md:text-3xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}
          >
            Ready to take control of your finances?
          </h3>
          <button
            ref={buttonRef}
            onClick={onStart}
            className={`relative inline-block px-8 md:px-12 py-4 md:py-5 rounded-xl font-bold text-lg md:text-xl transition-all duration-300 overflow-hidden group ${
              isDark
                ? 'bg-linear-to-r from-purple-600 to-indigo-600 text-white hover:shadow-2xl hover:shadow-purple-600/50'
                : 'bg-linear-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-blue-600/50'
            }`}
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started 🚀
            </span>
            <div
              className={`absolute inset-0 ${
                isDark
                  ? 'bg-linear-to-r from-indigo-600 to-purple-600'
                  : 'bg-linear-to-r from-purple-600 to-blue-600'
              } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />
          </button>

          {/* Decorative Elements */}
          <div className="mt-12 md:mt-16 flex justify-center gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  isDark
                    ? 'bg-linear-to-r from-purple-400 to-indigo-400'
                    : 'bg-linear-to-r from-blue-400 to-purple-400'
                }`}
                style={{
                  animation: `pulse 2s ease-in-out ${i * 0.2}s infinite`
                }}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className={`mt-16 md:mt-24 border-t transition-all duration-300 ${
          isDark
            ? 'border-slate-700 bg-slate-900/50'
            : 'border-gray-200 bg-white/20'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 text-center">
          <p
            className={`text-sm md:text-base ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            © 2026 Expense Tracker. Built with ❤️ for your financial wellness.
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};
