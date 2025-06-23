"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export interface CarouselSlide {
  id: string | number;
  title: string;
  description: string;
  image?: string;
  bgColor?: string;
  cta?: string;
  ctaLink?: string;
  content?: React.ReactNode;
}

interface CarouselProps {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showControls?: boolean;
  hideControlsOnMobile?: boolean;
  className?: string;
  slideClassName?: string;
  height?: string;
  onSlideChange?: (index: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  showIndicators = true,
  showControls = true,
  hideControlsOnMobile = false,
  className = "",
  slideClassName = "",
  height = "h-96 md:h-[500px]",
  onSlideChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, autoPlay, autoPlayInterval]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    onSlideChange?.(currentIndex);
  }, [currentIndex, onSlideChange]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl shadow-sm ${className}`}
    >
      <div className={`relative ${height}`}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                nextSlide();
              } else if (swipe > swipeConfidenceThreshold) {
                prevSlide();
              }
            }}
            className={`absolute inset-0 flex items-center justify-center ${slideClassName}`}
            style={{
              background:
                slides[currentIndex].bgColor ||
                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundImage: slides[currentIndex].image
                ? `url(${slides[currentIndex].image})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {slides[currentIndex].image && (
              <div className="absolute inset-0 bg-black/40" />
            )}

            <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-xs sm:max-w-2xl md:max-w-4xl text-white mx-auto">
              {slides[currentIndex].content ? (
                slides[currentIndex].content
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                    {slides[currentIndex].title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90 leading-relaxed">
                    {slides[currentIndex].description}
                  </p>
                  {slides[currentIndex].cta && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-gray-800 font-semibold px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-shadow text-sm sm:text-base"
                      onClick={() => {
                        if (slides[currentIndex].ctaLink) {
                          window.location.href = slides[currentIndex].ctaLink!;
                        }
                      }}
                    >
                      {slides[currentIndex].cta}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {showControls && slides.length > 1 && (
        <>
          <motion.button
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md hover:bg-white/50 text-white p-2 sm:p-3 rounded-full shadow-lg border border-white/20 transition-all duration-200 z-20 group ${
              hideControlsOnMobile ? "hidden sm:block" : ""
            }`}
            aria-label="Previous slide"
          >
            <HiChevronLeft
              size={24}
              className="sm:w-7 sm:h-7 group-hover:text-gray-800 transition-colors duration-200"
            />
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md hover:bg-white/50 text-white p-2 sm:p-3 rounded-full shadow-lg border border-white/20 transition-all duration-200 z-20 group ${
              hideControlsOnMobile ? "hidden sm:block" : ""
            }`}
            aria-label="Next slide"
          >
            <HiChevronRight
              size={24}
              className="sm:w-7 sm:h-7 group-hover:text-gray-800 transition-colors duration-200"
            />
          </motion.button>
        </>
      )}

      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {autoPlay && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <motion.div
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: autoPlayInterval / 1000,
              ease: "linear",
              repeat: Infinity,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Carousel;
