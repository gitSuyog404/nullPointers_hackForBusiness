import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HiPlus,
  HiSearch,
  HiFilter,
  HiEye,
  HiPencil,
  HiTrash,
} from "react-icons/hi";
import { MdRestaurant, MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import Modal from "../../components/ui/Modal";
import FormInput from "../../components/ui/FormInput";
import FormDropdown from "../../components/ui/FormDropdown";

interface RestaurantFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  registrationNumber: string;
  status: string;
}

const RestaurantsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RestaurantFormData>();

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Pending", label: "Pending" },
    { value: "Inactive", label: "Inactive" },
  ];

  const onSubmit = (data: RestaurantFormData) => {
    console.log("Restaurant form submitted:", data);
    // Here you would typically send the data to your API
    setIsModalOpen(false);
    reset();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  // Dummy data for restaurants
  const restaurants = [
    {
      id: 1,
      name: "Bella Italia",
      email: "contact@bellaitalia.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, Downtown",
      registrationNumber: "REST001",
      status: "Active",
      joinedDate: "2024-01-15",
      totalListings: 45,
    },
    {
      id: 2,
      name: "Spice Garden",
      email: "info@spicegarden.com",
      phone: "+1 (555) 234-5678",
      address: "456 Oak Ave, Midtown",
      registrationNumber: "REST002",
      status: "Active",
      joinedDate: "2024-02-20",
      totalListings: 32,
    },
    {
      id: 3,
      name: "Ocean Breeze Cafe",
      email: "hello@oceanbreeze.com",
      phone: "+1 (555) 345-6789",
      address: "789 Beach Rd, Coastal",
      registrationNumber: "REST003",
      status: "Pending",
      joinedDate: "2024-03-10",
      totalListings: 18,
    },
    {
      id: 4,
      name: "Mountain View Bistro",
      email: "contact@mountainview.com",
      phone: "+1 (555) 456-7890",
      address: "321 Hill St, Uptown",
      registrationNumber: "REST004",
      status: "Active",
      joinedDate: "2024-01-28",
      totalListings: 67,
    },
    {
      id: 5,
      name: "Urban Kitchen",
      email: "info@urbankitchen.com",
      phone: "+1 (555) 567-8901",
      address: "654 City Blvd, Metro",
      registrationNumber: "REST005",
      status: "Active",
      joinedDate: "2024-02-14",
      totalListings: 29,
    },
    {
      id: 6,
      name: "Green Leaf Deli",
      email: "hello@greenleaf.com",
      phone: "+1 (555) 678-9012",
      address: "987 Park Ave, Central",
      registrationNumber: "REST006",
      status: "Inactive",
      joinedDate: "2024-01-05",
      totalListings: 12,
    },
    {
      id: 7,
      name: "Sunset Grill",
      email: "contact@sunsetgrill.com",
      phone: "+1 (555) 789-0123",
      address: "147 Sunset Blvd, West",
      registrationNumber: "REST007",
      status: "Active",
      joinedDate: "2024-03-01",
      totalListings: 38,
    },
    {
      id: 8,
      name: "Royal Palace",
      email: "info@royalpalace.com",
      phone: "+1 (555) 890-1234",
      address: "258 Royal St, Historic",
      registrationNumber: "REST008",
      status: "Active",
      joinedDate: "2024-02-08",
      totalListings: 54,
    },
    {
      id: 9,
      name: "Fresh & Fast",
      email: "hello@freshfast.com",
      phone: "+1 (555) 901-2345",
      address: "369 Quick Ave, Express",
      registrationNumber: "REST009",
      status: "Pending",
      joinedDate: "2024-03-15",
      totalListings: 8,
    },
    {
      id: 10,
      name: "Cozy Corner Cafe",
      email: "contact@cozycorner.com",
      phone: "+1 (555) 012-3456",
      address: "741 Corner St, Neighborhood",
      registrationNumber: "REST010",
      status: "Active",
      joinedDate: "2024-01-22",
      totalListings: 41,
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
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <MdRestaurant className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Restaurants
                </h1>
                <p className="text-gray-600">Manage restaurant partners</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <HiPlus className="w-5 h-5" />
              Add Restaurant
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
                placeholder="Search restaurants..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      Restaurant
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Listings
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {restaurants.map((restaurant, index) => (
                    <motion.tr
                      key={restaurant.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                            <MdRestaurant className="w-5 h-5 text-white" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {restaurant.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {restaurant.registrationNumber}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <MdEmail className="w-4 h-4 text-gray-400" />
                          {restaurant.email}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <MdPhone className="w-4 h-4 text-gray-400" />
                          {restaurant.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <MdLocationOn className="w-4 h-4 text-gray-400" />
                          {restaurant.address}
                        </div>
                        <div className="text-sm text-gray-500">
                          Joined: {restaurant.joinedDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            restaurant.status
                          )}`}
                        >
                          {restaurant.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {restaurant.totalListings}
                        </div>
                        <div className="text-sm text-gray-500">Total items</div>
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

        {/* Add Restaurant Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Add New Restaurant"
          description="Register a new restaurant partner"
          icon={
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl w-full h-full flex items-center justify-center">
              <MdRestaurant className="w-5 h-5 text-white" />
            </div>
          }
          maxWidth="max-w-lg"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Restaurant Name"
                name="name"
                type="text"
                placeholder="Enter restaurant name"
                register={register}
                error={errors.name}
                required
              />
              <FormInput
                label="Registration Number"
                name="registrationNumber"
                type="text"
                placeholder="Enter registration number"
                register={register}
                error={errors.registrationNumber}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter email address"
                register={register}
                error={errors.email}
                required
              />
              <FormInput
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="Enter phone number"
                register={register}
                error={errors.phone}
                required
              />
            </div>

            <FormInput
              label="Address"
              name="address"
              type="text"
              placeholder="Enter restaurant address"
              register={register}
              error={errors.address}
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
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Add Restaurant
              </motion.button>
            </div>
          </form>
        </Modal>
      </motion.div>
    </div>
  );
};

export default RestaurantsPage;
