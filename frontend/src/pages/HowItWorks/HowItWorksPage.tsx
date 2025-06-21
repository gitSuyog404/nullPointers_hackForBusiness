import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiArrowRight, HiCheckCircle } from "react-icons/hi";
import { FaUtensils, FaHandsHelping, FaUsers } from "react-icons/fa";
import { MdRestaurant, MdVolunteerActivism, MdCommunity } from "react-icons/md";

const HowItWorksPage = () => {
  const steps = [
    {
      id: 1,
      icon: <MdRestaurant size={48} />,
      title: "Restaurants List Food",
      description:
        "Restaurants post their surplus food items at the end of the day instead of throwing them away.",
      details: [
        "Upload photos of available food",
        "Set pickup time and location",
        "Specify quantity and dietary info",
        "Get notifications when claimed",
      ],
      color: "from-green-500 to-emerald-600",
    },
    {
      id: 2,
      icon: <MdVolunteerActivism size={48} />,
      title: "Volunteers Collect",
      description:
        "Registered volunteers browse available food and claim items they can collect and distribute.",
      details: [
        "Browse nearby food listings",
        "Claim items you can collect",
        "Coordinate pickup with restaurants",
        "Ensure food safety standards",
      ],
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: 3,
      icon: <MdCommunity size={48} />,
      title: "Communities Benefit",
      description:
        "Volunteers distribute the rescued food to those in need, reducing waste and fighting hunger.",
      details: [
        "Distribute to local shelters",
        "Help families in need",
        "Support community centers",
        "Track impact and reach",
      ],
      color: "from-purple-500 to-violet-600",
    },
  ];

  const benefits = [
    {
      icon: <FaUtensils size={32} />,
      title: "Reduce Food Waste",
      description: "Prevent thousands of meals from ending up in landfills",
      stat: "50,000+ meals rescued",
    },
    {
      icon: <FaHandsHelping size={32} />,
      title: "Help Communities",
      description: "Provide fresh, quality food to those who need it most",
      stat: "25+ communities served",
    },
    {
      icon: <FaUsers size={32} />,
      title: "Build Networks",
      description: "Connect restaurants, volunteers, and communities",
      stat: "1,500+ active volunteers",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              How It Works
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              Our platform connects restaurants with surplus food to volunteers
              who distribute it to communities in need.
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg text-gray-700"
            >
              <HiCheckCircle className="text-green-500" size={20} />
              <span className="font-medium">
                Simple • Effective • Impactful
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
