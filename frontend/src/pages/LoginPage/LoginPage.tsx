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
      console.log("Starting login request...");

      const result = await login(data).unwrap();
      console.log("Login result:", result);
      console.log("Result type:", typeof result);
      console.log("Result keys:", Object.keys(result));

      // Handle different possible response structures
      let userData = null;

      console.log("Analyzing response structure...");
      console.log("result.user exists:", !!result.user);
      console.log("result.data exists:", !!(result as any).data);
      console.log("result has id:", !!(result as any).id);
      console.log("result has email:", !!(result as any).email);
      console.log("result has name:", !!(result as any).name);
      console.log("result has role:", !!(result as any).role);

      if (result.user) {
        console.log("✅ Found user in result.user");
        userData = result.user;
      } else if ((result as any).data && (result as any).data.user) {
        console.log("✅ Found user in result.data.user");
        userData = (result as any).data.user;
      } else if (
        (result as any).data &&
        typeof (result as any).data === "object"
      ) {
        console.log("✅ Found user data in result.data");
        userData = (result as any).data;
      } else if ((result as any).id && (result as any).email) {
        console.log("✅ Found user data directly in result (has id and email)");
        userData = result as any;
      } else if ((result as any).name && (result as any).email) {
        console.log(
          "✅ Found user data directly in result (has name and email)"
        );
        userData = result as any;
      } else {
        console.log("❌ No recognizable user data structure found");
        console.log("Attempting to use entire result as user data...");
        // Last resort: try to use the entire result if it looks like user data
        if (typeof result === "object" && result !== null) {
          userData = result as any;
        }
      }

      console.log("Final userData:", userData);

      if (userData) {
        console.log("✅ Setting user credentials:", userData);
        dispatch(setCredentials(userData));

        // Verify both localStorage and cookies were updated
        setTimeout(() => {
          const storedUser = localStorage.getItem("userInfo");
          console.log(
            "📦 Stored user in localStorage:",
            storedUser ? "✅ Success" : "❌ Failed"
          );

          // Check cookies
          const cookieUser = document.cookie
            .split("; ")
            .find((row) => row.startsWith("userInfo="));
          console.log(
            "🍪 Stored user in cookies:",
            cookieUser ? "✅ Success" : "❌ Failed"
          );

          if (storedUser) {
            console.log("📋 localStorage content:", JSON.parse(storedUser));
          }
          if (cookieUser) {
            console.log("📋 Cookie content:", cookieUser.substring(9)); // Remove "userInfo=" prefix
          }
        }, 200);

        toast.success("Welcome back! You have successfully logged in.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        reset();

        // Small delay to ensure toast is visible and storage is updated
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        console.error("❌ No user data found in response:", result);
        console.error(
          "❌ Full response structure:",
          JSON.stringify(result, null, 2)
        );
        toast.error(
          "Login successful but user data is missing. Please try again."
        );
      }
    } catch (error: any) {
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
                className="bg-white rounded-2xl p-8 lg:p-12 border border-gray-200"
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
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
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
                    Sign In
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-gray-600"
                  >
                    Welcome back to Food Rescue
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
                  <div className="flex justify-center pt-6">
                    {/* <motion.div
                    className="flex justify-center pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    viewport={{ once: true }}
                  > */}
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
                      // className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-12 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 min-w-[200px] w-full"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-blue-400 disabled:to-purple-400 text-white font-semibold py-4 px-12 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 cursor-pointer focus:ring-blue-500 focus:ring-offset-2 min-w-[200px] shadow-lg hover:shadow-xl w-full"
                    >
                      {isLoginLoading ? "Signing In..." : "Sign In"}
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
