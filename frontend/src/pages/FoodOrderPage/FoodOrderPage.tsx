import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  HiClock,
  HiLocationMarker,
  HiCalendar,
  HiHeart,
  HiOutlineHeart,
  HiCurrencyDollar,
  HiArrowLeft,
  HiPhone,
  HiMail,
  HiStar,
  HiCheckCircle,
  HiExclamationCircle,
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
    phone: string;
    email: string;
    description: string;
    openHours: string;
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
  ingredients: string[];
  allergens: string[];
  nutritionalInfo: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  pickupInstructions: string;
  specialNotes: string;
}

const mockFoodItems: FoodItem[] = [
  {
    id: 1,
    title: "Fresh Sandwiches & Salads",
    description:
      "Assorted fresh sandwiches and garden salads from our lunch menu. Perfect for immediate consumption. Made with locally sourced ingredients and fresh vegetables.",
    image: "/food.jpg",
    restaurant: {
      name: "Green Garden Cafe",
      address: "123 Main Street, Downtown",
      rating: 4.5,
      phone: "(555) 123-4567",
      email: "contact@greengardencafe.com",
      description:
        "A cozy cafe specializing in fresh, organic meals made with locally sourced ingredients. We've been serving the community for over 10 years.",
      openHours: "7:00 AM - 9:00 PM",
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
    ingredients: [
      "Mixed greens",
      "Tomatoes",
      "Cucumbers",
      "Whole grain bread",
      "Hummus",
      "Avocado",
    ],
    allergens: ["Gluten", "May contain nuts"],
    nutritionalInfo: {
      calories: 350,
      protein: "12g",
      carbs: "45g",
      fat: "8g",
    },
    pickupInstructions:
      "Please come to the main entrance and ask for the food rescue pickup. Bring your own containers if possible.",
    specialNotes:
      "Items are individually wrapped and ready for distribution. Perfect for immediate consumption.",
  },
];

const FoodOrderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [foodItem, setFoodItem] = useState<FoodItem | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  useEffect(() => {
    const item = mockFoodItems.find((item) => item.id === parseInt(id || "0"));
    setFoodItem(item || null);
  }, [id]);

  if (!foodItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <MdFastfood className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">
            Food item not found
          </h2>
          <p className="text-gray-500 mb-6">
            The food item you're looking for doesn't exist.
          </p>
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/food-listing")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
          > */}
          <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200">
            Back to Food Listing
          </button>
          {/* </motion.button> */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/food-listing")}
            className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-700 font-medium mb-6"
          >
            <HiArrowLeft className="w-5 h-5" />
            Back to Food Listing
          </motion.button>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative mb-8">
                <img
                  src={foodItem.image}
                  alt={foodItem.title}
                  className="w-full h-96 object-cover rounded-2xl"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-food.jpg";
                  }}
                />

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                >
                  {isFavorite ? (
                    <HiHeart className="w-6 h-6 text-red-500" />
                  ) : (
                    <HiOutlineHeart className="w-6 h-6 text-gray-600" />
                  )}
                </motion.button>

                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium">
                    {foodItem.category}
                  </span>
                </div>

                {foodItem.isVegetarian && (
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Vegetarian
                    </span>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HiCurrencyDollar className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-bold text-green-600">
                          ${foodItem.price.toFixed(2)}
                        </span>
                        {foodItem.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            ${foodItem.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {foodItem.originalPrice && (
                    <div className="text-right">
                      <p className="text-sm text-gray-500">You Save</p>
                      <p className="text-2xl font-bold text-red-600">
                        ${(foodItem.originalPrice - foodItem.price).toFixed(2)}
                      </p>
                      <p className="text-sm text-green-600 font-medium">
                        {Math.round(
                          ((foodItem.originalPrice - foodItem.price) /
                            foodItem.originalPrice) *
                            100
                        )}
                        % OFF
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                  {foodItem.title}
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {foodItem.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {foodItem.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Pickup Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <HiClock className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Pickup Time</p>
                      <p className="font-medium text-gray-800">
                        {foodItem.pickupTime.start} - {foodItem.pickupTime.end}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MdFastfood className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Quantity</p>
                      <p className="font-medium text-gray-800">
                        {foodItem.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <HiCalendar className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-500">Posted Date</p>
                      <p className="font-medium text-gray-800">
                        {new Date(foodItem.postedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <HiExclamationCircle className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-sm text-gray-500">Expires</p>
                      <p className="font-medium text-gray-800">
                        {new Date(foodItem.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <MdRestaurant className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {foodItem.restaurant.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <HiLocationMarker className="w-4 h-4 text-gray-500" />
                      <p className="text-gray-600">
                        {foodItem.restaurant.address}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <HiStar className="w-5 h-5 text-yellow-400" />
                      <span className="font-semibold text-gray-800">
                        {foodItem.restaurant.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">
                  {foodItem.restaurant.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <HiPhone className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">
                      {foodItem.restaurant.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiMail className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">
                      {foodItem.restaurant.email}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Ingredients & Allergens
                </h3>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">
                    Ingredients:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {foodItem.ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-sm"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Allergens:</h4>
                  <div className="flex flex-wrap gap-2">
                    {foodItem.allergens.map((allergen, index) => (
                      <span
                        key={index}
                        className="bg-red-50 text-red-700 px-2 py-1 rounded-md text-sm"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">
                    Nutritional Info (per serving):
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Calories</p>
                      <p className="font-semibold">
                        {foodItem.nutritionalInfo.calories}
                      </p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Protein</p>
                      <p className="font-semibold">
                        {foodItem.nutritionalInfo.protein}
                      </p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Carbs</p>
                      <p className="font-semibold">
                        {foodItem.nutritionalInfo.carbs}
                      </p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Fat</p>
                      <p className="font-semibold">
                        {foodItem.nutritionalInfo.fat}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <HiCheckCircle className="w-5 h-5 text-blue-600" />
                  Pickup Instructions
                </h3>
                <p className="text-gray-700 mb-4">
                  {foodItem.pickupInstructions}
                </p>
                {foodItem.specialNotes && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">
                      <strong>Special Notes:</strong> {foodItem.specialNotes}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowContactInfo(!showContactInfo)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold cursor-pointer  "
                >
                  Contact Restaurant
                </button>

                <button className="flex-1   bg-blue-600   hover:bg-blue-700 text-white py-4 rounded-xl font-semibold cursor-pointer ">
                  Confirm Pickup Request
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FoodOrderPage;
