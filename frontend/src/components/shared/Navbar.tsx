"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiHome,
  HiUser,
  HiLogout,
  HiChevronDown,
  HiChartBar,
} from "react-icons/hi";
import { MdFastfood, MdContactMail } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useUserLogoutMutation } from "../../redux/slices/userApiSlice";
import { logout, Roles } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const baseNavItems: NavItem[] = [
  { name: "Home", href: "", icon: <HiHome size={20} /> },
  { name: "About", href: "/aboutus", icon: <BsInfoCircleFill size={20} /> },
  {
    name: "Food Listing",
    href: "/food-listing",
    icon: <MdFastfood size={20} />,
  },
  { name: "Contact", href: "/contactus", icon: <MdContactMail size={20} /> },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [userLogout] = useUserLogoutMutation();

  // Generate navigation items based on user role
  const navItems: NavItem[] = [
    ...baseNavItems,
    ...(userInfo?.role === Roles.ADMIN
      ? [
          {
            name: "Dashboard",
            href: "/admin/dashboard",
            icon: <HiChartBar size={20} />,
          },
        ]
      : []),
  ];

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = async () => {
    try {
      await userLogout().unwrap();
      dispatch(logout());
      setIsProfileOpen(false);
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if API call fails, clear local state
      dispatch(logout());
      setIsProfileOpen(false);
      toast.success("Logged out successfully!");
      navigate("/");
    }
  };

  const drawerVariants = {
    closed: {
      x: "100%",
      transition: {
        duration: 0.4,
        ease: "easeInOut" as const,
      },
    },
    open: {
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut" as const,
      },
    },
  };

  const backdropVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
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

  const profileDropdownVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.2,
        ease: "easeInOut" as const,
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <nav className="bg-white  border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            {/* <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            > */}
            <div className="flex items-center">
              {/* <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
                </div> */}
              <Link to="" className="ml-2 text-xl font-bold text-gray-800">
                Food Rescue
              </Link>
            </div>
            {/* </motion.div> */}
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <div className="flex items-baseline space-x-4">
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

              {userInfo ? (
                <div ref={profileRef} className="relative ml-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleProfile}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 "
                  >
                    <HiUser className="w-5 h-5" />
                    <span className="hidden lg:block">Profile</span>
                    <motion.div
                      animate={{ rotate: isProfileOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiChevronDown className="w-4 h-4" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={profileDropdownVariants}
                        className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50"
                      >
                        <div className="py-2">
                          <motion.button
                            whileHover={{ backgroundColor: "#f3f4f6" }}
                            onClick={handleLogout}
                            className="flex items-center space-x-3 w-full px-4 py-3 text-left text-gray-700 hover:text-red-600 transition-colors duration-200"
                          >
                            <HiLogout className="w-5 h-5" />
                            <span>Logout</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-3 ml-6">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-0 focus:ring-inset  transition-colors duration-200"
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
            <>
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={backdropVariants}
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={drawerVariants}
                className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 md:hidden"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800">Menu</h2>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="w-6 h-6 flex flex-col justify-center items-center">
                        <motion.span
                          className="block h-0.5 w-6 bg-gray-600"
                          animate={{ rotate: 45, y: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                        <motion.span
                          className="block h-0.5 w-6 bg-gray-600"
                          animate={{ rotate: -45, y: -2 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                      </div>
                    </motion.button>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    initial="closed"
                    animate="open"
                    className="flex-1 px-6 py-4 space-y-2"
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
                          className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 w-full"
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </Link>
                      </motion.div>
                    ))}

                    {userInfo ? (
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="flex items-center space-x-3 px-4 py-3 mb-2">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <HiUser className="w-5 h-5 text-gray-700" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              {userInfo.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {userInfo.email}
                            </p>
                          </div>
                        </div>
                        <motion.button
                          variants={itemVariants}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleLogout}
                          className="flex items-center space-x-3 text-gray-700 hover:text-red-600 hover:bg-red-50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 w-full"
                        >
                          <HiLogout className="w-5 h-5" />
                          <span>Logout</span>
                        </motion.button>
                      </div>
                    ) : (
                      <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                        <motion.div
                          variants={itemVariants}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 w-full"
                          >
                            <HiUser className="w-5 h-5" />
                            <span>Login</span>
                          </Link>
                        </motion.div>
                        <motion.div
                          variants={itemVariants}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Link
                            to="/register"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center space-x-3 bg-blue-600 text-white hover:bg-blue-700 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 w-full"
                          >
                            <HiUser className="w-5 h-5" />
                            <span>Register</span>
                          </Link>
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
export default Navbar;
