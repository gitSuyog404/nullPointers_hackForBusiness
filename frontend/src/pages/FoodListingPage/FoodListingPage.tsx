import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  HiClock,
  HiLocationMarker,
  HiHeart,
  HiOutlineHeart,
  HiFilter,
  HiSearch,
  HiCurrencyDollar,
} from "react-icons/hi";
import { MdRestaurant, MdFastfood } from "react-icons/md";

interface FoodItem {
  id: number;
  title: string;
  description: string;
  image: string;
  restaurant: {
    name: string;
    address: string;
    rating: number;
  };
  category: string;
  quantity: string;
  price: number;
  originalPrice?: number;
  pickupTime: {
    start: string;
    end: string;
  };
  postedDate: string;
  expiryDate: string;
  isVegetarian: boolean;
  tags: string[];
}

const mockFoodItems: FoodItem[] = [
  {
    id: 1,
    title: "Fresh Sandwiches & Salads",
    description:
      "Assorted fresh sandwiches and garden salads from our lunch menu. Perfect for immediate consumption.",
    image: "/food.jpg",
    restaurant: {
      name: "Green Garden Cafe",
      address: "123 Main Street, Downtown",
      rating: 4.5,
    },
    category: "Lunch",
    quantity: "15-20 portions",
    price: 25.0,
    originalPrice: 45.0,
    pickupTime: {
      start: "2:00 PM",
      end: "4:00 PM",
    },
    postedDate: "2024-01-15",
    expiryDate: "2024-01-15",
    isVegetarian: true,
    tags: ["Fresh", "Healthy", "Ready to eat"],
  },
  {
    id: 2,
    title: "Artisan Bread & Pastries",
    description:
      "Freshly baked bread, croissants, and pastries from this morning's batch. Great for breakfast or snacks.",
    image: "/food.jpg",
    restaurant: {
      name: "Sunrise Bakery",
      address: "456 Oak Avenue, Midtown",
      rating: 4.8,
    },
    category: "Bakery",
    quantity: "30+ items",
    price: 18.0,
    originalPrice: 35.0,
    pickupTime: {
      start: "5:00 PM",
      end: "7:00 PM",
    },
    postedDate: "2024-01-15",
    expiryDate: "2024-01-16",
    isVegetarian: true,
    tags: ["Baked goods", "Morning fresh", "Bulk quantity"],
  },
  {
    id: 3,
    title: "Gourmet Pizza Slices",
    description:
      "Variety of gourmet pizza slices including Margherita, Pepperoni, and Veggie Supreme. Still warm!",
    image: "/food.jpg",
    restaurant: {
      name: "Tony's Pizzeria",
      address: "789 Pine Street, Little Italy",
      rating: 4.3,
    },
    category: "Dinner",
    quantity: "25 slices",
    price: 30.0,
    originalPrice: 50.0,
    pickupTime: {
      start: "8:00 PM",
      end: "10:00 PM",
    },
    postedDate: "2024-01-15",
    expiryDate: "2024-01-15",
    isVegetarian: false,
    tags: ["Hot food", "Popular", "Mixed varieties"],
  },
  {
    id: 4,
    title: "Asian Fusion Bowls",
    description:
      "Delicious rice and noodle bowls with various Asian fusion toppings. Includes vegetarian and meat options.",
    image: "/food.jpg",
    restaurant: {
      name: "Fusion Kitchen",
      address: "321 Elm Street, Food District",
      rating: 4.6,
    },
    category: "Lunch",
    quantity: "12 bowls",
    price: 22.0,
    originalPrice: 40.0,
    pickupTime: {
      start: "1:00 PM",
      end: "3:00 PM",
    },
    postedDate: "2024-01-15",
    expiryDate: "2024-01-15",
    isVegetarian: false,
    tags: ["Asian cuisine", "Filling", "Variety pack"],
  },
  {
    id: 5,
    title: "Fresh Fruit & Smoothie Bowls",
    description:
      "Healthy fruit bowls and smoothie bowls with granola, nuts, and fresh berries. Perfect for health-conscious individuals.",
    image: "/food.jpg",
    restaurant: {
      name: "Healthy Bites",
      address: "654 Wellness Way, Health District",
      rating: 4.7,
    },
    category: "Breakfast",
    quantity: "10 bowls",
    price: 15.0,
    originalPrice: 28.0,
    pickupTime: {
      start: "9:00 AM",
      end: "11:00 AM",
    },
    postedDate: "2024-01-15",
    expiryDate: "2024-01-15",
    isVegetarian: true,
    tags: ["Healthy", "Fresh fruits", "Nutritious"],
  },
  {
    id: 6,
    title: "Comfort Food Platters",
    description:
      "Hearty comfort food including mac and cheese, meatloaf, and roasted vegetables. Perfect for families.",
    image: "/food.jpg",
    restaurant: {
      name: "Comfort Kitchen",
      address: "987 Cozy Lane, Family District",
      rating: 4.4,
    },
    category: "Dinner",
    quantity: "8 family portions",
    price: 35.0,
    originalPrice: 60.0,
    pickupTime: {
      start: "6:00 PM",
      end: "8:00 PM",
    },
    postedDate: "2024-01-15",
    expiryDate: "2024-01-15",
    isVegetarian: false,
    tags: ["Family size", "Comfort food", "Hearty meals"],
  },
];

const FoodListingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = ["All", "Breakfast", "Lunch", "Dinner", "Bakery"];

  const filteredItems = mockFoodItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (itemId: number) => {
    setFavorites((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Available Food Listings
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed">
              Discover fresh, surplus food from local restaurants ready for
              pickup. Help reduce waste while feeding those in need.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search food items or restaurants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-2">
                <HiFilter className="text-gray-500 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden h-full flex flex-col hover:border-blue-300 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-food.jpg";
                      }}
                    />

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleFavorite(item.id)}
                      className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                    >
                      {favorites.includes(item.id) ? (
                        <HiHeart className="w-5 h-5 text-red-500" />
                      ) : (
                        <HiOutlineHeart className="w-5 h-5 text-gray-600" />
                      )}
                    </motion.button>

                    <div className="absolute top-3 left-3">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {item.category}
                      </span>
                    </div>

                    {item.isVegetarian && (
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Vegetarian
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-1 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        <MdRestaurant className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 text-sm">
                          {item.restaurant.name}
                        </h4>
                        <p className="text-gray-500 text-xs flex items-center gap-1">
                          <HiLocationMarker className="w-3 h-3" />
                          {item.restaurant.address}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm font-medium text-gray-700">
                            {item.restaurant.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl mb-4">
                      <div className="flex items-center gap-2">
                        <HiCurrencyDollar className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-xs text-gray-500">Price</p>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-green-600">
                              ${item.price.toFixed(2)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {item.originalPrice && (
                        <div className="text-right">
                          <p className="text-xs text-gray-500">You Save</p>
                          <p className="text-lg font-bold text-red-600">
                            ${(item.originalPrice - item.price).toFixed(2)}
                          </p>
                          <p className="text-xs text-green-600 font-medium">
                            {Math.round(
                              ((item.originalPrice - item.price) /
                                item.originalPrice) *
                                100
                            )}
                            % OFF
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <HiClock className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">
                          {item.pickupTime.start} - {item.pickupTime.end}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MdFastfood className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">
                          {item.quantity}
                        </span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate(`/food-order/${item.id}`)}
                      className="w-full   bg-blue-600  hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
                    >
                      Request Pickup
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <MdFastfood className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No food items found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FoodListingPage;
