"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Carousel, { type CarouselSlide } from "../ui/Carousel";
import AnimatedCounter from "../ui/AnimatedCounter";

const bannerData: CarouselSlide[] = [
  {
    id: 1,
    title: "Restaurants: Turn Surplus into Impact",
    description:
      "List your unsold food items and help feed communities while reducing waste",
    image: "/fr3.jpg",
    bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    cta: "List Food Now",
    ctaLink: "/restaurant/register",
  },
  {
    id: 2,
    title: "Volunteers: Be a Food Hero",
    description:
      "Collect surplus food and distribute it to those who need it most",
    image: "/fr1.jpg",
    bgColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    cta: "Start Volunteering",
    ctaLink: "/volunteer/register",
  },
  {
    id: 3,
    title: "Communities: Access Fresh Food",
    description: "Find available food resources in your neighborhood",
    image: "/fr5.jpg",
    bgColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    cta: "Find Food",
    ctaLink: "/food/browse",
  },
  {
    id: 4,
    title: "Together Against Food Waste",
    description: "Join thousands making a difference - one meal at a time",
    image: "/fr6.jpg",
    bgColor: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    cta: "Learn More",
    ctaLink: "/about",
  },
];

const animatedCounterData = [
  {
    value: 50000,
    suffix: "+",
    duration: 2.5,
    delay: 0.2,
    label: "Meals Rescued",
    textClassName:
      "text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent font-bold",
    labelClassName: "text-gray-600 text-xs sm:text-sm",
    separator: ",",
  },
  {
    value: 5000,
    suffix: "+",
    duration: 2.5,
    delay: 0.2,
    label: "Partner Restaurants",
    textClassName:
      "text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent font-bold",
    labelClassName: "text-gray-600 text-xs sm:text-sm",
    separator: ",",
  },
  {
    value: 4500,
    suffix: "+",
    duration: 2.5,
    delay: 0.2,
    label: "Active Volunteers",
    textClassName:
      "text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent font-bold",
    labelClassName: "text-gray-600 text-xs sm:text-sm",
    separator: ",",
  },
  {
    value: 10000,
    suffix: "+",
    duration: 2.5,
    delay: 0.2,
    label: "Communities Served",
    textClassName:
      "text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent font-bold",
    labelClassName: "text-gray-600 text-xs sm:text-sm",
    separator: ",",
  },
];
const HeroSection: React.FC = () => {
  return (
    <section className="relative  bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 sm:space-y-12 lg:space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
              Fighting Food Waste,
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Feeding Communities
            </h1>

            <p className="text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 text-base sm:text-lg md:text-xl leading-relaxed px-4 sm:px-0">
              Connect restaurants with surplus food to volunteers who distribute
              it to those in need. Together, we can reduce waste and fight
              hunger in our communities.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4 sm:px-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold rounded-xl shadow-lg transition-all duration-200 inline-block w-full sm:w-auto text-center min-w-[160px] sm:min-w-[180px]"
                >
                  Get Started Today
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  to="/how-it-works"
                  className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-[0.7rem] text-base sm:text-lg font-semibold rounded-xl transition-all duration-200 inline-block w-full sm:w-auto text-center min-w-[160px] sm:min-w-[180px] box-border"
                  // className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 inline-block"
                >
                  How It Works
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="w-full  sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl px-4 sm:px-0"
          >
            <Carousel
              slides={bannerData}
              autoPlay={true}
              autoPlayInterval={5000}
              showIndicators={true}
              showControls={true}
              hideControlsOnMobile={true}
              height="h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px]"
              className="rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-lg sm:shadow-lg md:shadow-lg"
            />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-12 md:mt-16 w-full max-w-4xl px-4 sm:px-0">
            {animatedCounterData.map((item, index) => (
              <AnimatedCounter
                key={index}
                value={item.value}
                suffix={item.suffix}
                duration={item.duration}
                delay={item.delay}
                label={item.label}
                textClassName={item.textClassName}
                labelClassName={item.labelClassName}
                separator={item.separator}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
