import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiHeart,
  HiGlobeAlt,
  HiUsers,
  HiLightBulb,
  HiShieldCheck,
  HiTrendingUp,
} from "react-icons/hi";
import { FaLeaf, FaHandsHelping, FaUtensils } from "react-icons/fa";
import AnimatedCounter from "../../components/ui/AnimatedCounter";

const AboutPage = () => {
  const values = [
    {
      icon: <HiHeart size={32} />,
      title: "Compassion",
      description:
        "We believe everyone deserves access to nutritious food and that small acts of kindness can create meaningful change.",
    },
    {
      icon: <FaLeaf size={32} />,
      title: "Sustainability",
      description:
        "Reducing food waste is crucial for our planet's future. Every meal saved makes a difference for the environment.",
    },
    {
      icon: <HiUsers size={32} />,
      title: "Community",
      description:
        "Building strong connections between restaurants, volunteers, and those in need creates lasting positive impact.",
    },
    {
      icon: <HiShieldCheck size={32} />,
      title: "Trust",
      description:
        "We maintain the highest standards of food safety and transparency in all our operations.",
    },
  ];

  const stats = [
    { value: 50000, suffix: "+", label: "Meals Rescued" },
    { value: 200, suffix: "+", label: "Partner Restaurants" },
    { value: 1500, suffix: "+", label: "Active Volunteers" },
    { value: 25, suffix: "+", label: "Communities Served" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg mb-8"
            >
              <FaUtensils className="text-green-500" size={24} />
              <span className="text-xl font-bold text-gray-800">
                Food Rescue
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              About Our Mission
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              We're on a mission to eliminate food waste while fighting hunger
              in our communities. Every meal saved is a step toward a more
              sustainable and compassionate world.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 text-sm text-gray-600"
            >
              <div className="flex items-center gap-2">
                <HiGlobeAlt className="text-blue-500" />
                <span>Global Impact</span>
              </div>
              <div className="flex items-center gap-2">
                <HiTrendingUp className="text-green-500" />
                <span>Growing Community</span>
              </div>
              <div className="flex items-center gap-2">
                <FaHandsHelping className="text-purple-500" />
                <span>Local Action</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl">
                  <HiLightBulb size={32} />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                  Our Mission
                </h2>
              </div>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Food Rescue was born from a simple yet powerful observation:
                while millions of people go hungry, tons of perfectly good food
                are wasted every day. We bridge this gap by connecting
                restaurants with surplus food to volunteers who distribute it to
                those in need.
              </p>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our platform makes it easy for restaurants to list their excess
                food, for volunteers to claim and collect it, and for
                communities to access nutritious meals. Together, we're creating
                a more sustainable and equitable food system.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <HiShieldCheck
                    className="text-green-500 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Food Safety First
                    </h4>
                    <p className="text-gray-600">
                      Strict guidelines ensure all rescued food meets safety
                      standards
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <HiUsers
                    className="text-blue-500 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Community Driven
                    </h4>
                    <p className="text-gray-600">
                      Local volunteers are the heart of our food rescue
                      operations
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaLeaf
                    className="text-purple-500 mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      Environmental Impact
                    </h4>
                    <p className="text-gray-600">
                      Every meal saved reduces greenhouse gas emissions from
                      food waste
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl">
                  <HiHeart size={32} />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                  Our Story
                </h2>
              </div>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                It started with a conversation between a restaurant owner and a
                volunteer at a local shelter. The restaurant had fresh, unsold
                food at closing time, while the shelter needed meals for
                families in crisis. The connection was obvious, but the
                logistics were challenging.
              </p>

              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                That's when our founder realized technology could solve this
                problem. By creating a platform that connects food surplus with
                food need, we could scale this simple act of sharing across
                entire communities.
              </p>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl">
                <blockquote className="text-lg italic text-gray-700 mb-4">
                  "Every meal we rescue represents hope - hope for someone who
                  needed it, hope for our planet, and hope for a more
                  compassionate world."
                </blockquote>
                <cite className="text-sm font-medium text-gray-600">
                  - Food Rescue Team
                </cite>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Our Impact
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Together, we're making a real difference in our communities
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  duration={2.5}
                  delay={index * 0.2}
                  label={stat.label}
                  textClassName="text-2xl sm:text-3xl md:text-4xl text-white font-bold"
                  labelClassName="text-white/90 text-sm sm:text-base"
                  separator=","
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Whether you're a restaurant owner, volunteer, or someone who wants
              to make a difference, there's a place for you in the Food Rescue
              community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/restaurant/register"
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 inline-block"
                >
                  List Your Food
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/volunteer/register"
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 inline-block"
                >
                  Become a Volunteer
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
