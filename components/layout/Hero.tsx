'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from '@/components/icons';

const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80',
    title: 'Grow Your Faith'
  },
  {
    url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1920&q=80',
    title: 'Discover Truth'
  },
  {
    url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&q=80',
    title: 'Deepen Your Walk'
  },
  {
    url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1920&q=80',
    title: 'Find Inspiration'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Image Carousel */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6">
        <div className="text-center text-white max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 animate-fade-in-up stagger-1 drop-shadow-lg">
            Grow Your Faith
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl mb-3 md:mb-4 font-light animate-fade-in-up stagger-2 drop-shadow-md">
            Christian Book Store Kenya
          </p>

          <p className="text-base md:text-lg text-white/90 mb-6 md:mb-10 max-w-2xl mx-auto leading-relaxed px-4 animate-fade-in-up stagger-3 drop-shadow-md">
            Discover handpicked Christian literature and Bibles to inspire your spiritual journey.
            Quality books delivered across Kenya with love and care.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4 animate-fade-in-up stagger-4">
            <Link href="/products" className="bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3 md:py-3 px-6 md:px-6 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg text-base md:text-base shadow-xl">
              Explore Collection
            </Link>
            <a
              href="https://wa.me/254718808903"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/40 text-white font-semibold py-3 md:py-3 px-6 md:px-6 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg text-base md:text-base"
            >
              Message on WhatsApp
            </a>
          </div>

          <div className="mt-10 md:mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto px-4">
            <div className="text-center animate-fade-in stagger-2">
              <div className="text-2xl md:text-4xl font-bold text-rose-300 drop-shadow-lg">500+</div>
              <div className="text-xs md:text-sm text-white/80 mt-1">Books Available</div>
            </div>
            <div className="text-center animate-fade-in stagger-3">
              <div className="text-2xl md:text-4xl font-bold text-rose-300 drop-shadow-lg">Fast</div>
              <div className="text-xs md:text-sm text-white/80 mt-1">Delivery</div>
            </div>
            <div className="text-center animate-fade-in stagger-4">
              <div className="text-2xl md:text-4xl font-bold text-rose-300 drop-shadow-lg">24/7</div>
              <div className="text-xs md:text-sm text-white/80 mt-1">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 120" className="w-full h-12 md:h-20 fill-white">
          <path d="M0,64 C480,150 960,-50 1440,64 L1440,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
}
