import React from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  HiUsers,
  HiTrendingUp,
  HiHeart,
  HiClock,
  HiChartBar,
  HiGlobe,
} from "react-icons/hi";
import { MdRestaurant, MdFastfood, MdVolunteerActivism } from "react-icons/md";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: "increase" | "decrease";
  icon: React.ReactNode;
  color: string;
}

const DashboardPage: React.FC = () => {
  const statsData: StatCard[] = [
    {
      title: "Total Food Items Rescued",
      value: "2,847",
      change: "+12.5%",
      changeType: "increase",
      icon: <MdFastfood className="w-8 h-8" />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Active Restaurants",
      value: "156",
      change: "+8.2%",
      changeType: "increase",
      icon: <MdRestaurant className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "Volunteer Pickups",
      value: "1,923",
      change: "+15.3%",
      changeType: "increase",
      icon: <MdVolunteerActivism className="w-8 h-8" />,
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "People Fed",
      value: "8,642",
      change: "+22.1%",
      changeType: "increase",
      icon: <HiHeart className="w-8 h-8" />,
      color: "from-red-500 to-orange-600",
    },
  ];

  const foodRescueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Food Items Rescued",
        data: [320, 450, 380, 520, 680, 750],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "People Fed",
        data: [1200, 1800, 1500, 2100, 2700, 3000],
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const restaurantData = {
    labels: ["Fast Food", "Fine Dining", "Cafes", "Bakeries", "Food Trucks"],
    datasets: [
      {
        label: "Active Restaurants",
        data: [45, 32, 28, 25, 26],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(139, 92, 246, 0.8)",
        ],
        borderColor: [
          "rgb(59, 130, 246)",
          "rgb(16, 185, 129)",
          "rgb(245, 158, 11)",
          "rgb(239, 68, 68)",
          "rgb(139, 92, 246)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const impactData = {
    labels: ["Food Waste Reduced", "CO2 Emissions Saved", "Water Saved"],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(168, 85, 247, 0.8)",
        ],
        borderColor: [
          "rgb(34, 197, 94)",
          "rgb(59, 130, 246)",
          "rgb(168, 85, 247)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <HiChartBar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600">
              Monitor platform performance and analytics
            </p>
          </div>
        </div>
      </motion.div>

      <div className="mb-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white`}
                >
                  {stat.icon}
                </div>
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    stat.changeType === "increase"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  <HiTrendingUp className="w-3 h-3" />
                  {stat.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mb-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <HiChartBar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Food Rescue Trends
                </h3>
                <p className="text-gray-600 text-sm">
                  Monthly progress tracking
                </p>
              </div>
            </div>
            <div className="h-80">
              <Line data={foodRescueData} options={chartOptions} />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                <MdRestaurant className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Restaurant Categories
                </h3>
                <p className="text-gray-600 text-sm">Active partners by type</p>
              </div>
            </div>
            <div className="h-80">
              <Bar data={restaurantData} options={chartOptions} />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <HiGlobe className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Environmental Impact
                </h3>
                <p className="text-gray-600 text-sm">Sustainability metrics</p>
              </div>
            </div>
            <div className="h-80">
              <Doughnut data={impactData} options={doughnutOptions} />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <HiClock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Recent Activity
                </h3>
                <p className="text-gray-600 text-sm">Latest platform updates</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                {
                  action: "New restaurant registered",
                  restaurant: "Green Garden Cafe",
                  time: "2 hours ago",
                  icon: <MdRestaurant className="w-4 h-4" />,
                  color: "bg-blue-100 text-blue-600",
                },
                {
                  action: "Food pickup completed",
                  restaurant: "Tony's Pizzeria",
                  time: "4 hours ago",
                  icon: <MdVolunteerActivism className="w-4 h-4" />,
                  color: "bg-green-100 text-green-600",
                },
                {
                  action: "25 meals distributed",
                  restaurant: "Healthy Bites",
                  time: "6 hours ago",
                  icon: <HiHeart className="w-4 h-4" />,
                  color: "bg-red-100 text-red-600",
                },
                {
                  action: "New volunteer joined",
                  restaurant: "Community Helper",
                  time: "8 hours ago",
                  icon: <HiUsers className="w-4 h-4" />,
                  color: "bg-purple-100 text-purple-600",
                },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                >
                  <div
                    className={`w-8 h-8 ${activity.color} rounded-lg flex items-center justify-center`}
                  >
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-600">
                      {activity.restaurant}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
