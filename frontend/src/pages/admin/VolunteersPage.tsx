import React from "react";
import { motion } from "framer-motion";
import {
  HiPlus,
  HiSearch,
  HiFilter,
  HiEye,
  HiPencil,
  HiTrash,
  HiMail,
  HiPhone,
} from "react-icons/hi";
import { MdVolunteerActivism, MdLocationOn, MdStar } from "react-icons/md";

const VolunteersPage: React.FC = () => {
  // Dummy data for volunteers
  const volunteers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      location: "Downtown",
      joinedDate: "2024-01-15",
      totalPickups: 45,
      rating: 4.8,
      status: "Active",
      lastActive: "2024-03-19",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+1 (555) 234-5678",
      location: "Midtown",
      joinedDate: "2024-02-20",
      totalPickups: 32,
      rating: 4.9,
      status: "Active",
      lastActive: "2024-03-20",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      phone: "+1 (555) 345-6789",
      location: "Coastal",
      joinedDate: "2024-03-10",
      totalPickups: 18,
      rating: 4.7,
      status: "Inactive",
      lastActive: "2024-03-15",
    },
    {
      id: 4,
      name: "David Thompson",
      email: "david.thompson@email.com",
      phone: "+1 (555) 456-7890",
      location: "Uptown",
      joinedDate: "2024-01-28",
      totalPickups: 67,
      rating: 4.9,
      status: "Active",
      lastActive: "2024-03-20",
    },
    {
      id: 5,
      name: "Lisa Wang",
      email: "lisa.wang@email.com",
      phone: "+1 (555) 567-8901",
      location: "Metro",
      joinedDate: "2024-02-14",
      totalPickups: 29,
      rating: 4.6,
      status: "Active",
      lastActive: "2024-03-19",
    },
    {
      id: 6,
      name: "James Wilson",
      email: "james.wilson@email.com",
      phone: "+1 (555) 678-9012",
      location: "Central",
      joinedDate: "2024-01-05",
      totalPickups: 12,
      rating: 4.5,
      status: "Pending",
      lastActive: "2024-03-18",
    },
    {
      id: 7,
      name: "Maria Garcia",
      email: "maria.garcia@email.com",
      phone: "+1 (555) 789-0123",
      location: "West",
      joinedDate: "2024-03-01",
      totalPickups: 38,
      rating: 4.8,
      status: "Active",
      lastActive: "2024-03-20",
    },
    {
      id: 8,
      name: "Robert Kim",
      email: "robert.kim@email.com",
      phone: "+1 (555) 890-1234",
      location: "Historic",
      joinedDate: "2024-02-08",
      totalPickups: 54,
      rating: 4.7,
      status: "Active",
      lastActive: "2024-03-19",
    },
    {
      id: 9,
      name: "Jennifer Lee",
      email: "jennifer.lee@email.com",
      phone: "+1 (555) 901-2345",
      location: "Express",
      joinedDate: "2024-03-15",
      totalPickups: 8,
      rating: 4.4,
      status: "Active",
      lastActive: "2024-03-20",
    },
    {
      id: 10,
      name: "Alex Brown",
      email: "alex.brown@email.com",
      phone: "+1 (555) 012-3456",
      location: "Neighborhood",
      joinedDate: "2024-01-22",
      totalPickups: 41,
      rating: 4.6,
      status: "Active",
      lastActive: "2024-03-18",
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
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
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
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <MdVolunteerActivism className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Volunteers</h1>
                <p className="text-gray-600">Manage volunteer community</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <HiPlus className="w-5 h-5" />
              Add Volunteer
            </motion.button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search volunteers..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200">
              <HiFilter className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Filter</span>
            </button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Volunteer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
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
                  {volunteers.map((volunteer, index) => (
                    <motion.tr
                      key={volunteer.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                            <MdVolunteerActivism className="w-5 h-5 text-white" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {volunteer.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              Joined: {volunteer.joinedDate}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <HiMail className="w-4 h-4 text-gray-400" />
                          {volunteer.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <HiPhone className="w-4 h-4 text-gray-400" />
                          {volunteer.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <MdLocationOn className="w-4 h-4 text-gray-400" />
                          {volunteer.location}
                        </div>
                        <div className="text-sm text-gray-500">
                          Last active: {volunteer.lastActive}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {volunteer.totalPickups} pickups
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <MdStar className="w-4 h-4 text-yellow-400" />
                          {volunteer.rating}/5.0
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            volunteer.status
                          )}`}
                        >
                          {volunteer.status}
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

export default VolunteersPage;
