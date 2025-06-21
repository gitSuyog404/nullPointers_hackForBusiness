import { motion } from "framer-motion";
import { Title, Text, Container } from "@mantine/core";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../components/ui/FormInput";
import FormCheckbox from "../../components/ui/FormCheckbox";
import { useSignUpMutation } from "../../redux/slices/userApiSlice";
import { useAppDispatch } from "../../redux/hooks";
import { setCredentials } from "../../redux/slices/authSlice";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  phone: string;
  isRestaurant: boolean;
  address?: string;
  registrationNumber?: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [signUp, { isLoading: isSignUpLoading }] = useSignUpMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: "onChange",
  });

  const isRestaurant = watch("isRestaurant");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log("Registration data:", data);

      const result = await signUp(data).unwrap();

      if (result.user) {
        dispatch(setCredentials(result.user));

        toast.success(
          `Account created successfully! Welcome ${
            data.isRestaurant
              ? "to our restaurant partner program"
              : "to Food Rescue"
          }!`,
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
        navigate("/");
      }
    } catch (error: any) {
      console.error("Registration error:", error);

      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Registration failed. Please try again.";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
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
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white  to-blue-50">
      <section className="py-20 sm:py-24 lg:py-28">
        <Container size="xl">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Title
                order={1}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6"
              >
                Join Food Rescue
              </Title>
              <Text
                size="xl"
                className="text-gray-600 max-w-2xl mx-auto leading-relaxed"
              >
                Help reduce food waste and support your community. Register as a
                volunteer to collect food or as a restaurant to share your
                unsold goods.
              </Text>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl p-8 lg:p-12 border shadow-lg border-gray-200"
              >
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4"
                  >
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2"
                  >
                    Create Your Account
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-gray-600"
                  >
                    Join our community and start making a difference
                  </motion.p>
                </div>

                <motion.form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
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
                    transition={{ duration: 0.5, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <FormInput
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="Create a strong password"
                      register={register}
                      error={errors.password}
                      required
                    />
                    <FormInput
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      register={register}
                      error={errors.phone}
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    viewport={{ once: true }}
                    className="pt-6"
                  >
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mt-1">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <FormCheckbox
                            label="I am registering as a restaurant"
                            name="isRestaurant"
                            register={register}
                            error={errors.isRestaurant}
                            description="Check this if you're a restaurant owner looking to share unsold food with the community"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {isRestaurant && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mt-6"
                    >
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
                            <svg
                              className="w-5 h-5 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              Restaurant Information
                            </h3>
                            <p className="text-sm text-gray-600">
                              Additional details for restaurant partners
                            </p>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            <FormInput
                              label="Restaurant Address"
                              name="address"
                              placeholder="Enter your restaurant address"
                              register={register}
                              error={errors.address}
                              required={isRestaurant}
                            />
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                          >
                            <FormInput
                              label="Business Registration Number"
                              name="registrationNumber"
                              placeholder="Enter your business registration number"
                              register={register}
                              error={errors.registrationNumber}
                              required={isRestaurant}
                            />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* <motion.div
                    className="flex justify-center pt-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    viewport={{ once: true }}
                  > */}
                  <div className="flex justify-center pt-8">
                    {/* <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      > */}
                    <button
                      type="submit"
                      disabled={isSignUpLoading}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-blue-400 disabled:to-purple-400 text-white font-semibold py-4 px-12 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 cursor-pointer focus:ring-blue-500 focus:ring-offset-2 min-w-[200px] shadow-lg hover:shadow-xl w-full"
                    >
                      {isSignUpLoading
                        ? "Creating Account..."
                        : "Create Account"}
                    </button>
                    {/* </motion.div> */}
                    {/* </motion.div> */}
                  </div>
                  <motion.div
                    className="text-center pt-6 border-t border-gray-200"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                    viewport={{ once: true }}
                  >
                    <Text className="text-gray-600">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                      >
                        Sign in here
                      </Link>
                    </Text>
                  </motion.div>
                </motion.form>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default RegisterPage;
