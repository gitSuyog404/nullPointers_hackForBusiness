import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HiPlus,
  HiSearch,
  HiFilter,
  HiEye,
  HiPencil,
  HiTrash,
  HiClock,
} from "react-icons/hi";
import { MdFastfood, MdRestaurant, MdLocationOn } from "react-icons/md";
import { useForm } from "react-hook-form";
import Modal from "../../components/ui/Modal";
import FormInput from "../../components/ui/FormInput";
import FormDropdown from "../../components/ui/FormDropdown";

interface FoodItemFormData {
  name: string;
  restaurant: string;
  category: string;
  quantity: number;
  originalPrice: number;
  discountedPrice: number;
  expiryTime: string;
  status: string;
  description: string;
}

const FoodItemsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FoodItemFormData>();

  const categoryOptions = [
    { value: "Pizza", label: "Pizza" },
    { value: "Indian", label: "Indian" },
    { value: "Salad", label: "Salad" },
    { value: "Burger", label: "Burger" },
    { value: "Pasta", label: "Pasta" },
    { value: "Wrap", label: "Wrap" },
    { value: "Seafood", label: "Seafood" },
    { value: "Healthy", label: "Healthy" },
    { value: "Breakfast", label: "Breakfast" },
  ];

  const statusOptions = [
    { value: "Available", label: "Available" },
    { value: "Reserved", label: "Reserved" },
    { value: "Expired", label: "Expired" },
  ];

  const onSubmit = (data: FoodItemFormData) => {
    console.log("Food item form submitted:", data);
    setIsModalOpen(false);
    reset();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  // Dummy data for food items
  const foodItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      restaurant: "Bella Italia",
      category: "Pizza",
      quantity: 5,
      originalPrice: 18.99,
      discountedPrice: 12.99,
      expiryTime: "2024-03-20 18:00",
      status: "Available",
      location: "Downtown",
      description: "Fresh mozzarella, tomato sauce, basil",
    },
    {
      id: 2,
      name: "Chicken Biryani",
      restaurant: "Spice Garden",
      category: "Indian",
      quantity: 8,
      originalPrice: 22.5,
      discountedPrice: 15.75,
      expiryTime: "2024-03-20 19:30",
      status: "Available",
      location: "Midtown",
      description: "Aromatic basmati rice with spiced chicken",
    },
    {
      id: 3,
      name: "Caesar Salad",
      restaurant: "Ocean Breeze Cafe",
      category: "Salad",
      quantity: 3,
      originalPrice: 14.99,
      discountedPrice: 9.99,
      expiryTime: "2024-03-20 16:00",
      status: "Expired",
      location: "Coastal",
      description: "Crisp romaine lettuce with caesar dressing",
    },
    {
      id: 4,
      name: "Beef Burger",
      restaurant: "Mountain View Bistro",
      category: "Burger",
      quantity: 12,
      originalPrice: 16.99,
      discountedPrice: 11.99,
      expiryTime: "2024-03-20 20:00",
      status: "Available",
      location: "Uptown",
      description: "Juicy beef patty with fresh vegetables",
    },
    {
      id: 5,
      name: "Pasta Carbonara",
      restaurant: "Urban Kitchen",
      category: "Pasta",
      quantity: 6,
      originalPrice: 19.99,
      discountedPrice: 13.99,
      expiryTime: "2024-03-20 17:30",
      status: "Reserved",
      location: "Metro",
      description: "Creamy pasta with bacon and parmesan",
    },
    {
      id: 6,
      name: "Veggie Wrap",
      restaurant: "Green Leaf Deli",
      category: "Wrap",
      quantity: 4,
      originalPrice: 12.99,
      discountedPrice: 8.99,
      expiryTime: "2024-03-20 15:30",
      status: "Available",
      location: "Central",
      description: "Fresh vegetables in whole wheat wrap",
    },
    {
      id: 7,
      name: "Grilled Salmon",
      restaurant: "Sunset Grill",
      category: "Seafood",
      quantity: 7,
      originalPrice: 28.99,
      discountedPrice: 19.99,
      expiryTime: "2024-03-20 21:00",
      status: "Available",
      location: "West",
      description: "Atlantic salmon with lemon herbs",
    },
    {
      id: 8,
      name: "Chicken Tikka",
      restaurant: "Royal Palace",
      category: "Indian",
      quantity: 10,
      originalPrice: 24.99,
      discountedPrice: 17.49,
      expiryTime: "2024-03-20 19:00",
      status: "Available",
      location: "Historic",
      description: "Marinated chicken in tandoor spices",
    },
    {
      id: 9,
      name: "Fresh Fruit Bowl",
      restaurant: "Fresh & Fast",
      category: "Healthy",
      quantity: 2,
      originalPrice: 9.99,
      discountedPrice: 6.99,
      expiryTime: "2024-03-20 14:00",
      status: "Expired",
      location: "Express",
      description: "Seasonal fresh fruits with yogurt",
    },
    {
      id: 10,
      name: "Coffee & Pastry",
      restaurant: "Cozy Corner Cafe",
      category: "Breakfast",
      quantity: 15,
      originalPrice: 8.99,
      discountedPrice: 5.99,
      expiryTime: "2024-03-20 16:30",
      status: "Available",
      location: "Neighborhood",
      description: "Fresh coffee with assorted pastries",
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
      case "Available":
        return "bg-green-100 text-green-800";
      case "Reserved":
        return "bg-blue-100 text-blue-800";
      case "Expired":
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
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <MdFastfood className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Food Items</h1>
                <p className="text-gray-600">Monitor available food listings</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <HiPlus className="w-5 h-5" />
              Add Food Item
            </motion.button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search food items..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                      Food Item
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Restaurant
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expiry
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
                  {foodItems.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                            <MdFastfood className="w-5 h-5 text-white" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.category}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <MdRestaurant className="w-4 h-4 text-gray-400" />
                          {item.restaurant}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <MdLocationOn className="w-4 h-4 text-gray-400" />
                          {item.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${item.discountedPrice}
                        </div>
                        <div className="text-sm text-gray-500 line-through">
                          ${item.originalPrice}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.quantity}
                        </div>
                        <div className="text-sm text-gray-500">Available</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center gap-1">
                          <HiClock className="w-4 h-4 text-gray-400" />
                          {item.expiryTime.split(" ")[1]}
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.expiryTime.split(" ")[0]}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            item.status
                          )}`}
                        >
                          {item.status}
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

        {/* Add Food Item Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title="Add New Food Item"
          description="List a new food item for rescue"
          icon={
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl w-full h-full flex items-center justify-center">
              <MdFastfood className="w-5 h-5 text-white" />
            </div>
          }
          maxWidth="max-w-2xl"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Food Item Name"
                name="name"
                type="text"
                placeholder="Enter food item name"
                register={register}
                error={errors.name}
                required
              />
              <FormInput
                label="Restaurant"
                name="restaurant"
                type="text"
                placeholder="Enter restaurant name"
                register={register}
                error={errors.restaurant}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormDropdown
                label="Category"
                name="category"
                options={categoryOptions}
                placeholder="Select category"
                register={register}
                error={errors.category}
                required
              />
              <FormInput
                label="Quantity"
                name="quantity"
                type="number"
                placeholder="Enter quantity"
                register={register}
                error={errors.quantity}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Original Price ($)"
                name="originalPrice"
                type="number"
                placeholder="Enter original price"
                register={register}
                error={errors.originalPrice}
                required
              />
              <FormInput
                label="Discounted Price ($)"
                name="discountedPrice"
                type="number"
                placeholder="Enter discounted price"
                register={register}
                error={errors.discountedPrice}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label="Expiry Time"
                name="expiryTime"
                type="datetime-local"
                register={register}
                error={errors.expiryTime}
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
            </div>

            <FormInput
              label="Description"
              name="description"
              type="text"
              placeholder="Enter food description"
              register={register}
              error={errors.description}
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
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Add Food Item
              </motion.button>
            </div>
          </form>
        </Modal>
      </motion.div>
    </div>
  );
};

export default FoodItemsPage;
