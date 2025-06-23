import React from "react";
import { motion } from "framer-motion";
import {
  HiPlus,
  HiSearch,
  HiFilter,
  HiEye,
  HiPencil,
  HiTrash,
  HiClipboardList,
  HiClock,
} from "react-icons/hi";
import { MdRestaurant, MdLocationOn, MdPerson } from "react-icons/md";

const OrdersPage: React.FC = () => {
  // Dummy data for orders
  const orders = [
    {
      id: 1,
      orderNumber: "ORD-001",
      customerName: "John Smith",
      restaurantName: "Bella Italia",
      foodItem: "Margherita Pizza",
      quantity: 2,
      totalAmount: 25.98,
      orderDate: "2024-03-20",
      orderTime: "14:30",
      status: "Pending",
      pickupTime: "16:00",
      location: "Downtown",
    },
    {
      id: 2,
      orderNumber: "ORD-002",
      customerName: "Sarah Johnson",
      restaurantName: "Spice Garden",
      foodItem: "Chicken Biryani",
      quantity: 1,
      totalAmount: 15.75,
      orderDate: "2024-03-20",
      orderTime: "15:15",
      status: "Confirmed",
      pickupTime: "17:30",
      location: "Midtown",
    },
    {
      id: 3,
      orderNumber: "ORD-003",
      customerName: "Mike Wilson",
      restaurantName: "Ocean Breeze Cafe",
      foodItem: "Caesar Salad",
      quantity: 3,
      totalAmount: 29.97,
      orderDate: "2024-03-20",
      orderTime: "12:45",
      status: "Completed",
      pickupTime: "14:00",
      location: "Coastal",
    },
    {
      id: 4,
      orderNumber: "ORD-004",
      customerName: "Emily Rodriguez",
      restaurantName: "Mountain View Bistro",
      foodItem: "Beef Burger",
      quantity: 4,
      totalAmount: 47.96,
      orderDate: "2024-03-20",
      orderTime: "16:20",
      status: "Preparing",
      pickupTime: "18:00",
      location: "Uptown",
    },
    {
      id: 5,
      orderNumber: "ORD-005",
      customerName: "David Chen",
      restaurantName: "Urban Kitchen",
      foodItem: "Pasta Carbonara",
      quantity: 2,
      totalAmount: 27.98,
      orderDate: "2024-03-20",
      orderTime: "13:10",
      status: "Ready",
      pickupTime: "15:30",
      location: "Metro",
    },
    {
      id: 6,
      orderNumber: "ORD-006",
      customerName: "Lisa Wang",
      restaurantName: "Green Leaf Deli",
      foodItem: "Veggie Wrap",
      quantity: 1,
      totalAmount: 8.99,
      orderDate: "2024-03-19",
      orderTime: "11:30",
      status: "Cancelled",
      pickupTime: "13:00",
      location: "Central",
    },
    {
      id: 7,
      orderNumber: "ORD-007",
      customerName: "James Thompson",
      restaurantName: "Sunset Grill",
      foodItem: "Grilled Salmon",
      quantity: 1,
      totalAmount: 19.99,
      orderDate: "2024-03-20",
      orderTime: "17:45",
      status: "Confirmed",
      pickupTime: "19:00",
      location: "West",
    },
    {
      id: 8,
      orderNumber: "ORD-008",
      customerName: "Maria Garcia",
      restaurantName: "Royal Palace",
      foodItem: "Chicken Tikka",
      quantity: 3,
      totalAmount: 52.47,
      orderDate: "2024-03-20",
      orderTime: "14:55",
      status: "Preparing",
      pickupTime: "16:30",
      location: "Historic",
    },
    {
      id: 9,
      orderNumber: "ORD-009",
      customerName: "Robert Kim",
      restaurantName: "Fresh & Fast",
      foodItem: "Fresh Fruit Bowl",
      quantity: 2,
      totalAmount: 13.98,
      orderDate: "2024-03-19",
      orderTime: "10:15",
      status: "Expired",
      pickupTime: "12:00",
      location: "Express",
    },
    {
      id: 10,
      orderNumber: "ORD-010",
      customerName: "Jennifer Lee",
      restaurantName: "Cozy Corner Cafe",
      foodItem: "Coffee & Pastry",
      quantity: 5,
      totalAmount: 29.95,
      orderDate: "2024-03-20",
      orderTime: "09:30",
      status: "Completed",
      pickupTime: "11:00",
      location: "Neighborhood",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Confirmed":
        return "bg-blue-100 text-blue-800";
      case "Preparing":
        return "bg-purple-100 text-purple-800";
      case "Ready":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-emerald-100 text-emerald-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Expired":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <HiClipboardList className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
                <p className="text-gray-600">Manage food orders and requests</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <HiPlus className="w-5 h-5" />
              Add Order
            </motion.button>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <HiFilter className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Filter</span>
            </button>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div variants={itemVariants}>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Restaurant
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Food Item
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pickup Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order, index) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <HiClipboardList className="w-5 h-5 text-white" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {order.orderNumber}
                            </div>
                            <div className="text-sm text-gray-500">
                              {order.orderDate} {order.orderTime}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <MdPerson className="w-4 h-4 text-gray-400" />
                          {order.customerName}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <MdLocationOn className="w-4 h-4 text-gray-400" />
                          {order.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <MdRestaurant className="w-4 h-4 text-gray-400" />
                          {order.restaurantName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.foodItem}
                        </div>
                        <div className="text-sm text-gray-500">
                          Qty: {order.quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${order.totalAmount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <HiClock className="w-4 h-4 text-gray-400" />
                          {order.pickupTime}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          >
                            <HiEye className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-green-600 hover:text-green-900 p-1 rounded"
                          >
                            <HiPencil className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                          >
                            <HiTrash className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OrdersPage;
