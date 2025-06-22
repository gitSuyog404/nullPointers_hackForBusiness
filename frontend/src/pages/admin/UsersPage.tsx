import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HiPlus,
  HiSearch,
  HiFilter,
  HiUsers,
  HiEye,
  HiPencil,
  HiTrash,
  HiMail,
} from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import { useForm } from "react-hook-form";
import Modal from "../../components/ui/Modal";
import FormInput from "../../components/ui/FormInput";
import FormDropdown from "../../components/ui/FormDropdown";

interface UserFormData {
  name: string;
  email: string;
  role: string;
  location: string;
  status: string;
}

const UsersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>();

  const roleOptions = [
    { value: "CUSTOMER", label: "Customer" },
    { value: "RESTAURANT", label: "Restaurant" },
    { value: "RIDER", label: "Rider" },
    { value: "ADMIN", label: "Admin" },
  ];

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
    { value: "Pending", label: "Pending" },
  ];

  const onSubmit = (data: UserFormData) => {
    console.log("Form submitted:", data);
    // Here you would typically send the data to your API
    setIsModalOpen(false);
    reset();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  // Dummy data for users
  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      role: "CUSTOMER",
      location: "Downtown",
      joinedDate: "2024-01-15",
      lastLogin: "2024-03-20",
      status: "Active",
      totalOrders: 12,
    },
    {
      id: 2,
      name: "Bella Italia Restaurant",
      email: "contact@bellaitalia.com",
      role: "RESTAURANT",
      location: "Main St",
      joinedDate: "2024-02-20",
      lastLogin: "2024-03-19",
      status: "Active",
      totalOrders: 45,
    },
    {
      id: 3,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      role: "RIDER",
      location: "Coastal",
      joinedDate: "2024-03-10",
      lastLogin: "2024-03-20",
      status: "Active",
      totalOrders: 67,
    },
    {
      id: 4,
      name: "Mike Wilson",
      email: "mike.wilson@email.com",
      role: "CUSTOMER",
      location: "Uptown",
      joinedDate: "2024-01-28",
      lastLogin: "2024-03-18",
      status: "Inactive",
      totalOrders: 8,
    },
    {
      id: 5,
      name: "Spice Garden",
      email: "info@spicegarden.com",
      role: "RESTAURANT",
      location: "Oak Ave",
      joinedDate: "2024-02-14",
      lastLogin: "2024-03-20",
      status: "Active",
      totalOrders: 32,
    },
    {
      id: 6,
      name: "Lisa Chen",
      email: "lisa.chen@email.com",
      role: "CUSTOMER",
      location: "Central",
      joinedDate: "2024-01-05",
      lastLogin: "2024-03-15",
      status: "Active",
      totalOrders: 23,
    },
    {
      id: 7,
      name: "David Rodriguez",
      email: "david.rodriguez@email.com",
      role: "RIDER",
      location: "West",
      joinedDate: "2024-03-01",
      lastLogin: "2024-03-19",
      status: "Active",
      totalOrders: 89,
    },
    {
      id: 8,
      name: "Ocean Breeze Cafe",
      email: "hello@oceanbreeze.com",
      role: "RESTAURANT",
      location: "Beach Rd",
      joinedDate: "2024-02-08",
      lastLogin: "2024-03-17",
      status: "Pending",
      totalOrders: 18,
    },
    {
      id: 9,
      name: "Emma Thompson",
      email: "emma.thompson@email.com",
      role: "CUSTOMER",
      location: "Express",
      joinedDate: "2024-03-15",
      lastLogin: "2024-03-20",
      status: "Active",
      totalOrders: 5,
    },
    {
      id: 10,
      name: "Suyog Admin",
      email: "suyog12@gmail.com",
      role: "ADMIN",
      location: "System",
      joinedDate: "2024-01-01",
      lastLogin: "2024-03-20",
      status: "Active",
      totalOrders: 0,
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-purple-100 text-purple-800";
      case "RESTAURANT":
        return "bg-orange-100 text-orange-800";
      case "RIDER":
        return "bg-blue-100 text-blue-800";
      case "CUSTOMER":
        return "bg-green-100 text-green-800";
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
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <HiUsers className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Users</h1>
                <p className="text-gray-600">Manage platform users</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <HiPlus className="w-5 h-5" />
              Add User
            </motion.button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Activity
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
                  {users.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                            <HiUsers className="w-5 h-5 text-white" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {user.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <HiMail className="w-4 h-4 text-gray-400" />
                          {user.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <MdLocationOn className="w-4 h-4 text-gray-400" />
                          {user.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                            user.role
                          )}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.totalOrders} orders
                        </div>
                        <div className="text-sm text-gray-500">
                          Last login: {user.lastLogin}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            user.status
                          )}`}
                        >
                          {user.status}
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

        {/* Add User Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Add New User"
          description="Create a new user account"
          icon={
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl w-full h-full flex items-center justify-center">
              <HiUsers className="w-5 h-5 text-white" />
            </div>
          }
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput
              label="Full Name"
              name="name"
              type="text"
              placeholder="Enter user's full name"
              register={register}
              error={errors.name}
              required
            />

            <FormInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter email address"
              register={register}
              error={errors.email}
              required
            />

            <FormDropdown
              label="Role"
              name="role"
              options={roleOptions}
              placeholder="Select user role"
              register={register}
              error={errors.role}
              required
            />

            <FormInput
              label="Location"
              name="location"
              type="text"
              placeholder="Enter location"
              register={register}
              error={errors.location}
              required
            />

            <FormDropdown
              label="Status"
              name="status"
              options={statusOptions}
              placeholder="Select status"
              register={register}
              error={errors.status}
              required
            />

            {/* Modal Footer */}
            <div className="flex gap-3 pt-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={closeModal}
                className="flex-1 px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Add User
              </motion.button>
            </div>
          </form>
        </Modal>
      </motion.div>
    </div>
  );
};

export default UsersPage;
