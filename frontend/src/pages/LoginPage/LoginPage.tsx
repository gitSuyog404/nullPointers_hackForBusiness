import { motion } from "framer-motion";
import { Title, Text, Container } from "@mantine/core";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../components/ui/FormInput";
import { useLoginMutation } from "../../redux/slices/userApiSlice";
import { useAppDispatch } from "../../redux/hooks";
import { setCredentials } from "../../redux/slices/authSlice";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // RTK Query mutation hook
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log("Login data:", data);

      // Call the login mutation
      const result = await login(data).unwrap();

      // If login is successful, store user data and redirect
      if (result.user) {
        dispatch(setCredentials(result.user));

        toast.success("Welcome back! You have successfully logged in.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Reset form and navigate to dashboard or home
        reset();
        navigate("/"); // or navigate to dashboard
      }
    } catch (error: any) {
      // Handle login errors
      console.error("Login error:", error);

      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Login failed. Please check your credentials.";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
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
                Welcome Back
              </Title>
              <Text
                size="xl"
                className="text-gray-600 max-w-2xl mx-auto leading-relaxed"
              >
                Sign in to your Food Rescue account and continue making a
                difference in your community by reducing food waste.
              </Text>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-lg mx-auto"
            >
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl p-8 lg:p-12"
              >
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center"
                >
                  Sign In
                </motion.h2>

                <motion.form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <FormInput
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      register={register}
                      error={errors.password}
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    viewport={{ once: true }}
                    className="text-right"
                  >
                    <Link
                      to="/forgot-password"
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
                    >
                      Forgot your password?
                    </Link>
                  </motion.div>

                  {/* <motion.div
                    className="flex justify-center pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    viewport={{ once: true }}
                  > */}
                  <div className="flex items-center justify-start">
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
                      disabled={isLoginLoading}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-12 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[200px] w-full shadow-lg hover:shadow-xl"
                    >
                      {isLoginLoading ? "Signing In..." : "Sign In"}
                    </button>
                    {/* </motion.div> */}
                  </div>
                  {/* </motion.div> */}

                  <motion.div
                    className="text-center pt-6 border-t border-gray-200"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                    viewport={{ once: true }}
                  >
                    <Text className="text-gray-600">
                      Don't have an account?{" "}
                      <Link
                        to="/register"
                        className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                      >
                        Create one here
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

export default LoginPage;
