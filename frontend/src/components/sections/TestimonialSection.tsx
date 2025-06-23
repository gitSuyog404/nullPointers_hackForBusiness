import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiStar } from "react-icons/hi";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  type: "restaurant" | "volunteer" | "community";
  content: string;
  rating: number;
  image?: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Maria Rodriguez",
    role: "Restaurant Owner",
    type: "restaurant",
    content:
      "Food Rescue has transformed how we handle surplus food. Instead of throwing away perfectly good meals, we're now feeding families in need. It's incredibly fulfilling to know our food is making a difference.",
    rating: 5,
    image: "/person1.jpeg",
    location: "Downtown Bistro, NYC",
  },
  {
    id: 2,
    name: "James Chen",
    role: "Volunteer Coordinator",
    type: "volunteer",
    content:
      "Being part of Food Rescue has been one of the most rewarding experiences. Every pickup feels meaningful, knowing that we're preventing waste while helping our community. The platform makes coordination so easy.",
    rating: 5,
    image: "/person4.jpeg",
    location: "Community Volunteer, San Francisco",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Community Center Director",
    type: "community",
    content:
      "The fresh meals we receive through Food Rescue have been a blessing for our community center. Families who visit us now have access to quality food that would have otherwise gone to waste.",
    rating: 5,
    image: "/person2.jpeg",
    location: "Hope Community Center, Chicago",
  },
  {
    id: 4,
    name: "Ahmed Hassan",
    role: "Chef & Owner",
    type: "restaurant",
    content:
      "As a chef, it breaks my heart to see good food wasted. Food Rescue gives us a purpose for our surplus - turning potential waste into hope for families. Our team feels proud to participate.",
    rating: 5,

    image: "/person5.jpeg",
    location: "Mediterranean Kitchen, Austin",
  },
  {
    id: 5,
    name: "Emily Davis",
    role: "Student Volunteer",
    type: "volunteer",
    content:
      "Food Rescue showed me how small actions can create big impact. Every weekend, I help collect and distribute food, and seeing the gratitude in people's faces makes it all worthwhile.",
    rating: 5,
    image: "/person3.jpeg",
    location: "University Student, Boston",
  },
  {
    id: 6,
    name: "Robert Thompson",
    role: "Shelter Manager",
    type: "community",
    content:
      "The consistent supply of fresh food through Food Rescue has allowed us to provide better meals for our residents. It's amazing how this platform connects generosity with genuine need.",
    rating: 5,
    image: "/person6.jpeg",
    location: "City Shelter, Seattle",
  },
];

const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

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

  return (
    <section className="pt-4 sm:pt-8 lg:pt-12  pb-20 sm:pb-24 lg:pb-28 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Stories of Impact
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed">
            Hear from restaurants, volunteers, and communities who are making a
            difference through Food Rescue. Every story represents meals saved
            and lives touched.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div
            className="relative overflow-hidden rounded-2xl"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="relative h-[400px] sm:h-[350px]">
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
                  className="absolute inset-0"
                >
                  <div className="bg-white rounded-2xl p-8 border border-gray-200 h-full flex flex-col shadow-sm">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                          className="w-16 h-16 rounded-2xl object-cover shadow-lg"
                        />
                        <div>
                          <h3 className="font-bold text-gray-800 text-xl">
                            {testimonials[currentIndex].name}
                          </h3>
                          <p className="text-gray-600 text-base">
                            {testimonials[currentIndex].role}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-1">
                        {[...Array(testimonials[currentIndex].rating)].map(
                          (_, i) => (
                            <HiStar
                              key={i}
                              className="w-6 h-6 text-yellow-400"
                            />
                          )
                        )}
                      </div>
                    </div>

                    <blockquote className="text-gray-700 leading-relaxed mb-6 flex-1 text-lg">
                      "{testimonials[currentIndex].content}"
                    </blockquote>

                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-base text-gray-500 font-medium">
                        {testimonials[currentIndex].location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-blue-600 scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Ready to Make Your Own Impact?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of restaurants and volunteers who are already making
            a difference in their communities through Food Rescue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/register"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 inline-block"
            >
              Join as Restaurant
            </motion.a>
            <motion.a
              href="/register"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 inline-block"
            >
              Volunteer Today
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
