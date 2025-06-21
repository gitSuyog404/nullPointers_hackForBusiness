import { motion } from "framer-motion";
import { Title, Text, Container } from "@mantine/core";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormInput from "../../components/ui/FormInput";
import FormTextarea from "../../components/ui/FormTextarea";
import FormDropdown from "../../components/ui/FormDropdown";
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiClock,
  HiHeart,
  HiUsers,
  HiSupport,
} from "react-icons/hi";
import { FaUtensils } from "react-icons/fa";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    mode: "onChange",
  });

  const onSubmit = (data: ContactFormData) => {
    console.log("Form submitted:", data);

    toast.success(
      "Message sent! Thank you for contacting us. We'll get back to you soon!",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );

    reset();
  };

  const subjectOptions = [
    { value: "general", label: "General Inquiry" },
    { value: "partnership", label: "Partnership Opportunity" },
    { value: "support", label: "Technical Support" },
    { value: "restaurant", label: "Restaurant Registration" },
    { value: "volunteer", label: "Volunteer Registration" },
    { value: "other", label: "Other" },
  ];

  const contactInfo = [
    {
      icon: <HiMail size={24} />,
      title: "Email Us",
      description: "Get in touch via email",
      value: "hello@foodrescue.com",
      color: "blue",
    },
    {
      icon: <HiPhone size={24} />,
      title: "Call Us",
      description: "Speak with our team",
      value: "+1 (555) 123-4567",
      color: "green",
    },
    {
      icon: <HiLocationMarker size={24} />,
      title: "Visit Us",
      description: "Our office location",
      value: "123 Community St, Food City, FC 12345",
      color: "purple",
    },
    {
      icon: <HiClock size={24} />,
      title: "Office Hours",
      description: "When we're available",
      value: "Mon-Fri: 9AM-6PM",
      color: "orange",
    },
  ];

  const reasons = [
    {
      icon: <HiHeart size={32} />,
      title: "General Inquiries",
      description: "Questions about our mission and platform",
    },
    {
      icon: <HiUsers size={32} />,
      title: "Partnership Opportunities",
      description: "Interested in partnering with Food Rescue",
    },
    {
      icon: <HiSupport size={32} />,
      title: "Technical Support",
      description: "Need help with the platform or app",
    },
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
        <Container size="xl">
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

            <Title
              order={1}
              className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
            >
              Contact Us
            </Title>

            <Text
              size="xl"
              className="text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Have questions about our food rescue platform? Want to partner
              with us? We'd love to hear from you and help make a difference
              together.
            </Text>
          </motion.div>
        </Container>
      </section>

      <section className="py-20 sm:py-24 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <div className="h-full">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-8"
                  >
                    Send us a Message
                  </motion.h2>

                  <motion.form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <FormInput
                        label="Full Name"
                        name="name"
                        placeholder="Enter your full name"
                        register={register}
                        error={errors.name}
                        required
                      />
                      <FormInput
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        register={register}
                        error={errors.email}
                        required
                      />
                    </motion.div>

                    <motion.div
                      className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <FormInput
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        register={register}
                        error={errors.phone}
                        required
                      />
                      <FormDropdown
                        label="Subject"
                        name="subject"
                        options={subjectOptions}
                        register={register}
                        error={errors.subject}
                        placeholder="Select a subject"
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <FormTextarea
                        label="Message"
                        name="message"
                        placeholder="Tell us how we can help you..."
                        register={register}
                        error={errors.message}
                        rows={6}
                        required
                        textareaClassName="resize-none"
                      />
                    </motion.div>

                    <motion.div
                      className="flex justify-center pt-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[180px] shadow-lg hover:shadow-xl"
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                      </motion.div>
                    </motion.div>
                  </motion.form>
                </div>
              </motion.div>
            </div>

            <div className="md:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <div className="h-full">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-8"
                  >
                    Get in Touch
                  </motion.h3>

                  <div className="space-y-8">
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 10, transition: { duration: 0.2 } }}
                        className="flex items-start gap-4 group cursor-pointer"
                      >
                        <motion.div
                          className="flex items-center justify-center w-14 h-14 bg-gray-100 rounded-xl group-hover:bg-blue-100 transition-colors duration-300"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                          }}
                        >
                          <div className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
                            {info.icon}
                          </div>
                        </motion.div>
                        <div className="flex-1">
                          <motion.p
                            className="font-bold text-gray-800 mb-2 text-lg group-hover:text-blue-800 transition-colors duration-300"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {info.title}
                          </motion.p>
                          <p className="text-gray-600 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                            {info.description}
                          </p>
                          <p className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
                            {info.value}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <Container size="xl">
          <div className="px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16 sm:mb-20"
            >
              <Title
                order={2}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6"
              >
                Why Contact Us?
              </Title>
              <Text
                size="xl"
                className="text-gray-600 max-w-3xl mx-auto leading-relaxed"
              >
                We're here to help you make a difference in your community.
                Reach out to us for any of these reasons and more.
              </Text>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 lg:gap-12"
            >
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-gray-100 group-hover:border-blue-200">
                    <div className="text-center">
                      <div className="relative mb-6">
                        <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl mx-auto group-hover:from-blue-100 group-hover:to-indigo-200 transition-all duration-300">
                          <div className="text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                            {reason.icon}
                          </div>
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>

                      <Title
                        order={4}
                        className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors duration-300"
                      >
                        {reason.title}
                      </Title>

                      <Text className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {reason.description}
                      </Text>

                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-center text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors duration-300">
                          <span>Get in touch</span>
                          <svg
                            className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ContactPage;
