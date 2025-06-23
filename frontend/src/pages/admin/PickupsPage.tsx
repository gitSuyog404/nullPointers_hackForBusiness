import React from "react";
import { motion } from "framer-motion";
import {
  HiPlus,
  HiSearch,
  HiFilter,
  HiEye,
  HiPencil,
  HiTrash,
  HiTruck,
  HiClock,
} from "react-icons/hi";
import { MdRestaurant, MdLocationOn, MdPerson, MdDirectionsCar } from "react-icons/md";

const PickupsPage: React.FC = () => {
  // Dummy data for pickups
  const pickups = [
    {
      id: 1,
      pickupNumber: "PU-001",
      orderNumber: "ORD-001",
      volunteerName: "Sarah Johnson",
      customerName: "John Smith",
      restaurantName: "Bella Italia",
      foodItem: "Margherita Pizza",
      pickupAddress: "123 Main St, Downtown",
      deliveryAddress: "456 Oak Ave, Downtown",
      scheduledTime: "16:00",
      actualTime: "16:15",
      status: "In Transit",
      distance: "2.3 km",
      estimatedDelivery: "16:30",
    },
    {
      id: 2,
      pickupNumber: "PU-002",
      orderNumber: "ORD-002",
      volunteerName: "Michael Chen",
      customerName: "Sarah Wilson",
      restaurantName: "Spice Garden",
      foodItem: "Chicken Biryani",
      pickupAddress: "789 Spice St, Midtown",
      deliveryAddress: "321 Home Ave, Midtown",
      scheduledTime: "17:30",
      actualTime: "17:25",
      status: "Delivered",
      distance: "1.8 km",
      estimatedDelivery: "17:45",
    },
    {
      id: 3,
      pickupNumber: "PU-003",
      orderNumber: "ORD-003",
      volunteerName: "Emily Rodriguez",
      customerName: "Mike Wilson",
      restaurantName: "Ocean Breeze Cafe",
      foodItem: "Caesar Salad",
      pickupAddress: "555 Beach Rd, Coastal",
      deliveryAddress: "777 Coast Ave, Coastal",
      scheduledTime: "14:00",
      actualTime: "14:05",
      status: "Delivered",
      distance: "3.1 km",
      estimatedDelivery: "14:20",
    },
    {
      id: 4,
      pickupNumber: "PU-004",
      orderNumber: "ORD-004",
      volunteerName: "David Thompson",
      customerName: "Emily Davis",
      restaurantName: "Mountain View Bistro",
      foodItem: "Beef Burger",
      pickupAddress: "321 Hill St, Uptown",
      deliveryAddress: "654 Valley Rd, Uptown",
      scheduledTime: "18:00",
      actualTime: null,
      status: "Assigned",
      distance: "4.2 km",
      estimatedDelivery: "18:25",
    },
    {
      id: 5,
      pickupNumber: "PU-005",
      orderNumber: "ORD-005",
      volunteerName: "Lisa Wang",
      customerName: "David Chen",
      restaurantName: "Urban Kitchen",
      foodItem: "Pasta Carbonara",
      pickupAddress: "654 City Blvd, Metro",
      deliveryAddress: "987 Urban St, Metro",
      scheduledTime: "15:30",
      actualTime: "15:35",
      status: "Picked Up",
      distance: "2.7 km",
      estimatedDelivery: "15:55",
    },
    {
      id: 6,
      pickupNumber: "PU-006",
      orderNumber: "ORD-006",
      volunteerName: "James Wilson",
      customerName: "Lisa Wang",
      restaurantName: "Green Leaf Deli",
      foodItem: "Veggie Wrap",
      pickupAddress: "987 Park Ave, Central",
      deliveryAddress: "147 Green St, Central",
      scheduledTime: "13:00",
      actualTime: null,
      status: "Cancelled",
      distance: "1.5 km",
      estimatedDelivery: "13:15",
    },
    {
      id: 7,
      pickupNumber: "PU-007",
      orderNumber: "ORD-007",
      volunteerName: "Maria Garcia",
      customerName: "James Thompson",
      restaurantName: "Sunset Grill",
      foodItem: "Grilled Salmon",
      pickupAddress: "147 Sunset Blvd, West",
      deliveryAddress: "258 Ocean View, West",
      scheduledTime: "19:00",
      actualTime: null,
      status: "Pending",
      distance: "3.8 km",
      estimatedDelivery: "19:20",
    },
    {
      id: 8,
      pickupNumber: "PU-008",
      orderNumber: "ORD-008",
      volunteerName: "Robert Kim",
      customerName: "Maria Garcia",
      restaurantName: "Royal Palace",
      foodItem: "Chicken Tikka",
      pickupAddress: "258 Royal St, Historic",
      deliveryAddress: "369 Heritage Ave, Historic",
      scheduledTime: "16:30",
      actualTime: "16:40",
      status: "In Transit",
      distance: "2.9 km",
      estimatedDelivery: "17:00",
    },
    {
      id: 9,
      pickupNumber: "PU-009",
      orderNumber: "ORD-009",
      volunteerName: "Jennifer Lee",
      customerName: "Robert Kim",
      restaurantName: "Fresh & Fast",
      foodItem: "Fresh Fruit Bowl",
      pickupAddress: "369 Quick Ave, Express",
      deliveryAddress: "741 Fast Lane, Express",
      scheduledTime: "12:00",
      actualTime: "12:10",
      status: "Failed",
      distance: "1.2 km",
      estimatedDelivery: "12:20",
    },
    {
      id: 10,
      pickupNumber: "PU-010",
      orderNumber: "ORD-010",
      volunteerName: "Alex Brown",
      customerName: "Jennifer Lee",
      restaurantName: "Cozy Corner Cafe",
      foodItem: "Coffee & Pastry",
      pickupAddress: "741 Corner St, Neighborhood",
      deliveryAddress: "852 Cozy Ave, Neighborhood",
      scheduledTime: "11:00",
      actualTime: "11:05",
      status: "Delivered",
      distance: "0.8 km",
      estimatedDelivery: "11:15",
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
      case "Assigned":
        return "bg-blue-100 text-blue-800";
      case "Picked Up":
        return "bg-purple-100 text-purple-800";
      case "In Transit":
        return "bg-indigo-100 text-indigo-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      case "Cancelled":
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
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <HiTruck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Pickups</h1>
                <p className="text-gray-600">Manage food pickup and delivery</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <HiPlus className="w-5 h-5" />
              Assign Pickup
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
                placeholder="Search pickups..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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
                      Pickup
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Volunteer
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
                      Time
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
                  {pickups.map((pickup, index) => (
                    <motion.tr
                      key={pickup.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                            <HiTruck className="w-5 h-5 text-white" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {pickup.pickupNumber}
                            </div>
                            <div className="text-sm text-gray-500">
                              Order: {pickup.orderNumber}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <MdPerson className="w-4 h-4 text-gray-400" />
                          {pickup.volunteerName}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <MdDirectionsCar className="w-4 h-4 text-gray-400" />
                          {pickup.distance}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {pickup.customerName}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <MdLocationOn className="w-4 h-4 text-gray-400" />
                          Delivery location
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <MdRestaurant className="w-4 h-4 text-gray-400" />
                          {pickup.restaurantName}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <MdLocationOn className="w-4 h-4 text-gray-400" />
                          Pickup location
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {pickup.foodItem}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <HiClock className="w-4 h-4 text-gray-400" />
                          {pickup.scheduledTime}
                        </div>
                        <div className="text-sm text-gray-500">
                          {pickup.actualTime ? `Actual: ${pickup.actualTime}` : 'Not started'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            pickup.status
                          )}`}
                        >
                          {pickup.status}
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

export default PickupsPage;
