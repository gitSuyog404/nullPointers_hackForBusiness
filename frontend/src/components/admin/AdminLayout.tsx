import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiChartBar,
  HiUsers,
  HiShoppingBag,
  HiCog,
  HiLogout,
  HiMenu,
  HiX,
  HiHome,
  HiClipboardList,
  HiTruck,
} from "react-icons/hi";
import { MdRestaurant, MdFastfood, MdVolunteerActivism } from "react-icons/md";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useUserLogoutMutation } from "../../redux/slices/userApiSlice";
import { logout } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [userLogout] = useUserLogoutMutation();

  const sidebarItems: SidebarItem[] = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: <HiChartBar className="w-5 h-5" />,
    },
    {
      name: "Restaurants",
      href: "/admin/restaurants",
      icon: <MdRestaurant className="w-5 h-5" />,
      badge: "156",
    },
    {
      name: "Food Items",
      href: "/admin/food-items",
      icon: <MdFastfood className="w-5 h-5" />,
      badge: "2.8k",
    },
    {
      name: "Volunteers",
      href: "/admin/volunteers",
      icon: <MdVolunteerActivism className="w-5 h-5" />,
      badge: "892",
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: <HiClipboardList className="w-5 h-5" />,
      badge: "1.9k",
    },
    {
      name: "Pickups",
      href: "/admin/pickups",
      icon: <HiTruck className="w-5 h-5" />,
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: <HiUsers className="w-5 h-5" />,
      badge: "3.2k",
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: <HiCog className="w-5 h-5" />,
    },
  ];

  const handleLogout = async () => {
    try {
      await userLogout().unwrap();
      dispatch(logout());
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      dispatch(logout());
      toast.success("Logged out successfully!");
      navigate("/");
    }
  };

  const sidebarVariants = {
    open: {
      width: "280px",
    },
    closed: {
      width: "80px",
    },
  };

  const contentVariants = {
    open: {
      marginLeft: "280px",
    },
    closed: {
      marginLeft: "80px",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Sidebar */}
      <motion.div
        variants={sidebarVariants}
        animate={isSidebarOpen ? "open" : "closed"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-lg z-50 overflow-hidden"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">FR</span>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-gray-800">
                        Food Rescue
                      </h1>
                      <p className="text-sm text-gray-500">Admin Panel</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {isSidebarOpen ? (
                  <HiX className="w-5 h-5 text-gray-600" />
                ) : (
                  <HiMenu className="w-5 h-5 text-gray-600" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 py-6 overflow-y-auto">
            <nav className="space-y-2 px-4">
              {sidebarItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(item.href)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      location.pathname === item.href
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    <AnimatePresence>
                      {isSidebarOpen && (
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center justify-between flex-1 min-w-0"
                        >
                          <span className="font-medium truncate">
                            {item.name}
                          </span>
                          {item.badge && (
                            <span
                              className={`px-2 py-1 text-xs rounded-full font-medium ${
                                location.pathname === item.href
                                  ? "bg-white/20 text-white"
                                  : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* User Profile & Logout */}
          <div className="p-4 border-t border-gray-200">
            <div className="space-y-3">
              {/* Back to Main Site */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
              >
                <HiHome className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="font-medium truncate"
                    >
                      Back to Site
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* User Info */}
              <AnimatePresence>
                {isSidebarOpen && userInfo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {userInfo.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">
                        {userInfo.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {userInfo.role}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Logout */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
              >
                <HiLogout className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="font-medium truncate"
                    >
                      Logout
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={contentVariants}
        animate={isSidebarOpen ? "open" : "closed"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="min-h-screen"
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export default AdminLayout;
