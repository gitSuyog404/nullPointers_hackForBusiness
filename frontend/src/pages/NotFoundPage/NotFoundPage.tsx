import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HiHome, HiLocationMarker } from "react-icons/hi";
import { MdFastfood, MdVolunteerActivism, MdRestaurant } from "react-icons/md";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0,
            }}
            className="absolute top-20 left-10 text-orange-300 opacity-20"
          >
            <MdFastfood className="w-16 h-16" />
          </motion.div>
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-32 right-20 text-green-300 opacity-20"
          >
            <MdRestaurant className="w-12 h-12" />
          </motion.div>
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-32 left-20 text-purple-300 opacity-20"
          >
            <MdVolunteerActivism className="w-14 h-14" />
          </motion.div>
          <motion.div
            animate={{
              y: [-10, 10, -10],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute bottom-20 right-10 text-blue-300 opacity-20"
          >
            <HiLocationMarker className="w-10 h-10" />
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="relative z-10">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mb-8"
          >
            <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent leading-none">
              404
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Looks like this page went on a food rescue mission and got lost!
              Don't worry, there's still plenty of good food to rescue on our
              platform.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl border border-gray-200 p-8 mb-8 shadow-lg"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                <MdFastfood className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                Keep Rescuing Food!
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              While you're here, remember that every day restaurants have
              surplus food that could feed families in need. Join our mission to
              reduce food waste and help your community.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MdRestaurant className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold text-orange-800">
                    Restaurants
                  </span>
                </div>
                <p className="text-2xl font-bold text-orange-600">156+</p>
                <p className="text-sm text-orange-700">Active Partners</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MdFastfood className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">
                    Food Items
                  </span>
                </div>
                <p className="text-2xl font-bold text-green-600">2.8k+</p>
                <p className="text-sm text-green-700">Rescued</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MdVolunteerActivism className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-800">
                    Volunteers
                  </span>
                </div>
                <p className="text-2xl font-bold text-purple-600">892+</p>
                <p className="text-sm text-purple-700">Heroes</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 1.05 }}
              onClick={() => navigate("/")}
              className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200 ease-in-out"
            >
              <HiHome className="w-5 h-5" />
              Back to Home
            </motion.button>

            {/* <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/food-listing")}
              className="flex items-center gap-3 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <HiSearch className="w-5 h-5" />
              Browse Food Listings
            </motion.button> */}

            {/* <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="flex items-center gap-3 text-gray-600 hover:text-gray-800 px-4 py-2 rounded-xl font-medium transition-colors duration-200"
            >
              <HiArrowLeft className="w-5 h-5" />
              Go Back
            </motion.button> */}
          </motion.div>

          <motion.div variants={itemVariants} className="my-8">
            <p className="text-gray-500 text-sm">
              Need help? Contact us or explore our{" "}
              <button
                onClick={() => navigate("/how-it-works")}
                className="text-blue-600 hover:text-blue-700 font-medium underline"
              >
                How It Works
              </button>{" "}
              page to learn more about food rescue.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
