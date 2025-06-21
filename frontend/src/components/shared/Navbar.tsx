"use client";

import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiHome } from "react-icons/hi";
import { FaServicestack } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { name: "Home", href: "", icon: <HiHome size={20} /> },
  { name: "About", href: "/about", icon: <BsInfoCircleFill size={20} /> },
  { name: "Services", href: "/services", icon: <FaServicestack size={20} /> },
  { name: "Contact", href: "/contact", icon: <MdContactMail size={20} /> },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      },
    },
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        delay: 0.1,
      },
    },
  };

  const containerVariants = {
    closed: {},
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <nav className="bg-white  border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              {/* <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div> */}
              <span className="ml-2 text-xl font-bold text-gray-800">
                Food Rescue
              </span>
            </motion.div>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.href}
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <motion.span
                  className="block h-0.5 w-6 bg-current mb-1"
                  animate={{
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 6 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                  className="block h-0.5 w-6 bg-current mb-1"
                  animate={{
                    opacity: isOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.1, ease: "easeInOut" }}
                />
                <motion.span
                  className="block h-0.5 w-6 bg-current"
                  animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? -6 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden overflow-hidden"
            >
              <motion.div
                variants={containerVariants}
                className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 rounded-lg mt-2 mb-4"
              >
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-white px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
export default Navbar;
