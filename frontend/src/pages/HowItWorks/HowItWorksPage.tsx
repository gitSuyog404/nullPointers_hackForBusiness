import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiCheckCircle } from "react-icons/hi";
import { FaUtensils, FaHandsHelping, FaUsers } from "react-icons/fa";
import { MdRestaurant, MdVolunteerActivism, MdGroups } from "react-icons/md";

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
      icon: <MdGroups size={48} />,
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
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
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

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-10 sm:space-y-12 md:space-y-12 lg:space-y-16"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-4 sm:gap-6 lg:gap-16`}
              >
                <div className="flex-1 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-4 mb-3 sm:mb-4 lg:mb-6">
                    <div
                      className={`p-4 rounded-2xl bg-gradient-to-r ${step.color} text-white shadow-lg`}
                    >
                      {step.icon}
                    </div>
                    <div className="text-left">
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                        Step {step.id}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-lg text-gray-600 mb-3 sm:mb-4 lg:mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  <ul className="space-y-3">
                    {step.details.map((detail, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        className="flex items-center gap-3 text-gray-700"
                      >
                        <HiCheckCircle
                          className="text-green-500 flex-shrink-0"
                          size={20}
                        />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="hidden md:flex flex-1 max-w-md lg:max-w-lg">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className={`relative h-48 sm:h-56 md:h-64 lg:h-80 rounded-2xl bg-gradient-to-br ${step.color} shadow-2xl overflow-hidden w-full`}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="mb-4 opacity-80">
                          {React.cloneElement(step.icon, { size: 80 })}
                        </div>
                        <h4 className="text-xl font-bold">{step.title}</h4>
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Why It Matters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Together, we're creating a sustainable solution that benefits
              everyone
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {benefit.description}
                </p>
                <div className="text-2xl font-bold text-gray-800">
                  {benefit.stat}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join our community of restaurants, volunteers, and organizations
              working together to reduce food waste and help those in need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/restaurant/register"
                  className="bg-white text-gray-800 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 inline-block"
                >
                  List Your Food
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/volunteer/register"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 inline-block"
                >
                  Become a Volunteer
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
